"use client";

import Script from "next/script";
import { useConsent } from "@/components/ads/ConsentProvider";

const GOOGLE_ADS_ID = "AW-11559994946";
const META_PIXEL_ID = "858693652813158";
const CLARITY_ID = "qf7o3i7qau";

/**
 * Third-party tags, all loaded through `next/script` so they never block the
 * initial HTML parse.
 *
 * Consent rules enforced here:
 *   - Google Ads and Meta Pixel do not load at all until `ads` consent is
 *     granted. Consent Mode v2 `default: denied` is already set in <head>, so
 *     these tags simply do not exist for anyone who has not opted in.
 *   - Microsoft Clarity records sessions, so it is gated on `analytics`
 *     consent and additionally loads at `lazyOnload`, off the critical path.
 *
 * Gating on `consent !== null` is deliberately *not* used: that value stops
 * being null as soon as the provider falls back to the denied default, so it
 * would load Clarity for everyone regardless of what they chose.
 */
export default function TrackingScripts() {
  const { granted } = useConsent();
  const adsAllowed = granted("ads");
  const analyticsAllowed = granted("analytics");

  return (
    <>
      {adsAllowed ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `}
          </Script>

          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(fbq,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}

      {analyticsAllowed ? (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      ) : null}
    </>
  );
}