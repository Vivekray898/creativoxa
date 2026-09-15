// Content types shaped so they can later be migrated to a CMS
// (Sanity / Payload / Supabase) without restructuring pages.

export interface ServiceItem {
  name: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
  services: ServiceItem[];
}

export interface ServicePageData {
  slug: string;
  title: string;
  shortTitle: string;
  categoryLabel: string;
  excerpt: string;
  heroHeadline: string;
  heroSubline: string;
  problem: { title: string; body: string };
  whatWeDo: { title: string; body: string }[];
  howItWorks: { step: string; title: string; body: string }[];
  deliverables: string[];
  whoItsFor: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export interface Project {
  slug: string;
  name: string;
  industry: string;
  services: string[];
  description: string;
  url: string;
  screenshot: string;
  // Optional now — structured for real case studies later.
  overview?: string;
  challenge?: string;
  strategy?: string;
  results?: string[];
}

export interface Industry {
  name: string;
  note: string;
}

export interface Faq {
  q: string;
  a: string;
}
