"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

/**
 * Destructive actions ask twice, inline — no browser dialog, no dependency.
 * The first click arms the control, the second submits the real form.
 */
export default function ConfirmAction({
  action,
  fields,
  label,
  confirmLabel = "Delete",
  message = "Are you sure?",
  icon = "trash",
  className = "inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-red-500/40 hover:text-red-600",
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields: Record<string, string>;
  label: string;
  confirmLabel?: string;
  message?: string;
  icon?: IconName;
  className?: string;
}) {
  const [armed, setArmed] = useState(false);

  if (!armed) {
    return (
      <button type="button" onClick={() => setArmed(true)} className={className}>
        <Icon name={icon} className="h-3.5 w-3.5" />
        {label}
      </button>
    );
  }

  return (
    <form action={action} className="inline-flex flex-wrap items-center gap-2">
      {Object.entries(fields).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <span className="text-xs text-muted">{message}</span>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
      >
        <Icon name="trash" className="h-3.5 w-3.5" />
        {confirmLabel}
      </button>
      <button
        type="button"
        onClick={() => setArmed(false)}
        className="inline-flex items-center rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground"
      >
        Cancel
      </button>
    </form>
  );
}
