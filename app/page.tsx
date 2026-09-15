import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Services from "@/components/sections/Services";
import Outcomes from "@/components/sections/Outcomes";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import WhyCreativoxa from "@/components/sections/WhyCreativoxa";
import Ecosystem from "@/components/sections/Ecosystem";
import Industries from "@/components/sections/Industries";
import InsightsPreview from "@/components/sections/InsightsPreview";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import { site } from "@/lib/site";

// Regenerate the homepage hourly so the insights preview picks up new posts.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${site.name} — Digital Marketing & Growth Partner`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <Services />
      <Outcomes />
      <Work />
      <Process />
      <WhyCreativoxa />
      <Ecosystem />
      <Industries />
      <InsightsPreview />
      <AboutTeaser />
      <FinalCTA />
      <Contact />
    </>
  );
}
