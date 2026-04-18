import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import SovereignEstimator3D, {
  type EstimatorSpec,
} from '../components/SovereignEstimator3D';
import TactileButton from '../components/TactileButton';
import {
  dispatchPreliminaryReport,
  matchAddressToGrid,
  type DispatchMatch,
} from '@/lib/sovereignDispatcher';

export const Route = createFileRoute('/contact')({
  component: ContactEstimator,
});

function ContactEstimator() {
  const [address, setAddress] = useState('');
  const [spec, setSpec] = useState<EstimatorSpec | null>(null);
  const [dispatching, setDispatching] = useState(false);
  const [match, setMatch] = useState<DispatchMatch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSpecChange = useCallback((next: EstimatorSpec) => {
    setSpec(next);
  }, []);

  const dispatchReport = useCallback(async () => {
    setError(null);
    if (!address.trim() || address.trim().length < 6) {
      setError('Add a project site address so the Sovereign Dispatcher can route the report.');
      return;
    }
    setDispatching(true);
    try {
      const result = await dispatchPreliminaryReport({
        address: address.trim(),
        spec: spec ?? undefined,
      });
      setMatch(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dispatcher failed — call 804-446-1296.');
    } finally {
      setDispatching(false);
    }
  }, [address, spec]);

  const preview = matchAddressToGrid(address);

  return (
    <main className="min-h-screen bg-[#05060a] text-white font-sans">
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(246,217,122,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(212,168,68,0.12) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <span className="pvd-gold-text text-[11px] font-black uppercase tracking-[0.4em]">
            4D Operational · The Virtual Foreman
          </span>
          <h1 className="text-6xl md:text-7xl font-black uppercase text-white leading-[0.95] tracking-tighter mt-5">
            THE SOVEREIGN <br />
            <span className="pvd-gold-text">3D ESTIMATOR.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium mt-8 max-w-3xl leading-snug">
            Dial the lot. Toggle the load. Watch the six-inch stone base expand in real time.
            Share your address and the Sovereign Dispatcher will render a branded Preliminary
            Site Report on the spot — no form, no wait.
          </p>
        </div>
      </section>

      {/* Estimator + dispatcher */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 items-start">
          <SovereignEstimator3D
            initialSqft={1400}
            initialLoad="standard"
            onSpecChange={handleSpecChange}
          />

          <aside
            className="glass-card"
            style={{
              padding: 28,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f6d97a]">
              ● Sovereign Dispatcher · 41-City Grid
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight">
              DISPATCH YOUR <span className="pvd-gold-text">PRELIMINARY SITE REPORT</span>
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Drop a street address below. If the site sits inside the 41-city Sovereign Grid,
              the Dispatcher instantly renders a branded J. Worden PDF carrying the spec you
              dialed on the left — stone base, tonnage, and investment range.
            </p>

            <label
              htmlFor="dispatch-address"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f6d97a]"
            >
              Project Site Address
            </label>
            <input
              id="dispatch-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="1601 Ware Bottom Springs Rd, Chester VA 23836"
              className="bg-black border border-[#f6d97a]/30 focus:border-[#f6d97a] outline-none px-4 py-4 text-white font-bold text-base rounded-md transition-colors"
            />

            {address.trim().length > 4 && (
              <div
                className="text-[10px] font-black uppercase tracking-[0.3em]"
                style={{ color: preview.inGrid ? '#8be29a' : '#f6d97a' }}
              >
                {preview.inGrid
                  ? `● Grid confirmed · Hub: ${preview.matchedCity}`
                  : '◌ Outside core 41-city grid — coastal track still available'}
              </div>
            )}

            <TactileButton
              onClick={() => void dispatchReport()}
              disabled={dispatching}
              aria-disabled={dispatching}
            >
              {dispatching ? '⏳ Rendering PDF…' : '📎 DISPATCH SITE REPORT'}
            </TactileButton>

            <TactileButton
              variant="steel"
              onClick={() => (window.location.href = 'tel:+18044461296')}
              trailing={<span>→</span>}
            >
              Or dial 804-446-1296
            </TactileButton>

            {error && (
              <div className="text-sm text-red-400 font-bold">⚠️ {error}</div>
            )}

            {match && match.inGrid && (
              <div
                className="text-sm text-[#f6d97a] font-bold leading-relaxed"
                style={{ borderLeft: '3px solid #f6d97a', paddingLeft: 12 }}
              >
                ✔ Report downloaded to this device. A Sovereign Foreman from the{' '}
                <strong>{match.matchedCity}</strong> hub will field-walk the site within one
                business day.
              </div>
            )}
            {match && !match.inGrid && (
              <div
                className="text-sm text-[#f6d97a] font-bold leading-relaxed"
                style={{ borderLeft: '3px solid #f6d97a', paddingLeft: 12 }}
              >
                ✔ Report downloaded. Your site sits on the coastal track — an operating partner
                covering your region will still reach out within one business day.
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-[#f6d97a]/20 grid grid-cols-2 gap-3 text-xs text-zinc-400">
              <div>
                <div className="text-[#f6d97a] font-black tracking-widest">HQ</div>
                <div className="font-bold text-white">1601 Ware Bottom Springs Rd<br />Chester, VA 23836</div>
              </div>
              <div>
                <div className="text-[#f6d97a] font-black tracking-widest">DIRECT LINE</div>
                <div className="font-bold text-white">(804) 446-1296</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
