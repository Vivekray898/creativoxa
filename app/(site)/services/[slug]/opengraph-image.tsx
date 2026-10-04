import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { getServiceBySlug } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const alt = "Creativoxa service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={service ? "Service" : "Creativoxa"}
        title={service?.short_title ?? "Services"}
        subtitle={service?.excerpt}
        footer={site.phone}
      />
    ),
    size
  );
}