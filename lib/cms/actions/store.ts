"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getResource, type ResourceDef } from "@/lib/cms/resources";
import { requireAdmin, requireStaff, backWithError, backWithSuccess } from "@/lib/cms/actions/shared";
import {
  SLUG_RE,
  describeDbError,
  formFieldValue,
  slugify,
  str,
} from "@/lib/cms/validate";

// One set of server actions drives every resource in `lib/cms/resources.ts`:
// create, update, delete, flag toggles and ordering. Each action re-checks
// authorisation (server functions are reachable by direct POST) and Row Level
// Security enforces the same rules again in the database.

type Values = Record<string, unknown>;

async function db(): Promise<SupabaseClient> {
  // The generic layer deals in table names at runtime; the typed client can't
  // express that, so it is cast here — the row types are still used by the
  // public queries and the bespoke screens.
  return (await createSupabaseServerClient()) as unknown as SupabaseClient;
}

function resourceOrFail(formData: FormData): ResourceDef {
  const key = str(formData, "__resource");
  const def = getResource(key);
  if (!def) backWithError("/admin/dashboard", "Unknown content type.");
  return def;
}

function isBlank(value: unknown) {
  return value === null || value === undefined || value === "";
}

function validate(def: ResourceDef, values: Values): string | null {
  for (const field of def.fields) {
    const value = values[field.name];
    if (field.required && isBlank(value)) {
      return `${field.label} is required.`;
    }
    if (field.type === "slug" && !isBlank(value) && !SLUG_RE.test(String(value))) {
      return `${field.label} can only contain lowercase letters, numbers and single hyphens.`;
    }
    if (field.type === "media" && !isBlank(value) && !String(value).startsWith("/") && !/^https?:\/\//i.test(String(value))) {
      return `${field.label} must be an uploaded file, a path starting with / or a full URL.`;
    }
    if (field.name === "url" || field.name === "href") {
      const raw = String(value ?? "");
      if (raw && !raw.startsWith("/") && !/^https?:\/\//i.test(raw)) {
        return `${field.label}: use a path starting with / or a full http(s) URL.`;
      }
    }
  }

  // Slugs must be unique — a clear message beats a raw database error.
  if (def.fields.some((field) => field.name === "slug")) {
    const slug = String(values.slug ?? "");
    if (!slug) return "Slug is required.";
  }

  if (def.key === "page_sections" && isBlank(values.section_key)) {
    return "Section key is required.";
  }

  return null;
}

function ensureSlug(def: ResourceDef, values: Values) {
  if (!def.fields.some((field) => field.name === "slug")) return;

  const current = String(values.slug ?? "").trim();
  if (current) {
    values.slug = slugify(current);
    return;
  }

  const sourceKey = ["name", "title", "label", "question", "short_title"].find((key) =>
    def.fields.some((field) => field.name === key)
  );
  values.slug = slugify(String(sourceKey ? values[sourceKey] ?? "" : "")) || `item-${Date.now()}`;
}

async function nextSortOrder(def: ResourceDef, client: SupabaseClient): Promise<number> {
  const { data } = await client
    .from(def.table)
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);

  const highest = (data?.[0] as { sort_order?: number } | undefined)?.sort_order ?? 0;
  return highest + 1;
}

/** Which public pages a change affects. */
function revalidatePublic(def: ResourceDef) {
  revalidatePath(def.path);
  revalidatePath("/sitemap.xml");

  switch (def.key) {
    case "services":
      revalidatePath("/");
      revalidatePath("/services");
      revalidatePath("/services/[slug]", "page");
      break;
    case "service_categories":
      revalidatePath("/");
      revalidatePath("/services");
      break;
    case "case_studies":
      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath("/work/[slug]", "page");
      break;
    case "insights":
      revalidatePath("/");
      revalidatePath("/insights");
      revalidatePath("/insights/[slug]", "page");
      break;
    case "navigation_items":
    case "page_sections":
      revalidatePath("/", "layout");
      break;
    default:
      revalidatePath("/");
  }
}

