export default function ContactInfo() {
  const details = [
    {
      title: "Headquarters",
      content: "Naresh More, East Chayan Para, Siliguri, WB 734006",
      icon: "fa-location-crosshairs",
      link: "https://maps.google.com/..." 
    },
    {
      title: "Direct Line",
      content: "+91 76795 87581",
      icon: "fa-phone-volume",
      link: "tel:+917679587581"
    },
    {
      title: "Digital Inquiries",
      content: "contact@creativoxa.in",
      icon: "fa-envelope-open-text",
      link: "mailto:contact@creativoxa.in"
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* 📡 Contact Data Points */}
      <div className="space-y-6">
        {details.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noreferrer" className="flex items-start gap-6 group p-4 -mx-4 rounded-2xl hover:bg-foreground/[0.02] border border-transparent hover:border-default/50 transition-all duration-300">
            <div className="w-14 h-14 shrink-0 bg-background border border-default rounded-[1rem] flex items-center justify-center text-foreground text-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
              <i className={`fas ${item.icon}`}></i>
            </div>
            <div className="pt-1">
              <h4 className="font-black text-foreground text-lg tracking-tight mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-muted text-sm font-medium leading-relaxed group-hover:text-foreground transition-colors">
                {item.content}
              </p>
            </div>
          </a>
        ))}
      </div>
      
      {/* 🚀 Engineered Timeline */}
      <div className="pt-12 border-t border-default/50">
        <p className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-8">
          Onboarding Protocol
        </p>
        
        <div className="relative pl-6 border-l border-default space-y-8">
          
          <div className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors ring-4 ring-background"></div>
            <h5 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">01. Technical Audit</h5>
            <p className="text-sm text-muted font-medium">We analyze your current digital architecture and market positioning.</p>
          </div>
          
          <div className="relative group">
            <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors ring-4 ring-background"></div>
            <h5 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">02. Strategy Alignment</h5>
            <p className="text-sm text-muted font-medium">A focused 15-minute discovery call to align on revenue targets.</p>
          </div>
          
          <div className="relative group">
            <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors ring-4 ring-background"></div>
            <h5 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">03. Execution Blueprint</h5>
            <p className="text-sm text-muted font-medium">You receive a custom, zero-fluff engineering roadmap to scale.</p>
          </div>

        </div>
      </div>
    </div>
  );
}