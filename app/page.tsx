import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustLogos from '@/components/home/TrustLogos';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Results from '@/components/home/Results';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Best Digital Marketing & SEO Agency in Siliguri | Creativoxa',
  description: 'Creativoxa is the #1 digital marketing and SEO agency in Siliguri. We offer expert SEO, web design, and performance marketing to grow your business.',
  alternates: { canonical: 'https://creativoxa.in/' },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustLogos />
      <Services />
      <WhyChooseUs /> {/* New Section */}
      <Results />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA href="/All-Services" label="Explore Services" subtext="Interested? Learn how we can build this for you." />
    </div>
  );
}