import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

// Server-rendered building blocks shared by every admin screen. They reuse the
// public design tokens, so the dashboard looks like the same product.

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <div className="mb-6">
      {breadcrumb && breadcrumb.length > 0 ? (
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs text-faint">
          {breadcrumb.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-foreground">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-muted">{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 ? <span aria-hidden="true">/</span> : null}
            </span>
          ))}
        </nav>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

export function Panel({
  children,
  className = "",
  title,
  description,
  actions,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={`rounded-xl border border-line bg-background ${className}`}>
      {title ? (
        <header className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
            {description ? <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p> : null}
          </div>
          {actions}
        </header>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

/** Inline feedback for `?saved=` / `?error=` redirects from server actions. */
export function Notice({ saved, error }: { saved?: string; error?: string }) {
  if (!saved && !error) return null;

  const isError = Boolean(error);
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      }`}
    >
      <Icon name={isError ? "alert" : "check"} className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="leading-relaxed">{error || saved}</p>
    </div>
  );
}

export function StatusPill({
  tone = "muted",
  children,
}: {
  tone?: "muted" | "success" | "warning" | "primary";
  children: ReactNode;
}) {
  const tones = {
    muted: "bg-surface-2 text-muted",
    success: "bg-tint-mint text-mint",
    warning: "bg-tint-amber text-amber",
    primary: "bg-primary-soft text-primary",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon = "inbox",
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: IconName;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-14 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-muted">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
      {description ? (
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-background px-4 py-3">
      {children}
    </div>
  );
}

export function IconLink({
  href,
  icon,
  children,
  className = "",
}: {
  href: string;
  icon: IconName;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-foreground ${className}`}
    >
      <Icon name={icon} className="h-3.5 w-3.5" />
      {children}
    </Link>
  );
}

/** Button/link styling shared by admin forms and actions. */
export const adminButton = {
  primary:
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60",
  secondary:
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-foreground transition-colors hover:border-line-strong",
  danger:
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/40 px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400",
  quiet:
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-line px-3 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-foreground",
};

export const adminInput =
  "w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary";

export const adminLabel = "mb-1.5 block text-xs font-semibold uppercase tracking-widest text-faint";
