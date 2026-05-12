import { Link } from '@tanstack/react-router';

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';

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

const slug = (city: string) => city.toLowerCase().replace(/\s+/g, '-');

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20">
        {/* Brand block */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-sm font-medium tracking-[0.2em]">J. WORDEN &amp; SONS</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Family-owned asphalt paving since 1984. Headquartered in Chester, VA. Class A Contractor.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>1601 Ware Bottom Springs Rd, Suite 214</p>
              <p>Chester, VA 23836</p>
              <p>
                <a
                  href={PHONE_HREF}
                  onClick={() => {
                    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
                    if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: PHONE });
                  }}
                  className="font-medium text-white hover:text-white/80"
                >
                  {PHONE}
                </a>
              </p>
            </div>
          </div>

          {/* SEO city columns */}
          {REGIONS.map((region) => (
            <div key={region.name}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">{region.name}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {region.cities.map((city) => (
                  <li key={city}>
                    <Link
                      to={`/locations/${slug(city)}` as string}
                      className="text-white/70 transition hover:text-white"
                    >
                      Paving in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service quick-links */}
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-sm text-white/60">
          <Link to="/services" className="hover:text-white">Services</Link>
          <Link to="/commercial" className="hover:text-white">Commercial paving</Link>
          <Link to="/residential" className="hover:text-white">Residential paving</Link>
          <Link to="/sealcoating" className="hover:text-white">Sealcoating</Link>
          <Link to="/gallery" className="hover:text-white">Work</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} J. Worden &amp; Sons Asphalt Paving. All rights reserved.</p>
          <p>Class A Contractor &middot; Virginia, Maryland, North Carolina</p>
        </div>
      </div>
    </footer>
  );
}
