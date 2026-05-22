import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "src", "data", "content.json");

function checkAuth(req: NextRequest): boolean {
  const provided = req.headers.get("x-admin-password");
  return provided === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const raw = readFileSync(CONTENT_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw) as unknown);
  } catch {
    return NextResponse.json({ error: "Lecture impossible" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body: unknown = await req.json();
    writeFileSync(CONTENT_PATH, JSON.stringify(body, null, 2) + "\n", "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Écriture impossible" }, { status: 500 });
  }
}
