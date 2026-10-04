"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { HOMEPAGE_GROUPS, SITE_SETTINGS_GROUPS, type SettingsGroup } from "@/lib/cms/settings";
import { requireAdmin, requireStaff, backWithError, backWithSuccess } from "@/lib/cms/actions/shared";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/types/cms";
import { describeDbError, formFieldValue, str } from "@/lib/cms/validate";

// Server actions for the two singleton settings rows and the enquiry inbox.
// Every one re-checks authorisation: a server action is reachable by direct POST
// regardless of what the dashboard renders.

async function db(): Promise<SupabaseClient> {
  return (await createSupabaseServerClient()) as unknown as SupabaseClient;
}

type Values = Record<string, unknown>;

function collect(groups: SettingsGroup[], formData: FormData) {
  const values: Values = {};
  const missing: string[] = [];

  for (const group of groups) {
    for (const field of group.fields) {
      // `social_*` fields are not columns — they are merged into `socials` below.
      values[field.name] = field.name.startsWith("social_")
        ? str(formData, field.name)
        : formFieldValue(field, formData);

      if (field.required && !values[field.name]) missing.push(field.label);
    }
  }

  return { values, missing };
}

export async function updateHomepageSettings(formData: FormData) {
  await requireStaff();
  const { values, missing } = collect(HOMEPAGE_GROUPS, formData);

  if (missing.length > 0) {
    backWithError("/admin/pages/home", `${missing.join(", ")} cannot be empty.`);
  }

  const supabase = await db();
  const { error } = await supabase
    .from("homepage_settings")
    .upsert({ id: true, ...values, updated_at: new Date().toISOString() });

  if (error) backWithError("/admin/pages/home", describeDbError(error));

  revalidatePath("/");
  revalidatePath("/admin/pages/home");
  backWithSuccess("/admin/pages/home", "Homepage content updated.");
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  const { values, missing } = collect(SITE_SETTINGS_GROUPS, formData);

  if (missing.length > 0) {
    backWithError("/admin/settings", `${missing.join(", ")} cannot be empty.`);
  }

  const socials = {
    instagram: values.social_instagram || undefined,
    facebook: values.social_facebook || undefined,
    x: values.social_x || undefined,
    pinterest: values.social_pinterest || undefined,
  };

  for (const key of Object.keys(values)) {
    if (key.startsWith("social_")) delete values[key];
  }

  const supabase = await db();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: true, ...values, socials, updated_at: new Date().toISOString() });

  if (error) backWithError("/admin/settings", describeDbError(error));

  // Contact details, socials and footer copy appear on every page.
  revalidatePath("/", "layout");
  backWithSuccess("/admin/settings", "Site settings updated.");
}

export async function updateEnquiry(formData: FormData) {
  await requireStaff();

  const id = str(formData, "__id");
  const status = str(formData, "status") as EnquiryStatus;
  const notes = str(formData, "notes");

  if (!id) backWithError("/admin/enquiries", "Missing enquiry id.");
  if (!ENQUIRY_STATUSES.some((option) => option.value === status)) {
    backWithError(`/admin/enquiries/${id}`, "That status isn't recognised.");
  }

  const supabase = await db();
  const { error } = await supabase
    .from("enquiries")
    .update({ status, notes: notes || null, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) backWithError(`/admin/enquiries/${id}`, describeDbError(error));

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  backWithSuccess(`/admin/enquiries/${id}`, "Enquiry updated.");
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdmin();

  const id = str(formData, "__id");
  if (!id) backWithError("/admin/enquiries", "Missing enquiry id.");

  const supabase = await db();
  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  if (error) backWithError(`/admin/enquiries/${id}`, describeDbError(error));

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  backWithSuccess("/admin/enquiries", "Enquiry deleted.");
}
