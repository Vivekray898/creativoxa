import type { Faq, Industry } from "@/types/content";

export const outcomes = [
  {
    title: "Get found",
    body: "Show up when people search for what you offer — in search results, on maps and across the platforms buyers use.",
    icon: "search" as const,
  },
  {
    title: "Get attention",
    body: "Reach the right audiences through focused advertising and content, instead of shouting into the void.",
    icon: "megaphone" as const,
  },
  {
    title: "Build trust",
    body: "Look like the established, professional business you are — everywhere a customer might check.",
    icon: "shield" as const,
  },
  {
    title: "Generate enquiries",
    body: "Turn traffic and attention into real conversations through clear offers and effortless contact paths.",
    icon: "inbox" as const,
  },
  {
    title: "Keep growing",
    body: "Manage, measure and improve continuously — digital growth is a system, not a one-time project.",
    icon: "chart" as const,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    body: "We start by understanding your business, your customers and what growth realistically looks like for you.",
  },
  {
    step: "02",
    title: "Plan",
    body: "We build a practical digital strategy — what we'll do, in what order, and why it makes sense for your goals.",
  },
  {
    step: "03",
    title: "Build",
    body: "Campaigns, content, pages and profiles are created and set up properly, with tracking in place from the start.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Everything goes live as planned — and we watch the first results closely to correct fast where needed.",
  },
  {
    step: "05",
    title: "Optimize",
    body: "We measure what matters, cut what doesn't work, and put more behind what does.",
  },
  {
    step: "06",
    title: "Grow",
    body: "Over months, the pieces compound: visibility, trust and enquiries build on each other into steady growth.",
  },
];

export const whyPoints = [
  {
    title: "One digital partner",
    body: "Instead of juggling separate vendors for ads, website, social and listings, you manage one relationship — with a single plan and one point of accountability.",
  },
  {
    title: "Strategy before execution",
    body: "Every campaign and post should serve a business objective. We decide what a piece of work is for before we make it.",
  },
  {
    title: "Practical marketing",
    body: "Clear explanations, sensible budgets and useful execution. If we can't explain why something matters for your business, we don't do it.",
  },
  {
    title: "Long-term support",
    body: "We treat digital marketing as an ongoing system that improves with attention — not a one-time project that's forgotten at handover.",
  },
  {
    title: "Flexible for growing businesses",
    body: "Start with the work that matters most now, and expand into more channels as the business grows. No lock-ins designed to trap you.",
  },
];

export const industries: Industry[] = [
  { name: "Local Businesses", note: "Shops, services and showrooms that live on nearby customers." },
  { name: "Retail", note: "Stores that need visibility online and footfall offline." },
  { name: "Healthcare", note: "Clinics and practices where trust decides the first call." },
  { name: "Education", note: "Coaching centres and institutions competing for admissions." },
  { name: "Hospitality", note: "Hotels, restaurants and cafés that sell experience." },
  { name: "Professional Services", note: "Consultants, agencies and firms that sell expertise." },
  { name: "Real Estate", note: "Developers and agents with long decision cycles and high-value leads." },
  { name: "E-commerce", note: "Stores that need traffic, product visibility and repeat buyers." },
  { name: "Manufacturing & Trade", note: "Suppliers who sell through IndiaMART and industry channels." },
  { name: "Startups & Growing Businesses", note: "Teams that need to build presence without waste." },
];

export const homepageFaqs: Faq[] = [
  {
    q: "What does Creativoxa actually do?",
    a: "We help businesses build and manage their digital presence: advertising on Google and Meta, SEO and local search, social media, websites, and ongoing digital management. The common thread is that everything is planned around business goals, not isolated deliverables.",
  },
  {
    q: "How do we start working together?",
    a: "Send an enquiry or message us directly. We start with a conversation about your business and goals, then come back with a practical recommendation — what we'd do first, what it costs, and what to expect. No obligation attached.",
  },
  {
    q: "What size of business do you work with?",
    a: "Mostly small and growing businesses — local companies, retailers, service firms and manufacturers — who need professional digital marketing without enterprise-agency complexity or pricing.",
  },
  {
    q: "Do you work with businesses outside Siliguri?",
    a: "Yes. We're based in Siliguri and work with businesses across India and, in some cases, internationally. Location matters less than fit — a clear goal and a willingness to work as partners.",
  },
  {
    q: "How much do your services cost?",
    a: "It depends on scope — channels, volume and goals. After a short discovery conversation we quote a fixed monthly fee or a fixed project price, so you know the full cost before committing. No hidden add-ons.",
  },
  {
    q: "Am I locked into a long contract?",
    a: "No. Our ongoing services work on a rolling monthly basis with a 30-day notice period. We'd rather earn the next month than trap you in a year.",
  },
];
