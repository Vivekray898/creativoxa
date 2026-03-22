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
      <div className="h-full min-h-[500px] flex items-center justify-center bg-foreground/[0.02] p-8 md:p-12 rounded-[2rem] border border-default shadow-sm backdrop-blur-xl animate-fade-in relative overflow-hidden">
        {/* Success Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="text-center relative z-10">
          <div className="w-20 h-20 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-3xl mb-6 ring-1 ring-green-500/50">
            <i className="fas fa-check"></i>
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-3 text-foreground">Transmission <br/> Successful.</h3>
          <p className="text-muted font-medium">Our lead strategist will process your data and initiate contact within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Abstract Form Glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6 bg-background/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-default shadow-2xl">
        <div className="mb-8">
          <h3 className="text-2xl font-black tracking-tight text-foreground mb-2">Project Details</h3>
          <p className="text-muted text-sm font-medium">All information is securely encrypted and kept strictly confidential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            name="name" type="text" placeholder="Full Name *" required 
            className="w-full px-6 py-5 bg-foreground/[0.02] border border-default/50 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted/60 font-medium"
          />
          <input 
            name="phone" type="tel" placeholder="Phone Number *" required 
            className="w-full px-6 py-5 bg-foreground/[0.02] border border-default/50 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted/60 font-medium"
          />
        </div>
        <input 
          name="email" type="email" placeholder="Email Address *" required 
          className="w-full px-6 py-5 bg-foreground/[0.02] border border-default/50 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted/60 font-medium"
        />
        <textarea 
          name="message" rows={5} placeholder="Detail your project objectives and revenue goals..." 
          className="w-full px-6 py-5 bg-foreground/[0.02] border border-default/50 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted/60 font-medium resize-none"
        />
        
        <button 
          disabled={status === 'loading'}
          className="group relative w-full inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-5 rounded-xl text-sm font-black tracking-widest uppercase overflow-hidden transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"></div>
          <span className="relative z-10">
            {status === 'loading' ? 'Processing...' : 'Initialize Project'}
          </span>
          {!status && <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform duration-300"></i>}
        </button>

        {status === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center animate-fade-in">
            <i className="fas fa-triangle-exclamation mr-2"></i> Connection failed. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}