import FieldControl from "@/components/admin/FieldControl";
import SubmitButton from "@/components/admin/SubmitButton";
import { Panel, adminButton } from "@/components/admin/ui";
import type { SettingsGroup } from "@/lib/cms/settings";

/**
 * Renders a settings screen from its field groups, using the same controls as
 * the resource forms. Content only — layout and design stay in code.
 */
export default function SettingsForm({
  groups,
  values,
  action,
  submitLabel,
  note,
}: {
  groups: SettingsGroup[];
  values: Record<string, unknown>;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  note?: string;
}) {
  return (
    <form action={action} className="space-y-5">
      {groups.map((group) => (
        <Panel key={group.title} title={group.title} description={group.description}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {group.fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.wide || field.type === "boolean" || field.type === "media" || field.type === "markdown"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <FieldControl field={field} value={values[field.name] ?? null} />
              </div>
            ))}
          </div>
        </Panel>
      ))}

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-background/95 px-4 py-3 backdrop-blur">
        <SubmitButton className={adminButton.primary}>{submitLabel}</SubmitButton>
        <p className="text-xs text-muted">
          {note ?? "Saving updates the live site immediately."}
        </p>
      </div>
    </form>
  );
}
