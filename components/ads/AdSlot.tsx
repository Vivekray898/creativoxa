"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

type AdSlotProps = {
  /** AdSense unit path, e.g. "1234567890". Ignored by other networks. */
  slot?: string;
  /** Responsive format hint; other networks map this onto their own equivalents. */
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  /**
   * Reserved height in pixels. This is what prevents layout shift — the box is
   * painted at full height from the first frame and the creative simply fills it.
   */
  height?: number;
  className?: string;
  /** Set when the unit sits in a context where a narrow format reads better. */
  compact?: boolean;
};

const DEFAULT_HEIGHT = 280;

/**
 * A single ad unit.
 *
 * Deliberately network-agnostic: it publishes the standard `data-ad-*` attributes
 * plus the `adsbygoogle` marker that AdSense, Ezoic, Mediavine, Adsterra and
 * Media.net all look for, so swapping networks means swapping the loader below
 * rather than restructuring the page.
 *
 * Two rules matter for ad-network compatibility and are enforced here:
 *   - no `overflow: hidden` anywhere on the wrapper or its ancestors, because
 *     networks routinely inject wide creatives and countries that overflow;
 *   - the container reserves its height up front, so CLS stays at 0.
 */
export default function AdSlot({
  slot,
  format = "auto",
  height = DEFAULT_HEIGHT,
  className = "",
  compact = false,
}: AdSlotProps) {
  const { granted } = useConsent();
  const consent = granted("ads");
  const ref = useRef<HTMLDivElement | null>(null);
  // A ref rather than state: whether the request has been made must survive
  // re-renders without causing one, and nothing in the UI depends on its value.
  const pushedRef = useRef(false);
  const [inView, setInView] = useState(false);

  // Only mount the unit once it is close to the viewport. Nothing above the fold
  // on any page uses this component, so ad scripts never compete with LCP.
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    // No IntersectionObserver (very old browsers, or some in-app webviews):
    // treat the unit as immediately eligible. Deferred by a frame so this never
    // updates state synchronously inside the effect body.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Start loading a little before the unit scrolls into view.
      { rootMargin: "300px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  // Push the first AdSense request only once consent exists.
  useEffect(() => {
    if (!consent || !inView || pushedRef.current || !slot) return;
    try {
      const win = window as unknown as {
        adsbygoogle?: unknown[];
      };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // A blocked or failed ad request must never break the surrounding page.
    }
  }, [consent, inView, slot]);

  // No unit configured for this placement: render nothing rather than an empty
  // 280px box, so callers can mount <AdSlot> unconditionally.
  if (!slot) return null;

  const active = consent && inView;

  return (
    <div
      ref={ref}
      // `ad-slot` is the class most networks bind to; `adsbygoogle` covers
      // Google's own loader. No overflow clipping, by design.
      className={`ad-slot my-10 w-full ${className}`}
      data-ad-slot={slot}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-format={compact ? "vertical" : format}
      data-full-width-responsive="true"
      style={{
        // Reserve the height regardless of state — this is the CLS guarantee.
        minHeight: `${height}px`,
        display: "block",
        overflow: "visible",
        maxWidth: "100%",
      }}
    >
      <p
        className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-faint"
        aria-hidden="true"
      >
        Advertisement
      </p>

      {active ? (
        <>
          <ins
            className="adsbygoogle block"
            style={{ display: "block", overflow: "visible" }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format={compact ? "vertical" : format}
            data-full-width-responsive="true"
          />
          <Script
            id={`adsense-${slot}`}
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </>
      ) : null}
    </div>
  );
}