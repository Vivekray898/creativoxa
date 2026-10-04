"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/cms";

/**
 * Browser client, used only by the admin media uploader.
 *
 * It authenticates with the same cookie session as the dashboard, so storage
 * policies still check `is_staff()` — an anonymous visitor cannot upload.
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return createBrowserClient<Database>(url, anonKey);
}
