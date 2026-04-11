import { useState } from 'react';

const KICKSERV_URL = 'https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new';

interface BidMetrics {
  asphaltTons: number;
  stoneTons: number;
  totalProjected: number;
}

interface BidResult {
  estimate: string;
  metrics: BidMetrics;
}

export default function ContactForm() {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState('');
  const [bidLoading, setBidLoading] = useState(false);
  const [bidResult, setBidResult] = useState<BidResult | null>(null);
  const [bidError, setBidError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const addressVal = (form.elements.namedItem('address') as HTMLInputElement)?.value || '';
    const sqftVal = Number((form.elements.namedItem('sqft') as HTMLInputElement)?.value || 0);
    const soilTypeVal = (form.elements.namedItem('soilType') as HTMLSelectElement)?.value || '';
    const regionVal = (form.elements.namedItem('region') as HTMLInputElement)?.value || '';

    const cityMatch = addressVal.match(/,\s*([^,]+),?\s*VA/i);
    const detectedCity = cityMatch ? cityMatch[1].trim() : (regionVal || 'Richmond');
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

    // Call the Worden Brain AI bidder if sqft is provided
    if (sqftVal > 0) {
      setBidLoading(true);
      setBidError(null);
      setBidResult(null);
      try {
        const response = await fetch('/.netlify/functions/worden-bidder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: addressVal,
            sqft: sqftVal,
            soilType: soilTypeVal,
            region: regionVal || detectedCity,
          }),
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data: BidResult = await response.json();
        setBidResult(data);
      } catch (err) {
        setBidError(err instanceof Error ? err.message : 'Unable to generate AI estimate at this time. Please submit your request via the Kickserv button below or call us at 804-446-1296 for immediate assistance.');
      } finally {
        setBidLoading(false);
      }
    }
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
          {/* Worden Brain AI Estimate */}
          {bidLoading && (
            <div className="mb-8 p-6 border border-[#ffcc00]/30 bg-black/40">
              <p className="text-[#ffcc00] font-black uppercase tracking-widest text-sm animate-pulse">
                ⚙️ Worden Brain Generating Your AI Estimate...
              </p>
            </div>
          )}
          {bidError && (
            <div className="mb-8 p-6 border border-red-500/40 bg-red-900/10 text-left">
              <p className="text-red-400 font-bold text-sm">{bidError}</p>
            </div>
          )}
          {bidResult && (
            <div className="mb-8 text-left">
              <div className="bg-[#ffcc00] text-black px-6 py-3 mb-0">
                <h4 className="font-black uppercase tracking-widest text-xs">🧠 Worden Brain — AI-Generated Estimate</h4>
              </div>
              <div className="bg-black/60 border border-[#ffcc00]/20 p-6 mb-4">
                <p className="text-white font-medium text-sm leading-relaxed whitespace-pre-line">{bidResult.estimate}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-900 border border-zinc-700 p-4 text-center">
                  <p className="text-[#ffcc00] font-black text-lg">{bidResult.metrics.asphaltTons.toFixed(1)}</p>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest font-bold mt-1">Asphalt Tons</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 p-4 text-center">
                  <p className="text-[#ffcc00] font-black text-lg">{bidResult.metrics.stoneTons.toFixed(1)}</p>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest font-bold mt-1">Stone Base Tons</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 p-4 text-center">
                  <p className="text-[#ffcc00] font-black text-lg">${bidResult.metrics.totalProjected.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest font-bold mt-1">Est. Materials</p>
                </div>
              </div>
            </div>
          )}

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
            onClick={() => { setSubmitted(false); setBidResult(null); setBidError(null); }}
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
        <div className="mb-8">
          <label htmlFor="soilType" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Soil / Site Condition</label>
          <select id="soilType" name="soilType" className="w-full bg-black border border-zinc-800 text-[#ffcc00] p-4 focus:border-[#ffcc00] outline-none transition-colors appearance-none shadow-inner font-black uppercase text-sm">
            <option value="">Unknown / Standard</option>
            <option value="Clay">Clay (Worden Clay Stabilization Required)</option>
            <option value="Sandy">Sandy / Loose Fill</option>
            <option value="Rocky">Rocky / Hard Base</option>
            <option value="Gravel">Existing Gravel Base</option>
          </select>
        </div>
        <div className="mb-8">
          <label htmlFor="region" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Region / City or State</label>
          <input
            type="text"
            id="region"
            name="region"
            className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold"
            placeholder="e.g. Richmond, Chicago, Illinois, 23221"
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
          🧠 Get AI Estimate — Worden Brain Dispatch
        </button>

        <p className="mt-8 text-xs text-zinc-500 text-center italic font-bold uppercase tracking-widest">
          Authorized Kickserv® Dispatch Point • 4th-Gen Integrity Guaranteed
        </p>
      </form>
    </div>
  );
}
