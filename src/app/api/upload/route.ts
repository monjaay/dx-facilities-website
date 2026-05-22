import { NextRequest, NextResponse } from "next/server";

// Uploads go directly to Cloudinary (unsigned upload preset).
// Vercel's filesystem is read-only — writing to public/ is not possible at runtime.

const CLOUD_NAME    = process.env.CLOUDINARY_CLOUD_NAME    ?? "dcubjimoc";
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET ?? "dx_facilities_admin";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string | null) ?? "dx-facilities";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }

    // Build the Cloudinary folder path (keeps images organized)
    const cloudFolder = folder === "root"
      ? "dx-facilities/site"
      : `dx-facilities/${folder}`;

    // Forward the file to Cloudinary as a multipart upload
    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", UPLOAD_PRESET);
    cloudForm.append("folder", cloudFolder);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: cloudForm,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Cloudinary error:", errText);
      return NextResponse.json(
        { error: `Cloudinary: ${res.status} — ${errText}` },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { secure_url: string; public_id: string };

    return NextResponse.json({
      success: true,
      path: data.secure_url,       // HTTPS Cloudinary URL
      public_id: data.public_id,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
