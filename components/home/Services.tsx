import Link from "next/link";
import { supabase } from '@/lib/supabase';

// 🔥 Keep the data fresh every 60 seconds
export const revalidate = 60;

// Type definition updated to match your database
type Service = {
  id: string;
  slug: string;
  title: string;
  description: string; // ✅ Updated here
  icon: string;
};

export default async function Services() {
  // 🔌 Updated select statement to use 'description'
  const { data: services, error } = await supabase
    .from('services')
    .select('id, slug, title, description, icon') // ✅ Updated here
    .order('created_at', { ascending: true });

  // Optional: Log any database errors to your terminal to help debug
  if (error) console.error("Supabase Error:", error);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 🔥 Premium Split Header */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 pl-1">
              Core Capabilities
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              DIGITAL <br className="hidden md:block" />
              <span className="text-muted">INFRASTRUCTURE.</span>
            </h2>
          </div>
          
          <div className="max-w-md lg:border-l-2 lg:border-primary lg:pl-8">
            <p className="text-muted text-lg font-medium leading-relaxed">
              We engineer predictable growth engines. From high-performance web architecture to aggressive acquisition campaigns, we build systems designed to scale.
            </p>
          </div>
        </div>

        {/* 🧱 Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services?.map((service: Service) => (
            <Link 
              key={service.id} 
              href={`/services/${service.slug}`} 
              className="group block h-full"
            >
              <div className="h-full flex flex-col p-8 md:p-10 rounded-[2rem] border border-default bg-background/50 backdrop-blur-xl hover:bg-foreground/[0.02] hover:border-primary/40 transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl">
                
                {/* Decorative Glowing Orb */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 text-foreground group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                  <i className={`fas ${service.icon} text-xl`}></i> 
                </div>
                
                {/* Text Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-black tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed font-medium mb-8">
                    {service.description} {/* ✅ Updated here */}
                  </p>
                </div>

                {/* Animated Footer Link */}
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors mt-auto pt-6 border-t border-default/30 relative z-10">
                  Explore Capability 
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out opacity-50"></div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}