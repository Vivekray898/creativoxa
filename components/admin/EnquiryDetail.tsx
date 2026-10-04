import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/ui/Icon";
import FieldControl from "@/components/admin/FieldControl";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmAction from "@/components/admin/ConfirmAction";
import { Notice, PageHeader, Panel, adminButton } from "@/components/admin/ui";
import { requireStaff } from "@/lib/cms/actions/shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteEnquiry, updateEnquiry } from "@/lib/cms/actions/settings";
import { ENQUIRY_STATUSES, type EnquiryRow } from "@/types/cms";
import type { FieldDef } from "@/lib/cms/resources";

// One enquiry, full detail, with the status + internal-notes workflow.

const STATUS_FIELD: FieldDef = {
  name: "status",
  label: "Status",
  type: "select",
  options: ENQUIRY_STATUSES,
};

const NOTES_FIELD: FieldDef = {
  name: "notes",
  label: "Internal notes",
  type: "textarea",
  wide: true,
  help: "Visible to the team only — never shown on the website.",
};

export default async function EnquiryDetail({
  id,
  searchParams,
}: {
  id: string;
  searchParams: { saved?: string; error?: string };
}) {
  await requireStaff();
  const sp = searchParams;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("enquiries").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const enquiry = data as EnquiryRow;

  return (
    <>
      <PageHeader
        title={enquiry.name}
        description={`Received ${new Date(enquiry.created_at).toLocaleString()}`}
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Enquiries", href: "/admin/enquiries" },
          { label: enquiry.name },
        ]}
        actions={
          <Link href="/admin/enquiries" className={adminButton.secondary}>
            <Icon name="chevronLeft" className="h-4 w-4" />
            Back to enquiries
          </Link>
        }
      />

      <Notice saved={sp.saved} error={sp.error} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Panel title="Message">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {enquiry.message ?? "—"}
            </p>
          </Panel>

          <form action={updateEnquiry}>
            <input type="hidden" name="__id" value={enquiry.id} />
            <Panel title="Workflow" description="Track where this lead is in your pipeline.">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-3">
                  <FieldControl field={STATUS_FIELD} value={enquiry.status} />
                </div>
                <div className="md:col-span-3">
                  <FieldControl field={NOTES_FIELD} value={enquiry.notes} />
                </div>
              </div>
              <div className="mt-5">
                <SubmitButton className={adminButton.primary}>Save changes</SubmitButton>
              </div>
            </Panel>
          </form>
        </div>

        <div className="space-y-5">
          <Panel title="Contact">
            <dl className="space-y-3 text-sm">
              {[
                ["Email", enquiry.email, `mailto:${enquiry.email}`],
                ["Phone", enquiry.phone, enquiry.phone ? `tel:${enquiry.phone}` : null],
                ["Business", enquiry.business, null],
                ["Website", enquiry.website, enquiry.website],
                ["Service", enquiry.service, null],
                ["Budget", enquiry.budget, null],
                ["Form", enquiry.form_source, null],
              ].map(([label, value, href]) => (
                <div key={label as string}>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-faint">
                    {label}
                  </dt>
                  <dd className="mt-0.5 break-words text-sm">
                    {value ? (
                      href ? (
                        <a
                          href={href as string}
                          target={String(href).startsWith("http") ? "_blank" : undefined}
                          rel={String(href).startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-primary hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-foreground">{value}</span>
                      )
                    ) : (
                      <span className="text-faint">—</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel title="Danger zone">
            <p className="mb-3 text-xs leading-relaxed text-muted">
              Permanently removes this enquiry and its notes.
            </p>
            <ConfirmAction
              action={deleteEnquiry}
              fields={{ __id: enquiry.id }}
              label="Delete enquiry"
              message="Permanently?"
            />
          </Panel>
        </div>
      </div>
    </>
  );
}
