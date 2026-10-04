"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/common/ThemeToggle";
import { ADMIN_NAV, isActivePath } from "@/components/admin/nav";
import { signOut } from "@/lib/cms/actions/auth";
import type { AdminRole } from "@/lib/auth";

type AdminShellProps = {
  children: ReactNode;
  user: { email: string; fullName: string | null; role: AdminRole };
};

function NavGroups({ role, onNavigate }: { role: AdminRole; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6" aria-label="Admin">
      {ADMIN_NAV.map((group) => {
        const items = group.items.filter((item) => !item.adminOnly || role === "admin");
        if (items.length === 0) return null;

        return (
          <div key={group.label}>
            <p className="col-label mb-2 px-3">{group.label}</p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary-soft text-primary"
                          : "text-muted hover:bg-surface-2 hover:text-foreground"
                      }`}
                    >
                      <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children, user }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes (links already close it; this
  // also covers redirects). Adjusting during render avoids the cascading
  // render that a setState-in-effect triggers.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-surface-2/40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-background">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-foreground lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="h-4 w-4" />
            </button>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-foreground">
                Creativoxa<span className="text-primary">.</span>
              </span>
              <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden text-xs font-medium text-muted transition-colors hover:text-foreground sm:inline"
            >
              View site ↗
            </Link>
            <ThemeToggle />
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-3 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                <Icon name="logout" className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[104rem] gap-8 px-4 py-6 sm:px-6 lg:py-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-20">
            <NavGroups role={user.role} />
            <div className="mt-8 rounded-xl border border-line bg-background p-3">
              <p className="truncate text-xs font-semibold text-foreground">
                {user.fullName || user.email}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-faint">{user.email}</p>
              <p className="mt-2 inline-flex rounded-md bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted">
                {user.role}
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Sidebar (mobile) */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs overflow-y-auto border-r border-line bg-background p-4">
            <NavGroups role={user.role} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
