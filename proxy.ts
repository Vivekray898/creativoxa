import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/proxy";

// Legacy URLs from the previous site used a capital-S "/Services/...*" prefix.
// Next.js route and redirect matching is case-insensitive, so a config
// redirect for "/Services/Digital-Marketing" would also match the real
// "/services/digital-marketing" route and cause a redirect loop. Exact-case
// matching in the proxy avoids that.
const legacyServiceRedirects: Record<string, string> = {
  "/Services/Digital-Marketing": "/services/digital-marketing",
  "/Services/web-design-development": "/services/web-development",
  "/Services/Videography-Services": "/services",
};

// Reachable without a session. Everything else under /admin is gated.
const publicAdminPaths = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const destination = legacyServiceRedirects[pathname];
  if (destination) {
    // 301, not `permanent: true` — Next emits a 308 for that, and 308 preserves
    // the method, which is wrong for a permanent URL move.
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (publicAdminPaths.includes(pathname)) {
      return NextResponse.next();
    }

    const { response, user } = await updateSupabaseSession(request);

    if (!user) {
      // Server-side gate only: no client-side check can bypass this redirect.
      // The admin layout re-verifies the session and role as defence in depth.
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = pathname === "/admin" ? "" : `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Services/:path*", "/Services", "/admin", "/admin/:path*"],
};
