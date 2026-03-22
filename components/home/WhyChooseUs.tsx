export default function WhyChooseUs() {
  const points = [
    { 
      title: "Hyper-Local Intelligence", 
      desc: "We understand the North Bengal demographic better than remote, 'big city' agencies. We build strategies that actually resonate with your local market.", 
      icon: "fa-map-location-dot" 
    },
    { 
      title: "Algorithmic Precision", 
      desc: "Zero guesswork. We utilize advanced heatmaps, A/B testing, and behavioral analytics to ensure every rupee you spend generates measurable ROI.", 
      icon: "fa-chart-network" 
    },
    { 
      title: "Performance-Based Partnerships", 
      desc: "We don't lock you into suffocating, long-term contracts. We believe in proving our value and earning your business every single month through hard results.", 
      icon: "fa-handshake-angle" 
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-12">
              <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 pl-1">
                The Creativoxa Advantage
              </p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
                BUILT BY <span className="text-muted">STRATEGISTS.</span><br />
                ENGINEERED TO <span className="text-primary">SELL.</span>
              </h2>
              <p className="text-muted text-lg font-medium leading-relaxed max-w-lg">
                Most marketing agencies focus solely on making things look "pretty." We focus on architecture that captures market share. Our approach fuses human psychology with high-end tech.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10 border-t border-default pt-10 relative">
              
              {/* Animated Progress Line */}
              <div className="absolute top-0 left-0 w-24 h-px bg-primary"></div>

              {points.map((p, i) => (
                <div key={i} className="group flex gap-6 items-start">
                  
                  {/* Icon Container */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm mt-1">
                    <i className={`fas ${p.icon} text-xl`}></i>
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h4 className="text-2xl font-black tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {p.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed font-medium">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image & Floating Badge */}
          <div className="order-1 lg:order-2 relative">
            
            {/* Engineered Image Frame */}
            <div className="relative p-2 rounded-[2.5rem] border border-default bg-foreground/[0.02] shadow-2xl">
              <div className="overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-square relative group">
                
                {/* Image Overlay/Hover Effect */}
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                
                {/* Ensure you have this image in your public/images folder */}
                <img 
                  src="/images/strategy-meeting.webp" 
                  alt="Creativoxa Strategy Execution" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                />
              </div>
            </div>

            {/* Glassmorphism Floating Badge */}
            <div className="absolute -bottom-10 -left-6 md:-left-12 p-8 rounded-[2rem] bg-background/80 backdrop-blur-2xl border border-default shadow-2xl z-20 hover:-translate-y-2 transition-transform duration-500">
              
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fas fa-trophy text-xl"></i>
                </div>
                <div>
                  <div className="flex text-primary text-xs gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                    Verified Results
                  </p>
                </div>
              </div>

              <h4 className="text-2xl font-black text-foreground tracking-tight leading-none mb-1">
                "Best in Siliguri"
              </h4>
              <p className="text-sm font-medium text-muted">
                Multiple Client Awards
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}