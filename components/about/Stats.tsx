export default function Stats() {
  const stats = [
    { label: "Ad Spend Deployed", value: "₹50L+", suffix: "INR" },
    { label: "Leads Engineered", value: "12k+", suffix: "VOL" },
    { label: "Local Partners", value: "65+", suffix: "ACT" },
    { label: "Coffee Consumed", value: "∞", suffix: "MAX" },
  ];

  return (
    <div className="bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {/* Glassmorphic Data Panel */}
        <div className="bg-foreground/[0.02] backdrop-blur-xl border border-default/50 rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-default/30">
          
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
              <div className="flex items-start gap-1 mb-2">
                <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground">
                  {s.value}
                </p>
                <span className="text-[10px] font-bold text-primary mt-2">{s.suffix}</span>
              </div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}