export default function ContactInfo() {
  const details = [
    {
      title: "Visit Our Studio",
      content: "Naresh More, East Chayan Para, Siliguri, WB 734006",
      icon: "fa-map-marker-alt",
      link: "https://maps.app.goo.gl/..." 
    },
    {
      title: "Direct Line",
      content: "+91 76795 87581",
      icon: "fa-phone-alt",
      link: "tel:+917679587581"
    },
    {
      title: "Email Queries",
      content: "contact@creativoxa.in",
      icon: "fa-envelope",
      link: "mailto:contact@creativoxa.in"
    }
  ];

  return (
    <div className="space-y-10">
      {details.map((item, i) => (
        <div key={i} className="flex gap-6 group">
          <div className="w-12 h-12 shrink-0 bg-background border border-default rounded-2xl flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all">
            <i className={`fas ${item.icon}`}></i>
          </div>
          <div>
            <h4 className="font-bold text-foreground text-lg mb-1">{item.title}</h4>
            <a href={item.link} className="text-muted hover:text-primary transition-colors">
              {item.content}
            </a>
          </div>
        </div>
      ))}
      
      <div className="pt-10 border-t border-default">
        <h4 className="font-bold mb-4">What happens next?</h4>
        <ul className="space-y-4 text-sm text-muted">
          <li className="flex gap-3">
            <span className="text-primary font-bold">01.</span>
            We review your website and current rankings.
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">02.</span>
            We jump on a 15-min discovery call.
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">03.</span>
            You get a custom growth roadmap (No fluff).
          </li>
        </ul>
      </div>
    </div>
  );
}