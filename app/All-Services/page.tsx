import type { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceList from '@/components/services/ServiceList';
import IndustryFocus from '@/components/services/IndustryFocus';
import Process from '@/components/home/Process'; // Reuse your existing process component
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Digital Excellence Services | Web, SEO & Ads in Siliguri | Creativoxa',
  description: 'Explore our data-driven services designed to scale Siliguri businesses. From high-performance web design to ROI-focused SEO and Paid Ads.',
};

export default function ServicesPage() {
  return (
    <main className="bg-background">
      <ServiceHero />
      <ServiceList />
      <IndustryFocus />
      <div className="bg-slate-50 dark:bg-slate-900/50">
        <Process />
      </div>
      <FinalCTA href="/work" label="See Our Work" subtext="Ready to review case studies?" />
    </main>
  );
}