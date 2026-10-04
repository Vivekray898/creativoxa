import { Resend } from "resend";
import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase/public";

// The single public write path into the database.
//
// The form posts here instead of writing to Supabase from the browser, so the
// anon key has no write access at all. Storage happens first (through the
// `submit_enquiry` function, which validates and rate-limits), then the email
// notification — an email failure therefore never loses an enquiry.

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

function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 5000) : null;
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

    // Honeypot: pretend success, store nothing
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

    const payload = {
      name: name.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 200),
      phone: clean(phone),
      business: clean(business),
      website: clean(website),
      service: clean(service),
      budget: clean(budget),
      message: clean(message),
      form_source: clean(form_source) ?? "Website",
    };

    // 1. Store the enquiry.
    const { error: dbError } = await supabasePublic.rpc("submit_enquiry", {
      p_name: payload.name,
      p_email: payload.email,
      p_phone: payload.phone,
      p_business: payload.business,
      p_website: payload.website,
      p_service: payload.service,
      p_budget: payload.budget,
      p_message: payload.message,
      p_form_source: payload.form_source,
    });

    if (dbError) {
      const detail = `${dbError.message ?? ""} ${dbError.details ?? ""}`;
      if (detail.includes("rate_limited")) {
        return NextResponse.json(
          { error: "We've already received several enquiries from this address. Please email us directly." },
          { status: 429 }
        );
      }
      if (detail.includes("invalid_email") || detail.includes("invalid_name")) {
        return NextResponse.json({ error: "Please check your name and email address." }, { status: 400 });
      }
      if (detail.includes("message_too_long")) {
        return NextResponse.json({ error: "Your message is too long — please shorten it." }, { status: 400 });
      }
      console.error("Enquiry storage error:", dbError);
      return NextResponse.json(
        { error: "We couldn't save your enquiry. Please try again, or email us directly." },
        { status: 502 }
      );
    }

    // 2. Notify by email. A failure here is logged, not surfaced: the enquiry
    // is already stored and visible in the admin dashboard.
    try {
      const fields = [
        row("Name", payload.name),
        row("Business", payload.business),
        row("Email", payload.email),
        row("Phone", payload.phone),
        row("Website", payload.website),
        row("Service", payload.service),
        row("Budget", payload.budget),
        row("Message", payload.message),
      ].join("");

      const html = `
        <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;">
          <h2 style="margin:0 0 4px;font-size:18px;">New website enquiry</h2>
          <p style="margin:0 0 16px;color:#777;font-size:13px;">Source: ${escapeHtml(payload.form_source ?? "Website")}</p>
          <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:8px;">
            ${fields}
          </table>
          <p style="margin:16px 0 0;color:#999;font-size:12px;">
            Reply directly to this email to respond to the enquirer. This enquiry is also in the
            admin dashboard under Enquiries.
          </p>
        </div>
      `;

      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Creativoxa Leads <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_NOTIFICATION_EMAIL || "creativoxa@gmail.com"],
        replyTo: payload.email,
        subject: `New enquiry${payload.service ? ` — ${payload.service}` : ""}: ${payload.name}`,
        html,
      });
    } catch (error) {
      console.error("Resend error (enquiry was still saved):", error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Enquiry error:", error);
    return NextResponse.json({ error: "Failed to send enquiry." }, { status: 500 });
  }
}
