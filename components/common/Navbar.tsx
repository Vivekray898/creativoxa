'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Service", href: "/All-Services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contacts" },
  ];

  return (
    <header className="p-4 md:px-10 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 border-b border-default z-[100]">
      
      {/* Logo */}
      <Link href="/" className="z-[120]" onClick={() => setIsMenuOpen(false)}>
        <img 
          src={mounted && resolvedTheme === "dark" ? "/images/Creativoxa-White-minn.webp" : "/images/creativoxa-logo-645-x-160.png"}
          alt="Creativoxa"
          className="h-7 md:h-9 w-auto"
        />
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center space-x-10">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-sm font-semibold uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors">
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 z-[120]">
        <ThemeToggle />
        <Link href="/contacts" className="hidden md:block btn-primary !py-2.5 !px-6 text-xs uppercase tracking-widest font-bold">
          Start a Project
        </Link>
        
        {/* ADDED BACK: Mobile Menu Toggle Button */}
        <button 
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* --- RE-DESIGNED MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] md:hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] opacity-100 pointer-events-auto">
          {/* Glass Background Overlay */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />

          <div className="relative h-full flex flex-col justify-between p-8 pt-32">

          {/* Main Links with High-Impact Typography */}
          <nav className="flex flex-col space-y-6">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Navigation</p>
            {navLinks.map((link, i) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
                className={`
                  text-5xl font-black text-foreground tracking-tighter transition-all duration-700
                  ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Footer of the Menu */}
          <div className={`
            border-t border-default pt-8 transition-all duration-1000 delay-500
            ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-2">Socials</p>
                <div className="flex space-x-4 text-foreground">
                  <a href="#" className="hover:text-primary transition-colors">IG</a>
                  <a href="#" className="hover:text-primary transition-colors">LI</a>
                  <a href="#" className="hover:text-primary transition-colors">TW</a>
                </div>
              </div>
              <div>
                <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-2">Project Inquiries</p>
                <p className="text-sm font-medium">hello@creativoxa.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </header>
  );
}