"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/**
 * Submit button that reflects the enclosing form's pending state, so every
 * admin form has a real loading state instead of a silent click.
 */
export default function SubmitButton({
  children,
  className,
  pendingLabel,
}: {
  children: ReactNode;
  className: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className} aria-busy={pending}>
      {pending ? pendingLabel ?? "Saving…" : children}
    </button>
  );
}
