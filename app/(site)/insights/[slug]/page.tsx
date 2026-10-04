import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { getInsightBySlug, getInsights, getSiteSettings, getServices } from "@/lib/cms/queries";
import { AD_SLOTS } from "@/lib/consent";
import { renderMarkdown } from "@/lib/markdown";
import { JsonLd, articleSchema, assertSeoLength } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) return { title: "Article Not Found", robots: { index: false, follow: true } };

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  assertSeoLength(title, description);

  const url = `/insights/${post.slug}`;
  // Prefer the CMS featured image. When there isn't one, the
  // `opengraph-image.tsx` file convention in this segment supplies the generated
  // card automatically — its URL is hashed by Next, so it must never be
  // hand-written here.
  const image = post.featured_image
    ? `${site.url}${post.featured_image}`
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      ...(image ? { images: [{ url: image, alt: post.title }] } : {}),
      publishedTime: post.published_at,
      ...(post.updated_at ? { modifiedTime: post.updated_at } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) notFound();

  const [settings, latest, services] = await Promise.all([
    getSiteSettings(),
    getInsights(4),
    getServices(),
  ]);
  const related = latest.filter((item) => item.slug !== post.slug).slice(0, 3);

  // Contextual post → service links. Matched on the post's own category rather
  // than keyword-matching the body, so the links stay accurate and predictable.
  const relatedServices = post.category
    ? services.filter(
        (service) =>
          service.category_label?.toLowerCase() === post.category.toLowerCase() ||
          service.name.toLowerCase() === post.category.toLowerCase()
      ).slice(0, 3)
    : [];

  // Markdown → HTML, sanitised server-side. Nothing from the database is
  // rendered raw.
  const html = renderMarkdown(post.content);

  return (
    <>
      <JsonLd data={articleSchema(post, settings)} />

      <article>
        <header className="border-b border-line">
          <Container className="py-14 lg:py-20">
            <Reveal className="mx-auto max-w-3xl">
              <Breadcrumbs
                className="mb-6"
                items={[
                  { name: "Home", path: "/" },
                  { name: "Insights", path: "/insights" },
                  { name: post.title, path: `/insights/${post.slug}` },
                ]}
              />
              {post.category ? (
                <p className="eyebrow mb-4">{post.category}</p>
              ) : null}
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                {post.author ? (
                  <>
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span className="text-faint">·</span>
                  </>
                ) : null}
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                {/* Visible "last updated" matches dateModified in the Article
                    schema; Google only trusts the structured date when the page
                    shows the same one. */}
                {post.updated_at && post.updated_at !== post.published_at ? (
                  <>
                    <span className="text-faint">·</span>
                    <span>
                      Updated{" "}
                      <time dateTime={post.updated_at}>
                        {new Date(post.updated_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </span>
                  </>
                ) : null}
              </div>
            </Reveal>
          </Container>
        </header>

        {post.featured_image ? (
          <Container className="mt-10">
            <Reveal>
              <div className="card overflow-hidden">
                <div className="relative aspect-[16/8] bg-surface-2">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 76rem"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </Container>
        ) : null}

        <Container className="py-12 lg:py-16">
          <Reveal className="mx-auto max-w-3xl">
            {post.excerpt ? (
              <p className="border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted">
                {post.excerpt}
              </p>
            ) : null}
            {html ? (
              <div
                className="prose prose-neutral mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}
          </Reveal>

          <AdSlot slot={AD_SLOTS.insightsDetail} height={280} />
        </Container>
      </article>

      {/* Contextual links from the article to the service it is actually about.
          Keeps every post two clicks from a conversion path instead of a dead
          end, without inventing any service that does not exist. */}
      {relatedServices.length > 0 ? (
        <section className="border-t border-line py-14">
          <Container>
            <Reveal>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-faint">
                {post.category ? `${post.category} services` : "Related services"}
              </h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="card card-hover p-5"
                >
                  <p className="font-semibold tracking-tight text-foreground">
                    {service.short_title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                    {service.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-t border-line bg-surface py-14">
          <Container>
            <Reveal>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-faint">
                More insights
              </h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/insights/${item.slug}`} className="card card-hover p-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-primary">
                    {item.category}
                  </p>
                  <p className="mt-1.5 font-semibold tracking-tight text-foreground">{item.title}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <FinalCTA
        title="Want help applying this to your business?"
        body="Every business is different. Tell us yours and we'll explain what we'd do first — no obligation."
        label="Discuss Your Business"
        secondary={{ href: "/insights", label: "More Insights" }}
      />
    </>
  );
}
