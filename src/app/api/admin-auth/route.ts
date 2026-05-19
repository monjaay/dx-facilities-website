import { NextRequest, NextResponse } from "next/server";

// POST /api/admin-auth — validate admin password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { password?: unknown };
    const { password } = body;

    if (typeof password !== "string" || !password) {
      return NextResponse.json(
        { error: "Mot de passe manquant" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD ?? "dxadmin2025";

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Mot de passe incorrect" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
