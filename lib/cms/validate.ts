// Small, dependency-free validation helpers used by admin server actions.
// Deliberately not a form library: the CMS only needs required/length/format
// checks, and the project has no validation dependency today.

import type { FieldDef } from "@/lib/cms/resources";

export type FieldErrors = Record<string, string>;

export class ValidationError extends Error {
  errors: FieldErrors;

  constructor(errors: FieldErrors) {
    super("Validation failed");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export function str(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function optionalStr(form: FormData, key: string): string | null {
  const value = str(form, key);
  return value.length > 0 ? value : null;
}

export function bool(form: FormData, key: string): boolean {
  const value = form.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function num(form: FormData, key: string, fallback = 0): number {
  const parsed = Number.parseInt(str(form, key), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Collects every problem at once so the form can show them together. */
export function collect(
  checks: { field: string; ok: boolean; message: string }[]
): FieldErrors | null {
  const errors: FieldErrors = {};
  for (const check of checks) {
    if (!check.ok && !errors[check.field]) errors[check.field] = check.message;
  }
  return Object.keys(errors).length > 0 ? errors : null;
}

export function required(value: string, field: string, errors: FieldErrors, max = 500) {
  if (!value) {
    errors[field] = "This field is required.";
    return;
  }
  if (value.length > max) {
    errors[field] = `Please keep this under ${max} characters.`;
  }
}

export function optionalUrl(value: string | null, field: string, errors: FieldErrors) {
  if (!value) return;
  if (!/^https?:\/\/\S+$/i.test(value) && !value.startsWith("/")) {
    errors[field] = "Use a full URL (https://…) or a path starting with /.";
  }
}

export function assertNoErrors(errors: FieldErrors) {
  if (Object.keys(errors).length > 0) throw new ValidationError(errors);
}

/** Turns a plain textarea (one item per line) into a string array. */
export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: string[] | null | undefined): string {
  return (value ?? []).join("\n");
}

/**
 * Nested content blocks (jsonb) are edited as simple `Heading | Body` pairs —
 * one per line — which keeps the admin usable without a block editor.
 */
export function parseBlocks(value: string): { title: string; body: string }[] {
  return linesToArray(value).map((line) => {
    const [title, ...rest] = line.split("|");
    return { title: (title ?? "").trim(), body: rest.join("|").trim() };
  });
}

export function blocksToLines(
  value: { title: string; body: string }[] | null | undefined
): string {
  return (value ?? []).map((block) => `${block.title} | ${block.body}`).join("\n");
}

export function parseSteps(value: string): { step: string; title: string; body: string }[] {
  return linesToArray(value).map((line, index) => {
    const [step, title, ...rest] = line.split("|");
    return {
      step: (step || String(index + 1).padStart(2, "0")).trim(),
      title: (title ?? "").trim(),
      body: rest.join("|").trim(),
    };
  });
}

export function stepsToLines(
  value: { step: string; title: string; body: string }[] | null | undefined
): string {
  return (value ?? []).map((s) => `${s.step} | ${s.title} | ${s.body}`).join("\n");
}

/**
 * Converts one posted field into the value stored in the database.
 *
 * Shared by the resource forms and the settings screens so both interpret a
 * field the same way; the type-only import keeps this module free of any
 * runtime dependency on the resource definitions.
 */
export function formFieldValue(field: FieldDef, formData: FormData): unknown {
  switch (field.type) {
    case "boolean":
      return bool(formData, field.name);
    case "number":
      return num(formData, field.name, 0);
    case "lines":
      return linesToArray(str(formData, field.name));
    case "blocks":
      return parseBlocks(str(formData, field.name));
    case "steps":
      return parseSteps(str(formData, field.name));
    case "datetime": {
      const raw = str(formData, field.name);
      if (!raw) return null;
      const parsed = new Date(raw);
      return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    default: {
      const raw = str(formData, field.name);
      return raw.length > 0 ? raw : null;
    }
  }
}

/** Never let an unhandled Supabase error surface as a raw 500. */
export function describeDbError(error: { code?: string; message?: string } | null): string {
  if (!error) return "Something went wrong. Please try again.";
  if (error.code === "23505" || error.code === "23514" || error.code === "23503") {
    return "That value is already used by another record (or is invalid). Try a different slug.";
  }
  if (error.code === "42501") {
    return "You don't have permission to make that change.";
  }
  if (error.message?.includes("JWT")) {
    return "Your session has expired. Please sign in again.";
  }
  return error.message || "Something went wrong. Please try again.";
}
