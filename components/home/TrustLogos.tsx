'use client';

export default function TrustLogos() {
  const brands = [
    "Safar Tour", "Sana Clothing", "Fundgrube Bestpreis", 
    "Spice Lounge", "Loanzaar", "GreenAce Developer", "Markqent"
  ];

  // We double the array to ensure a seamless infinite loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="bg-background py-16 md:py-24 border-b border-default overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2">
              Our Network
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
              TRUSTED BY <span className="text-muted-foreground/40">INDUSTRY LEADERS.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground font-medium max-w-[300px] md:text-right">
            Powering 50+ growing brands across North Bengal with digital excellence.
          </p>
        </div>
      </div>

      {/* INFINITE TICKER CONTAINER */}
      <div className="relative flex flex-col gap-8">
        {/* Fading Edge Masks (Native App feel) */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* The Marquee Row */}
        <div className="flex w-max animate-marquee pause-on-hover">
          {duplicatedBrands.map((brand, i) => (
            <div 
              key={`${brand}-${i}`}
              className="flex items-center justify-center px-8 md:px-16 group"
            >
              <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground/20 group-hover:text-primary transition-all duration-500 whitespace-nowrap uppercase italic select-none">
                {brand}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Add a subtle stat counter below */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Client Retention", value: "98%" },
          { label: "Projects Delivered", value: "120+" },
          { label: "Local Impact", value: "North Bengal" },
          { label: "Studio Rating", value: "4.9/5" },
        ].map((stat) => (
          <div key={stat.label} className="border-l border-default pl-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Custom Styles for the Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}