'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      form_source: 'Main Contact Page'
    };

    const { error } = await supabase.from('enquiries').insert([payload]);

    if (!error) {
      setStatus('success');
      // Fire non-blocking email
      fetch('/api/send-enquiry', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-background p-12 rounded-3xl text-center animate-fade-in border border-default">
        <div className="text-6xl mb-6">🚀</div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">Message Received!</h3>
        <p className="text-muted">Our strategist will be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 md:p-12 rounded-3xl border border-default shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input 
          name="name" type="text" placeholder="Full Name *" required 
          className="w-full px-5 py-4 bg-background border border-default rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
        />
        <input 
          name="phone" type="tel" placeholder="Phone Number *" required 
          className="w-full px-5 py-4 bg-background border border-default rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
        />
      </div>
      <input 
        name="email" type="email" placeholder="Email Address *" required 
        className="w-full px-5 py-4 bg-background border border-default rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
      />
      <textarea 
        name="message" rows={5} placeholder="Tell us about your project goals..." 
        className="w-full px-5 py-4 bg-background border border-default rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
      />
      
      <button 
        disabled={status === 'loading'}
        className="btn-primary w-full md:w-auto !px-12 !py-4 text-lg"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
    </form>
  );
}