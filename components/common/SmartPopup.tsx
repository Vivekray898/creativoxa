'use client';

import { useState, useEffect } from 'react';
import ContactForm from '../contact/ContactForm';

export default function SmartPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const STORAGE_KEY = 'popup_last_shown';
    const COOLDOWN_HOURS = 24;

    // Check cooldown
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown) {
      const diff = Date.now() - Number(lastShown);
      const hoursPassed = diff / (1000 * 60 * 60);
      if (hoursPassed < COOLDOWN_HOURS) return;
    }

    let triggered = false;

    const showPopup = () => {
      if (triggered) return;
      triggered = true;

      setIsVisible(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    };

    // ⏱ Delay trigger (5s)
    const timer = setTimeout(() => {
      // Only attach listeners after delay
      window.addEventListener('mouseleave', handleExitIntent);
      window.addEventListener('scroll', handleScroll);
    }, 5000);

    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY < 10) {
        showPopup();
      }
    };

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 70) {
        showPopup();
      }
    };

    // ⌨️ ESC key support
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mouseleave', handleExitIntent);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />

      {/* Modal */}
      <div className="relative bg-background w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-default animate-scale-in">
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition"
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left side */}
          <div className="bg-primary p-10 text-white hidden md:flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">
              Don't leave <br /> money on the table.
            </h3>
            <p className="text-sm opacity-80">
              Get a free technical audit + roadmap for your business.
            </p>
          </div>

          {/* Right side */}
          <div className="p-6 md:p-10">
            <h4 className="text-lg md:text-xl font-bold mb-4">
              Request a Quote
            </h4>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}