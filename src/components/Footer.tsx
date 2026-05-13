import { Link } from '@tanstack/react-router';
import { PHONE_DISPLAY as PHONE, PHONE_HREF, EMAIL, ADDRESS } from '../lib/businessInfo';

const REGIONS: { name: string; cities: string[] }[] = [
  {
    name: 'Greater Richmond',
    cities: ['Richmond', 'Midlothian', 'Tuckahoe', 'Short Pump', 'Glen Allen', 'Mechanicsville', 'Bon Air', 'Lakeside'],
  },
  {
    name: 'Chesterfield & Tri-Cities',
    cities: ['Chester', 'Chesterfield', 'Petersburg', 'Hopewell', 'Colonial Heights', 'Moseley', 'Dinwiddie', 'Prince George'],
  },
  {
    name: 'Hampton Roads',
    cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Newport News', 'Hampton', 'Suffolk', 'Portsmouth', 'Williamsburg'],
  },
  {
    name: 'Surrounding Counties',
    cities: ['Hanover', 'Henrico', 'Powhatan', 'Goochland', 'New Kent', 'Amelia', 'Ashland', 'Charles City'],
  },
];

const SERVICE_LINKS = [
  { label: 'Commercial', to: '/commercial' },
  { label: 'Residential', to: '/residential' },
  { label: 'Sealcoating', to: '/sealcoating' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SLUG_OVERRIDES: Record<string, string> = {
  'Newport News': 'newportnews',
};
const slug = (city: string) =>
  SLUG_OVERRIDES[city] ?? city.toLowerCase().replace(/\s+/g, '-');

const trackPhone = () => {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: PHONE });
};

const META = 'text-[11px] uppercase tracking-[0.22em] text-white/40';
const COL = 'text-[11px] uppercase tracking-[0.22em] text-white/35';

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-black text-white">
      {/* Ambient video backdrop */}
      <video
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        src="/video/parking-lot.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* Legibility wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/35 to-black/55"
      />
      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* CTA row */}
        <div className="grid grid-cols-12 gap-8 border-b border-white/[0.06] py-12">
          <div className="col-span-12 md:col-span-7">
            <p className={META}>Ready when you are</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-tight text-white/70 md:text-4xl">
              Pavement built to last.
              <span className="text-white/35"> Quoted in 24 hours.</span>
            </h2>
          </div>
          <div className="col-span-12 flex flex-wrap items-end gap-x-8 gap-y-3 md:col-span-5 md:justify-end">
            <a
              href={PHONE_HREF}
              onClick={trackPhone}
              className="group inline-flex items-baseline gap-3 text-sm text-white"
            >
              <span className={META}>Call</span>
              <span className="text-base font-medium tracking-wide text-white transition group-hover:text-white/60">
                {PHONE}
              </span>
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-baseline gap-3 text-sm text-white"
            >
              <span className={META}>Estimate</span>
              <span className="text-base font-medium tracking-wide text-white transition group-hover:text-white/60">
                Request →
              </span>
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-8 py-16">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[12px] tracking-[0.32em] text-white/90">J · WORDEN &amp; SONS</p>
            <p className="mt-6 max-w-[28ch] text-sm leading-relaxed text-white/55">
              Family-owned asphalt paving since 1984. Headquartered in Chester, Virginia. Class A Contractor.
            </p>

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className={META}>Headquarters</dt>
                <dd className="mt-2 text-white/70">
                  {ADDRESS.streetAddress}<br />
                  {ADDRESS.addressLocality}, {ADDRESS.addressRegion} {ADDRESS.postalCode}
                </dd>
              </div>
              <div>
                <dt className={META}>Direct</dt>
                <dd className="mt-2">
                  <a
                    href={PHONE_HREF}
                    onClick={trackPhone}
                    className="text-white transition hover:text-white/60"
                  >
                    {PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={META}>Estimates</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-white transition hover:text-white/60"
                  >
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={META}>Hours</dt>
                <dd className="mt-2 text-white/70">
                  Mon – Fri · 7am – 6pm<br />
                  Sat · By appointment
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5">
              <div className="col-span-2 md:col-span-1">
                <p className={COL}>Services</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {SERVICE_LINKS.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to as string} className="text-white/70 transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {REGIONS.map((region) => (
                <div key={region.name} className="col-span-1">
                  <p className={COL}>{region.name}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {region.cities.map((city) => (
                      <li key={city}>
                        <Link
                          to={`/locations/${slug(city)}` as string}
                          className="text-white/65 transition hover:text-white"
                        >
                          {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="flex flex-col gap-4 border-t border-white/[0.06] py-8 text-[11px] uppercase tracking-[0.18em] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} J. Worden &amp; Sons Asphalt Paving</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>Class A Contractor</span>
            <span aria-hidden className="hidden h-px w-3 bg-white/20 md:inline-block" />
            <span>VA · MD · NC</span>
            <span aria-hidden className="hidden h-px w-3 bg-white/20 md:inline-block" />
            <span>Chester, Virginia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
