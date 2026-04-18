import { Link } from '@tanstack/react-router';
import { MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const serviceHubs = [
    {
      region: "Richmond Metro",
      coords: { x: 52, y: 30 },
      primary: { name: "Richmond", slug: "richmond" },
      kpi: "23221 · 23220",
      satellites: [
        { name: "Midlothian", slug: "midlothian" },
        { name: "Short Pump", slug: "short-pump" },
        { name: "Glen Allen", slug: "glen-allen" },
        { name: "Mechanicsville", slug: "mechanicsville" },
      ],
    },
    {
      region: "Chesterfield · HQ",
      coords: { x: 48, y: 46 },
      primary: { name: "Chester", slug: "chester" },
      kpi: "23836 · HQ",
      satellites: [
        { name: "Chesterfield", slug: "chesterfield" },
        { name: "Moseley", slug: "moseley" },
        { name: "Bon Air", slug: "bon-air" },
        { name: "Colonial Heights", slug: "colonial-heights" },
      ],
    },
    {
      region: "Tri-Cities",
      coords: { x: 42, y: 62 },
      primary: { name: "Petersburg", slug: "petersburg" },
      kpi: "23803 · 23860",
      satellites: [
        { name: "Hopewell", slug: "hopewell" },
        { name: "Prince George", slug: "prince-george" },
        { name: "Dinwiddie", slug: "dinwiddie" },
        { name: "Amelia", slug: "amelia" },
      ],
    },
    {
      region: "Hampton Roads",
      coords: { x: 78, y: 58 },
      primary: { name: "Virginia Beach", slug: "virginia-beach" },
      kpi: "23451 · Coastal",
      satellites: [
        { name: "Norfolk", slug: "norfolk" },
        { name: "Chesapeake", slug: "chesapeake" },
        { name: "Newport News", slug: "newportnews" },
        { name: "Williamsburg", slug: "williamsburg" },
      ],
    },
  ];

  return (
    <footer className="relative bg-black text-white border-t border-[#f6d97a]/40">
      {/* Top industrial band — now PVD gold gradient */}
      <div
        className="text-black"
        style={{
          background: 'linear-gradient(110deg, #f6d97a 0%, #d4a844 45%, #8c6a1f 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] font-black uppercase tracking-[0.2em]">
            Sovereign Infrastructure · Award-Winning Since 1984
          </p>
          <p className="text-[11px] font-black uppercase tracking-[0.2em]">
            Class A GC · VDOT · 4th Generation
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════ CHESTER HEADQUARTERS DOMINANCE BLOCK */}
      <div className="relative border-b border-[#f6d97a]/30" style={{ background: 'linear-gradient(160deg, #2a2d33 0%, #14161a 55%, #05060a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(246,217,122,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(246,217,122,0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage:
                'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 85%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 85%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#f6d97a]" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#f6d97a]">
              Direct From The Floor
            </span>
            <span className="h-px w-10 bg-[#f6d97a]" aria-hidden="true" />
          </div>

          <h2
            className="text-white font-black uppercase leading-[0.9] tracking-tighter drop-shadow-[0_6px_30px_rgba(212,168,68,0.35)]"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            CHESTER
            <br />
            <span
              className="pvd-gold-text"
              style={{ display: 'inline-block' }}
            >
              HEADQUARTERS
            </span>
          </h2>

          <address
            className="not-italic text-white font-black uppercase mt-10 leading-tight tracking-wide"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)' }}
          >
            1601 Ware Bottom Springs Rd, Suite 214
            <br />
            <span className="text-[#f6d97a]">Chester, VA 23836</span>
          </address>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-5">
            <a
              href="tel:+18044461296"
              onClick={() => {
                const w = window as unknown as { gtag?: (...args: unknown[]) => void };
                if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: '804-446-1296' });
              }}
              className="relative overflow-hidden inline-flex items-center gap-3 text-black px-8 py-5 font-black uppercase tracking-[0.25em] text-base md:text-lg hover:brightness-110 transition-all border border-[#f6d97a]/50 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, #f6d97a 0%, #d4a844 45%, #8c6a1f 100%)',
                boxShadow:
                  '0 25px 45px -12px rgba(212,168,68,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(140,106,31,0.4)',
              }}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              (804) 446-1296
            </a>
            <a
              href="https://maps.google.com/?q=1601+Ware+Bottom+Springs+Rd+Suite+214+Chester+VA+23836"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-[#f6d97a]/60 text-white px-8 py-5 font-black uppercase tracking-[0.25em] text-base md:text-lg hover:bg-[#f6d97a] hover:text-black transition-colors rounded-sm"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Directions To HQ
            </a>
          </div>

          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#f6d97a] animate-pulse rounded-full" aria-hidden="true" />
              Dispatch Live · Chester, VA
            </span>
            <span className="text-white/25">|</span>
            <span>Class A GC</span>
            <span className="text-white/25">|</span>
            <span>Since 1984</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════ SOVEREIGN MAP + SERVICE TILES */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="flex items-baseline justify-between mb-2 pb-4 border-b border-[#f6d97a]/15">
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.35em] pvd-gold-text">
              The Sovereign Map
            </h4>
            <p className="mt-2 text-lg md:text-xl font-black uppercase tracking-tight text-white">
              Four Hubs. One Six-Inch Mandate.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 hidden sm:inline">
            VA · MD · NC · SC · GA
          </span>
        </div>

        {/* Map diagram — stylized coastal track with hub pins */}
        <div
          className="relative mt-6 mb-10 rounded-xl overflow-hidden glass-card"
          aria-label="Sovereign service map — Virginia coastal track"
          style={{ aspectRatio: '16 / 5', minHeight: 180 }}
        >
          <svg viewBox="0 0 100 31.25" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="footer-land" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1d23" />
                <stop offset="100%" stopColor="#0a0b0e" />
              </linearGradient>
              <linearGradient id="footer-route" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f6d97a" stopOpacity="0" />
                <stop offset="50%" stopColor="#d4a844" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f6d97a" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="footer-pin">
                <stop offset="0%" stopColor="#fff4c2" />
                <stop offset="60%" stopColor="#f6d97a" />
                <stop offset="100%" stopColor="#8c6a1f" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            <rect width="100" height="31.25" fill="url(#footer-land)" />

            {/* Stylized coastline silhouette */}
            <path
              d="M 0 18 L 8 17 L 16 19 L 24 18 L 32 20 L 42 19 L 52 21 L 62 20 L 72 22 L 82 21 L 90 23 L 100 22 L 100 31.25 L 0 31.25 Z"
              fill="#05060a"
              opacity="0.8"
            />

            {/* Coastal route line */}
            <path
              d="M 10 12 Q 30 8, 50 18 T 90 20"
              fill="none"
              stroke="url(#footer-route)"
              strokeWidth="0.4"
              strokeDasharray="1 0.6"
            />

            {/* Hub pins */}
            {serviceHubs.map((hub, i) => (
              <g key={hub.region} transform={`translate(${hub.coords.x} ${hub.coords.y * 0.3125})`}>
                <circle r="1.4" fill="url(#footer-pin)" opacity="0.85">
                  <animate attributeName="r" values="1.2;1.6;1.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle r="0.6" fill="#fff8dc" />
                <text
                  x="0"
                  y="-2.2"
                  textAnchor="middle"
                  fill="#f6d97a"
                  fontSize="1.4"
                  fontWeight="900"
                  letterSpacing="0.15"
                  style={{ textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}
                >
                  {hub.primary.name}
                </text>
              </g>
            ))}
          </svg>

          {/* Map overlay chips */}
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#f6d97a]/80">
              ● LIVE · 2026 · COASTAL TRACK
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
              VDOT §315 · AASHTO T180 · ASTM D2939
            </span>
          </div>
        </div>

        {/* Interactive Service Hub Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceHubs.map((hub) => (
            <Link
              key={hub.region}
              to={`/locations/${hub.primary.slug}` as never}
              className="service-tile glass-card relative rounded-xl p-6 flex flex-col gap-3 no-underline group overflow-hidden"
              style={{
                border: '1px solid rgba(246,217,122,0.2)',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(135deg, #f6d97a 0%, #d4a844 45%, #8c6a1f 100%)' }}
              />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#f6d97a] border border-[#f6d97a]/40 rounded-sm px-2 py-1">
                  {hub.region}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 group-hover:text-[#f6d97a] transition-colors">
                  {hub.kpi}
                </span>
              </div>

              <div>
                <div className="text-2xl font-black tracking-tight text-white group-hover:text-[#f6d97a] transition-colors">
                  {hub.primary.name}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mt-1">
                  Primary Hub ›
                </div>
              </div>

              <ul className="mt-2 space-y-1.5 pt-3 border-t border-[#f6d97a]/15">
                {hub.satellites.map((sat) => (
                  <li key={sat.slug}>
                    <span className="text-[12px] text-white/70 inline-flex items-center gap-2">
                      <span
                        className="h-px w-3 bg-[#f6d97a]/50 group-hover:bg-[#f6d97a] transition-colors"
                        aria-hidden="true"
                      />
                      Paving in {sat.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-2 pt-3 border-t border-[#f6d97a]/15 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em]">
                <span className="text-white/40">6&quot; Stone Base · 96% Marshall</span>
                <span className="text-[#f6d97a]">ENTER →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Brand + Credentials row */}
        <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#f6d97a] border border-[#f6d97a]/50 px-3 py-1">
              Sovereign Authority · EST. 1984
            </div>
            <h3 className="text-3xl font-black tracking-tight leading-none">
              J. WORDEN <span className="pvd-gold-text">&amp; SONS</span>
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
              Asphalt Paving · Sovereign GC
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] pvd-gold-text mb-4">
              Federal & State Credentials
            </div>
            <div className="flex flex-wrap gap-2">
              {['VDOT § 315', 'AASHTO T180', 'ASTM D2939', 'Marshall 96%', 'ADA Compliant', 'Davis-Bacon', 'Class A GC'].map((spec) => (
                <span
                  key={spec}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-white/75 border border-[#f6d97a]/25 px-3 py-1.5 rounded-sm"
                  style={{ background: 'rgba(10,10,14,0.5)', backdropFilter: 'blur(8px)' }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-[#f6d97a]/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="space-y-1">
            <p className="text-xs text-white/70 uppercase tracking-[0.2em] font-bold">
              © 2026 J. Worden &amp; Sons Asphalt Paving · All Rights Reserved
            </p>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.25em]">
              100% Google Best Practices Certified · Sovereign Class A GC
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#f6d97a] animate-pulse rounded-full" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
              Dispatch Live · Chester, VA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
