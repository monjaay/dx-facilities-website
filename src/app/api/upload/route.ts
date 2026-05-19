import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

// Allowed folders — keep list small to avoid path traversal
const ALLOWED_FOLDERS = new Set(["team", "services", "root"]);

// Sanitise to alphanumeric, dashes, dots only
function safeName(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// POST /api/upload — save image file + update team-photos.json when relevant
export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD ?? "dxadmin2025";

  if (authHeader !== adminPassword) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const rawFilename = formData.get("filename");
    const folder = formData.get("folder") ?? "team";
    const memberSlug = formData.get("memberSlug"); // optional — used for team photos

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }
    if (typeof rawFilename !== "string" || !rawFilename) {
      return NextResponse.json({ error: "Nom de fichier manquant" }, { status: 400 });
    }
    if (typeof folder !== "string" || !ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: "Dossier non autorisé" }, { status: 400 });
    }

    const filename = safeName(rawFilename);
    if (!filename) {
      return NextResponse.json({ error: "Nom de fichier invalide" }, { status: 400 });
    }

    // Write the image file
    const imagesRoot = path.join(process.cwd(), "public", "images");
    const targetDir =
      folder === "root" ? imagesRoot : path.join(imagesRoot, folder);
    await mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const publicPath =
      folder === "root"
        ? `/images/${filename}`
        : `/images/${folder}/${filename}`;

    // If this is a team photo, update team-photos.json
    if (folder === "team" && typeof memberSlug === "string" && memberSlug) {
      const photosJsonPath = path.join(
        process.cwd(),
        "src",
        "data",
        "team-photos.json"
      );
      let current: Record<string, string> = {};
      try {
        current = JSON.parse(await readFile(photosJsonPath, "utf-8")) as Record<string, string>;
      } catch {
        // File may not exist yet — start fresh
      }
      current[memberSlug] = publicPath;
      await writeFile(photosJsonPath, JSON.stringify(current, null, 2) + "\n");
    }

    return NextResponse.json({ success: true, path: publicPath });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
