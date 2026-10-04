import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { getInsightBySlug } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const alt = "Creativoxa insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);

  const published = post
    ? new Date(post.published_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return new ImageResponse(
    (
      <OgCard
        eyebrow={post ? `Insight · ${post.category}` : "Insight"}
        title={post?.title ?? "Insights"}
        subtitle={post?.excerpt}
        footer={published ?? site.phone}
      />
    ),
    size
  );
}