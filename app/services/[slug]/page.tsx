import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: service } = await supabase.from('services').select('title, desc').eq('slug', slug).single();
  if (!service) return { title: 'Service Not Found' };
  return { title: `${service.title} | Creativoxa Capabilities`, description: service.desc };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) notFound();

  return (
    <main className="bg-background min-h-screen relative overflow-hidden pb-32">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-32">
        
        {/* Navigation Breadcrumb */}
        <Link href="/All-Services" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-12 md:mb-16">
          <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          </div>
          Return to Capabilities
        </Link>

        {/* HEADER LOG */}
        <header className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <i className={`fas ${service.icon}`}></i>
            </div>
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
              System Blueprint
            </p>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-foreground mb-8">
            {service.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
            {service.desc}
          </p>
        </header>

        {/* CONTENT CORE */}
        <div className="bg-foreground/[0.02] border border-default/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <div 
            className="
              prose 
              dark:prose-invert 
              max-w-none
              
              prose-headings:text-foreground
              prose-headings:font-black 
              prose-headings:tracking-tight 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-default/30 prose-h2:pb-4
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              
              prose-p:text-muted 
              prose-p:leading-relaxed 
              prose-p:text-[19px]
              prose-p:mb-8 prose-p:font-medium
              
              prose-li:text-muted prose-li:text-lg prose-li:font-medium
              prose-ul:border-l border-default/30 prose-ul:pl-6
              
              prose-strong:text-foreground prose-strong:font-bold
              
              prose-a:text-primary prose-a:font-bold prose-a:no-underline 
              prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary transition-colors
            "
            dangerouslySetInnerHTML={{ __html: service.content }} 
          />
          
          {/* Call to Action Trigger */}
          <div className="mt-16 pt-8 border-t border-default/50">
             <Link href="/contact" className="inline-flex items-center gap-4 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20">
               Deploy This System <i className="fas fa-rocket"></i>
             </Link>
          </div>
        </div>

      </div>
    </main>
  );
}