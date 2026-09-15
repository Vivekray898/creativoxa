"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Icon from "@/components/ui/Icon";

export default function ContactFormPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      form_source: "Floating Panel",
    };

    const { error: dbError } = await supabase.from("enquiries").insert([payload]);

    if (!dbError) {
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Fire-and-forget email notification
      fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 4000);
    } else {
      setIsSubmitting(false);
      setHasError(true);
      console.error("Supabase error:", dbError);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center md:flex">
      {/* Tab trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close enquiry panel" : "Open enquiry panel"}
        className="pointer-events-auto rounded-l-lg border border-line border-r-0 bg-surface px-2 py-5 text-xs font-semibold tracking-wide text-foreground shadow-md transition-colors hover:bg-surface-2 [writing-mode:vertical-rl]"
      >
        {isOpen ? "Close" : "Enquire"}
      </button>

      {/* Panel */}
      <div
        className={`pointer-events-auto overflow-hidden border-y border-l border-line bg-surface shadow-2xl transition-all duration-300 ${
          isOpen ? "w-[22rem] opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="w-[22rem] p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Send a quick enquiry
          </h3>
          <p className="mt-1 text-sm text-muted">
            Tell us what you need. We usually reply within one business day.
          </p>

          {isSubmitted ? (
            <div className="py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon name="check" className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-base font-semibold text-foreground">Enquiry sent</h4>
              <p className="mt-1 text-sm text-muted">We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label htmlFor="fp-name" className="sr-only">Name</label>
                <input
                  id="fp-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name *"
                  className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="fp-email" className="sr-only">Email</label>
                <input
                  id="fp-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email *"
                  className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="fp-phone" className="sr-only">Phone</label>
                <input
                  id="fp-phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="fp-message" className="sr-only">Message</label>
                <textarea
                  id="fp-message"
                  name="message"
                  rows={3}
                  placeholder="What do you need help with?"
                  className="w-full resize-none rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary"
                />
              </div>

              {hasError && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
