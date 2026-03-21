'use client';
import { useState } from 'react';
import Link from 'next/link';

const projects = [
  {
    title: "Safar Tour",
    category: "Tourism",
    link: "https://safartour.in/",
    tags: ["Booking System", "SEO"],
    image: "/work/safartour.png" // Add your screenshots to public/work/
  },
  {
    title: "Sana Clothing",
    category: "E-commerce",
    link: "https://sanaclothing.com/",
    tags: ["Fashion", "Shopify"],
    image: "/work/sana.png"
  },
  {
    title: "Fundgrube Bestpreis",
    category: "Retail",
    link: "http://fundgrube-bestpreis.de/",
    tags: ["German Market", "E-commerce"],
    image: "/work/fundgrube.png"
  },
  {
    title: "Spice Lounge",
    category: "Hospitality",
    link: "https://spice-lounge.eu/",
    tags: ["Restaurant", "UI/UX"],
    image: "/work/spice.png"
  },
  {
    title: "Loanzaar",
    category: "Fintech",
    link: "https://loanzaar.in/",
    tags: ["Finance", "Lead Gen"],
    image: "/work/loanzaar.png"
  },
  {
    title: "GreenAce Developer",
    category: "Real Estate",
    link: "https://greenacedeveloper.com/",
    tags: ["Real Estate", "Landing Page"],
    image: "/work/greenace.png"
  },
  {
    title: "Markqent",
    category: "Corporate",
    link: "https://markqent.com/",
    tags: ["Marketing Agency", "B2B"],
    image: "/work/markqent.png"
  }
];

const categories = ["All", "E-commerce", "Tourism", "Hospitality", "Fintech", "Real Estate"];

export default function WorkGrid() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                ${filter === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "bg-background text-muted hover:text-foreground border border-default"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <Link href={project.link} target="_blank">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-background border border-default">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Info */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-foreground/85 via-foreground/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{project.category}</p>
                    <div className="flex gap-2">
                       {project.tags.map(tag => (
                         <span key={tag} className="text-[10px] text-white/70 border border-white/20 px-2 py-1 rounded-md">{tag}</span>
                       ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{project.title}</h3>
                    <p className="text-muted text-sm">{project.category} Strategy</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-default flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <i className="fas fa-arrow-up-right-from-square text-sm group-hover:text-white transition-colors"></i>
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