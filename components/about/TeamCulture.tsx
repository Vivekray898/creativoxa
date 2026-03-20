export default function TeamCulture() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/images/siliguri-office.webp" 
              alt="Creativoxa Team" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-0"></div>
          </div>
          
          <div>
            <h2 className="text-primary font-bold uppercase text-sm mb-3">Community First</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Empowering North Bengal’s Digital Economy.
            </h3>
            <p className="text-muted text-lg mb-6 leading-relaxed">
              We saw talented business owners in Siliguri, Matigara, and Bagdogra struggling to compete with national brands because of poor digital presence. 
            </p>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Our mission isn't just "Marketing." It's about providing the technical backbone so that a local hotel or restaurant can stand taller than a multi-national chain.
            </p>
            <div className="flex items-center gap-4 text-foreground font-bold">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                <i className="fas fa-check"></i>
              </div>
              <span>Officially registered & GST compliant (19EXRPP1056D1Z5)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}