import type { NextConfig } from "next";


// Supabase Storage serves media from `<project-ref>.supabase.co`. Deriving the
// host from the configured project URL keeps this working on any project, while
// the wildcard entry covers custom/legacy project domains.
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

// The canonical host from lib/site.ts. Anything served on the apex domain is
// redirected here so the site only ever answers on one URL.
const CANONICAL_HOST = "www.creativoxa.com";

// Content-addressed or content-stable assets. Vercel already applies this to
// /_next/static; stating it makes the intent explicit and extends the same
// policy to public/.
const IMMUTABLE = "public, max-age=31536000, immutable";

// For assets served from a fixed path (the favicon set), where the URL does not
// change when the bytes do.
const REVALIDATE = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, then WebP. Modern browsers take the ~50% smaller AVIF; the
    // rest fall back to WebP instead of shipping the original PNG/JPEG.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit allowlist. No image in the project sets a
    // `quality` prop, so 75 (the default) covers everything today; 70 is
    // allowed so a future hero image can trade a little fidelity for bytes
    // without reopening the allowlist to arbitrary values.
    qualities: [70, 75],
    // Optimised variants are content-addressed, so they can be cached for a
    // year. The previous 60s default re-validated every image every minute.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      ...(supabaseHost
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Hashed build output can never change, so cache it for a year and skip
        // revalidation entirely. Vercel already sends this for /_next/static;
        // stating it explicitly also covers anything served from public/.
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        // The un-hashed assets in public/ (brand logo, work screenshots,
        // ads.txt). Next's `source` matcher does not support non-capturing
        // groups, so each extension gets its own rule rather than one regex.
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:path*.avif",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:path*.jpg",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:path*.ico",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },

      {
        // `/favicon.ico` is served from a fixed, un-hashed path, so the
        // `/:path*.ico` rule above would pin a rebrand in every visitor's cache
        // for a year. This must come AFTER it: Next applies the LAST matching
        // rule for a header key, so placing this first leaves it inert. Both
        // orderings were measured with curl against a real `next start`.
        //
        // `app/icon.png` and `app/apple-icon.png` deliberately get no override.
        // Next serves those metadata routes as
        // `public, max-age=31536000, immutable` itself and never consults
        // `headers()` for them, so a rule for those paths would be dead weight.
        // Confirmed by deleting the `/:path*.png` rule and re-measuring.
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: REVALIDATE }],
      },
      {
        source: "/:path*.woff2",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/:path*.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        source: "/:path*.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // ads.txt is fetched by ad crawlers, not browsers. A short shared cache
        // keeps a seller-list change from needing a redeploy to take effect.
        source: "/ads.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            // Vercel terminates TLS, so this is safe to enable in production.
            // `preload` is deliberately omitted: committing to HSTS preload is
            // irreversible and belongs to whoever owns the domain.
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Host canonicalisation first — every other redirect assumes the request
      // is already on the canonical host.
      {
        source: "/:path((?!api|_next|.*\\..*).*)",
        destination: `https://${CANONICAL_HOST}/:path`,
        has: [{ type: "host", value: "creativoxa.com" }],
        missing: [{ type: "host", value: `${CANONICAL_HOST}:443` }],
        statusCode: 301,
      },

      // Legacy URLs from the previous site. `statusCode: 301` is used
      // explicitly because `permanent: true` emits a 308 in Next.js, and these
      // are genuine page moves that should be cached forever as 301s.
      { source: "/All-Services", destination: "/services", statusCode: 301 },
      { source: "/all-services", destination: "/services", statusCode: 301 },
      { source: "/all-services/:slug", destination: "/services/:slug", statusCode: 301 },
      { source: "/blog", destination: "/insights", statusCode: 301 },
      { source: "/blog/:slug", destination: "/insights/:slug", statusCode: 301 },
      { source: "/contacts", destination: "/contact", statusCode: 301 },
      { source: "/contact-us", destination: "/contact", statusCode: 301 },
      { source: "/our-services", destination: "/services", statusCode: 301 },
    ];
  },
};

// ANALYZE=true npm run build opens the bundle treemap. @next/bundle-analyzer is
// a devDependency and is loaded with a lazy require inside the flag guard, so a
// production install that omits devDeps can still evaluate this config.
const config: NextConfig =
  process.env.ANALYZE === "true"
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ? require("@next/bundle-analyzer")({ enabled: true })(nextConfig)
    : nextConfig;

export default config;
