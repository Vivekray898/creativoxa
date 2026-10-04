import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { EmptyState, PageHeader, Panel, StatusPill, adminButton } from "@/components/admin/ui";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { EnquiryRow } from "@/types/cms";
import { RESOURCE_SUMMARY } from "@/lib/cms/resources";

export const metadata = { title: "Dashboard" };

type Stat = { label: string; value: number; href: string; icon: IconName };

const STATUS_TONES: Record<string, "warning" | "primary" | "success" | "muted"> = {
  new: "warning",
  contacted: "primary",
  qualified: "success",
  closed: "muted",
};

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "—";
  }
}

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  // Counts across several tables by runtime name; the typed client can't
  // express that, so the generic client type is used here.
  const supabase = (await createSupabaseServerClient()) as unknown as SupabaseClient;

  const [enquiryCounts, recent, ...resources] = await Promise.all([
    supabase.from("enquiries").select("status"),
    supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(6),
    ...RESOURCE_SUMMARY.map((resource) =>
      supabase.from(resource.table).select("id", { count: "exact", head: true }).eq("published", true)
    ),
  ]);

  const statuses = (enquiryCounts.data ?? []) as { status: string }[];
  const stats: Stat[] = [
    {
      label: "Total enquiries",
      value: statuses.length,
      href: "/admin/enquiries",
      icon: "mail",
    },
    {
      label: "New enquiries",
      value: statuses.filter((row) => row.status === "new").length,
      href: "/admin/enquiries?status=new",
      icon: "inbox",
    },
    ...resources.map((resource, i) => ({
      label: `Published ${RESOURCE_SUMMARY[i].label.toLowerCase()}`,
      value: resource.count ?? 0,
      href: RESOURCE_SUMMARY[i].href,
      icon: RESOURCE_SUMMARY[i].icon,
    })),
  ];

  const recentEnquiries = (recent.data ?? []) as EnquiryRow[];

  return (
    <>
      <PageHeader
        title={`Welcome${user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}`}
        description="Everything on the public site is managed from here — content, pages, navigation, media and enquiries."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-line bg-background p-4 transition-colors hover:border-line-strong"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-muted transition-colors group-hover:text-primary">
                <Icon name={stat.icon} className="h-4 w-4" />
              </span>
              <Icon
                name="chevronRight"
                className="h-3.5 w-3.5 text-faint opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-0.5 text-xs font-medium text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Panel
          title="Recent enquiries"
          description="The latest messages from the website contact forms."
          actions={
            <Link href="/admin/enquiries" className={adminButton.quiet}>
              View all
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {recentEnquiries.length === 0 ? (
            <EmptyState
              icon="inbox"
              title="No enquiries yet"
              description="Form submissions appear here the moment they arrive."
            />
          ) : (
            <ul className="divide-y divide-line">
              {recentEnquiries.map((enquiry) => (
                <li key={enquiry.id} className="py-3 first:pt-0 last:pb-0">
                  <Link href={`/admin/enquiries/${enquiry.id}`} className="group flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {enquiry.name}
                        {enquiry.business ? (
                          <span className="ml-2 text-xs font-normal text-muted">{enquiry.business}</span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {enquiry.email}
                        {enquiry.service ? ` · ${enquiry.service}` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <StatusPill tone={STATUS_TONES[enquiry.status] ?? "muted"}>{enquiry.status}</StatusPill>
                      <span className="text-[11px] text-faint">{formatDate(enquiry.created_at)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
