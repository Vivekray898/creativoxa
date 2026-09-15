import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

const serviceLinks = [
  { name: "Digital Marketing", href: "/services/digital-marketing" },
  { name: "Google Ads", href: "/services/google-ads" },
  { name: "Meta Ads", href: "/services/meta-ads" },
  { name: "SEO", href: "/services/seo" },
  { name: "Social Media", href: "/services/social-media" },
  { name: "Web Development", href: "/services/web-development" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

const connectLinks = [
  { name: site.socials.instagram.replace(/^https?:\/\//, ""), href: site.socials.instagram },
  { name: site.socials.facebook.replace(/^https?:\/\//, ""), href: site.socials.facebook },
  { name: "X (Twitter)", href: site.socials.x },
  { name: "Pinterest", href: site.socials.pinterest },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="text-lg font-bold tracking-tight text-foreground">
              Creativoxa<span className="text-primary">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Digital marketing and digital growth support for businesses — strategy, advertising,
              search, social and web, managed as one system.
            </p>
            <p className="mt-6 text-xs text-faint">
              Siliguri, West Bengal, India
            </p>
          </div>

          {/* Services */}
          <nav className="lg:col-span-2" aria-label="Services">
            <p className="col-label mb-4">Services</p>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav className="lg:col-span-2" aria-label="Company">
            <p className="col-label mb-4">Company</p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="col-label mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-muted transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="text-sm text-muted transition-colors hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-foreground">
                  Enquiry form
                </Link>
              </li>
            </ul>
            <p className="col-label mb-4 mt-8">Social</p>
            <ul className="space-y-2.5">
              {connectLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {l.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <nav className="lg:col-span-2" aria-label="Legal">
            <p className="col-label mb-4">Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Final CTA strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Have a project in mind?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:text-primary-hover">
              Tell us what you&apos;re working on
            </Link>
            .
          </p>
          <Link href="/contact" className="btn btn-primary h-10 shrink-0 px-5 text-sm">
            Start a Project
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Creativoxa. All rights reserved.</p>
          <p>GSTIN: {site.gstin}</p>
        </div>
      </Container>
    </footer>
  );
}
