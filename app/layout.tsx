import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactFormPanel from "@/components/ContactFormPanel";
import TrackingScripts from "@/components/TrackingScripts";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { site } from "@/lib/site";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display face for headlines — geometric, confident, pairs with Inter body.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital Marketing & Growth Partner`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "digital marketing agency",
    "SEO services",
    "Google Ads management",
    "Meta Ads agency",
    "social media management",
    "website development",
    "local SEO",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Digital Marketing & Growth Partner`,
    description: site.description,
    images: [{ url: "/images/creativoxa-logo-645-x-160.png", width: 645, height: 160, alt: `${site.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital Marketing & Growth Partner`,
    description: site.description,
    images: ["/images/creativoxa-logo-645-x-160.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        <TrackingScripts />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <ThemeProviderWrapper>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <WhatsAppButton />
          <ContactFormPanel />
          <Footer />
        </ThemeProviderWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
