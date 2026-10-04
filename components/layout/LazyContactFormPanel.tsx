"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper that defers the floating enquiry panel off the critical
 * path.
 *
 * `ssr: false` is not permitted directly in a Server Component, so the
 * `next/dynamic` call has to live behind a "use client" boundary. The import is
 * behaviour-preserving: `ContactFormPanel` already returned `null` on the server
 * because its `isDesktop` flag starts false, so nothing that was previously in
 * the HTML disappears.
 */
const ContactFormPanel = dynamic(() => import("@/components/ContactFormPanel"), {
  ssr: false,
});

export default function LazyContactFormPanel() {
  return <ContactFormPanel />;
}