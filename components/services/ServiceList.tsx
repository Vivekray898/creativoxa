import { supabase } from '@/lib/supabase';
import Link from 'next/link'; // ✅ 1. Imported Link

// 🔥 Keep the data fresh every 60 seconds
export const revalidate = 60;

// TypeScript type definitions
type Service = {
  id: string;
  slug: string; // ✅ 2. Added slug to type
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export default async function ServiceList() {
  // 🔌 3. Added 'slug' to the select query
  const { data: services, error } = await supabase
    .from('services')
    .select('id, slug, title, description, icon, features')
    .order('created_at', { ascending: true });

  if (error) console.error("Error fetching services:", error);

  return (
    <section className="py-24 lg:py-40 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-32 md:space-y-48">
          
          {services?.map((s: Service, i: number) => {
            const ghostNumber = String(i + 1).padStart(2, '0');

            return (
              <div key={s.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start group">
                
                {/* 🧱 Left: Sticky Details Context */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 relative">
                  
                  {/* Background Number Ghost */}
                  <div className="text-primary font-black text-6xl md:text-[8rem] opacity-10 group-hover:opacity-100 transition-opacity duration-700 absolute -top-10 md:-top-16 -left-4 -z-10 tracking-tighter leading-none">
                    {ghostNumber}
                  </div>
                  
                  {/* ✅ Title is now a clickable link */}
                  <Link href={`/services/${s.slug}`}>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-foreground hover:text-primary transition-colors duration-300">
                      {s.title}
                    </h3>
                  </Link>
                  
                  <p className="text-muted text-lg font-medium leading-relaxed mb-8">
                    {s.description}
                  </p>
                  
                  <div className="h-1.5 w-16 bg-foreground/10 group-hover:bg-primary transition-colors duration-500 rounded-full mb-8"></div>
                  
                  {/* ✅ Sleek Call to Action Button */}
                  <Link 
                    href={`/services/${s.slug}`} 
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link"
                  >
                    View System Blueprint
                    <i className="fas fa-arrow-right group-hover/link:translate-x-2 transition-transform duration-300"></i>
                  </Link>
                </div>
                
                {/* 📊 Right: Glassmorphic Specification Widget */}
                <div className="lg:col-span-7 bg-foreground/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-default/50 hover:border-default transition-colors duration-500 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                  
                  {/* Internal Hover Glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
                  
                  <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-xs text-primary flex items-center gap-3">
                    <i className={`fas ${s.icon}`}></i> Included Specifications
                  </h4>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 relative z-10">
                    {(s.features || []).map((f: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4 text-sm font-bold text-foreground tracking-wide">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                          <i className="fas fa-check text-primary text-[10px]"></i>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}