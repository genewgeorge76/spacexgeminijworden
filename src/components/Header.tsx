import { useState } from 'react';
import { Link } from '@tanstack/react-router';

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-sm font-medium tracking-[0.2em] text-white">
          J. WORDEN &amp; SONS
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            onClick={() => {
              const w = window as unknown as { gtag?: (...args: unknown[]) => void };
              if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: PHONE });
            }}
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 sm:inline-block"
          >
            {PHONE}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? '\u2715' : '\u2630'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-white/80 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={PHONE_HREF}
              className="mt-2 rounded-full bg-white px-4 py-3 text-center text-base font-medium text-black"
            >
              Call {PHONE}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
