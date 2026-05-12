import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';

interface FeatureItem {
  title: string;
  body: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export interface ServicePageProps {
  /** H1 + meta title prefix */
  hero: string;
  /** Sub-title / lead paragraph */
  intro: string;
  /** Section eyebrow under hero, e.g. "Commercial paving" */
  eyebrow: string;
  /** Bullet list of what's included, 4-8 items */
  features: FeatureItem[];
  /** Optional FAQ section content */
  faqs?: FaqItem[];
  /** Optional related cities to link out to */
  relatedCities?: string[];
  /** Optional FAQPage JSON-LD schema, automatically built from faqs if not provided */
  faqSchema?: object;
}

const slug = (city: string) => city.toLowerCase().replace(/\s+/g, '-');

export default function ServiceDetailPage({
  hero,
  intro,
  eyebrow,
  features,
  faqs = [],
  relatedCities = [],
  faqSchema,
}: ServicePageProps) {
  const builtFaqSchema =
    faqSchema ??
    (faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null);

  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">{eyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">{hero}</h1>
          <p className="mt-8 max-w-3xl text-lg text-white/60 md:text-xl">{intro}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Call for an estimate
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

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">What&rsquo;s included</p>
          <div className="mt-12 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="bg-black p-10 md:p-12">
                <div className="text-xl font-medium">{f.title}</div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-4xl px-6 py-24">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Frequently asked</p>
            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <div key={f.q} className="py-8">
                  <dt className="text-lg font-medium text-white">{f.q}</dt>
                  <dd className="mt-3 text-base text-white/60">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {relatedCities.length > 0 && (
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Service area</p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm">
              {relatedCities.map((city) => (
                <Link
                  key={city}
                  to={`/locations/${slug(city)}` as string}
                  className="rounded-full border border-white/15 px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-32">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Ready for a real number?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">Call {PHONE}. A Worden picks up.</p>
          <a
            href={PHONE_HREF}
            className="mt-10 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
          >
            Call {PHONE}
          </a>
        </div>
      </section>

      {builtFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(builtFaqSchema) }}
        />
      )}
    </main>
  );
}

export function ServiceWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
