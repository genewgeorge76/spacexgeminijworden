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

    if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag: Function }).gtag('event', 'estimate_intent', {
        event_category: 'demand_heatmap',
        event_label: detectedCity,
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
            High-Capacity Dispatch Available for {today}{city ? ` in ${city}` : ''} · 804-446-1296
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
    <div className="max-w-2xl mx-auto">
      {/* High-Conversion CTA Banner */}
      <div className="bg-[#ffcc00] text-black px-8 py-5 text-center mb-0 shadow-[0_0_30px_rgba(255,204,0,0.4)]">
        <p className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
          ⚡ Get Your Estimate Now — Stop Waiting for No-Show Paving Companies
        </p>
        <p className="text-sm font-bold mt-1 opacity-80">
          High-Capacity Dispatch Available for {today} · Chester HQ · 804-446-1296
        </p>
      </div>

      <form
        className="bg-[#1a1a1a] p-10 border border-zinc-800 text-left shadow-2xl font-sans"
        onSubmit={handleSubmit}
      >
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Full Name</label>
            <input type="text" id="name" name="name" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Phone Number</label>
            <input type="tel" id="phone" name="phone" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
          </div>
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Email Address</label>
          <input type="email" id="email" name="email" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
        </div>
        <div className="mb-8">
          <label htmlFor="address" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner"
            placeholder="e.g. 123 Main St, Richmond, VA 23221"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Scope</label>
          <select id="service" name="service" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors appearance-none shadow-inner">
            <option>Commercial Parking Lot — New Installation</option>
            <option>Commercial Parking Lot — Repair / Overlay</option>
            <option>Residential Driveway — New Installation</option>
            <option>Residential Driveway — Repair / Overlay</option>
            <option>Tar &amp; Chip / Sealcoating</option>
            <option>Municipal / Industrial Project</option>
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
          <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Additional Project Details</label>
          <textarea id="message" name="message" rows={4} className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" placeholder="Describe access, drainage issues, existing damage, or special requirements..."></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#ffcc00] text-black font-black uppercase tracking-[0.2em] text-xl py-6 hover:bg-white transition-colors shadow-[0_0_30px_rgba(255,204,0,0.4)] border-4 border-transparent hover:border-[#ffcc00]"
        >
          ⚡ Get Your Estimate Now — Dispatch Now
        </button>
        <p className="mt-6 text-xs text-zinc-500 text-center italic font-medium">
          Secured by Kickserv · Same-day response · We respect your privacy.
        </p>
      </form>
    </div>
  );
}