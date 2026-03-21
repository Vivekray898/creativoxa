'use client';
import { useState, useEffect } from 'react';
import ContactForm from '../contact/ContactForm'; // Reuse your contact form

export default function SmartPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if we already showed it this session
    const shown = sessionStorage.getItem('popup_shown');
    if (shown) return;

    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('popup_shown', 'true');
      }
    };

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 70 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('popup_shown', 'true');
      }
    };

    window.addEventListener('mouseleave', handleExitIntent);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mouseleave', handleExitIntent);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" 
        onClick={() => setIsVisible(false)} 
      />
      
      {/* Content */}
      <div className="relative bg-background w-full max-w-2xl rounded-[2rem] overflow-hidden border border-default shadow-2xl scale-in">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 text-muted hover:text-foreground z-10"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-primary p-12 text-white hidden md:flex flex-col justify-center">
            <h3 className="text-3xl font-black tracking-tighter mb-4">Don't leave <br/> money on the table.</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Get a free technical audit and discovery roadmap for your business today.
            </p>
          </div>
          <div className="p-8 md:p-12">
            <h4 className="text-xl font-black mb-6">Request a Quote</h4>
            {/* Minimal version of your form */}
            <ContactForm /> 
          </div>
        </div>
      </div>
    </div>
  );
}