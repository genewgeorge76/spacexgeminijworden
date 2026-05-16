import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { SERVICES, CITIES, buildSlug } from '../data/blog';
import { PHONE_DISPLAY as PHONE, PHONE_HREF } from '../lib/businessInfo';

type MenuKey = 'services' | 'work' | 'locations' | 'about';

type NavItem = { key: MenuKey; label: string };

const NAV: NavItem[] = [
  { key: 'services', label: 'Services' },
  { key: 'work', label: 'Work' },
  { key: 'locations', label: 'Locations' },
  { key: 'about', label: 'About' },
];

const trackPhone = () => {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: PHONE });
};

export default function Header() {
  const [active, setActive] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  // SpaceX-style: cancel any pending close, set new active immediately
  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActive(key);
  };

  // Close after a small grace period so the user can move from trigger -> panel
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(null), 140);
  };

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050507]/80 backdrop-blur-xl"
      onMouseLeave={scheduleClose}
    >
      <div className="relative mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="text-[12px] tracking-[0.32em] text-white"
          onMouseEnter={scheduleClose}
        >
          J · WORDEN &amp; SONS
        </Link>

        {/* Desktop nav triggers */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              onMouseEnter={() => openMenu(item.key)}
              onFocus={() => openMenu(item.key)}
              className={
                'text-[11px] uppercase tracking-[0.28em] transition ' +
                (active === item.key ? 'text-white' : 'text-white/55 hover:text-white')
              }
              aria-expanded={active === item.key}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            onClick={trackPhone}
            onMouseEnter={scheduleClose}
            className="hidden text-[11px] uppercase tracking-[0.28em] text-white/55 transition hover:text-white sm:inline"
          >
            {PHONE}
          </a>
          <Link
            to="/contact"
            onMouseEnter={scheduleClose}
            className="hidden rounded-full border border-white/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black sm:inline-block"
          >
            Estimate
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="text-lg leading-none">{mobileOpen ? '\u2715' : '\u2630'}</span>
          </button>
        </div>
      </div>

      {/* Hover dropdown panel — single shared container, fades + slides on open */}
      <div
        className={
          'pointer-events-none absolute inset-x-0 top-full hidden md:block ' +
          'overflow-hidden border-b border-white/[0.08] bg-black/95 backdrop-blur-xl ' +
          'transition-all duration-300 ease-out '
        }
        style={{
          maxHeight: active ? '520px' : '0px',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: active ? 'auto' : 'none',
        }}
        onMouseEnter={() => active && openMenu(active)}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto max-w-[1320px] px-10 py-12">
          {active === 'services' && <ServicesPanel onNavigate={() => setActive(null)} />}
          {active === 'work' && <WorkPanel onNavigate={() => setActive(null)} />}
          {active === 'locations' && <LocationsPanel onNavigate={() => setActive(null)} />}
          {active === 'about' && <AboutPanel onNavigate={() => setActive(null)} />}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            <Link to="/services" onClick={() => setMobileOpen(false)} className={mobileItem}>Services</Link>
            <Link to="/gallery" onClick={() => setMobileOpen(false)} className={mobileItem}>Work</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className={mobileItem}>About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className={mobileItem}>Contact</Link>
            <a href={PHONE_HREF} onClick={trackPhone} className="mt-2 rounded-full bg-white px-4 py-3 text-center text-base font-medium text-black">
              Call {PHONE}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

const mobileItem = 'rounded-md px-3 py-3 text-base text-white/80 hover:bg-white/5 hover:text-white';

const colLabel = 'text-[10px] uppercase tracking-[0.32em] text-white/75';
const linkSm = 'block text-[12px] tracking-wide text-white/65 transition hover:text-white';
const linkLg = 'block text-sm text-white/85 transition hover:text-white';

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-3">
        <p className={colLabel}>Capabilities</p>
        <p className="mt-4 text-[22px] font-light leading-tight tracking-tight text-white">
          Asphalt, sealed and striped.
          <span className="text-white/75"> One crew. One standard.</span>
        </p>
        <Link to="/services" onClick={onNavigate} className="mt-6 inline-block text-[11px] uppercase tracking-[0.28em] text-white/55 transition hover:text-white">
          All services →
        </Link>
      </div>
      <div className="col-span-6 grid grid-cols-2 gap-x-8 gap-y-6">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to={s.parent}
            onClick={onNavigate}
            className="group block"
          >
            <p className="text-sm text-white transition group-hover:text-white">{s.name}</p>
            <p className="mt-1 text-[12px] leading-snug text-white/45 group-hover:text-white/70">
              {s.blurb.split('.')[0]}.
            </p>
          </Link>
        ))}
      </div>
      <div className="col-span-3">
        <p className={colLabel}>Specialty</p>
        <ul className="mt-4 space-y-2.5">
          <li><Link to="/sealcoating" onClick={onNavigate} className={linkSm}>Sealcoating &amp; crack-fill</Link></li>
          <li><Link to="/commercial" onClick={onNavigate} className={linkSm}>Multi-site rollouts</Link></li>
          <li><Link to="/residential" onClick={onNavigate} className={linkSm}>Estate &amp; historic driveways</Link></li>
          <li><Link to="/services" onClick={onNavigate} className={linkSm}>Striping, ADA, thermoplastic</Link></li>
        </ul>
      </div>
    </div>
  );
}

function WorkPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-4">
        <p className={colLabel}>Field record</p>
        <p className="mt-4 text-[22px] font-light leading-tight tracking-tight text-white">
          100+ franchise sites. 40+ years.
          <span className="text-white/75"> Same family. Same trucks.</span>
        </p>
      </div>
      <div className="col-span-4">
        <p className={colLabel}>Browse</p>
        <ul className="mt-4 space-y-3">
          <li><Link to="/gallery" onClick={onNavigate} className={linkLg}>Gallery</Link></li>
          <li><Link to="/standards" onClick={onNavigate} className={linkLg}>The Worden Standard</Link></li>
          <li><Link to="/estimator" onClick={onNavigate} className={linkLg}>Live estimator</Link></li>
        </ul>
      </div>
      <div className="col-span-4">
        <p className={colLabel}>Verified</p>
        <ul className="mt-4 space-y-2.5">
          <li className={linkSm}>Class A Virginia Contractor</li>
          <li className={linkSm}>Houzz Best of Service · multi-year</li>
          <li className={linkSm}>Pavement Magazine Top 75</li>
          <li className={linkSm}>4.4 ★ · 91 verified reviews</li>
        </ul>
      </div>
    </div>
  );
}

function LocationsPanel({ onNavigate }: { onNavigate: () => void }) {
  // Group cities by region
  const regions = Array.from(new Set(CITIES.map((c) => c.region)));
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-3">
        <p className={colLabel}>Service area</p>
        <p className="mt-4 text-[22px] font-light leading-tight tracking-tight text-white">
          From Chester to the Outer Banks.
        </p>
        <p className="mt-3 text-[12px] leading-snug text-white/45">
          32 cities across 4 regions. One Class A contractor.
        </p>
      </div>
      {regions.map((r) => (
        <div key={r} className="col-span-2">
          <p className={colLabel}>{r}</p>
          <ul className="mt-4 space-y-1.5">
            {CITIES.filter((c) => c.region === r).map((c) => (
              <li key={c.name}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: buildSlug('asphalt-paving', c.name) }}
                  onClick={onNavigate}
                  className={linkSm}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="col-span-1">
        <p className={colLabel}>Other</p>
        <Link to="/contact" onClick={onNavigate} className="mt-4 block text-[12px] text-white/65 hover:text-white">
          VA / MD / NC →
        </Link>
      </div>
    </div>
  );
}

function AboutPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-5">
        <p className={colLabel}>Who we are</p>
        <p className="mt-4 text-[22px] font-light leading-tight tracking-tight text-white">
          Family-owned since 1984.
          <span className="text-white/75"> Headquartered in Chester, VA.</span>
        </p>
      </div>
      <div className="col-span-3">
        <p className={colLabel}>Company</p>
        <ul className="mt-4 space-y-3">
          <li><Link to="/about" onClick={onNavigate} className={linkLg}>About</Link></li>
          <li><Link to="/standards" onClick={onNavigate} className={linkLg}>The Standard</Link></li>
          <li><Link to="/contact" onClick={onNavigate} className={linkLg}>Contact</Link></li>
        </ul>
      </div>
      <div className="col-span-4">
        <p className={colLabel}>Reach a Worden</p>
        <a href={PHONE_HREF} onClick={trackPhone} className="mt-4 block text-2xl font-light tracking-tight text-white hover:text-white/70">
          {PHONE}
        </a>
        <p className="mt-2 text-[12px] text-white/45">A J. Worden picks up. No phone tree.</p>
        <Link
          to="/contact"
          onClick={onNavigate}
          className="mt-6 inline-block rounded-full border border-white/25 px-5 py-2 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black"
        >
          Request estimate
        </Link>
      </div>
    </div>
  );
}
