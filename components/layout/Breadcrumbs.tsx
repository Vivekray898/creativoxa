import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; path: string };

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList JSON-LD.
 *
 * Both are rendered together on purpose: Google requires the breadcrumb to be
 * visible in the page content for the structured data to be valid, so these can
 * never be emitted separately.
 *
 * The final crumb is the current page, so it is rendered as plain text rather
 * than a link — a self-referencing link is noise for both crawlers and screen
 * reader users.
 */
export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-foreground">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-faint">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}