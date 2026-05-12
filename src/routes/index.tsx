import { createFileRoute, Link } from '@tanstack/react-router';
import { useSeo } from '../lib/useSeo';
import { VideoHero } from '../components/VideoHero';

export const Route = createFileRoute('/')({
  component: Home,
});

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';

/**
 * Drop video files into /public/video/ and they'll auto-load.
 * Recommended: 6–12s seamless loop, 1920×1080, ~3–6 MB MP4 (H.264) + WebM (AV1/VP9).
 * If neither file exists at build time, the hero falls back to the still poster.
 */
const HERO_VIDEO_SOURCES = [
  // Browser tries these in order. Smallest/best-compressed first.
  { src: '/video/hero-paving.webm', type: 'video/webm' },
  { src: '/video/hero-paving.mp4', type: 'video/mp4' },
];
const HERO_POSTER = '/asphalt-paving-with-paver.jpg';

function Home() {
  useSeo({
    title: 'Asphalt Paving Contractor in Richmond VA',
    description:
      'Family-owned commercial and residential asphalt paving across Virginia, Maryland, and the Mid-Atlantic since 1984. 100+ franchise sites paved. Call 804-446-1296 for an estimate.',
    path: '/',
  });

  return (
    <main className="bg-black text-white antialiased">
      {/* HERO */}
      <VideoHero
        sources={HERO_VIDEO_SOURCES}
        poster={HERO_POSTER}
        posterAlt="Fresh asphalt paving in Chester, Virginia"
        overlayOpacity={60}
        className="border-b border-white/10"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-32 md:py-48">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/70">
            Asphalt Paving &middot; Established 1984
          </p>
          <h1 className="max-w-5xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Pavement engineered to outlast the building on top of it.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/80 md:text-xl">
            Commercial and residential asphalt paving and sealcoating across Virginia, Maryland, and the
            Mid-Atlantic. Family-owned for four generations.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={PHONE_HREF}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Call for an estimate
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Request online &rarr;
            </Link>
          </div>
        </div>
      </VideoHero>

      {/* PROOF */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
          <Stat value="100+" label="Franchise sites paved" sub="KFC &middot; Taco Bell &middot; Arby's" />
          <Stat value="40+" label="Years in business" sub="Family-owned since 1984" />
          <Stat value="50yr" label="Engineered service life" sub="6-inch stone base standard" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Services</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Asphalt only. Done right.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard to="/commercial" title="Commercial paving" desc="Parking lots, drive-thrus, multi-site rollouts." />
            <ServiceCard to="/residential" title="Residential paving" desc="Driveways, estate work, historic restoration." />
            <ServiceCard to="/sealcoating" title="Sealcoating" desc="Protect new asphalt. Restore weathered surfaces." />
            <ServiceCard to="/services" title="Patching & repair" desc="Pothole repair, full-depth patching, crack-fill." />
            <ServiceCard to="/services" title="Milling & overlay" desc="Mill the failed surface. Lay a structural overlay." />
            <ServiceCard to="/services" title="Striping & ADA" desc="Line striping, stencils, ADA, traffic markings." />
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Service area</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Headquartered in Chester. Working from D.C. to the Outer Banks.
          </h2>
          <div className="mt-12 flex flex-wrap gap-2 text-sm">
            {[
              'Richmond', 'Chester', 'Chesterfield', 'Henrico', 'Mechanicsville', 'Glen Allen',
              'Midlothian', 'Short Pump', 'Tuckahoe', 'Windsor Farms', 'Hanover', 'Petersburg',
              'Hopewell', 'Colonial Heights', 'Fredericksburg', 'Williamsburg', 'Norfolk',
              'Virginia Beach', 'Newport News', 'Hampton', 'Portsmouth', 'Suffolk',
            ].map((city) => (
              <span key={city} className="rounded-full border border-white/15 px-4 py-2 text-white/70">
                {city}
              </span>
            ))}
            <Link
              to="/contact"
              className="rounded-full border border-white/30 px-4 py-2 font-medium text-white hover:bg-white/5"
            >
              Other VA / MD / NC &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <h2 className="max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">
            Ready for a real number?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Call {PHONE} and a Worden picks up. No phone tree, no callback queue.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-10 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
          >
            Call {PHONE}
          </a>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="bg-black p-10 md:p-12">
      <div className="text-5xl font-medium tracking-tight md:text-6xl">{value}</div>
      <div className="mt-4 text-sm font-medium text-white">{label}</div>
      <div className="mt-1 text-sm text-white/50">{sub}</div>
    </div>
  );
}

function ServiceCard({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="group block bg-black p-10 transition hover:bg-white/[0.03] md:p-12">
      <div className="text-xl font-medium">{title}</div>
      <div className="mt-3 text-sm text-white/60">{desc}</div>
      <div className="mt-8 text-sm text-white/40 transition group-hover:text-white">Learn more &rarr;</div>
    </Link>
  );
}
