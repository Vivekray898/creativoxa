import { Resend } from "resend";
import { NextResponse } from "next/server";

// Lazily constructed so the module loads (and builds succeed) even when the
// API key isn't configured yet; requests will fail cleanly instead.
let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
  }
  return _resend;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 14px;color:#555;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 14px;color:#111;font-size:13px;">${escapeHtml(value)}</td>
  </tr>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      business,
      website,
      service,
      budget,
      message,
      form_source,
      company_website_hp,
    } = body ?? {};

    // Honeypot: pretend success, send nothing
    if (company_website_hp) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (message && typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const fields = [
      row("Name", name),
      row("Business", business),
      row("Email", email),
      row("Phone", phone),
      row("Website", website),
      row("Service", service),
      row("Budget", budget),
      row("Message", message),
    ].join("");

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;">
        <h2 style="margin:0 0 4px;font-size:18px;">New website enquiry</h2>
        <p style="margin:0 0 16px;color:#777;font-size:13px;">Source: ${escapeHtml(form_source || "Website")}</p>
        <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:8px;">
          ${fields}
        </table>
        <p style="margin:16px 0 0;color:#999;font-size:12px;">
          Reply directly to this email to respond to the enquirer.
        </p>
      </div>
    `;

    const response = await getResend().emails.send({
      from: "Creativoxa Leads <onboarding@resend.dev>",
      to: ["creativoxa@gmail.com"],
      replyTo: email,
      subject: `New enquiry${service ? ` — ${service}` : ""}: ${name}`,
      html,
    });

    return NextResponse.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
