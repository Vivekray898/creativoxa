import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { getCaseStudyBySlug } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const alt = "Creativoxa project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={study?.industry ? `Work · ${study.industry}` : "Selected work"}
        title={study?.title ?? "Our work"}
        subtitle={study?.summary}
        footer={site.phone}
      />
    ),
    size
  );
}