import Link from "next/link";
import FieldControl from "@/components/admin/FieldControl";
import SubmitButton from "@/components/admin/SubmitButton";
import { Panel, adminButton } from "@/components/admin/ui";
import type { FieldDef, ResourceDef } from "@/lib/cms/resources";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Record_ = Record<string, unknown>;

/** Options for `select` fields that point at another resource. */
async function loadOptions(source: FieldDef["optionsFrom"]): Promise<{ value: string; label: string }[]> {
  if (!source) return [];
  const supabase = await createSupabaseServerClient();

  if (source === "service_categories") {
    const { data } = await supabase
      .from("service_categories")
      .select("id, label")
      .order("sort_order");
    return (data ?? []).map((row) => ({ value: row.id, label: row.label }));
  }

  if (source === "services") {
    const { data } = await supabase.from("services").select("id, short_title").order("sort_order");
    return (data ?? []).map((row) => ({ value: row.id, label: row.short_title }));
  }

  const { data } = await supabase
    .from("navigation_items")
    .select("id, label, location")
    .order("location")
    .order("sort_order");
  return (data ?? []).map((row) => ({ value: row.id, label: `${row.label} — ${row.location}` }));
}

/**
 * Renders any resource's create/edit form from its field definitions, so a new
 * field is a one-line change in `lib/cms/resources.ts`.
 */
export default async function ResourceForm({
  def,
  record,
  action,
  submitLabel,
}: {
  def: ResourceDef;
  record?: Record_ | null;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const optionsByField = new Map<string, { value: string; label: string }[]>();

  for (const field of def.fields) {
    if (field.type === "select" && field.optionsFrom) {
      optionsByField.set(field.name, await loadOptions(field.optionsFrom));
    }
  }

  const publicHref =
    record?.slug && def.hasPublicPage
      ? def.key === "case_studies"
        ? `/work/${record.slug}`
        : `/services/${record.slug}`
      : null;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="__resource" value={def.key} />
      {record?.id ? <input type="hidden" name="__id" value={String(record.id)} /> : null}

      <Panel>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {def.fields.map((field) => (
            <div
              key={field.name}
              className={field.wide || field.type === "boolean" || field.type === "media" || field.type === "markdown" ? "md:col-span-2" : ""}
            >
              <FieldControl
                field={field}
                value={record?.[field.name] ?? null}
                options={optionsByField.get(field.name) ?? []}
              />
            </div>
          ))}
        </div>
      </Panel>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton className={adminButton.primary}>{submitLabel}</SubmitButton>
        <Link href={def.path} className={adminButton.secondary}>
          Cancel
        </Link>
        {publicHref ? (
          <a
            href={publicHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary hover:text-primary-hover"
          >
            View on site ↗
          </a>
        ) : null}
      </div>
    </form>
  );
}
