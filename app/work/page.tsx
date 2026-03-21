import type { Metadata } from 'next';
import WorkHero from '@/components/work/WorkHero';
import WorkGrid from '@/components/work/WorkGrid';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Our Portfolio | Case Studies in Digital Growth | Creativoxa',
  description: 'Explore the digital engines we’ve built for brands globally. From Siliguri startups to European e-commerce giants.',
};

export default function WorkPage() {
  return (
    <main className="bg-background">
      <WorkHero />
      <WorkGrid />
      <div className="mt-20">
        <FinalCTA />
      </div>
    </main>
  );
}