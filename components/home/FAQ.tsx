'use client';

import { useState } from 'react';

const faqs = [
  { 
    q: "Why is local SEO critical for my business?", 
    a: "Local SEO ensures you capture high-intent customers right in your service area. When someone searches for your services, we structure your digital footprint to guarantee you dominate the top spots on Google Search and Maps." 
  },
  { 
    q: "How long does it take to design and launch a custom platform?", 
    a: "A standard high-performance website takes 3 to 6 weeks from initial strategy to deployment. More complex web applications, booking systems, or large-scale e-commerce platforms typically take 8 to 12 weeks to engineer perfectly." 
  },
  { 
    q: "Do you use templates like WordPress or Wix?", 
    a: "No. We engineer bespoke digital platforms from the ground up using modern, enterprise-grade tech stacks like Next.js, React, and Supabase. This ensures lightning-fast load times, bank-level security, and limitless scalability that templates simply cannot offer." 
  },
  { 
    q: "How do you measure the ROI of your marketing campaigns?", 
    a: "We track every single interaction. From form submissions and direct phone calls to e-commerce conversions, you will receive transparent, real-time analytics showing exactly how your investment is translating into hard revenue." 
  },
  { 
    q: "Do you offer ongoing maintenance and hosting?", 
    a: "Absolutely. Digital growth is an ongoing process. We offer comprehensive retention packages that include premium global hosting, automated security patching, continuous SEO optimization, and priority content updates." 
  },
  { 
    q: "Do you work with startups, or only established brands?", 
    a: "We partner with ambitious companies of all sizes. Whether you are a local startup looking to disrupt your neighborhood or an established enterprise scaling globally, we engineer solutions specifically tailored to your current growth stage." 
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
        
        {/* Left Column: Sticky Header */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-32">
            <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 pl-1">
              Intelligence & Clarity
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
              COMMON <br />
              <span className="text-muted">INQUIRIES.</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed font-medium max-w-md mb-8">
              Everything you need to know about our engineering process, timelines, and how we scale your business.
            </p>
            
            <a href="/contact" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors group">
              Still have questions? 
              <span className="w-8 h-px bg-primary group-hover:bg-foreground transition-colors"></span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Accordion */}
        <div className="lg:col-span-7">
          <div className="border-t border-default">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              
              return (
                <div 
                  key={i} 
                  className="border-b border-default group"
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full py-8 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <h3 className={`text-xl md:text-2xl font-black tracking-tight pr-8 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary/70'}`}>
                      {faq.q}
                    </h3>
                    
                    {/* Animated Plus/Minus Icon */}
                    <div className={`relative flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-primary bg-primary text-white rotate-180' : 'border-default text-muted group-hover:border-primary group-hover:text-primary'}`}>
                      <span className="absolute w-3 h-[2px] bg-current rounded-full"></span>
                      <span className={`absolute w-3 h-[2px] bg-current rounded-full transition-transform duration-300 ${isOpen ? 'rotate-0 opacity-0' : 'rotate-90'}`}></span>
                    </div>
                  </button>

                  {/* Smooth Height Animation Wrapper */}
                  <div 
                    className="grid transition-all duration-500 ease-[0.22,1,0.36,1]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-8 text-muted text-lg leading-relaxed pr-4 md:pr-12">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}