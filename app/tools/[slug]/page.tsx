import { supabase } from "@/lib/supabase";
import WordCounter from "@/components/tools/WordCounter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import MetaTagGenerator from "@/components/tools/MetaTagGenerator";
import Link from "next/link";

export const dynamic = "force-dynamic";

const componentMap: any = {
  WordCounter,
  ImageCompressor: ImageCompressor,
  MetaTagGenerator,
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: tool, error } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tool) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-background relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-black text-foreground mb-4 tracking-tighter">404</h1>
          <p className="text-muted font-bold tracking-widest uppercase text-sm mb-8">Module Not Found</p>
          <Link href="/tools" className="btn-secondary text-sm">Return to Index</Link>
          {error && <p className="text-xs text-red-500 mt-8 font-mono">ERR: {error.message}</p>}
        </div>
      </div>
    );
  }

  const ToolComponent = componentMap[tool.component];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pt-32 pb-32">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link href="/tools" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-12 md:mb-16">
          <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          </div>
          Return to Hub
        </Link>

        {/* 🔥 Premium Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-default/50 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                Active Environment
              </p>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
              {tool.name}
            </h1>
            <p className="text-muted text-lg leading-relaxed font-medium">
              {tool.description}
            </p>
          </div>

          {/* Decorative Meta Data */}
          <div className="hidden md:flex flex-col items-end gap-2 text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Latency</div>
            <div className="text-sm font-black text-green-500">12ms</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">Status</div>
            <div className="text-sm font-black text-foreground">Optimized</div>
          </div>
        </header>

        {/* 🧱 Secure Sandbox (The Tool Wrapper) */}
        <div className="bg-foreground/[0.02] backdrop-blur-xl border border-default/80 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative">
          {/* Subtle Top Border Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="text-center py-20">
              <i className="fas fa-code text-4xl text-muted mb-4 opacity-30"></i>
              <p className="text-muted font-bold tracking-widest uppercase text-xs">Awaiting Execution Engine</p>
            </div>
          )}
        </div>
        
      </div>
    </main>
  );
}