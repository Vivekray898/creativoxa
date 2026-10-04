import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { getToolBySlug } from "@/lib/cms/queries";

export const alt = "Creativoxa free tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={tool?.category ? `Free tool · ${tool.category}` : "Free tool"}
        title={tool?.name ?? "Free tools"}
        subtitle={tool?.description ?? undefined}
        footer="Free to use, no sign-up"
      />
    ),
    size
  );
}