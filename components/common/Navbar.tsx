'use client';

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Services", href: "/All-Services" },
    { name: "Our Work", href: "/work" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-[100] border-b border-default bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          
          {/* Logo */}
          <Link href="/" className="relative z-[120]">
            <img 
              src={
                mounted && resolvedTheme === "dark"
                  ? "/images/Creativoxa-White-minn.webp"
                  : "/images/creativoxa-logo-645-x-160.png"
              }
              alt="Creativoxa Logo"
              className="h-8 sm:h-10 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 z-[120]">
            <ThemeToggle />

            {/* CTA */}
            <Link 
              href="/contact" 
              className="hidden md:inline-flex btn-primary !py-2.5 !px-6 font-semibold shadow-md hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              Get Started
            </Link>

            {/* Hamburger (Only visible when menu is CLOSED) */}
            <button
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`md:hidden relative w-8 h-6 flex flex-col justify-between group transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <span className="h-[2px] w-full bg-foreground" />
              <span className="h-[2px] w-full bg-foreground" />
              <span className="h-[2px] w-full bg-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[130] transition-all duration-500 ease-[0.22,1,0.36,1]
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

        {/* --- CLOSE BUTTON (Inside Overlay) --- */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 z-[140] w-12 h-12 flex items-center justify-center rounded-full border border-default bg-background/80 backdrop-blur-md shadow-lg active:scale-90 transition-all duration-200"
          aria-label="Close Menu"
        >
          <div className="relative w-6 h-6">
            <span className="block w-6 h-[2px] bg-foreground rotate-45 absolute top-1/2 left-0 -translate-y-1/2" />
            <span className="block w-6 h-[2px] bg-foreground -rotate-45 absolute top-1/2 left-0 -translate-y-1/2" />
          </div>
        </button>

        {/* Content */}
        <div className={`relative h-full flex flex-col items-center justify-center px-6 text-center transition-all duration-500 delay-100
          ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-10">
            Navigation
          </p>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="text-4xl font-black tracking-tight text-foreground hover:text-primary transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-6 text-4xl font-black text-primary"
            >
              Get Started
            </Link>
          </div>

          <div className="absolute bottom-10 text-center text-xs text-muted">
            <p>contact@creativoxa.in</p>
            <p className="mt-1">+91 76795 87581</p>
          </div>
        </div>
      </div>
    </>
  );
}