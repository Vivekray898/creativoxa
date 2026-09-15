import { NextRequest, NextResponse } from "next/server";

// Legacy URLs from the previous site used a capital-S "/Services/..." prefix.
// Next.js route and redirect matching is case-insensitive, so a config
// redirect for "/Services/Digital-Marketing" would also match the real
// "/services/digital-marketing" route and cause a redirect loop. Exact-case
// matching in middleware avoids that.
const legacyServiceRedirects: Record<string, string> = {
  "/Services/Digital-Marketing": "/services/digital-marketing",
  "/Services/web-design-development": "/services/web-development",
  "/Services/Videography-Services": "/services",
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const destination = legacyServiceRedirects[pathname];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Services/:path*", "/Services"],
};
