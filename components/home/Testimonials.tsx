export default function Testimonials() {
  const reviews = [
    { 
      name: "Ravi Kumar", 
      role: "SpiceNest Restaurants", 
      initials: "RK", 
      text: "Creativoxa is without a doubt the best digital marketing agency in Siliguri. Their SEO strategy put us on the first page of Google, and our local traffic has skyrocketed."
    },
    { 
      name: "Priya Singh", 
      role: "Himalayan View Hotel", 
      initials: "PS", 
      text: "The website they designed for our hotel in Siliguri is not only beautiful but also incredibly fast. They don't use jargon, they just deliver results."
    },
    { 
      name: "Amit Agarwal", 
      role: "Siliguri Retail Co.", 
      initials: "AA", 
      text: "Their social media team understands the Siliguri market perfectly. They've built a thriving community around our brand and boosted our awareness."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 🔥 Premium Split Header */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 pl-1">
              Client Impact
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              VALIDATED BY <br className="hidden md:block" />
              <span className="text-muted">LEADERS.</span>
            </h2>
          </div>
          
          <div className="max-w-md lg:border-l-2 lg:border-primary lg:pl-8">
            <p className="text-muted text-lg font-medium leading-relaxed">
              We partner with visionary local brands in Siliguri to engineer digital growth that translates directly into revenue and market dominance.
            </p>
          </div>
        </div>

        {/* 🧱 Architectural Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="group relative p-8 md:p-10 rounded-[2rem] border border-default bg-background/50 backdrop-blur-xl hover:bg-foreground/[0.02] hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col h-full overflow-hidden"
            >
              
              {/* Massive Quote Watermark */}
              <span className="absolute -top-4 -right-2 text-[10rem] font-serif text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-700 pointer-events-none select-none leading-none">
                "
              </span>

              {/* Minimalist Star Rating */}
              <div className="flex gap-1 text-primary mb-8 relative z-10">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fas fa-star text-sm"></i>
                ))}
              </div>

              {/* Editorial Quote Text */}
              <p className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight text-foreground mb-12 flex-grow group-hover:text-primary transition-colors duration-300 relative z-10">
                "{r.text}"
              </p>

              {/* Client Info (Bottom Border Anchored) */}
              <div className="flex items-center gap-4 pt-6 border-t border-default relative z-10">
                {/* Magic Hover Line over the border */}
                <div className="absolute top-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
                
                {/* Avatar Box */}
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center font-bold text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  {r.initials}
                </div>
                
                {/* Name & Role */}
                <div>
                  <h5 className="font-black tracking-tight text-foreground text-base">
                    {r.name}
                  </h5>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted mt-0.5">
                    {r.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}