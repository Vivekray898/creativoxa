import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { supabase } from "@/lib/supabase";

export const revalidate = 300;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
};

export default async function InsightsPreview() {
  const { data } = await supabase
    .from("posts")
    .select("slug, title, excerpt, category, published_at")
    .order("published_at", { ascending: false })
    .limit(3);

  const posts = (data ?? []) as Post[];

  return (
    <section className="border-y border-line bg-surface py-20 lg:py-24">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title="Notes on digital marketing that works."
            description="Practical writing on search, ads, websites and the digital habits of growing businesses."
          />
          <ArrowLink href="/insights" className="shrink-0">All insights</ArrowLink>
        </Reveal>

        {posts.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 50}>
                <Link href={`/insights/${post.slug}`} className="group block h-full">
                  <article className="card card-hover flex h-full flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      {post.category}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <p className="mt-auto pt-5 text-xs text-faint">
                      {new Date(post.published_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="card flex flex-col items-center justify-center px-6 py-14 text-center">
              <p className="text-base font-semibold text-foreground">
                New insights are on the way.
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                We&apos;re writing practical guides on SEO, Google Ads, Meta Ads and websites for
                growing businesses. Have a question you&apos;d like answered? Ask us directly — it
                may become our next article.
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
