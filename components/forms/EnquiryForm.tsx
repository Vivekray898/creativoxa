"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

const serviceOptions = [
  "Digital Marketing",
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Social Media",
  "Website",
  "Local/Google Business",
  "Full Digital Management",
  "Other",
];

const budgetOptions = [
  "Under ₹10,000 / month",
  "₹10,000 – ₹25,000 / month",
  "₹25,000 – ₹50,000 / month",
  "₹50,000+ / month",
  "One-time project",
  "Not sure yet",
];

type Status = "idle" | "loading" | "success" | "error";

export default function EnquiryForm({ formSource = "Website" }: { formSource?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — real users never see or fill this field
    if (String(formData.get("company_website_hp") || "") !== "") {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      name: String(formData.get("name") || "").trim(),
      business: String(formData.get("business") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      budget: String(formData.get("budget") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      form_source: formSource,
    };

    // Client-side validation
    if (!payload.name || !payload.email) {
      setStatus("error");
      setErrorMessage("Please fill in your name and email.");
      return;
    }
    if (!payload.message && !payload.service) {
      setStatus("error");
      setErrorMessage("Tell us briefly what you need help with.");
      return;
    }

    try {
      const { error: dbError } = await import("@/lib/supabase").then((m) =>
        m.supabase.from("enquiries").insert([payload])
      );

      if (dbError) {
        // The live table may not yet have the extended columns — retry with the
        // original schema so the enquiry is never lost.
        const fallback = await import("@/lib/supabase").then((m) =>
          m.supabase
            .from("enquiries")
            .insert([
              {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                message: payload.message || `Service: ${payload.service}. Business: ${payload.business}`,
                form_source: formSource,
              },
            ])
        );
        if (fallback.error) throw fallback.error;
      }

      // Fire-and-forget email notification
      fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Enquiry error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong while sending your enquiry. Please try again, or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          Thanks — your enquiry has been received.
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;ll review the details and get back to you. Here&apos;s what happens next:
        </p>
        <ol className="mt-6 max-w-sm space-y-3 text-left">
          {[
            "We review your requirements",
            "We discuss your project and goals",
            "We recommend the right approach",
            "Work begins",
          ].map((step, i) => (
            <li key={step} className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-sm text-xs leading-relaxed text-faint">
          Prefer email? Write to us at{" "}
          <a href="mailto:contact@creativoxa.in" className="font-medium text-primary">
            contact@creativoxa.in
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-widest text-faint";

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-name" className={labelClass}>Name *</label>
          <input id="ef-name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ef-business" className={labelClass}>Business / Company</label>
          <input id="ef-business" name="business" type="text" autoComplete="organization" placeholder="Business name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ef-email" className={labelClass}>Email *</label>
          <input id="ef-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ef-phone" className={labelClass}>Phone</label>
          <input id="ef-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 …" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ef-website" className={labelClass}>
            Website <span className="normal-case text-faint/70">(optional)</span>
          </label>
          <input id="ef-website" name="website" type="url" placeholder="yourwebsite.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ef-service" className={labelClass}>What do you need help with?</label>
          <select id="ef-service" name="service" defaultValue="" className={inputClass}>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ef-budget" className={labelClass}>
            Approximate budget <span className="normal-case text-faint/70">(optional — helps us understand scope)</span>
          </label>
          <select id="ef-budget" name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ef-message" className={labelClass}>Message</label>
          <textarea
            id="ef-message"
            name="message"
            rows={4}
            placeholder="Tell us what you're trying to achieve…"
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      {/* Honeypot — hidden from real users and assistive tech */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full sm:w-auto">
          {status === "loading" ? "Sending…" : "Send Enquiry"}
        </button>
        <p className="text-xs leading-relaxed text-faint">
          We&apos;ll only use your details to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
