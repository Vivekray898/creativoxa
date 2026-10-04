"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/public";
import { str } from "@/lib/cms/validate";

function loginError(message: string): never {
  redirect(`/admin/login?error=${encodeURIComponent(message)}`);
}

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured) {
    loginError("Supabase is not configured on this environment yet.");
  }

  const email = str(formData, "email");
  const password = str(formData, "password");
  const next = str(formData, "next") || "/admin/dashboard";

  if (!email || !password) {
    loginError("Enter your email and password.");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Deliberately vague: never reveal whether the address exists.
    loginError("Those credentials didn't work. Check your email and password.");
  }

  // Only relative paths — an absolute URL here would be an open redirect.
  const destination = next.startsWith("/admin") ? next : "/admin/dashboard";
  redirect(destination);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
