import { createFileRoute, Link } from '@tanstack/react-router';
import { useSeo } from '../lib/useSeo';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';

const TIMELINE = [
  { year: '1984', label: 'Founded in Chester, Virginia.' },
  { year: '1994', label: 'BBB A+ accreditation. Class A Virginia license.' },
  { year: '2014', label: 'First of four Best of Houzz awards.' },
  { year: '2018', label: 'Crossed 100 franchise sites paved (KFC, Taco Bell, Arby’s).' },
  { year: '2026', label: '4th-generation operation. 50-state licensure footprint.' },
];

const STANDARDS = [
  {
    title: '6-inch structural stone base',
    body: 'Required on every job. Not an upsell. It’s the difference between pavement that lasts decades and pavement that fails in one freeze.',
  },
  {
    title: '96% Marshall compaction',
    body: 'We density-test on site. Most contractors guess; we measure.',
  },
  {
    title: 'Zero subcontracted labor',
    body: 'Every crew on your property is on our payroll. One standard, one accountability.',
  },
  {
    title: 'VDOT Section 315 compliance',
    body: 'Spec-grade aggregates and mix designs. Public-works quality on private jobs.',
  },
];

function AboutPage() {
  useSeo({
    title: 'About J. Worden & Sons',
    description:
      'Four generations of asphalt paving in Virginia. Class A licensed, BBB A+, 4-time Best of Houzz. KFC, Taco Bell, and Arby’s preferred contractor.',
    path: '/about',
  });

  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">About</p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            Four generations laying the same standard.
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-white/60 md:text-xl">
            J. Worden &amp; Sons has paved Central Virginia since 1984. We don’t take corner-cutting jobs and we don’t
            quote work we won’t stand behind for thirty years.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Timeline</p>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {TIMELINE.map((t) => (
              <div key={t.year} className="grid grid-cols-1 gap-4 px-2 py-8 md:grid-cols-[120px_1fr] md:gap-12">
                <div className="text-3xl font-medium tracking-tight text-white/90">{t.year}</div>
                <div className="text-lg text-white/70">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">The Worden standard</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            What separates us from the cheapest bid.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
            {STANDARDS.map((s) => (
              <div key={s.title} className="bg-black p-10 md:p-12">
                <div className="text-xl font-medium">{s.title}</div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-32">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Talk to a Worden.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            No call center. Call {PHONE} and a family member picks up.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Call {PHONE}
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
            >
              Request online &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
