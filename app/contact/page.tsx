import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import MapSection from '@/components/contact/MapSection';

export const metadata: Metadata = {
  title: 'Get a Free Growth Audit | Contact Creativoxa Siliguri',
  description: 'Ready to dominate the Siliguri market? Contact Creativoxa for a free SEO and Digital Marketing consultation. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <main className="bg-background">
      <ContactHero />
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Info */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
          
          {/* Right Side: Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
      <MapSection />
    </main>
  );
}