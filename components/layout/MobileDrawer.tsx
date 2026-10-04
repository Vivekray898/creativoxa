"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/Icon";
import type { NavigationItemRow } from "@/types/cms";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  links: NavigationItemRow[];
  services: NavigationItemRow[];
};

function Wordmark() {
  return (
    <span className="text-lg font-bold tracking-tight text-foreground">
      Creativoxa<span className="text-primary">.</span>
    </span>
  );
}

/**
 * The mobile navigation drawer, portaled to <body> so its `position: fixed` is
 * relative to the viewport rather than to the sticky <header>, and so it opens
 * at the top of the page however far the user has scrolled.
 *
 * This lives in its own file and is loaded with `next/dynamic` from Header.tsx
 * because it is unreachable until the hamburger is tapped: it is `lg:hidden`,
 * it renders nothing while closed, and Header only mounts it once the menu is
 * actually opened. Keeping it in the main Header put `react-dom` (for
 * createPortal), the icon set and ~90 lines of JSX in the critical bundle of
 * every page on the site, where it does nothing.
 *
 * Rendered only after mount, so `document.body` is guaranteed to exist.
 */
export default function MobileDrawer({ open, onClose, links, services }: MobileDrawerProps) {
  const itemLink = (item: NavigationItemRow) =>
    item.open_in_new_tab ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return createPortal(
    <div
      className={`fixed inset-0 z-[60] overflow-hidden lg:hidden ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background p-6 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Wordmark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-foreground"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col" aria-label="Mobile">
          {services.length > 0 ? (
            <>
              <p className="col-label mb-2">Services</p>
              <div className="mb-6 flex flex-col">
                {services.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex min-h-[50px] items-center rounded-lg px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                    {...itemLink(item)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-1 rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                >
                  All services →
                </Link>
              </div>
            </>
          ) : null}

          <div className="border-t border-line pt-4">
            {links.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-lg font-semibold text-foreground"
                {...itemLink(item)}
              >
                {item.label}
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
  );
}