import { supabase } from '@/lib/supabase';
import { Post } from '@/types/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase.from('posts').select('title, excerpt').eq('slug', slug).single();
  if (!post) return { title: 'Post Not Found' };
  return { title: `${post.title} | Journal`, description: post.excerpt };
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
    <article className="bg-background min-h-screen">
      {/* 1. TIGHTER HEADER - Drastically reduced pt-24 to pt-8 / pt-12 */}
      <header className="pt-8 md:pt-12 pb-8 md:pb-10 border-b border-default relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-4 mb-4 justify-center">
             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                {post.category}
             </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground text-center mb-6 max-w-3xl mx-auto">
            {post.title}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
             <div className="flex items-center gap-2">
               <span className="text-foreground">Written by</span>
               <span className="text-primary">{post.author}</span>
             </div>
             <div className="hidden md:block w-1.5 h-1.5 bg-default rounded-full"></div>
             <div>Published {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      </header>

      {/* 2. SMALLER, CONTAINED COVER */}
      {post.cover_image && (
        <div className="w-full px-4 sm:px-6 mt-8 mb-12">
          <div className="max-w-5xl mx-auto rounded-[1.5rem] overflow-hidden border border-default shadow-lg">
            <img 
              src={post.cover_image} 
              alt={post.title} 
              className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-[400px] object-cover" 
            />
          </div>
        </div>
      )}

      {/* 3. COMPACT CONTENT CORE */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
        
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 h-fit">
           <div className="border-l-2 border-primary pl-6 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">Summary</p>
              <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
                "{post.excerpt}"
              </p>
              <div className="pt-2">
                <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest text-primary hover:tracking-[0.2em] transition-all flex items-center gap-2">
                  <i className="fas fa-arrow-left"></i> Back to Journal
                </Link>
              </div>
           </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-8 lg:col-start-5">
          <div 
            className="
              prose 
              dark:prose-invert 
              max-w-none
              
              /* Headings reduced and tightened */
              prose-headings:text-foreground
              prose-headings:font-black 
              prose-headings:tracking-tight 
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              
              /* Body Text properly scaled */
              prose-p:text-foreground/90 
              prose-p:leading-relaxed 
              prose-p:text-base sm:prose-p:text-[17px]
              prose-p:mb-5
              
              /* Lists & Formatting */
              prose-li:text-foreground/90
              prose-strong:text-foreground
              
              /* Blockquote refined */
              prose-blockquote:border-l-primary
              prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50
              prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
              prose-blockquote:text-base prose-blockquote:not-italic
              
              /* Links */
              prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              
              /* Images */
              prose-img:rounded-2xl prose-img:border prose-img:border-default prose-img:my-8
            "
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </main>
      </div>
    </article>
  );
}