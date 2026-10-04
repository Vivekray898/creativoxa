import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "public-placeholder-key";

/**
 * Refreshes the Supabase auth session for the incoming request and reports
 * whether a user is signed in.
 *
 * Called from `proxy.ts` (the Next.js 16 successor to middleware). Keeping the
 * session fresh here means server components and server actions always see a
 * valid token without having to write cookies themselves.
 */
export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // getClaims/getUser validates the token against Supabase Auth — it must be
  // called before the response is returned so refreshed cookies are not lost.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
