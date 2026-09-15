import { createClient } from "@supabase/supabase-js";

// Placeholders keep local/CI builds working when env vars are absent.
// Queries against them fail gracefully (data: null, error set) instead of
// crashing the build. Real values are injected by the hosting environment.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "public-placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
