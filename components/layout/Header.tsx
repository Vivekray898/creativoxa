"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useState } from "react";
import ThemeToggle from "@/components/common/ThemeToggle";
import Icon from "@/components/ui/Icon";
import type { NavigationItemRow } from "@/types/cms";

// Loaded only when the hamburger is first tapped, so `react-dom`'s createPortal
// and the drawer's markup stay out of every page's critical bundle.
const MobileDrawer = dynamic(() => import("@/components/layout/MobileDrawer"), {
  ssr: false,
});

type HeaderProps = {
  /** Main header links (Work, About, Insights, Contact…). */
  links: NavigationItemRow[];
  /** Items shown inside the Services dropdown. */
  services: NavigationItemRow[];
};

function Wordmark() {
  return (
    <span className="text-lg font-bold tracking-tight text-foreground">
      Creativoxa<span className="text-primary">.</span>
    </span>
  );
}

export default function Header({ links, services }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

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

  const itemLink = (item: NavigationItemRow) =>
    item.open_in_new_tab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

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
            {services.length > 0 ? (
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
                    {services.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
                        {...itemLink(item)}
                      >
                        <span>
                          <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                          {item.description ? (
                            <span className="block text-xs text-muted">{item.description}</span>
                          ) : null}
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
            ) : null}

            {links.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
                {...itemLink(item)}
              >
                {item.label}
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

      {/* The drawer is portaled to <body>; it mounts on first open. */}
      {mobileOpen ? (
        <MobileDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          links={links}
          services={services}
        />
      ) : null}
    </>
  );
}
