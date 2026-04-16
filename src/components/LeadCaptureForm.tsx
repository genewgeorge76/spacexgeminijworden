import { useState } from 'react';
import type { MapEstimateResult, LeadCapture } from '@/lib/estimator-engine';
import { formatLeadForPipeline } from '@/lib/estimator-engine';

/**
 * LeadCaptureForm — Contact info capture with Whale/Shark/Fish classification.
 * Appears after the user draws their project area and sees the estimate.
 * Formats leads for the lead_scoring.py pipeline and submits to Kickserv via
 * the server-side Netlify Function proxy (avoids browser CORS).
 */

const KICKSERV_PROXY = '/.netlify/functions/kickserv-lead';

interface LeadCaptureFormProps {
  result: MapEstimateResult;
  stateCode: string;
  serviceType: string;
}

export default function LeadCaptureForm({ result, stateCode, serviceType }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const lead: LeadCapture = {
      name,
      email,
      phone,
      address,
      stateCode,
      sqFt: result.sqFt,
      estimatedValue: result.estimate.finalBidPrice,
      serviceType: serviceType as LeadCapture['serviceType'],
      tier: result.tier,
      timestamp: new Date().toISOString(),
    };

    // Format for the pipeline (also used as job description for Kickserv)
    const pipelineLead = formatLeadForPipeline(lead);

    // Build job description from pipeline lead fields
    const jobDescription = [
      `Service: ${pipelineLead.serviceType}`,
      `Area: ${pipelineLead.sqFt} sq ft`,
      `State: ${pipelineLead.stateCode}`,
      `Tier: ${pipelineLead.tier}`,
      `Estimate: $${result.estimate.finalBidPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    ].join(' | ');

    // Split name into first / last (best-effort)
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      // POST lead to Kickserv via Netlify Function proxy (server-side, no CORS)
      const res = await fetch(KICKSERV_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          serviceAddress: address,
          jobDescription,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error || `Server error ${res.status}`);
      }
    } catch (err) {
      // Surface error but still allow the thank-you state so the user
      // can call directly — do not block them with a hard failure
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please call 804-446-1296.');
    }

    // Fire analytics event regardless of Kickserv outcome
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', 'generate_lead', {
        event_category: '3d_estimator',
        event_label: result.tier,
        value: result.estimate.finalBidPrice,
      });
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-zinc-900 border-2 border-green-500 p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-black uppercase text-white mb-2">
          Request Submitted!
        </h3>
        {submitError && (
          <div className="mb-4 p-4 border border-yellow-500/50 bg-yellow-900/10 text-left">
            <p className="text-yellow-400 font-bold text-sm">
              ⚠️ Note: {submitError}
            </p>
          </div>
        )}
        <p className="text-zinc-400 font-bold text-sm mb-6">
          A Worden estimator will contact you within 24 hours{' '}
          {result.tier === 'whale' && '(Priority dispatch — Whale-tier project)'}
          {result.tier === 'shark' && '(Commercial priority)'}
        </p>
        <div className="bg-zinc-800 p-4 inline-block">
          <p className="text-[#ffcc00] font-black text-xl">
            Your Estimate: ${result.estimate.finalBidPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-zinc-500 text-xs mt-1">
            {result.sqFt.toLocaleString()} sq ft · {result.tierEmoji} {result.tierLabel}
          </p>
        </div>

        <div className="mt-8">
          <a
            href="tel:8044461296"
            className="inline-block bg-[#ffcc00] text-black font-black uppercase tracking-widest text-sm px-8 py-4 hover:bg-white transition-colors"
          >
            Call Now: 804-446-1296
          </a>
        </div>
        <p className="text-zinc-600 text-xs mt-4 italic">
          Or complete your dispatch at{' '}
          <a
            href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffcc00] underline"
          >
            Kickserv
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 overflow-hidden">
      <div className="bg-[#ffcc00] text-black px-6 py-4">
        <h3 className="font-black uppercase text-sm tracking-widest">
          {result.tier === 'whale' ? '🐋 Priority Whale — Get Your Estimate Locked In' :
           result.tier === 'shark' ? '🦈 Commercial Priority — Schedule Your Site Visit' :
           '📋 Get Your Estimate — Same-Day Response'}
        </h3>
        <p className="text-black/60 text-xs font-bold mt-1">
          Estimate: ${result.estimate.finalBidPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })} ·
          {result.sqFt.toLocaleString()} sq ft · 4th-Gen Worden Standard
        </p>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} className="p-6 space-y-4">
        <div>
          <label htmlFor="lc-name" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-2">
            Full Name
          </label>
          <input
            id="lc-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
            className="w-full bg-black border border-zinc-700 text-white p-3 text-sm focus:border-[#ffcc00] outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lc-email" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-2">
              Email
            </label>
            <input
              id="lc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              className="w-full bg-black border border-zinc-700 text-white p-3 text-sm focus:border-[#ffcc00] outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="lc-phone" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-2">
              Phone
            </label>
            <input
              id="lc-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="(804) 000-0000"
              className="w-full bg-black border border-zinc-700 text-white p-3 text-sm focus:border-[#ffcc00] outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lc-address" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-2">
            Project Address
          </label>
          <input
            id="lc-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="123 Main St, Richmond, VA"
            className="w-full bg-black border border-zinc-700 text-white p-3 text-sm focus:border-[#ffcc00] outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#ffcc00] text-black font-black uppercase tracking-[0.15em] text-lg py-4 hover:bg-white transition-colors shadow-[0_0_30px_rgba(255,204,0,0.3)] disabled:opacity-50"
        >
          {submitting ? '⚙️ Submitting...' : '⚡ Lock In My Estimate — Schedule Site Visit'}
        </button>

        <p className="text-zinc-600 text-xs text-center italic">
          No obligation · Same-day response · 4th generation since 1984
        </p>
      </form>
    </div>
  );
}
