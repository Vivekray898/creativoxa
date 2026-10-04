import { redirect } from "next/navigation";
import { ADMIN_NAV } from "@/components/admin/nav";

// /admin itself is just a friendly redirect — the dashboard is the real home.
export default function AdminIndexPage() {
  const first = ADMIN_NAV[0]?.items[0]?.href ?? "/admin/dashboard";
  redirect(first);
}
