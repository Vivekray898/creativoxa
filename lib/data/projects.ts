import type { Project } from "@/types/content";

// Real client projects with live URLs. Case-study narrative fields
// (challenge / strategy / results) are intentionally optional until
// verified content exists.
export const projects: Project[] = [
  {
    slug: "safar-tour",
    name: "Safar Tour",
    industry: "Tourism",
    services: ["Website", "Booking System", "SEO"],
    description:
      "A tour operator's website with enquiry-focused destination pages and a simple booking journey.",
    url: "https://safartour.in/",
    screenshot: "/work/safartour.png",
  },
  {
    slug: "sana-clothing",
    name: "Sana Clothing",
    industry: "E-commerce",
    services: ["Website", "E-commerce"],
    description:
      "An online clothing store with a clean catalogue and a checkout path built for mobile shoppers.",
    url: "https://sanaclothing.com/",
    screenshot: "/work/sana.png",
  },
  {
    slug: "markqent",
    name: "Markqent",
    industry: "B2B Services",
    services: ["Website", "Marketing"],
    description:
      "A corporate website that presents services clearly and routes visitor interest into enquiry channels.",
    url: "https://markqent.com/",
    screenshot: "/work/markqent.png",
  },
  {
    slug: "spice-lounge",
    name: "Spice Lounge",
    industry: "Hospitality",
    services: ["Website", "Local Presence"],
    description:
      "A restaurant website covering menu, reservations and location, tuned for local search visibility.",
    url: "https://spice-lounge.eu/",
    screenshot: "/work/spice.png",
  },
  {
    slug: "greenace",
    name: "GreenAce",
    industry: "Real Estate",
    services: ["Landing Page", "Lead Generation"],
    description:
      "A property developer's lead-generation site with project pages and a short enquiry form.",
    url: "https://greenacedeveloper.com/",
    screenshot: "/work/greenace.png",
  },
  {
    slug: "loanzaar",
    name: "Loanzaar",
    industry: "Financial Services",
    services: ["Website", "Lead Generation"],
    description:
      "A loan-services website that explains products simply and captures enquiries with clear next steps.",
    url: "https://loanzaar.in/",
    screenshot: "/work/loanzaar.png",
  },
  {
    slug: "raju-machines",
    name: "Raju Machines",
    industry: "Industrial Machinery",
    services: ["Website", "Catalogue"],
    description:
      "A machinery catalogue website that makes product ranges easy to browse and easy to enquire about.",
    url: "https://rmachinetool.com/",
    screenshot: "/work/rmachine.png",
  },
  {
    slug: "greater-wellness",
    name: "Greater Wellness Pilates",
    industry: "Health & Fitness",
    services: ["Website", "Local Presence"],
    description:
      "A pilates studio website with class information and booking-oriented enquiry paths.",
    url: "https://www.greaterwellnesspilates.au/",
    screenshot: "/work/greater.png",
  },
];
