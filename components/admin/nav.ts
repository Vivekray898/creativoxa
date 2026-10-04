import type { IconName } from "@/components/ui/Icon";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: IconName;
  /** Only shown to users with this role (omitted = everyone with access). */
  adminOnly?: boolean;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

/**
 * The dashboard's information architecture.
 *
 * New sections move in here, never into the sidebar component itself, so the
 * navigation and the route tree stay in step.
 */
export const ADMIN_NAV: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: "chart" }],
  },
  {
    label: "Content",
    items: [
      { label: "Services", href: "/admin/services", icon: "layers" },
      { label: "Service categories", href: "/admin/service-categories", icon: "funnel" },
      { label: "Insights", href: "/admin/insights", icon: "bulb" },
      { label: "Case studies", href: "/admin/case-studies", icon: "briefcase" },
      { label: "Industries", href: "/admin/industries", icon: "building" },
      { label: "FAQs", href: "/admin/faqs", icon: "inbox" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "heart" },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "Homepage", href: "/admin/pages/home", icon: "paint" },
      { label: "Homepage sections", href: "/admin/pages/sections", icon: "layers" },
      { label: "Navigation", href: "/admin/navigation", icon: "menu" },
    ],
  },
  {
    label: "Website",
    items: [
      { label: "Media", href: "/admin/media", icon: "monitor" },
      { label: "Enquiries", href: "/admin/enquiries", icon: "mail" },
      { label: "Settings", href: "/admin/settings", icon: "target", adminOnly: true },
    ],
  },
];

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
