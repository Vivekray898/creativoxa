import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/next';

// Components
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactFormPanel from "@/components/ContactFormPanel";
import FloatingSocialBar from "@/components/FloatingSocialBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["400", "500", "700", "800"], 
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "Creativoxa - Modern Digital Agency",
  description: "Architects of your digital future with data-driven strategies.",
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

        {/* 📊 Facebook Pixel */}
        <Script id="fb-pixel-1" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '858693652813158');fbq('track', 'PageView');`}
        </Script>
      </head>

      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        
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

      </body>
    </html>
  );
}