export async function createResource(formData: FormData) {
  await requireStaff();
  const def = resourceOrFail(formData);
  const client = await db();

  const values: Values = {};
  for (const field of def.fields) values[field.name] = formFieldValue(field, formData);

  const problem = validate(def, values);
  if (problem) backWithError(`${def.path}/new`, problem);

  ensureSlug(def, values);

  if (def.hasSortOrder && (!values.sort_order || Number(values.sort_order) === 0)) {
    values.sort_order = await nextSortOrder(def, client);
  }

  const { error } = await client.from(def.table).insert([values]);

  if (error) backWithError(`${def.path}/new`, describeDbError(error));

  revalidatePublic(def);
  backWithSuccess(def.path, `${def.singular[0].toUpperCase()}${def.singular.slice(1)} created.`);
}

export async function updateResource(formData: FormData) {
  await requireStaff();
  const def = resourceOrFail(formData);
  const id = str(formData, "__id");
  if (!id) backWithError(def.path, "Missing record id.");

  const client = await db();
  const values: Values = {};

  for (const field of def.fields) {
    if (field.immutable) continue;
    values[field.name] = formFieldValue(field, formData);
  }

  const problem = validate(def, { ...values, section_key: values.section_key ?? "kept" });
  if (problem) backWithError(`${def.path}/${id}`, problem);

  ensureSlug(def, values);

  const { error } = await client.from(def.table).update(values).eq("id", id);

  if (error) backWithError(`${def.path}/${id}`, describeDbError(error));

  revalidatePublic(def);
  backWithSuccess(`${def.path}/${id}`, "Changes saved.");
}

export async function deleteResource(formData: FormData) {
  await requireAdmin();
  const def = resourceOrFail(formData);
  const id = str(formData, "__id");
  if (!id) backWithError(def.path, "Missing record id.");

  const client = await db();
  const { error } = await client.from(def.table).delete().eq("id", id);

  if (error) backWithError(def.path, describeDbError(error));

  revalidatePublic(def);
  backWithSuccess(def.path, `${def.singular[0].toUpperCase()}${def.singular.slice(1)} deleted.`);
}

/** Publish / unpublish, and the other on/off switches (enabled, visible, featured). */
export async function setResourceFlag(formData: FormData) {
  await requireStaff();
  const def = resourceOrFail(formData);
  const id = str(formData, "__id");
  const field = str(formData, "__field");
  const value = str(formData, "__value") === "true";

  const allowed = ["published", "enabled", "visible", "featured"];
  if (!id || !allowed.includes(field)) backWithError(def.path, "That change isn't supported.");

  const client = await db();
  const { error } = await client.from(def.table).update({ [field]: value }).eq("id", id);

  if (error) backWithError(def.path, describeDbError(error));

  revalidatePublic(def);
  backWithSuccess(def.path, value ? "Now live." : "Now hidden.");
}

/** Move a row one position up or down by swapping sort_order with its neighbour. */
export async function moveResource(formData: FormData) {
  await requireStaff();
  const def = resourceOrFail(formData);
  const id = str(formData, "__id");
  const direction = str(formData, "__direction");

  if (!id || !def.hasSortOrder) backWithError(def.path, "That item can't be reordered.");

  const client = await db();
  const { data, error } = await client
    .from(def.table)
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data) backWithError(def.path, describeDbError(error));

  const rows = data as { id: string; sort_order: number }[];
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) backWithError(def.path, "That item no longer exists.");

  const neighbourIndex = direction === "up" ? index - 1 : index + 1;
  const neighbour = rows[neighbourIndex];
  if (!neighbour) backWithSuccess(def.path, "Already at the end of the list.");

  const current = rows[index];

  // Swap the two positions; if they happen to be equal, fan them out.
  const currentOrder = current.sort_order;
  const neighbourOrder = neighbour.sort_order;

  await client
    .from(def.table)
    .update({ sort_order: neighbourOrder === currentOrder ? currentOrder + (direction === "up" ? -1 : 1) : neighbourOrder })
    .eq("id", current.id);
  await client.from(def.table).update({ sort_order: currentOrder }).eq("id", neighbour.id);

  revalidatePublic(def);
  backWithSuccess(def.path, "Order updated.");
}
