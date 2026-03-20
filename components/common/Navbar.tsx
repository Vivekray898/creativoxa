'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import ThemeToggle from "../ThemeToggle";
import Hamburger from "../Hamburger";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Hydration Mismatch
  useEffect(() => setMounted(true), []);

  // 2. COOL FEATURE: Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Who Are We", href: "/" },
    { name: "Services", href: "/All-Services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contacts" },
  ];

  return (
    <header className="p-4 md:px-8 flex justify-between items-center bg-background/95 backdrop-blur-sm sticky top-0 border-b border-default z-[100]">
      
      {/* Logo - Always visible with higher z-index */}
      <Link href="/" className="z-[110]" onClick={() => setIsMenuOpen(false)}>
        <img 
          src={mounted && resolvedTheme === "dark" ? "/images/Creativoxa-White-minn.webp" : "/images/creativoxa-logo-645-x-160.png"}
          alt="Creativoxa Logo"
          className="h-8 sm:h-10 w-auto transition-opacity duration-300"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right Side Actions - Always visible */}
      <div className="flex items-center gap-2 sm:gap-4 z-[110]">
        <ThemeToggle />
        
        <Link href="/contacts" className="hidden sm:block btn-primary !py-2 !px-5 text-sm">
          Get Started
        </Link>

        {/* Hamburger - Ensure this z-index is above overlay */}
        <div className="md:hidden flex items-center">
          <Hamburger 
            isOpen={isMenuOpen} 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-background md:hidden z-[105]
        transition-all duration-500 ease-in-out
        ${isMenuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"}
      `}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`
                text-3xl font-bold text-foreground transition-all duration-500
                ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="/contacts" 
            onClick={() => setIsMenuOpen(false)} 
            className={`
              btn-primary w-2/3 text-center text-lg transition-all duration-700 delay-300
              ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            `}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}