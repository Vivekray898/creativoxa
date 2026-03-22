import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ToolsPage() {
  const { data: tools, error } = await supabase.from("tools").select("*");

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_40%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-32">
        
        {/* 🔥 HERO SECTION */}
        <header className="mb-20 md:mb-32">
          {/* Live System Status Badge */}
          <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            All Systems Operational
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter text-foreground leading-[0.85] mb-8">
            OPEN SOURCE <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-2 inline-block">
              COMPUTE.
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
              <p className="text-muted text-lg md:text-xl leading-relaxed font-medium border-l-4 border-primary pl-6 py-2">
                An open-source repository of high-performance utilities, calculators, and deployment modules engineered for scale. Zero paywalls. Unrestricted access.
              </p>
            </div>
          </div>
        </header>

        {/* 🧱 TOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools?.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="group block h-full">
              
              {/* Premium Module Design */}
              <div className="h-full flex flex-col bg-foreground/[0.02] border border-default/50 rounded-[2rem] hover:border-primary/50 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 backdrop-blur-xl">
                
                {/* Decorative Glowing Orb */}
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>

                {/* Card Header (Simulated Terminal Bar) */}
                <div className="px-8 py-5 border-b border-default/30 flex items-center justify-between relative z-10">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10 group-hover:bg-red-500/50 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10 group-hover:bg-yellow-500/50 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10 group-hover:bg-green-500/50 transition-colors"></div>
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-muted group-hover:text-primary transition-colors">
                    v1.0.0
                  </span>
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-default flex items-center justify-center mb-6 text-muted group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    <i className="fas fa-microchip text-xl"></i> 
                  </div>
                  
                  <h2 className="text-2xl font-black tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h2>
                  
                  <p className="text-muted text-sm leading-relaxed mb-8">
                    {tool.description}
                  </p>

                  {/* Animated "Launch" Footer */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-default/30">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                      Execute Module
                    </span>
                    <i className="fas fa-arrow-right text-muted group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"></i>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {(!tools || tools.length === 0) && !error && (
          <div className="text-center py-32 border border-dashed border-default rounded-[2rem] bg-foreground/[0.02]">
            <i className="fas fa-triangle-exclamation text-4xl text-muted mb-4 opacity-50"></i>
            <p className="text-muted font-bold tracking-widest uppercase text-sm">Modules Offline</p>
            <p className="text-muted text-xs mt-2">New tools are currently being engineered.</p>
          </div>
        )}
        
      </div>
    </main>
  );
}