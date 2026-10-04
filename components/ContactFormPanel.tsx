"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

/** sessionStorage key, so the tab stays dismissed for the rest of the visit. */
const DISMISSED_KEY = "cv-enquiry-dismissed";

export default function ContactFormPanel() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Only mount the panel on md+ screens so it can never extend
  // the page's scroll width on mobile devices. The initial value is set
  // inside the change handler (fired via requestAnimationFrame) rather than
  // synchronously in the effect body.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      // Close the panel if we drop below md while it's open
      if (!e.matches) setIsOpen(false);
    };

    mq.addEventListener("change", handler);
    const raf = requestAnimationFrame(() => handler({ matches: mq.matches } as MediaQueryListEvent));

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", handler);
    };
  }, []);

  // Restore the visitor's earlier dismissal. Reading it here rather than in the
  // lazy initialiser keeps this a client-only value, so the server-rendered HTML
  // is identical for everyone and there is no hydration mismatch.
  useEffect(() => {
    try {
      setIsDismissed(window.sessionStorage.getItem(DISMISSED_KEY) === "1");
    } catch {
      // Storage can be unavailable in private mode; showing the panel is the
      // harmless default.
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      form_source: "Floating Panel",
    };

    // One server-side path for every enquiry: it validates, stores the enquiry
    // and notifies by email. The browser never writes to the database directly.
    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Enquiry request failed");

      form.reset();
      setIsSubmitted(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 4000);
    } catch (error) {
      setIsSubmitting(false);
      setHasError(true);
      console.error("Enquiry error:", error);
    }
  };

  // Once dismissed the whole thing is removed, so nothing overlays the right
  // rail — which is where wide ad units and the back-to-top control live.
  if (!isDesktop || isDismissed) return null;

  const dismiss = () => {
    setIsDismissed(true);
    setIsOpen(false);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Non-fatal: the panel still closes for this page view.
    }
  };

  return (
    <div className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center overflow-hidden">
      {/* Tab trigger */}
      <button
        type="button"
        onClick={() => (isOpen ? dismiss() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close enquiry panel" : "Open enquiry panel"}
        className="pointer-events-auto rounded-l-lg border border-line border-r-0 bg-surface px-2 py-5 text-xs font-semibold tracking-wide text-foreground shadow-md transition-colors hover:bg-surface-2 [writing-mode:vertical-rl]"
      >
        {isOpen ? "Close" : "Enquire"}
      </button>

      {/* Panel */}
      <div
        className={`pointer-events-auto overflow-hidden border-y border-l border-line bg-surface shadow-2xl transition-all duration-300 ${
          isOpen ? "w-[22rem] opacity-100" : "hidden w-0 opacity-0"
        }`}
      >
        <div className="w-[22rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Send a quick enquiry
            </h3>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss enquiry panel for this visit"
              title="Dismiss for this visit"
              className="-mr-1.5 -mt-1 rounded-md p-1 text-faint transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted">
            Tell us what you need. Your enquiry goes straight to our inbox.
          </p>

          {isSubmitted ? (
            <div className="py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon name="check" className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-base font-semibold text-foreground">
                Thanks — your enquiry has been received.
              </h4>
              <p className="mt-1 text-sm text-muted">
                We&apos;ll review the details and get back to you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label htmlFor="fp-name" className="sr-only">
                  Name
                </label>
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
                <label htmlFor="fp-email" className="sr-only">
                  Email
                </label>
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
                <label htmlFor="fp-phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="fp-phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="fp-message" className="sr-only">
                  Message
                </label>
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