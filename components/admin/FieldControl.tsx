import ImageUploadField from "@/components/admin/ImageUploadField";
import { adminInput, adminLabel } from "@/components/admin/ui";
import type { FieldDef } from "@/lib/cms/resources";

// One implementation of every field type, shared by the resource forms and the
// settings screens. Adding a field type here makes it available everywhere.

export default function FieldControl({
  field,
  value,
  options = [],
}: {
  field: FieldDef;
  value: unknown;
  options?: { value: string; label: string }[];
}) {
  const describedBy = field.help ? `${field.name}-help` : undefined;

  const help = field.help ? (
    <p id={describedBy} className="mt-1.5 text-xs leading-relaxed text-faint">
      {field.help}
    </p>
  ) : null;

  if (field.type === "media") {
    return (
      <ImageUploadField
        name={field.name}
        label={field.label}
        help={field.help}
        defaultValue={value ? String(value) : ""}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-start gap-3 rounded-lg border border-line px-3.5 py-3">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={Boolean(value)}
          className="mt-0.5 h-4 w-4 rounded border-line text-primary accent-[var(--primary)]"
        />
        <span>
          <span className="block text-sm font-medium text-foreground">{field.label}</span>
          {field.help ? (
            <span className="mt-0.5 block text-xs leading-relaxed text-faint">{field.help}</span>
          ) : null}
        </span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label htmlFor={field.name} className={adminLabel}>
          {field.label}
        </label>
        <select
          id={field.name}
          name={field.name}
          defaultValue={value ? String(value) : ""}
          aria-describedby={describedBy}
          className={adminInput}
        >
          <option value="">— none —</option>
          {(field.options && field.options.length > 0 ? field.options : options).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {help}
      </div>
    );
  }

  const isTextarea = ["textarea", "blocks", "steps", "lines", "markdown"].includes(field.type);
  const shared = {
    id: field.name,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder,
    "aria-describedby": describedBy,
    className: `${adminInput} ${field.type === "markdown" ? "font-mono text-[13px] leading-relaxed" : ""}`,
  };

  return (
    <div>
      <label htmlFor={field.name} className={adminLabel}>
        {field.label}
        {field.required ? <span className="ml-1 text-primary">*</span> : null}
      </label>
      {isTextarea ? (
        <textarea
          {...shared}
          rows={field.type === "markdown" ? 18 : field.type === "textarea" ? 4 : 5}
          defaultValue={inputValue(field, value)}
        />
      ) : (
        <input
          {...shared}
          type={field.type === "number" ? "number" : field.type === "datetime" ? "datetime-local" : "text"}
          defaultValue={inputValue(field, value)}
        />
      )}
      {help}
    </div>
  );
}

/** Turns a stored value into what the corresponding input expects. */
export function inputValue(field: FieldDef, value: unknown): string {
  if (value === null || value === undefined) return "";

  switch (field.type) {
    case "lines":
      return Array.isArray(value) ? (value as string[]).join("\n") : String(value);
    case "blocks":
      return Array.isArray(value)
        ? (value as { title: string; body: string }[]).map((block) => `${block.title} | ${block.body}`).join("\n")
        : String(value);
    case "steps":
      return Array.isArray(value)
        ? (value as { step: string; title: string; body: string }[])
            .map((step) => `${step.step} | ${step.title} | ${step.body}`)
            .join("\n")
        : String(value);
    case "datetime": {
      const date = new Date(String(value));
      if (Number.isNaN(date.getTime())) return "";
      // `datetime-local` wants a local wall-clock value without a timezone.
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
        date.getHours()
      )}:${pad(date.getMinutes())}`;
    }
    default:
      return String(value);
  }
}
