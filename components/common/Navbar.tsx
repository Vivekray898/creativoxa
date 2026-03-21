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

  useEffect(() => setMounted(true), []);

  // Lock scroll when menu is open
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
    <header className="p-4 md:px-10 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 border-b border-default z-[100]">
      
      {/* Logo */}
      <Link href="/" className="relative z-[120]" onClick={() => setIsMenuOpen(false)}>
        <img 
          src={mounted && resolvedTheme === "dark" ? "/images/Creativoxa-White-minn.webp" : "/images/creativoxa-logo-645-x-160.png"}
          alt="Creativoxa"
          className="h-7 md:h-9 w-auto"
        />
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center space-x-10">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors">
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 relative z-[120]">
        <ThemeToggle />
        <Link href="/contacts" className="hidden md:block btn-primary !py-2.5 !px-6 text-xs uppercase tracking-widest font-bold">
          Start a Project
        </Link>
        
        <div className="md:hidden">
          <Hamburger isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>

      {/* --- NEW MOBILE MENU --- */}
      <div className={`
        fixed inset-0 z-[110] md:hidden transition-all duration-700 ease-[cubic-bezier(0.8,0,0.1,1)]
        ${isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}
      `}>
        {/* Background */}
        <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)} />

        <div className="relative h-full flex flex-col justify-between p-8 pt-32">
          
          {/* Main Navigation */}
          <nav className="flex flex-col space-y-4">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">Discovery Menu</span>
            {navLinks.map((link, i) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
                className={`
                  text-5xl font-black tracking-tighter transition-all duration-700
                  ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className={`
            grid grid-cols-2 gap-8 border-t border-default pt-10 transition-all duration-1000 delay-500
            ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}>
            <div>
              <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-4">Connect</p>
              <div className="flex flex-col space-y-2 text-sm font-bold">
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              </div>
            </div>
            <div>
              <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-4">Project Inquiry</p>
              <p className="text-sm font-bold">contact@creativoxa.in</p>
              <p className="text-xs text-muted mt-1">+91 76795 87581</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}