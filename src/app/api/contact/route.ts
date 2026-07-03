import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/data/site";

export const runtime = "nodejs";

/**
 * Contact endpoint. Validates the payload, then emails it via Resend.
 * If no RESEND_API_KEY is configured (e.g. local dev), it logs the message
 * and returns success with `simulated: true` so the form still works.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot triggered → pretend success, drop silently.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — message logged instead of sent:",
      { name, email, subject },
    );
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
    const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
          <h2 style="margin:0 0 16px;">Nouveau message — Portfolio</h2>
          <p style="margin:4px 0;"><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p style="margin:4px 0;"><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p style="margin:4px 0;"><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected server error." }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
