import { useState } from 'react';

const KICKSERV_URL = 'https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new';

export default function ContactForm() {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const addressVal = (form.elements.namedItem('address') as HTMLInputElement)?.value || '';
    const cityMatch = addressVal.match(/,\s*([^,]+),?\s*VA/i);
    const detectedCity = cityMatch ? cityMatch[1].trim() : 'Richmond';
    setCity(detectedCity);

    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', 'estimate_intent', {
        event_category: 'demand_heatmap',
        event_label: detectedCity,
      });
      win.gtag('event', 'generate_lead', {
        event_category: 'contact',
        event_label: detectedCity,
        value: 1,
      });
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#ffcc00] text-black px-8 py-5 text-center mb-0 shadow-[0_0_30px_rgba(255,204,0,0.4)]">
          <p className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
            ⚡ Request Received — One Step Left!
          </p>
          <p className="text-sm font-bold mt-1 opacity-80">
            High-Capacity Dispatch Available for {today}{city ? ` in ${city}` : ''} ·{' '}
            <a href="tel:+18044461296" className="underline hover:opacity-70">804-446-1296</a>
          </p>
        </div>
        <div className="bg-[#1a1a1a] p-10 border border-zinc-800 text-center shadow-2xl font-sans">
          <p className="text-white font-bold text-xl mb-8">
            To complete your dispatch request, click the button below to submit your details directly to our Kickserv scheduling system.
          </p>
          <a
            href={KICKSERV_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const w = window as unknown as { gtag?: (...args: unknown[]) => void };
              // TODO: Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
              if (w.gtag) w.gtag('event', 'conversion', { event_category: 'kickserv_dispatch', send_to: 'G-XXXXXXXXXX' });
            }}
            className="inline-block w-full bg-[#ffcc00] text-black font-black uppercase tracking-[0.2em] text-xl py-6 text-center hover:bg-white transition-colors shadow-[0_0_30px_rgba(255,204,0,0.4)] border-4 border-transparent hover:border-[#ffcc00]"
          >
            ⚡ Complete My Kickserv Dispatch →
          </a>
          <p className="mt-6 text-xs text-zinc-500 italic font-medium">
            Secured by Kickserv · Same-day response · We respect your privacy.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest font-bold transition-colors"
          >
            ← Edit My Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* AUTHORITY HEADER — Stop Waiting */}
      <div className="bg-[#ffcc00] text-black p-6 text-center shadow-[0_0_30px_rgba(255,204,0,0.4)]">
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
          Stop Waiting for "No-Show" Paving Companies
        </h3>
        <p className="font-bold uppercase text-xs mt-1 tracking-widest opacity-80">
          Dispatch a 4th-Generation Estimator Immediately
        </p>
        <p className="text-sm font-bold mt-1 opacity-70">
          High-Capacity Dispatch Available for {today} · Chester HQ ·{' '}
          <a href="tel:+18044461296" className="underline hover:opacity-70">804-446-1296</a>
        </p>
      </div>

      <form
        className="bg-[#1a1a1a] p-10 border border-zinc-800 text-left shadow-2xl font-sans"
        onSubmit={handleSubmit}
      >
        {/* KICKSERV INTEGRATION TAGS (Hidden) */}
        <input type="hidden" name="_subject" value="New J. Worden & Sons Dispatch Request" />
        <input type="hidden" name="source" value="Website - Kickserv Sync" />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Full Name</label>
            <input type="text" id="name" name="name" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Dispatch Phone</label>
            <input type="tel" id="phone" name="phone" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold" placeholder="(804) 000-0000" required />
          </div>
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Email Address</label>
          <input type="email" id="email" name="email" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
        </div>
        <div className="mb-8">
          <label htmlFor="address" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Site Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold"
            placeholder="123 Main St, Richmond, VA"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Structural Scope</label>
          <select id="service" name="service" className="w-full bg-black border border-zinc-800 text-[#ffcc00] p-4 focus:border-[#ffcc00] outline-none transition-colors appearance-none shadow-inner font-black uppercase text-sm">
            <option>Residential Driveway (6" Base Standard)</option>
            <option>Commercial Parking Lot (Industrial Grade)</option>
            <option>Premium Tar &amp; Chip (Macadam)</option>
            <option>Municipal-Grade Sealcoating</option>
            <option>Other / Not Sure</option>
          </select>
        </div>
        <div className="mb-8">
          <label htmlFor="sqft" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Estimated Square Footage</label>
          <input
            type="number"
            id="sqft"
            name="sqft"
            min="0"
            className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner"
            placeholder="e.g. 2500"
          />
        </div>
        <div className="mb-10">
          <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Details / Deadlines</label>
          <textarea id="message" name="message" rows={4} className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-medium" placeholder="Tell us about your project..."></textarea>
        </div>

        <button
          type="submit"
          className="group relative w-full bg-[#ffcc00] text-black font-black uppercase tracking-tighter text-2xl md:text-3xl py-6 hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(255,204,0,0.3)] border-b-8 border-black/20 hover:border-black/10 active:border-b-0 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          ⚡ Get Your Estimate Now — Dispatch Now
        </button>

        <p className="mt-8 text-xs text-zinc-500 text-center italic font-bold uppercase tracking-widest">
          Authorized Kickserv® Dispatch Point • 4th-Gen Integrity Guaranteed
        </p>
      </form>
    </div>
  );
}
