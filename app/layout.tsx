import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import TrackingScripts from "@/components/TrackingScripts";
import ConsentProvider from "@/components/ads/ConsentProvider";
import ConsentModeDefault from "@/components/ads/ConsentModeDefault";
import CmpLoader from "@/components/ads/CmpLoader";
import { getSiteSettings } from "@/lib/cms/queries";
import { ADSENSE_CLIENT } from "@/lib/consent";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  // Preloaded on purpose. Measured: setting this to false did NOT stop the
  // browser fetching the file (@font-face still loads it at high priority), so
  // it saved no bandwidth — but it did push FCP from ~906ms to ~1208ms under
  // Lighthouse's throttled profile, because the browser then discovered it late
  // instead of alongside the parse. Keeping the preload.
  preload: true,
});

// Display face for headlines — geometric, confident, pairs with Inter body.
// `.display-xl` renders the LCP element, so this is the highest-leverage
// request on the page and is preloaded.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  // 600/700/800 is the complete set used by `.font-display` and `.display-xl`.
  // Anything heavier (font-black) is applied to the body face instead.
  weight: ["600", "700", "800"],
  preload: true,
});

// Adds `js` to <html> before first paint so the scroll-reveal animation only arms
// when JavaScript actually runs. Without it, `.reveal` stays visible by default
// and no-JS crawlers see real content instead of a page of opacity-0 sections.
const JS_FLAG_SCRIPT = `document.documentElement.classList.add('js')`;

// Site-wide metadata comes from the CMS (Site settings → SEO defaults), with
// the values in lib/site.ts as the fallback.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings.company_name || site.name;
  const title = settings.default_seo_title || `${companyName} — Digital Marketing & Growth Partner`;
  const description = settings.default_seo_description || settings.tagline || site.description;
  const ogImage = settings.og_image || "/images/creativoxa-logo-645-x-160.png";

  return {
    // Required so every relative canonical/OG URL in child routes resolves to
    // the canonical host rather than the deployment URL.
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${companyName}`,
    },
    description,
    keywords: [
      "digital marketing agency",
      "SEO services",
      "Google Ads management",
      "Meta Ads agency",
      "social media management",
      "website development",
      "local SEO",
    ],
    applicationName: companyName,
    authors: [{ name: companyName, url: site.url }],
    creator: companyName,
    publisher: companyName,
    alternates: {
      canonical: "/",
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: site.url,
      siteName: companyName,
      title,
      description,
      images: [{ url: ogImage, alt: `${companyName} logo` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // No `images` here: the root `opengraph-image.tsx` file convention supplies
      // the generated 1200x630 card automatically, and Twitter will not render
      // the 645x160 logo at all on a large card.
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: {
      // AdSense verification. Harmless when the placeholder id is in place.
      "google-adsense-account": ADSENSE_CLIENT,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }} />
        {/* Must run before any Google tag — renders the Consent Mode v2 default. */}
        <ConsentModeDefault />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        <ConsentProvider>
          <TrackingScripts />
          <CmpLoader />
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </ConsentProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}