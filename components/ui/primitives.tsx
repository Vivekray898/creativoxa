import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container)] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  /** Chapter number, rendered as part of the eyebrow (e.g. "01"). */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow || index ? (
        <p className={`eyebrow mb-4 ${isCenter ? "justify-center" : ""}`}>
          {index ? <span className="text-faint">{index}</span> : null}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "outline";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const cls = `btn btn-${variant} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  children,
  href,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <svg
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </>
  );
  const cls = `group inline-flex items-center gap-2 py-2 -my-2 text-sm font-semibold text-foreground transition-colors hover:text-primary ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}


