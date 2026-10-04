import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { site } from "@/lib/site";

export const alt = `${site.name} — digital marketing and growth partner in ${site.address.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide OpenGraph card.
 *
 * Replaces the previous `og:image`, which pointed at the 645×160 wordmark logo —
 * stretched into a 1200×630 slot that rendered as an unreadable sliver on every
 * social share.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={site.name}
        title="Digital marketing and growth partner"
        subtitle="Strategy, advertising, SEO, social, websites and ongoing management."
        footer={site.phone}
      />
    ),
    size
  );
}