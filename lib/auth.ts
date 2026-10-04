import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminRole = "admin" | "editor";

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: AdminRole;
};

/**
 * Returns the signed-in CMS user (with their role) or null.
 *
 * Memoised per request so a page, its layout and its actions share one lookup.
 * Authorisation is enforced by Row Level Security as well — this only decides
 * what the UI shows and which early redirect happens.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile?.role ?? user.user_metadata?.role) as AdminRole | undefined;
  if (role !== "admin" && role !== "editor") return null;

  return {
    id: user.id,
    email: profile?.email ?? user.email ?? "",
    fullName: profile?.full_name ?? null,
    role,
  };
});

/** True for users allowed to delete content and change site-wide settings. */
export function canManageSettings(user: CurrentUser) {
  return user.role === "admin";
}
