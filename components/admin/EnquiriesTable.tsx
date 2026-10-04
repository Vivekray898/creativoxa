import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ConfirmAction from "@/components/admin/ConfirmAction";
import { EmptyState, Notice, PageHeader, StatusPill, adminButton } from "@/components/admin/ui";
import { requireStaff } from "@/lib/cms/actions/shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteEnquiry } from "@/lib/cms/actions/settings";
import { ENQUIRY_STATUSES, type EnquiryRow, type EnquiryStatus } from "@/types/cms";

// The enquiry inbox: the existing enquiries table, now visible to the team.
// Read through the admin session; writes go through authorising server actions.

export const metadata = { title: "Enquiries" };

const STATUS_TONES: Record<EnquiryStatus, "success" | "warning" | "primary" | "muted"> = {
  new: "primary",
  contacted: "warning",
  qualified: "success",
  closed: "muted",
};

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: { status?: string; saved?: string; error?: string };
}) {
  await requireStaff();
  const statusFilter = ENQUIRY_STATUSES.some((option) => option.value === searchParams.status)
    ? (searchParams.status as EnquiryStatus)
    : undefined;

  const supabase = await createSupabaseServerClient();
  let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(200);
  if (statusFilter) query = query.eq("status", statusFilter);

  const { data, error } = await query;
  const rows = (data ?? []) as EnquiryRow[];

  const counts = ENQUIRY_STATUSES.map((option) => ({
    ...option,
    count: rows.filter((row) => row.status === option.value).length,
  }));
  const newCount = rows.filter((row) => row.status === "new").length;

  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Every submission from the website forms. Open one to read the full message and update its status."
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Enquiries" }]}
        actions={
          newCount > 0 ? (
            <StatusPill tone="primary">{newCount} new</StatusPill>
          ) : null
        }
      />

      <Notice saved={searchParams.saved} error={searchParams.error} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          href="/admin/enquiries"
          className={!statusFilter ? adminButton.primary : adminButton.quiet}
        >
          All ({rows.length})
        </Link>
        {counts.map((option) => (
          <Link
            key={option.value}
            href={`/admin/enquiries?status=${option.value}`}
            className={statusFilter === option.value ? adminButton.primary : adminButton.quiet}
          >
            {option.label} ({option.count})
          </Link>
        ))}
      </div>

      {error ? <Notice error={error.message} /> : null}

      {rows.length === 0 ? (
        <EmptyState
          icon="inbox"
          title={statusFilter ? `No ${statusFilter} enquiries` : "No enquiries yet"}
          description={
            statusFilter
              ? "Try another status filter, or view all enquiries."
              : "New submissions from the website forms will appear here."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2/60 text-left">
                  {["Name", "Service", "Message", "Received", "Status", ""].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-faint"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-line align-middle last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/enquiries/${row.id}`}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {row.name}
                      </Link>
                      <p className="text-xs text-muted">{row.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{row.service ?? "—"}</td>
                    <td className="max-w-[20rem] px-4 py-3">
                      <p className="truncate text-xs text-muted">{row.message ?? "—"}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                      {new Date(row.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill tone={STATUS_TONES[row.status]}>{row.status}</StatusPill>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/enquiries/${row.id}`} className={adminButton.quiet}>
                          <Icon name="eye" className="h-3.5 w-3.5" />
                          Open
                        </Link>
                        <ConfirmAction
                          action={deleteEnquiry}
                          fields={{ __id: row.id }}
                          label=""
                          icon="trash"
                          message="Delete?"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
