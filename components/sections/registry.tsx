import type { ReactNode } from "react";

import AboutTeaser from "./AboutTeaser";
import Contact from "./Contact";
import Ecosystem from "./Ecosystem";
import FinalCTA from "./FinalCTA";
import Hero from "./Hero";
import Industries from "./Industries";
import InsightsPreview from "./InsightsPreview";
import Outcomes from "./Outcomes";
import Problems from "./Problems";
import Process from "./Process";
import Services from "./Services";
import Testimonials from "./Testimonials";
import TrustStrip from "./TrustStrip";
import WaysToWork from "./WaysToWork";
import WhatWeDo from "./WhatWeDo";
import WhyCreativoxa from "./WhyCreativoxa";
import Work from "./Work";
import type { HomeSectionProps } from "./types";

/**
 * Maps a `page_sections.section_key` to the component that renders it.
 *
 * Admins can enable, disable and reorder these from the dashboard; a key that
 * no longer exists in code is skipped rather than rendering a broken section.
 */
const REGISTRY: Record<string, (props: HomeSectionProps) => ReactNode> = {
  hero: (props) => <Hero {...props} />,
  "trust-strip": (props) => <TrustStrip {...props} />,
  "what-we-do": (props) => <WhatWeDo {...props} />,
  services: (props) => <Services {...props} />,
  problems: (props) => <Problems {...props} />,
  outcomes: (props) => <Outcomes {...props} />,
  work: (props) => <Work {...props} />,
  "ways-to-work": (props) => <WaysToWork {...props} />,
  process: (props) => <Process {...props} />,
  why: (props) => <WhyCreativoxa {...props} />,
  ecosystem: (props) => <Ecosystem {...props} />,
  industries: (props) => <Industries {...props} />,
  testimonials: (props) => <Testimonials {...props} />,
  insights: (props) => <InsightsPreview {...props} />,
  "about-teaser": (props) => <AboutTeaser {...props} />,
  "final-cta": (props) => <FinalCTA {...props} />,
  contact: (props) => <Contact {...props} />,
};

export const SECTION_KEYS = Object.keys(REGISTRY);

export function renderHomeSection(key: string, props: HomeSectionProps): ReactNode {
  const render = REGISTRY[key];
  if (!render) return null;
  return render(props);
}
