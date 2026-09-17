import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Services from "@/components/sections/Services";
import Problems from "@/components/sections/Problems";
import Outcomes from "@/components/sections/Outcomes";
import Work from "@/components/sections/Work";
import WaysToWork from "@/components/sections/WaysToWork";
import Process from "@/components/sections/Process";
import WhyCreativoxa from "@/components/sections/WhyCreativoxa";
import Ecosystem from "@/components/sections/Ecosystem";
import Industries from "@/components/sections/Industries";
import InsightsPreview from "@/components/sections/InsightsPreview";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import { site } from "@/lib/site";

// Regenerate hourly so the live insights preview picks up new posts without
// a redeploy (its child component inherits this window).
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
      <Problems />
      <Outcomes />
      <Work />
      <WaysToWork />
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
