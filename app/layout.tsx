import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

// Components
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactFormPanel from "@/components/ContactFormPanel";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import TrackingScripts from "@/components/TrackingScripts"; // ✅ 1. Imported your tracking scripts

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["400", "500", "700", "800"], 
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "Creativoxa - Modern Digital Agency",
  description: "Architects of your digital future with data-driven strategies.",
  // ✅ 2. Added Microsoft and Monetag verifications here
  other: {
    'msvalidate.01': 'B6B429E810881CB55DFFDC57DD0939EA',
    'monetag': '76f5ba6b8e8851330f2d37f20152421c',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🎨 Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        {/* (Note: FB Pixel was removed from here because it's now handled by TrackingScripts) */}
      </head>

      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        
        {/* ✅ 3. Inject tracking scripts at the top of the body */}
        <TrackingScripts />

        {/* ✅ ONLY this wrapper */}
        <ThemeProviderWrapper>

          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          {/* WhatsApp */}
          <a 
            href="https://api.whatsapp.com/send?phone=917679587581&text=Hello!%20I'm%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-[115] bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300"
          >
            <i className="fab fa-whatsapp text-4xl"></i>
          </a>

          <ContactFormPanel />
          <FloatingSocialBar />
          <Footer />

        </ThemeProviderWrapper>

        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}