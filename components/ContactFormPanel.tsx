'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactFormPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      form_source: 'Floating Sidebar'
    };

    // 1. Save to Database (Supabase)
    const { error: dbError } = await supabase
      .from('enquiries')
      .insert([payload]);

    if (!dbError) {
      // 2. Success! Show the "Thank You" message immediately
      setIsSubmitted(true);
      setIsSubmitting(false);

      // 3. Fire Email Notification (Non-blocking)
      // We don't "await" this so the user doesn't wait for the SMTP server
      fetch('/api/send-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(err => console.error("Email notification error:", err));

      // 4. Reset form and close panel after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 3000);
    } else {
      setIsSubmitting(false);
      alert("Error sending enquiry. Please try again.");
      console.error("Supabase Error:", dbError);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex items-center pointer-events-none">
      {/* Tab Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close contact form' : 'Open contact form'}
        aria-expanded={isOpen}
        className={`
          pointer-events-auto
          btn-primary
          text-sm font-semibold
          px-3 py-6
          rounded-l-2xl rounded-r-none
          shadow-xl hover:shadow-2xl
          transition-all duration-300
          flex items-center gap-2
          active:scale-95
          [writing-mode:vertical-lr]
          tracking-wide
        `}
      >
        {isOpen ? 'Close' : 'Get in Touch'}
      </button>

      {/* Form panel */}
      <div
        className={`
          pointer-events-auto
          bg-background text-foreground shadow-2xl rounded-l-2xl
          border border-default
          transition-all duration-500 ease-out
          overflow-hidden
          ${isOpen ? 'w-80 sm:w-96 opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-8'}
        `}
      >
        <div className="w-full max-w-md p-6 sm:p-7 flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Request a Quote
          </h3>
          <p className="text-sm text-muted mb-7">
            We usually reply within 24 hours
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                required
                className="w-full px-4 py-3 rounded-xl border border-default focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground bg-background"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                required
                className="w-full px-4 py-3 rounded-xl border border-default focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground bg-background"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                required
                className="w-full px-4 py-3 rounded-xl border border-default focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground bg-background"
              />
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-default focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground resize-none bg-background"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="py-16 text-center animate-in fade-in zoom-in duration-300">
              <div className="text-primary text-6xl mb-5">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Message Sent!
              </h4>
              <p className="text-muted">
                We&apos;ll get back to you soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}