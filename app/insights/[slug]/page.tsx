import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { supabase } from "@/lib/supabase";
import { site } from "@/lib/site";

export const revalidate = 300;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  published_at: string;
};

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("posts")
    .select("slug, title, excerpt, content, cover_image, category, author, published_at")
    .eq("slug", slug)
    .single();
  return (data as Post) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${site.url}/insights/${post.slug}`,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="border-b border-line">
          <Container className="py-14 lg:py-20">
            <Reveal className="mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
                <Link href="/insights" className="transition-colors hover:text-foreground">
                  Insights
                </Link>
                <span className="mx-2 text-faint">/</span>
                <span className="text-foreground">{post.category}</span>
              </nav>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <span className="font-medium text-foreground">{post.author}</span>
                <span className="text-faint">·</span>
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </Reveal>
          </Container>
        </header>

        {post.cover_image && (
          <Container className="mt-10">
            <Reveal>
              <div className="card overflow-hidden">
                <div className="relative aspect-[16/8] bg-surface-2">
                  <Image
                    src={post.cover_image}
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
        )}

        <Container className="py-12 lg:py-16">
          <Reveal className="mx-auto max-w-3xl">
            <p className="border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <div
              className="prose prose-neutral mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Reveal>
        </Container>
      </article>

      <FinalCTA
        title="Want help applying this to your business?"
        body="Every business is different. Tell us yours and we'll explain what we'd do first — no obligation."
        label="Discuss Your Business"
        secondary={{ href: "/insights", label: "More Insights" }}
      />
    </>
  );
}
