"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "@/components/common/ThemeToggle";
import Icon from "@/components/ui/Icon";

const serviceMenu = [
  { name: "Digital Marketing", desc: "One coordinated plan across channels", href: "/services/digital-marketing" },
  { name: "Google Ads", desc: "Search campaigns built around enquiries", href: "/services/google-ads" },
  { name: "Meta Ads", desc: "Facebook & Instagram advertising", href: "/services/meta-ads" },
  { name: "SEO", desc: "Practical, honest search optimization", href: "/services/seo" },
  { name: "Social Media", desc: "Management, content and publishing", href: "/services/social-media" },
  { name: "Web Development", desc: "Fast, conversion-focused websites", href: "/services/web-development" },
  { name: "Local Marketing", desc: "Google Business Profile, maps & IndiaMART", href: "/services/local-marketing" },
];

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

function Wordmark() {
  return (
    <span className="text-lg font-bold tracking-tight text-foreground">
      Creativoxa<span className="text-primary">.</span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Portal target only exists on the client. useSyncExternalStore gives the
  // hydration-safe "mounted" flag without a setState-in-effect.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Close menus when navigation happens.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
    if (servicesOpen) setServicesOpen(false);
  }

  // Scroll state.
  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes menus.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-background/90 backdrop-blur-md"
            : "border-transparent bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--container)] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Creativoxa home" className="shrink-0">
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/services") ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                Services
                <Icon
                  name="chevronDown"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  servicesOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                }`}
              >
                <div className="card overflow-hidden p-2 shadow-xl shadow-black/5">
                  {serviceMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                        <span className="block text-xs text-muted">{item.desc}</span>
                      </span>
                      <Icon
                        name="arrowRight"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-line px-3 py-2.5">
                    <Link
                      href="/services"
                      className="text-sm font-semibold text-primary hover:text-primary-hover"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary hidden h-10 px-5 text-sm md:inline-flex">
              Start a Project
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-foreground lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/*
        Mobile drawer is portaled to <body> so its `position: fixed` is
        relative to the viewport, not to the sticky <header> element.
        This ensures it opens at the top of the viewport regardless of
        how far the user has scrolled.
      */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[60] overflow-hidden lg:hidden ${
              mobileOpen ? "" : "pointer-events-none"
            }`}
            aria-hidden={!mobileOpen}
          >
            <div
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                mobileOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setMobileOpen(false)}
            />
            <div
              className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background p-6 shadow-2xl transition-transform duration-300 ${
                mobileOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-foreground"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col" aria-label="Mobile">
                <p className="col-label mb-2">Services</p>
                <div className="mb-6 flex flex-col">
                  {serviceMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-[50px] items-center rounded-lg px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mt-1 rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                  >
                    All services →
                  </Link>
                </div>

                <div className="border-t border-line pt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-3 py-2.5 text-lg font-semibold text-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="mt-8 border-t border-line pt-6">
                <Link href="/contact" className="btn btn-primary w-full">
                  Start a Project
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}