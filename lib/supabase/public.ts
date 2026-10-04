import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/cms";

// Cookie-less anon client used for *public* reads (published content only).
//
// It deliberately does not read cookies, so pages that use it stay cacheable and
// are never opted into dynamic rendering. Row Level Security does the real work:
// this key can only ever see rows where `published = true`.
//
// Placeholders keep local/CI builds working when env vars are absent — queries
// against them fail gracefully (error set) and the callers fall back to the local
// content in `lib/data/*`.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "public-placeholder-key";

/** True only when real credentials are present (the fallback content is used otherwise). */
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

export const supabasePublic = createClient<Database>(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
