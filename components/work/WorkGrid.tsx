'use client';
import Link from 'next/link';

const projects = [
  {
    id: "01",
    title: "Safar Tour",
    category: "Tourism",
    link: "https://safartour.in/",
    tags: ["Booking System", "SEO"],
    image: "/work/safartour.png",
    size: "large" // Spans more width
  },
  {
    id: "02",
    title: "Sana Clothing",
    category: "E-commerce",
    link: "https://sanaclothing.com/",
    tags: ["Fashion", "Shopify"],
    image: "/work/sana.png",
    size: "small"
  },
  {
    id: "03",
    title: "Markqent",
    category: "B2B",
    link: "https://markqent.com/",
    tags: ["Marketing", "Corporate"],
    image: "/work/markqent.png",
    size: "small"
  },
  {
    id: "04",
    title: "Spice Lounge",
    category: "Hospitality",
    link: "https://spice-lounge.eu/",
    tags: ["Restaurant", "UI/UX"],
    image: "/work/spice.png",
    size: "large"
  },
  {
    id: "05",
    title: "GreenAce",
    category: "Real Estate",
    link: "https://greenacedeveloper.com/",
    tags: ["Landing Page", "Lead Gen"],
    image: "/work/greenace.png",
    size: "large"
  },
  {
    id: "06",
    title: "Loanzaar",
    category: "Fintech",
    link: "https://loanzaar.in/",
    tags: ["Finance", "Lead Gen"],
    image: "/work/loanzaar.png",
    size: "small"
  },
    {
    id: "06",
    title: "Raju Machines",
    category: "Machinery",
    link: "https://rmachinetool.com/",
    tags: ["Machinery", "Wordpress"],
    image: "/work/rmachine.png",
    size: "small"
  },
    {
    id: "06",
    title: "Greater Wellness",
    category: "Health & Fitness",
    link: "https://www.greaterwellnesspilates.au/",
    tags: ["Pilates", "Exercise"],
    image: "/work/greater.png",
    size: "small"
  }
];

export default function WorkGrid() {
  return (
    <section className="pb-24 md:pb-32 bg-background pt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 12-column sophisticated masonry layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`group flex flex-col col-span-1 
                ${project.size === 'large' ? 'md:col-span-8' : 'md:col-span-4'}
              `}
            >
              <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block relative h-full">
                
                {/* 01 / Image Container */}
                <div className="relative overflow-hidden rounded-[2rem] border border-default bg-slate-100 dark:bg-slate-900 aspect-[4/3] md:aspect-auto md:h-[450px] transition-all duration-700 ease-in-out group-hover:border-primary/50 group-hover:shadow-2xl">
                  
                  {/* Subtle Project Numbering inside the image */}
                  <span className="absolute top-6 right-8 text-foreground/10 dark:text-white/10 text-5xl font-black italic z-10 pointer-events-none group-hover:text-primary/20 transition-colors duration-500">
                    {project.id}
                  </span>

                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000 ease-in-out"
                  />
                  
                  {/* Frosted Glass Floating Bottom Info (Fixed for readability) */}
                  <div className="absolute bottom-4 left-4 right-4 p-5 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 z-20">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex gap-2 mb-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white px-2.5 py-1 bg-white/20 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-md">
                          {project.title}
                        </h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-arrow-up-right-from-square text-sm"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Metadata (Always visible architectural drafting line) */}
                <div className="mt-5 flex items-center justify-between px-2">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black tracking-tighter text-foreground leading-none mb-1 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-muted text-[10px] font-bold uppercase tracking-[0.3em]">
                      {project.category} Architecture
                    </p>
                  </div>
                  
                  {/* Expanding line element */}
                  <div className="h-px bg-default flex-grow mx-6 opacity-50 group-hover:bg-primary group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="text-muted group-hover:text-primary transition-colors duration-300">
                    <i className="fas fa-arrow-right -rotate-45"></i>
                  </div>
                </div>

              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}