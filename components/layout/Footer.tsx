import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { cityLine, copyrightText, mailHref, socialEntries, telHref } from "@/lib/contact";
import type { NavigationItemRow, SiteSettingsRow } from "@/types/cms";

/**
 * Static index of the sections that aren't in the CMS navigation.
 *
 * The CMS navigation is editorial and can omit a page — and when it did, /tools
 * had zero internal links anywhere on the site, which is enough for a crawler to
 * treat it as unreachable. This block is intentionally hard-coded so those pages
 * are always linked from every page.
 */
const SITE_INDEX: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Free tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type FooterProps = {
  settings: SiteSettingsRow;
  navigation: {
    services: NavigationItemRow[];
    company: NavigationItemRow[];
    legal: NavigationItemRow[];
  };
};

export default function Footer({ settings, navigation }: FooterProps) {
  const email = mailHref(settings.email);
  const phone = telHref(settings.phone);
  const socials = socialEntries(settings.socials);
  const location = cityLine(settings);

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="text-lg font-bold tracking-tight text-foreground">
              {settings.company_name}
              <span className="text-primary">.</span>
            </p>
            {settings.footer_description ? (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {settings.footer_description}
              </p>
            ) : null}
            {location ? <p className="mt-6 text-xs text-faint">{location}, India</p> : null}
          </div>

          {/* Services */}
          {navigation.services.length > 0 ? (
            <nav className="lg:col-span-2" aria-label="Services">
              <p className="col-label mb-4">Services</p>
              <ul className="space-y-2.5">
                {navigation.services.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {/* Company */}
          {navigation.company.length > 0 ? (
            <nav className="lg:col-span-2" aria-label="Company">
              <p className="col-label mb-4">Company</p>
              <ul className="space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="col-label mb-4">Contact</p>
            <ul className="space-y-2.5">
              {email && settings.email ? (
                <li>
                  <a href={email} className="text-sm text-muted transition-colors hover:text-foreground">
                    {settings.email}
                  </a>
                </li>
              ) : null}
              {phone && settings.phone ? (
                <li>
                  <a href={phone} className="text-sm text-muted transition-colors hover:text-foreground">
                    {settings.phone}
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-foreground">
                  Enquiry form
                </Link>
              </li>
            </ul>

            {socials.length > 0 ? (
              <>
                <p className="col-label mb-4 mt-8">Social</p>
                <ul className="space-y-2.5">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {social.name} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {/* Legal */}
          {navigation.legal.length > 0 ? (
            <nav className="lg:col-span-2" aria-label="Legal">
              <p className="col-label mb-4">Legal</p>
              <ul className="space-y-2.5">
                {navigation.legal.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        {/* Sitemap-style index. Present on every page, so every top-level page is
            at most one click from any other page. */}
        <nav className="mt-12 border-t border-line pt-8" aria-label="Site index">
          <p className="col-label mb-4">Explore</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
            {SITE_INDEX.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Final CTA strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Have a project in mind?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:text-primary-hover">
              Tell us what you&apos;re working on
            </Link>
            .
          </p>
          <Link href="/contact" className="btn btn-primary shrink-0 px-5 text-sm">
            Start a Project
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{copyrightText(settings.copyright_text)}</p>
          {settings.gstin ? <p>GSTIN: {settings.gstin}</p> : null}
        </div>
      </Container>
    </footer>
  );
}
