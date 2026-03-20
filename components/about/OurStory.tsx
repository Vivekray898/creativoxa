export default function OurStory() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-primary font-bold uppercase text-sm mb-3">Our Origins</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              From a Freelance Desk to a Full-Scale Digital Powerhouse.
            </h3>
            <p className="text-muted text-lg mb-6 leading-relaxed">
              Creativoxa didn't start in a fancy boardroom. It started in Siliguri with a laptop and a realization: most local businesses were being overcharged for websites that didn't work and marketing that didn't convert.
            </p>
            <p className="text-muted text-lg mb-6 leading-relaxed">
              We decided to build something different. An agency that treats your marketing budget like our own money. We spent years mastering the "Science of Search" and the "Art of Conversion" to ensure that when we build something, it creates wealth for our clients.
            </p>
            <div className="bg-background p-6 rounded-2xl border border-default shadow-sm inline-block">
              <p className="text-foreground font-bold text-xl italic">
                "We don't just build assets; we build legacies."
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
             <div className="aspect-square bg-primary/30 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/images/about-story-visual.webp" 
                  alt="Creativoxa Workspace" 
                  className="w-full h-full object-cover opacity-80"
                />
             </div>
             {/* Decorative Element */}
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          </div>
        </div>
      </div>
    </section>
  );
}