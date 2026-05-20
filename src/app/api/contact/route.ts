import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
};

// Build the HTML email body
function buildEmailHtml(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
}): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;font-weight:600;color:#111827;">${value || "—"}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#f3f4f6;">

    <!-- Header -->
    <div style="background:#1F68B1;padding:28px 32px;border-radius:10px 10px 0 0;">
      <p style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 6px;">DX Facilities — Formulaire de contact</p>
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Nouvelle demande reçue</h1>
    </div>

    <!-- Body -->
    <div style="background:#fff;padding:28px 32px;border-radius:0 0 10px 10px;border:1px solid #e5e7eb;border-top:none;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Nom complet", data.name)}
        ${row("Entreprise", data.company)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:#1F68B1;text-decoration:none;">${data.email}</a>`)}
        ${row("Téléphone", data.phone)}
        ${row("Service d'intérêt", data.service)}
      </table>

      <div style="margin-top:20px;">
        <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
        <div style="background:#f8f9fa;border-left:3px solid #1F68B1;border-radius:0 6px 6px 0;padding:16px;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${data.message}</div>
      </div>

      <!-- Quick reply CTA -->
      <div style="margin-top:24px;text-align:center;">
        <a href="mailto:${data.email}?subject=Re: Votre demande DX Facilities"
           style="display:inline-block;background:#1F68B1;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;font-weight:600;">
          Répondre à ${data.name}
        </a>
      </div>

      <!-- Footer -->
      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;text-align:center;">
        Soumis le ${data.submittedAt} — Site DX Facilities
      </div>
    </div>
  </div>
</body>
</html>`;
}

// POST /api/contact — validate form data and send email notification
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Basic validation
    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("fr-SN", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Dakar",
    });

    const html = buildEmailHtml({ name, company, email, phone, service, message, submittedAt });
    const subject = `[DX Facilities] Nouvelle demande — ${name} (${company})`;

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      // Send via Resend API (no npm package needed — plain fetch)
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "DX Facilities <onboarding@resend.dev>",
          to: ["info@dxfacilities.com"],
          reply_to: email,
          subject,
          html,
        }),
      });

      if (!resendRes.ok) {
        const errBody = await resendRes.text();
        console.error("Resend API error:", resendRes.status, errBody);
        // Still return success to the user — don't expose email errors
      }
    } else {
      // Dev fallback: log to console when RESEND_API_KEY is not set
      console.log("=== CONTACT FORM SUBMISSION (RESEND_API_KEY not set) ===");
      console.log({ name, company, email, phone, service, message, submittedAt });
      console.log("=======================================================");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
