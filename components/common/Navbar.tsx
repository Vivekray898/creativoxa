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

  // STRATEGIC REORDERING BASED ON UX HIERARCHY
  const navLinks = [
    { name: "Our Work", href: "/work", badge: null },
    { name: "Services", href: "/All-Services", badge: null },
    { name: "Tools", href: "/tools", badge: "Free" }, // Positioned as a value-add "Hook"
    { name: "Blog", href: "/blog", badge: null },
    { name: "About", href: "/about", badge: null },
    { name: "Contact", href: "/contact", badge: null },
  ];

  const toolLinks = [
    { name: "Word Counter", href: "/tools/word-counter", icon: "📝" },
    { name: "Image Compressor", href: "/tools/image-compressor", icon: "🖼️" },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-[100] transition-all duration-300 border-b 
        ${scrolled 
          ? "py-3 bg-background/80 border-default backdrop-blur-xl" 
          : "py-5 bg-transparent border-transparent"}`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">
          
          {/* Logo */}
          <Link href="/" className="relative z-[120] transition-transform duration-300 active:scale-95">
            <img 
              src={mounted && resolvedTheme === "dark" ? "/images/Creativoxa-White-minn.webp" : "/images/creativoxa-logo-645-x-160.png"}
              alt="Creativoxa Logo"
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10'}`}
            />
          </Link>

          {/* DESKTOP NAV: Pill-style with Badge Support */}
          <nav className="hidden lg:flex items-center bg-muted/50 p-1 rounded-full border border-default/50">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="relative px-5 py-2 text-sm font-medium rounded-full text-foreground/70 hover:text-foreground hover:bg-background transition-all duration-200 active:scale-95 group"
              >
                {link.name}
                {link.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-bold uppercase bg-primary text-white rounded-full leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 z-[120]">
            <ThemeToggle />
            
            <Link 
              href="/contact" 
              className="hidden md:inline-flex px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Get Started
            </Link>

            {/* HAMBURGER */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-muted/50 border border-default/50 relative focus:outline-none active:scale-90 transition-transform"
              aria-label="Toggle Menu"
            >
              <span className={`block absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`block absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU SYSTEM */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div className={`absolute right-3 top-3 bottom-3 w-[85%] max-w-[360px] bg-background border border-default shadow-2xl rounded-3xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'}`}>
          
          <div className="flex flex-col h-full pt-20 pb-10 px-8 overflow-y-auto">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-6">
              Menu
            </p>

            {/* Main Links */}
            <nav className="flex flex-col gap-4 mb-10">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 text-4xl font-bold tracking-tight text-foreground active:scale-95 active:opacity-70 transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: `${i * 40 + 100}ms` }}
                >
                  {link.name}
                  {link.badge && (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* TOOLS SECTION: Strategic Placement */}
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-4">
              Growth Tools
            </p>
            <div className="grid grid-cols-1 gap-3 mb-10">
              {toolLinks.map((tool, i) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-default/50 text-sm font-semibold hover:bg-muted transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: `${(navLinks.length + i) * 40 + 150}ms` }}
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-background border border-default shadow-sm text-xl">{tool.icon}</span>
                  {tool.name}
                </Link>
              ))}
            </div>

            {/* Footer Contact */}
            <div className="mt-auto p-6 bg-muted/40 rounded-2xl border border-default/50">
              <p className="text-xs text-muted-foreground mb-1">Direct Support</p>
              <p className="text-sm font-semibold">contact@creativoxa.in</p>
              <p className="text-sm font-semibold text-primary">+91 76795 87581</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}