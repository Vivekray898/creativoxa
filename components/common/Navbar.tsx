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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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
      <header className="sticky top-0 z-[100] border-b border-default bg-background/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          
          <Link href="/" className="relative z-[120]">
            <img 
              src={mounted && resolvedTheme === "dark" ? "/images/Creativoxa-White-minn.webp" : "/images/creativoxa-logo-645-x-160.png"}
              alt="Creativoxa Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 z-[120]">
            <ThemeToggle />
            <Link href="/contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-6">
              Get Started
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`block absolute h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`} />
              <span className={`block absolute h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block absolute h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU SYSTEM */}
      <div className={`fixed inset-0 z-[110] md:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        
        {/* 1. Backdrop Blur (Fades in) */}
        <div 
          className={`absolute inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-300 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* 2. Side Drawer (Slides in from Right) */}
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background border-l border-default shadow-2xl transition-transform duration-400 ease-[0.32,0.72,0,1] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex flex-col h-full pt-24 pb-10 px-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">
              Navigation
            </p>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl font-bold tracking-tight text-foreground transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                  style={{ transitionDelay: `${i * 50 + 100}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-bold text-primary mt-4 transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                style={{ transitionDelay: `${navLinks.length * 50 + 100}ms` }}
              >
                Get Started
              </Link>
            </nav>

            <div className="mt-auto pt-10 border-t border-default">
              <p className="text-sm font-medium">contact@creativoxa.in</p>
              <p className="text-sm text-muted mt-1">+91 76795 87581</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}