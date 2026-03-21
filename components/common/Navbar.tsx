'use client';

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
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
      {/* HEADER: Native "Glass" look with dynamic height */}
      <header 
        className={`sticky top-0 z-[100] transition-all duration-300 border-b 
        ${scrolled 
          ? "py-3 bg-background/80 border-default backdrop-blur-xl" 
          : "py-5 bg-transparent border-transparent"}`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">
          
          {/* Logo with smooth scaling */}
          <Link href="/" className="relative z-[120] transition-transform duration-300 active:scale-95">
            <img 
              src={mounted && resolvedTheme === "dark" ? "/images/Creativoxa-White-minn.webp" : "/images/creativoxa-logo-645-x-160.png"}
              alt="Creativoxa Logo"
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10'}`}
            />
          </Link>

          {/* DESKTOP NAV: Pill-style hover effects (Native macOS feel) */}
          <nav className="hidden md:flex items-center bg-muted/50 p-1 rounded-full border border-default/50">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="px-5 py-2 text-sm font-medium rounded-full text-foreground/70 hover:text-foreground hover:bg-background transition-all duration-200 active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 z-[120]">
            <ThemeToggle />
            
            <Link 
              href="/contact" 
              className="hidden md:inline-flex px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Get Started
            </Link>

            {/* HAMBURGER: Native Morphing Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-muted/50 border border-default/50 relative focus:outline-none active:scale-90 transition-transform"
              aria-label="Toggle Menu"
            >
              <span className={`block absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`block absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU SYSTEM: High-End Spring Motion */}
      <div className={`fixed inset-0 z-[110] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Side Drawer: iOS-style Card */}
        <div className={`absolute right-3 top-3 bottom-3 w-[85%] max-w-[360px] bg-background border border-default shadow-2xl rounded-3xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'}`}>
          
          <div className="flex flex-col h-full pt-20 pb-10 px-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8">
              Menu
            </p>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-4xl font-bold tracking-tight text-foreground active:scale-95 active:opacity-70 transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: `${i * 40 + 100}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`text-4xl font-bold text-primary mt-4 active:scale-95 transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                style={{ transitionDelay: `${navLinks.length * 40 + 100}ms` }}
              >
                Start Project →
              </Link>
            </nav>

            {/* Footer Contact */}
            <div className="mt-auto p-6 bg-muted/40 rounded-2xl border border-default/50">
              <p className="text-xs text-muted-foreground mb-1">Get in touch</p>
              <p className="text-sm font-semibold">contact@creativoxa.in</p>
              <p className="text-sm font-semibold text-primary">+91 76795 87581</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}