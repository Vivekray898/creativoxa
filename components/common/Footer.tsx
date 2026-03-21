'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a ghost/skeleton footer or empty space to prevent layout shift
    return <footer className="bg-background h-20" />;
  }

  return (
    <footer className="bg-background text-foreground mt-20 border-t border-default">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Logo & Info */}
          <div className="space-y-4">
            <img
              src={
                resolvedTheme === "dark"
                  ? "/images/Creativoxa-White-minn.webp"
                  : "/images/creativoxa-logo-645-x-160.png"
              }
              alt="Creativoxa Logo"
              className="h-10 w-auto object-contain"
            />
            <p className="text-muted text-sm leading-relaxed">
              The signal in the noise. <br />
              Architects of your digital future.
            </p>
            <p className="text-muted text-[10px] uppercase tracking-[0.2em] font-semibold opacity-70">
              GSTIN: 19EXRPP1056D1Z5
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="text-muted space-y-3 text-sm">
              <li>
                <Link href="/Services/web-design-development" className="hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/Services/Digital-Marketing" className="hover:text-primary transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/Services/Videography-Services" className="hover:text-primary transition-colors">
                  Videography
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <div className="text-muted space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-primary w-4"></i>
                Siliguri, West Bengal, India
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-primary w-4"></i>
                +91 76795 87581
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-envelope text-primary w-4"></i>
                contact@creativoxa.in
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-muted text-xs mb-4">Get the latest digital trends in your inbox.</p>
            <div className="flex group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-2 rounded-l-xl bg-background border border-default border-r-0 text-foreground focus:outline-none focus:border-primary transition-colors text-sm" 
              />
              <button className="btn-primary !rounded-l-none !py-2 px-5 shrink-0">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-default flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-xs">
          <p>&copy; {new Date().getFullYear()} Creativoxa. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-primary">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}