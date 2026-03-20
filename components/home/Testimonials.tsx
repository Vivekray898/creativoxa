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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Client Reviews</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground">What Our Siliguri Clients Say.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border border-default flex flex-col hover:shadow-md transition-shadow">
              <div className="flex text-primary mb-4 text-sm">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
              <p className="text-muted italic mb-6 flex-grow">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold bg-primary/20 text-primary">
                  {r.initials}
                </div>
                <div>
                  <h5 className="font-bold text-foreground text-sm">{r.name}</h5>
                  <p className="text-xs text-muted">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}