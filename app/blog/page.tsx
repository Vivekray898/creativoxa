import { supabase } from '@/lib/supabase';
import { Post } from '@/types/blog';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Intelligence Index | Creativoxa',
  description: 'Deep dives into SEO, Web Architecture, and Digital Growth Systems.',
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  const featured = posts?.[0];
  const rest = posts?.slice(1);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_40%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>

      {/* CHANGED: Tighter top padding on mobile (pt-24 vs pt-40) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24 md:pt-40 pb-20 md:pb-32">
        
        {/* 🔥 HERO SECTION - Reduced bottom margin on mobile */}
        <header className="mb-12 md:mb-24 lg:mb-32">
          {/* Intelligence Index Badge - Scaled down slightly for mobile */}
          <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest text-foreground mb-6 md:mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Intelligence Index
          </div>

          {/* CHANGED: Fluid Typography - text-4xl on small devices to prevent overflow */}
          <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter text-foreground leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 uppercase">
            DATA & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-1 md:pb-2 inline-block">
              INSIGHTS.
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
              {/* Thinner border and tighter padding on mobile */}
              <p className="text-muted text-base md:text-xl leading-relaxed font-medium border-l-2 md:border-l-4 border-primary pl-4 md:pl-6 py-1">
                Uncensored breakdowns of the SEO, design, and performance marketing frameworks we deploy for high-growth brands. 
              </p>
            </div>
          </div>
        </header>

        {/* 🌟 PRIMARY DATA NODE (FEATURED POST) */}
        {featured && (
          <section className="mb-16 md:mb-24">
            {/* Tighter padding on mobile cards */}
            <div className="group relative bg-foreground/[0.02] border border-default/50 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 hover:border-primary/50 transition-all duration-700 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none"></div>

              {/* Image Frame */}
              <Link href={`/blog/${featured.slug}`} className="w-full lg:w-3/5 block relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-default/50 group-hover:border-primary/30 transition-colors z-10 aspect-video lg:h-[450px]">
                <img
                  src={featured.cover_image}
                  alt={featured.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-1000 ease-out"
                />
              </Link>

              {/* Content */}
              <div className="w-full lg:w-2/5 relative z-10 flex flex-col justify-center lg:pr-6">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-6 md:w-8 h-[1px] bg-primary"></div>
                  <p className="text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                    Primary Dispatch
                  </p>
                </div>

                <Link href={`/blog/${featured.slug}`} className="block mb-4 md:mb-6">
                  <h2 className="text-2xl md:text-5xl font-black text-foreground hover:text-primary transition-colors leading-[1.1] tracking-tighter">
                    {featured.title}
                  </h2>
                </Link>

                <p className="text-muted text-sm md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3 font-medium">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-default/30">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-foreground">{featured.author}</span>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-muted">
                      {new Date(featured.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <Link href={`/blog/${featured.slug}`} className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                    Access Report 
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 🧱 ARCHIVE MATRIX (GRID) */}
        <section>
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-foreground">Archive Matrix</h3>
            <div className="h-[1px] flex-1 bg-default/50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest?.map((post: Post) => (
              <article key={post.id} className="group relative flex flex-col h-full bg-foreground/[0.02] border border-default/50 p-4 md:p-5 rounded-[1.75rem] md:rounded-[2rem] hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 backdrop-blur-xl overflow-hidden">
                
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>

                <Link href={`/blog/${post.slug}`} className="mb-4 md:mb-6 block relative z-10">
                  <div className="overflow-hidden rounded-[1.25rem] border border-default/50 group-hover:border-primary/30 transition-colors">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-[180px] md:h-[200px] object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700 ease-in-out"
                    />
                  </div>
                </Link>

                <div className="flex-grow relative z-10 px-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    <p className="text-[8px] md:text-[9px] font-bold text-muted uppercase tracking-widest">
                      {post.category}
                    </p>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block mb-2">
                    <h3 className="text-lg md:text-xl font-black text-foreground hover:text-primary transition-colors leading-tight tracking-tight">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-muted text-xs md:text-sm line-clamp-2 leading-relaxed font-medium mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-1 pt-4 border-t border-default/30 mt-auto relative z-10 flex items-center justify-between text-[8px] md:text-[9px] font-bold tracking-widest uppercase text-muted">
                  <span className="truncate max-w-[50%]">{post.author}</span>
                  <span className="text-foreground">
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}