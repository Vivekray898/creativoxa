import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory'; // Ensure NO typo in 'OurStory'
import Philosophy from '@/components/about/Philosophy';
import Stats from '@/components/about/Stats';
import TeamCulture from '@/components/about/TeamCulture';
import FinalCTA from '@/components/home/FinalCTA'; // Reuse your home CTA

export const metadata: Metadata = {
  title: 'Our Story | Why We Are Siliguri’s Top Digital Architects | Creativoxa',
  description: 'Discover the purpose behind Creativoxa. We moved away from generic marketing to build high-performance digital engines for local businesses in Siliguri.',
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <AboutHero />
      <Stats />
      <OurStory />
      <Philosophy />
      <TeamCulture />
      <div className="bg-background py-10">
        <FinalCTA href="/work" label="Explore Our Work" subtext="Liked our mission? See the outcomes we deliver." />
      </div>
    </main>
  );
}