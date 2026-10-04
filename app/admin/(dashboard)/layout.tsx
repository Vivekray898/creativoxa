import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: {
    template: "%s — Creativoxa Admin",
    default: "Creativoxa Admin",
  },
  robots: { index: false, follow: false },
};

/**
 * Server-side gate for every /admin route.
 *
 * The proxy already redirects visitors without a session; this layout is the
 * second layer — it re-verifies the session *and* the staff role, so an
 * authenticated non-staff account still cannot see a single screen. It also
 * supplies the dashboard chrome.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell user={{ email: user.email, fullName: user.fullName, role: user.role }}>
      {children}
    </AdminShell>
  );
}
