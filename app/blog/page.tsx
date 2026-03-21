import { supabase } from '@/lib/supabase';
import { Post } from '@/types/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Insights & Strategy | The Creativoxa Blog',
  description: 'Deep dives into SEO, Web Design, and Digital Growth.',
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  const featured = posts?.[0];
  const rest = posts?.slice(1);

  return (
    <main className="bg-background min-h-screen">

      {/* 🔥 HERO - Scaled down text and tightened padding */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-10 text-center md:text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">
            Creativoxa Blog
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight mb-4">
            Insights that <span className="text-primary">drive growth.</span>
          </h1>

          <p className="text-muted max-w-xl text-sm md:text-base leading-relaxed">
            SEO, design, and performance marketing frameworks used by real brands.
          </p>
        </div>
      </section>

      {/* 🌟 FEATURED POST - Smaller image, tighter grid, specific clickable elements */}
      {featured && (
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border border-default bg-background/50 p-4 md:p-6 rounded-3xl hover:border-primary/30 transition-colors duration-300">
              
              {/* Image is now the only clickable thing on the left */}
              <Link href={`/blog/${featured.slug}`} className="block overflow-hidden rounded-2xl border border-default">
                <img
                  src={featured.cover_image}
                  alt={featured.title}
                  className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                />
              </Link>

              {/* Text Container */}
              <div className="px-2 md:px-4">
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-3">
                  Featured
                </p>

                {/* Title is a link */}
                <Link href={`/blog/${featured.slug}`} className="block">
                  <h2 className="text-2xl md:text-3xl font-black mb-3 text-foreground hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                </Link>

                {/* Excerpt is just text (not clickable) */}
                <p className="text-muted mb-5 text-sm md:text-base leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>

                {/* Read Article is a link */}
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-primary hover:translate-x-2 transition-transform">
                  Read Article <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 🧱 GRID - Tighter gaps, smaller images, boxed cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest?.map((post: Post) => (
            <article key={post.id} className="group flex flex-col h-full border border-default bg-background/30 p-4 rounded-3xl hover:border-primary/30 transition-colors">

              {/* Image Link */}
              <Link href={`/blog/${post.slug}`} className="mb-4 block">
                <div className="overflow-hidden rounded-2xl border border-default">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-[180px] md:h-[200px] object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                  />
                </div>
              </Link>

              <div className="flex-grow px-1">
                <p className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                  {post.category}
                </p>

                {/* Title Link */}
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-muted text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              {/* Author / Date */}
              <div className="px-1 text-[10px] font-bold tracking-wider uppercase text-muted flex items-center gap-2 pt-3 border-t border-default/50 mt-auto">
                <span>{post.author}</span>
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                <span>
                  {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

            </article>
          ))}
        </div>
      </section>
      
    </main>
  );
}