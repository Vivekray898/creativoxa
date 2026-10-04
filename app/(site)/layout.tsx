import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import LazyContactFormPanel from "@/components/layout/LazyContactFormPanel";
import { getFooterNavigation, getHeaderNavigation, getSiteSettings } from "@/lib/cms/queries";
import { JsonLd, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo";

// Layout-level content (company details, navigation) refreshes hourly; pages
// set their own, shorter windows where it matters.
export const revalidate = 3600;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, header, footer] = await Promise.all([
    getSiteSettings(),
    getHeaderNavigation(),
    getFooterNavigation(),
  ]);

  return (
    <>
      {/* Layout-level entity graph. `websiteSchema` and `localBusinessSchema`
          reference `#organization` by @id, so the three are published together. */}
      <JsonLd data={organizationSchema(settings)} />
      <JsonLd data={websiteSchema(settings)} />
      <JsonLd data={localBusinessSchema(settings)} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar links={header.links} services={header.services} />

      <main id="main-content" className="min-h-screen">
        {children}
      </main>

      <WhatsAppButton href={settings.whatsapp} />
      {/* Desktop-only, interaction-only, and it embeds a full copy of the
          enquiry form — see LazyContactFormPanel for why it is deferred. */}
      <LazyContactFormPanel />
      <Footer settings={settings} navigation={footer} />
    </>
  );
}
