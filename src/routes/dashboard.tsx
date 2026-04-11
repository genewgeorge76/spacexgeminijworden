import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import {
  Activity,
  BarChart3,
  Building2,
  CheckCircle,
  Construction,
  DollarSign,
  Hammer,
  HardHat,
  LogOut,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';
import { SERVICE_AREAS_41 } from '../constants/serviceAreas';
import { useAuth } from '@/lib/auth-context';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

// ── Key Metrics ──────────────────────────────────────────────────────────────
const metrics = [
  {
    label: 'Service Areas',
    value: SERVICE_AREAS_41.length.toString(),
    sub: 'Cities & Counties',
    icon: <MapPin className="w-5 h-5 text-[#ffcc00]" />,
    color: 'border-[#ffcc00]',
  },
  {
    label: 'Years in Business',
    value: (new Date().getFullYear() - 1984).toString(),
    sub: 'Est. 1984 · 4th Generation',
    icon: <Star className="w-5 h-5 text-yellow-400" />,
    color: 'border-yellow-400',
  },
  {
    label: 'Compaction Std.',
    value: '96%',
    sub: 'Marshall Unit Weight',
    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    color: 'border-green-400',
  },
  {
    label: 'Oil Price Shield',
    value: '±$9/ton',
    sub: 'Liquid Asphalt Buffer',
    icon: <DollarSign className="w-5 h-5 text-cyan-400" />,
    color: 'border-cyan-400',
  },
  {
    label: 'Active Divisions',
    value: '12',
    sub: 'CSI MasterFormat',
    icon: <Building2 className="w-5 h-5 text-purple-400" />,
    color: 'border-purple-400',
  },
  {
    label: 'Houzz Awards',
    value: '4×',
    sub: '2014 · 2015 · 2016 · 2023',
    icon: <TrendingUp className="w-5 h-5 text-pink-400" />,
    color: 'border-pink-400',
  },
];

// ── Services ─────────────────────────────────────────────────────────────────
const services = [
  { name: 'Asphalt Paving', route: '/services', icon: <Truck className="w-4 h-4" />, tag: 'VDOT Sec 315', color: 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#ffcc00]' },
  { name: 'Sealcoating', route: '/sealcoating', icon: <Shield className="w-4 h-4" />, tag: 'UV & Oxidation', color: 'bg-blue-900/20 border-blue-800/40 text-blue-400' },
  { name: 'Masonry', route: '/masonry', icon: <Building2 className="w-4 h-4" />, tag: 'ASTM C90/C270', color: 'bg-orange-900/20 border-orange-800/40 text-orange-400' },
  { name: 'Concrete', route: '/concrete', icon: <Construction className="w-4 h-4" />, tag: 'ACI 318', color: 'bg-stone-800/30 border-stone-700/40 text-stone-300' },
  { name: 'Commercial Roofing', route: '/roofing', icon: <HardHat className="w-4 h-4" />, tag: 'FM Global / UL', color: 'bg-red-900/20 border-red-800/40 text-red-400' },
  { name: 'Residential Paving', route: '/residential', icon: <Hammer className="w-4 h-4" />, tag: 'Driveways & More', color: 'bg-green-900/20 border-green-800/40 text-green-400' },
  { name: 'Commercial Paving', route: '/commercial', icon: <Wrench className="w-4 h-4" />, tag: 'Parking Lots & More', color: 'bg-indigo-900/20 border-indigo-800/40 text-indigo-400' },
  { name: 'GC / Gov Bids', route: '/gc-bid', icon: <Activity className="w-4 h-4" />, tag: 'SAM.gov · VDOT · FAR', color: 'bg-cyan-900/20 border-cyan-800/40 text-cyan-400' },
];

// ── Quick-access Tools ────────────────────────────────────────────────────────
const tools = [
  { label: '📋 Free Estimator', route: '/estimator', desc: 'Get a fast line-item quote' },
  { label: '🚛 Dispatch Center', route: '/dispatch', desc: 'Live crew & project ops' },
  { label: '⚡ God-Mode Pre-Con', route: '/pre-con-dashboard', desc: '6-node reality engine' },
  { label: '💰 Profit Node', route: '/profit-node', desc: 'Margin & bid analytics' },
  { label: '🐋 Whale Hunter', route: '/whale-hunter', desc: 'Tier-1 bid pipeline' },
  { label: '⛈ Weather Intel', route: '/weather-intel', desc: '90-day paving risk grid' },
  { label: '⚖️ Legal Engine', route: '/litigation', desc: 'LD & lien protection' },
  { label: '🏗 Pre-Con', route: '/pre-con', desc: 'Geotechnical autopilot' },
  { label: '🖼 Gallery', route: '/gallery', desc: 'Project photo portfolio' },
  { label: '📈 Investor ROI', route: '/investor-roi', desc: 'Capital & yield model' },
  { label: '🛡 Safety HQ', route: '/safety', desc: 'OSHA 30 compliance hub' },
  { label: '📰 Standards', route: '/standards', desc: 'VDOT · ASTM · ACI refs' },
];

// ── Service-area buckets (for the coverage bar) ───────────────────────────────
const areaGroups = [
  { label: 'Richmond Metro', count: 8, color: 'bg-[#ffcc00]' },
  { label: 'Chesterfield / Colonial', count: 5, color: 'bg-yellow-500' },
  { label: 'Northern VA / Stafford', count: 6, color: 'bg-orange-500' },
  { label: 'Hampton Roads', count: 7, color: 'bg-cyan-500' },
  { label: 'Central VA Counties', count: 15, color: 'bg-purple-500' },
];
const totalAreas = areaGroups.reduce((s, g) => s + g.count, 0);

// ── Ghost Protocol activity feed ─────────────────────────────────────────────
const FEED_MESSAGES = [
  '04:12 AM — GHOST PROTOCOL ACTIVE: Scanned 14 municipal commercial permits.',
  '04:14 AM — AUTONOMOUS BID: Calculated 42,000 sq ft for Plaza Street Partners (TX). 35% margin locked.',
  '04:15 AM — AUTO-DISPATCH: Commercial proposal generated & emailed to GC Estimating.',
  '04:18 AM — FOREMAN ALERT: Job won. Dispatching GPS & 410-ton target to Crew Alpha.',
  '04:22 AM — PLANT PULSE: Vulcan Materials Chester — 12 min wait. Selected.',
  '04:25 AM — WHALE HUNTER: New KFC permit detected — Colonial Heights VA. Proposal queued.',
  '04:31 AM — VDOT CHECK: 96% Marshall compaction standard verified on JOB-2401.',
  '04:38 AM — BID SUBMITTED: SAM.gov solicitation #VA-2024-8841 — $2.1M asphalt resurfacing.',
];

function GhostProtocolFeed() {
  const [lines, setLines] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([FEED_MESSAGES[0]]);
    let idx = 1;
    const interval = setInterval(() => {
      if (idx < FEED_MESSAGES.length) {
        setLines((prev) => [...prev, FEED_MESSAGES[idx++]]);
      } else {
        idx = 0;
      }
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="bg-black/60 border border-red-900/40 rounded-xl p-4 h-44 overflow-y-auto font-mono text-[10px] space-y-1">
      {lines.map((line, i) => (
        <div key={i} className="text-green-400/90 leading-relaxed">
          <span className="text-green-600/60">›</span> {line}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ghostMode, setGhostMode] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'OWNER') {
      navigate({ to: '/login' });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'OWNER') return null;

  function handleLogout() {
    logout();
    navigate({ to: '/login' });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* ── SESSION BAR ────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-400/70">
            OWNER SESSION · {user.id}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 hover:border-red-700 text-red-400 hover:text-red-300 font-black uppercase tracking-widest text-[9px] px-4 py-2 rounded-lg transition-all"
        >
          <LogOut className="w-3 h-3" />
          TERMINATE SESSION
        </button>
      </div>


      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-b border-zinc-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,204,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]/70">
              Worden OS · Business Command Center
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
            <span className="text-[#ffcc00]">BUSINESS</span>
            <br />
            <span className="text-white italic">DASHBOARD</span>
          </h1>
          <p className="text-lg text-zinc-400 font-bold max-w-3xl leading-relaxed">
            J. Worden &amp; Sons Paving &amp; General Contracting — 4th generation since 1984.
            All key metrics, services, service areas, and operational tools at a glance.
          </p>
        </div>
      </section>

      {/* ── GHOST PROTOCOL SWITCH ────────────────────────────────────────── */}
      <section className={`py-8 px-6 border-b transition-colors duration-700 ${ghostMode ? 'border-red-900/60 bg-red-950/10' : 'border-zinc-900'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 mb-1">System Override</div>
              <h2 className={`text-2xl font-black uppercase tracking-tight transition-colors duration-500 ${ghostMode ? 'text-red-400' : 'text-white'}`}>
                {ghostMode ? '⚡ GHOST PROTOCOL: AUTONOMOUS' : '🔒 SYSTEM OVERRIDE: MANUAL'}
              </h2>
              <p className="text-xs text-zinc-500 font-bold mt-1 max-w-lg">
                {ghostMode
                  ? 'AI is actively hunting bids, calculating margins, and dispatching proposals. No human input required.'
                  : 'Manual mode — all bids and dispatches require your approval before execution.'}
              </p>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => setGhostMode((v) => !v)}
              className={`relative w-28 h-14 rounded-full border-2 transition-all duration-500 flex items-center px-1 shrink-0 ${
                ghostMode
                  ? 'border-red-500 bg-red-950/60 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                  : 'border-zinc-700 bg-zinc-900'
              }`}
              aria-label="Toggle Ghost Protocol"
            >
              <div
                className={`w-11 h-11 rounded-full transition-all duration-500 flex items-center justify-center font-black text-xs ${
                  ghostMode
                    ? 'translate-x-[52px] bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    : 'translate-x-0 bg-zinc-600 text-zinc-400'
                }`}
              >
                {ghostMode ? '⚡' : '🔒'}
              </div>
            </button>
          </div>

          {/* Live feed when autonomous */}
          {ghostMode && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-400/80">
                  Live Autonomous Activity Feed
                </span>
              </div>
              <GhostProtocolFeed />
            </div>
          )}
        </div>
      </section>

      {/* ── KPI CARDS ────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Key Performance Indicators</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className={`border-l-4 ${m.color} bg-zinc-900/50 rounded-r-xl p-5 flex flex-col gap-2`}
              >
                <div className="flex items-center gap-2">
                  {m.icon}
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{m.label}</span>
                </div>
                <div className="text-3xl font-black text-white">{m.value}</div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-4 h-4 text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Active Service Lines</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((svc) => (
              <Link
                key={svc.name}
                to={svc.route}
                className={`border rounded-xl p-4 hover:scale-[1.02] transition-transform ${svc.color} flex flex-col gap-2`}
              >
                <div className="flex items-center gap-2 font-black uppercase text-xs tracking-wide">
                  {svc.icon}
                  {svc.name}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{svc.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA COVERAGE ─────────────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              Service Area Coverage — {SERVICE_AREAS_41.length} Cities &amp; Counties
            </h2>
          </div>

          {/* Coverage bar */}
          <div className="flex rounded-full overflow-hidden h-3 mb-6 gap-px">
            {areaGroups.map((g) => (
              <div
                key={g.label}
                className={`${g.color} h-full`}
                style={{ flex: g.count / totalAreas }}
                title={`${g.label}: ${g.count} areas`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {areaGroups.map((g) => (
              <div key={g.label} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <span className={`w-2 h-2 rounded-full ${g.color}`} />
                {g.label} <span className="text-zinc-700">({g.count})</span>
              </div>
            ))}
          </div>

          {/* All cities list */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5">
            {SERVICE_AREAS_41.map((area) => (
              <div
                key={area}
                className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 bg-zinc-900/60 border border-zinc-800 rounded px-2 py-1 text-center hover:text-[#ffcc00] hover:border-[#ffcc00]/30 transition-colors"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORDEN STANDARDS ─────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">The Worden Standard — Non-Negotiable Floors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: '96% Marshall Unit Weight', desc: 'Minimum compaction density on all asphalt work — never negotiated down', spec: 'AASHTO T245', color: 'border-green-600' },
              { label: 'VDOT-Grade Stone Base', desc: 'All paving specs reference VDOT Section 315 aggregate base', spec: 'VDOT Sec 315', color: 'border-[#ffcc00]' },
              { label: '$9/Ton Oil-Price Shield', desc: 'All cost calculations include a ±$9/ton liquid asphalt price buffer', spec: 'Cost Protection', color: 'border-cyan-600' },
              { label: 'Zero-Downtime Medical', desc: 'Crew scheduling satisfies DOT medical card requirements without gaps', spec: 'FMCSA Compliance', color: 'border-purple-600' },
            ].map((std) => (
              <div key={std.label} className={`border-l-4 ${std.color} bg-zinc-900/40 rounded-r-xl p-5`}>
                <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">{std.spec}</div>
                <div className="text-sm font-black uppercase text-white mb-2">{std.label}</div>
                <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATIONS TOOLS ─────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Operations Tools — Quick Access</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.label}
                to={tool.route}
                className="group bg-zinc-900/60 border border-zinc-800 hover:border-[#ffcc00]/40 hover:bg-zinc-900 rounded-xl p-4 transition-all"
              >
                <div className="text-sm font-black text-white group-hover:text-[#ffcc00] transition-colors mb-1">
                  {tool.label}
                </div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{tool.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[#ffcc00]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase text-black">Ready to Start a Project?</h2>
            <p className="text-black/70 font-bold mt-1">Same-day response · Free site visit · 40 years of 4th-gen expertise</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/estimator"
              className="bg-black text-[#ffcc00] font-black uppercase tracking-widest px-8 py-4 hover:bg-zinc-900 transition-colors text-sm"
            >
              Free Estimate
            </Link>
            <a
              href="tel:8044461296"
              className="flex items-center gap-2 bg-black/20 border-2 border-black text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-black/30 transition-colors text-sm"
            >
              <Phone size={14} fill="currentColor" />
              804-446-1296
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER BRAND ─────────────────────────────────────────────────── */}
      <section className="py-10 px-6 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[#ffcc00] font-black uppercase tracking-[0.3em] text-sm mb-1">
              J. Worden &amp; Sons Paving &amp; General Contracting
            </div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              4th Generation · Est. 1984 · Virginia Class A Contractor · 96% Marshall Std.
            </div>
          </div>
          <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest text-center md:text-right">
            Worden OS — Business Dashboard v1.0
            <br />
            VDOT Section 315 · ASTM C270 · FM Global · ACI 318
          </div>
        </div>
      </section>

    </main>
  );
}
