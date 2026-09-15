import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { supabase } from "@/lib/supabase";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights — Practical Digital Marketing Writing",
  description:
    "Guides and notes on SEO, Google Ads, Meta Ads, websites and local marketing — written for business owners, not marketers.",
  alternates: { canonical: "/insights" },
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string;
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const { data } = await supabase
    .from("posts")
    .select("slug, title, excerpt, category, author, published_at")
    .order("published_at", { ascending: false });

  const posts = (data ?? []) as Post[];

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Insights</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Practical writing on digital marketing.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Guides and notes on search, advertising, websites and the digital habits of growing
              businesses — written to be useful, not to fill a blog.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          {posts.length === 0 ? (
            <Reveal>
              <div className="card mx-auto max-w-2xl px-8 py-16 text-center">
                <p className="text-lg font-semibold text-foreground">
                  The first articles are being written.
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  We&apos;re preparing practical guides on SEO, Google Ads, Meta Ads, websites and
                  local marketing. Rather than publish filler, we&apos;re publishing when we have
                  something worth your time. Have a question you&apos;d like answered? Ask us — it
                  may become the first article.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 50}>
                  <Link href={`/insights/${post.slug}`} className="group block h-full">
                    <article className="card card-hover flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-widest text-primary">
                          {post.category}
                        </p>
                        <p className="text-xs text-faint">
                          {new Date(post.published_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <p className="mt-5 border-t border-line pt-4 text-xs text-faint">
                        {post.author}
                      </p>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <FinalCTA
        title="Prefer to just talk it through?"
        body="If reading guides isn't your style, send us your question directly — we answer enquiry emails personally."
        label="Talk to Creativoxa"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
