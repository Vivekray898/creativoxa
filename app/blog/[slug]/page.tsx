import { supabase } from '@/lib/supabase';
import { Post } from '@/types/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase.from('posts').select('title, excerpt').eq('slug', slug).single();
  if (!post) return { title: 'Post Not Found' };
  return { title: `${post.title} | Intelligence Index`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post }: { data: Post | null } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) notFound();

  return (
    <main className="bg-background min-h-screen relative overflow-hidden pb-20 md:pb-32">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2"></div>

      {/* CHANGED: pt-20 on mobile vs pt-32 on desktop */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20 md:pt-32">
        
        {/* Navigation Breadcrumb - Tighter margin mb-8 */}
        <Link href="/blog" className="group inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-8 md:mb-16">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
             <svg className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
             </svg>
          </div>
          Return to Index
        </Link>

        {/* 1. HEADER LOG */}
        <header className="mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
            </span>
            <p className="text-primary font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px]">
              Classified: {post.category}
            </p>
          </div>
          
          {/* Fluid Typography: smaller base size for mobile to prevent huge line breaks */}
          <h1 className="text-[2.2rem] xs:text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.95] md:leading-[0.9] text-foreground mb-8 md:mb-10 max-w-5xl uppercase">
            {post.title}
          </h1>
          
          {/* Telemetry Row - py-3 on mobile */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted border-y border-default/50 py-3 md:py-4">
            <div className="flex items-center gap-2">
              <span className="text-foreground/40">Author_</span>
              <span className="text-foreground">{post.author}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-default/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span className="text-foreground/40">Timestamp_</span>
              <span className="text-foreground">
                {new Date(post.published_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        {/* 2. ENGINEERED COVER FRAME - mb-10 on mobile */}
        {post.cover_image && (
          <div className="relative mb-10 md:mb-24 group">
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-tr from-primary/20 to-violet-500/20 rounded-[1.8rem] md:rounded-[2.5rem] blur-xl opacity-30 transition-opacity duration-700"></div>
            
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] border border-default/50 bg-foreground/[0.02] p-1.5 md:p-4 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="relative rounded-[1rem] md:rounded-[1.5rem] overflow-hidden">
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full h-[240px] xs:h-[300px] md:h-[500px] lg:h-[600px] object-cover grayscale-[10%]" 
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CONTENT CORE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 relative">
          
          {/* Right Main: Execution Body (Higher priority for mobile) */}
          <div className="lg:col-span-8">
            <div 
              className="
                prose 
                dark:prose-invert 
                max-w-none
                
                /* Responsive Headings */
                prose-headings:text-foreground
                prose-headings:font-black 
                prose-headings:tracking-tight 
                prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:mt-10 md:prose-h2:mt-16 prose-h2:mb-4 prose-h2:border-b prose-h2:border-default/30 prose-h2:pb-3
                prose-h3:text-lg md:prose-h3:text-2xl prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:mb-3
                
                /* Body Text */
                prose-p:text-muted 
                prose-p:leading-relaxed 
                prose-p:text-base md:prose-p:text-[19px]
                prose-p:mb-6 md:prose-p:mb-8 prose-p:font-medium
                
                /* Lists */
                prose-li:text-muted prose-li:text-base md:prose-li:text-lg prose-li:font-medium
                prose-ul:border-l border-default/30 prose-ul:pl-4 md:prose-ul:pl-6
                
                /* Blockquotes */
                prose-blockquote:bg-foreground/[0.02] 
                prose-blockquote:border-l-4 prose-blockquote:border-primary 
                prose-blockquote:py-4 md:prose-blockquote:py-6 prose-blockquote:px-6 md:prose-blockquote:px-8 prose-blockquote:rounded-r-xl
                prose-blockquote:text-base md:prose-blockquote:text-lg prose-blockquote:text-foreground/90 prose-blockquote:not-italic
              "
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          {/* Left Sidebar: Moved below content on mobile or hidden if redundant */}
          <aside className="lg:col-span-4 sticky top-32 h-fit hidden lg:block">
             <div className="bg-foreground/[0.02] border border-default/50 rounded-[2rem] p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-default/30">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground">Exec. Summary</h3>
                </div>
                
                <p className="text-sm font-medium leading-relaxed text-muted mb-8 italic">
                  "{post.excerpt}"
                </p>

                <div className="space-y-4 pt-6 border-t border-default/30">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted">
                    <span>Status</span>
                    <span className="text-green-500">Live_Node</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted">
                    <span>Security</span>
                    <span className="text-foreground">Public_Access</span>
                  </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </main>
  );
}