import { NextRequest, NextResponse } from "next/server";

// On Vercel the filesystem is read-only, so we commit directly to GitHub.
// Locally (no GITHUB_TOKEN), we fall back to fs read/write for dev convenience.

const GITHUB_OWNER = process.env.GITHUB_OWNER ?? "monjaay";
const GITHUB_REPO  = process.env.GITHUB_REPO  ?? "dx-facilities-website";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";
const CONTENT_FILE  = "src/data/content.json";
const GITHUB_API    = "https://api.github.com";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// ── GitHub helpers ──────────────────────────────────────────────────────────

async function ghGet(path: string, token: string) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}`);
  return res.json() as Promise<Record<string, unknown>>;
}

async function ghPut(path: string, token: string, body: unknown) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT ${path} → ${res.status}: ${err}`);
  }
  return res.json();
}

// ── GET ─────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;

  // Dev fallback: read local file
  if (!token) {
    try {
      const { readFileSync } = await import("fs");
      const { join } = await import("path");
      const raw = readFileSync(join(process.cwd(), "src", "data", "content.json"), "utf-8");
      return NextResponse.json(JSON.parse(raw) as unknown);
    } catch {
      return NextResponse.json({ error: "Lecture impossible (local)" }, { status: 500 });
    }
  }

  // Production: read from GitHub
  try {
    const data = await ghGet(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE}?ref=${GITHUB_BRANCH}`,
      token
    );
    const decoded = Buffer.from(data.content as string, "base64").toString("utf-8");
    return NextResponse.json(JSON.parse(decoded) as unknown);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ── POST ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body: unknown = await req.json();
  const newContent = JSON.stringify(body, null, 2) + "\n";
  const token = process.env.GITHUB_TOKEN;

  // Dev fallback: write local file
  if (!token) {
    try {
      const { writeFileSync } = await import("fs");
      const { join } = await import("path");
      writeFileSync(join(process.cwd(), "src", "data", "content.json"), newContent, "utf-8");
      return NextResponse.json({ success: true, mode: "local" });
    } catch (err) {
      return NextResponse.json({ error: String(err) }, { status: 500 });
    }
  }

  // Production: commit to GitHub (triggers Vercel rebuild)
  try {
    // 1. Get current file SHA (required for update)
    const current = await ghGet(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE}?ref=${GITHUB_BRANCH}`,
      token
    );

    // 2. Commit updated file
    await ghPut(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE}`,
      token,
      {
        message: "admin: mise à jour du contenu",
        content: Buffer.from(newContent).toString("base64"),
        sha: current.sha as string,
        branch: GITHUB_BRANCH,
      }
    );

    return NextResponse.json({ success: true, mode: "github", rebuild: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
