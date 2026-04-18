import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Phone, Award, Menu } from 'lucide-react'
import HeaderNav from './HeaderNav'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full font-sans flex flex-col">
      {/* Top Bar — PVD Gold sheen */}
      <div
        className="text-black font-black uppercase text-xs tracking-wider py-1.5 px-6"
        style={{
          background: 'linear-gradient(110deg, #f6d97a 0%, #d4a844 45%, #8c6a1f 100%)',
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 sm:gap-0">
          <span className="text-center sm:text-left">🏆 4-Time Best of Houzz Winner: 2023 • 2016 • 2015 • 2014</span>
          <span className="text-center sm:text-right">Chester HQ: (804) 446-1296</span>
        </div>
      </div>

      {/* Main Navigation — charcoal steel glass */}
      <div
        className="w-full border-b border-[#f6d97a]/15 px-6 py-4"
        style={{
          background: 'linear-gradient(160deg, rgba(42,45,51,0.92) 0%, rgba(20,22,26,0.94) 55%, rgba(5,6,10,0.96) 100%)',
          backdropFilter: 'blur(14px) saturate(130%)',
          WebkitBackdropFilter: 'blur(14px) saturate(130%)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start group">
            <span className="pvd-gold-text text-xs font-bold uppercase tracking-[0.3em]">
              J. Worden & Sons
            </span>
            <span className="text-white text-[10px] uppercase tracking-[0.1em] opacity-60">
              Asphalt Paving • Richmond 23221
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/commercial" className="hover:text-white transition-colors">Commercial</Link>
            <Link to="/dashboard" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/80">📊 Dashboard</Link>
            <Link to="/gc-bid" className="hover:text-[#f6d97a] transition-colors">Gov Bids</Link>
            <Link to="/whale-hunter" className="hover:text-[#f6d97a] transition-colors">🐋 Whale Hunter</Link>
            <Link to="/dispatch" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">🚛 Dispatch</Link>
            <Link to="/weather-intel" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">⛈ Weather</Link>
            <Link to="/pre-con" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">🏗 Pre-Con</Link>
            <Link to="/pre-con-dashboard" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">⚡ God-Mode</Link>
            <Link to="/profit-node" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">💰 Profit Node</Link>
            <Link to="/litigation" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">⚖️ Legal Engine</Link>
            <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/estimator" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">Free Estimate</Link>
            <Link to="/estimate" className="hover:text-[#f6d97a] transition-colors text-[#f6d97a]/70">📐 3D Estimator</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
               <div className="flex items-center gap-1.5 text-[#f6d97a] animate-pulse">
                 <Award size={10} />
                 <span className="text-[9px] font-bold uppercase tracking-widest">2026 Houzz Authority</span>
               </div>
               <span className="text-[10px] text-[#555] uppercase font-bold tracking-tighter italic">6" Structural Stone Base Std.</span>
            </div>

            <a
              href="tel:+18044461296"
              onClick={() => {
                const w = window as unknown as { gtag?: (...args: unknown[]) => void };
                if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: '804-446-1296' });
              }}
              className="relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-sm text-[#111] text-[10px] font-black uppercase tracking-[0.15em] hover:brightness-110 transition-all"
              style={{
                background: 'linear-gradient(135deg, #f6d97a 0%, #d4a844 45%, #8c6a1f 100%)',
                boxShadow:
                  '0 10px 25px -8px rgba(212,168,68,0.55), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(140,106,31,0.45)',
                border: '1px solid rgba(246,217,122,0.5)',
              }}
            >
              <Phone size={12} fill="currentColor" />
              <span>911 Dispatch: 804-446-1296</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center text-white hover:text-[#f6d97a] transition-colors p-1"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      <HeaderNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
