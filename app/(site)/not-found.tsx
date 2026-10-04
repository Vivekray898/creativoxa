import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { site } from "@/lib/site";

// Rendered inside the site layout, which already publishes the entity graph, so
// only the meta robots directive is needed here. Next serves this with a real
// 404 status; adding `index: false` stops the 404 body from being indexed.
export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for is not available.",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Free tools" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            It may have been moved, or the link that brought you here may be out of date. Try one of
            these instead.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SUGGESTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="btn btn-outline">
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            Or email us at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-primary">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}