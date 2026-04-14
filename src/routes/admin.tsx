import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  CheckCircle,
  DollarSign,
  Droplets,
  Flame,
  Globe,
  HardHat,
  Lock,
  MapPin,
  Search,
  Shield,
  Thermometer,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react';
import { getAllSEOPages } from '../data/programmaticSEO';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

// ── Digital Twin seed data ────────────────────────────────────────────────────

type EquipmentStatus = 'Operational' | 'Maintenance Due' | 'Down' | 'En Route';

interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  fuelPct: number;
  engineHours: number;
  status: EquipmentStatus;
  lastPing: string;
  maintenanceDue: number; // hours until next service
}

const FLEET: Equipment[] = [
  { id: 'T-1', name: 'Black Hawk Paver', type: 'Asphalt Paver', location: 'Job: VDOT Rt 288', fuelPct: 74, engineHours: 4821, status: 'Operational', lastPing: '0m ago', maintenanceDue: 179 },
  { id: 'T-2', name: 'Iron Duke Roller', type: 'Vibratory Compactor', location: 'Job: VDOT Rt 288', fuelPct: 61, engineHours: 3302, status: 'Operational', lastPing: '1m ago', maintenanceDue: 48 },
  { id: 'T-3', name: 'Steelman Dump #1', type: 'Dump Truck', location: 'En Route — Asphalt Plant', fuelPct: 48, engineHours: 7140, status: 'En Route', lastPing: '2m ago', maintenanceDue: 312 },
  { id: 'T-4', name: 'Steelman Dump #2', type: 'Dump Truck', location: 'Job: Henrico Schools', fuelPct: 82, engineHours: 5890, status: 'Operational', lastPing: '0m ago', maintenanceDue: 60 },
  { id: 'T-5', name: 'Crusher Skid Steer', type: 'Skid Steer Loader', location: 'Yard — 7011 Wood Rd', fuelPct: 95, engineHours: 2140, status: 'Operational', lastPing: '4m ago', maintenanceDue: 260 },
  { id: 'T-6', name: 'Titan Milling Machine', type: 'Cold Planer', location: 'IDLE — Yard', fuelPct: 100, engineHours: 1987, status: 'Maintenance Due', lastPing: '18m ago', maintenanceDue: -12 },
];

type JobProgress = 'On Track' | 'Ahead' | 'Delayed';

interface ActiveJob {
  id: string;
  name: string;
  client: string;
  location: string;
  progress: number; // 0–100
  crewCount: number;
  compaction: number; // % Marshall Unit Weight
  tempF: number; // mat temp °F
  weatherCondition: string;
  status: JobProgress;
  phase: string;
}

const ACTIVE_JOBS: ActiveJob[] = [
  { id: 'J-001', name: 'Rt. 288 Repave — Phase 1', client: 'VDOT', location: 'Chesterfield, VA', progress: 34, crewCount: 9, compaction: 97.2, tempF: 312, weatherCondition: '☀️ Clear 68°F', status: 'On Track', phase: 'Base Course' },
  { id: 'J-002', name: 'Henrico County Schools Lot', client: 'Henrico County', location: 'Glen Allen, VA', progress: 68, crewCount: 5, compaction: 96.8, tempF: 298, weatherCondition: '⛅ Partly Cloudy 71°F', status: 'Ahead', phase: 'Surface Course' },
  { id: 'J-003', name: 'Commerce Park Access Road', client: 'Chesterfield Dev. LLC', location: 'Midlothian, VA', progress: 12, crewCount: 7, compaction: 96.1, tempF: 320, weatherCondition: '🌧️ Light Rain 62°F', status: 'Delayed', phase: 'Subgrade Prep' },
  { id: 'J-004', name: 'Windsor Farms Driveway', client: 'Residential — Private', location: 'Richmond, VA', progress: 100, crewCount: 2, compaction: 97.5, tempF: 305, weatherCondition: '☀️ Sunny 73°F', status: 'Ahead', phase: 'Complete' },
];

interface MaterialStock {
  id: string;
  name: string;
  unit: string;
  onHand: number;
  capacity: number;
  criticalLevel: number;
  spec: string;
}

const MATERIAL_YARD: MaterialStock[] = [
  { id: 'M-1', name: 'SM-9.5A Surface Mix', unit: 'tons', onHand: 420, capacity: 800, criticalLevel: 150, spec: 'VDOT Sec 315' },
  { id: 'M-2', name: 'BM-25.0 Base Mix', unit: 'tons', onHand: 680, capacity: 1200, criticalLevel: 200, spec: 'VDOT Sec 315' },
  { id: 'M-3', name: '21A Crusher Run Base', unit: 'tons', onHand: 1050, capacity: 2000, criticalLevel: 300, spec: 'VDOT 21A Aggregate' },
  { id: 'M-4', name: '#57 Stone (Drainage)', unit: 'tons', onHand: 380, capacity: 600, criticalLevel: 100, spec: 'VDOT Section 303' },
  { id: 'M-5', name: 'Liquid Asphalt Binder PG 64-22', unit: 'gal', onHand: 8400, capacity: 15000, criticalLevel: 2500, spec: 'AASHTO M 320' },
];

// Oil price shield logic: baseline bid price + $9/ton buffer
const OIL_SHIELD = {
  baselinePricePerTon: 58.0,
  currentMarketPrice: 61.5,
  shieldBuffer: 9.0,
  maxProtected: 67.0, // baseline + buffer
  trend: '+$3.50/ton vs last week',
  alert: false, // true when currentMarketPrice > maxProtected
};

// ── Seeded demo data ─────────────────────────────────────────────────────────
const BID_PIPELINE = [
  { id: 'W-001', tier: '🐋', label: 'Whale', client: 'USACE — Ft. Belvoir Parking', value: 1_200_000, status: 'Proposal Sent', days: 3 },
  { id: 'W-002', tier: '🐋', label: 'Whale', client: 'VDOT — Rt. 288 Repave', value: 2_800_000, status: 'RFP Review', days: 7 },
  { id: 'S-001', tier: '🦈', label: 'Shark', client: 'Henrico County Schools', value: 320_000, status: 'Estimate Scheduled', days: 1 },
  { id: 'S-002', tier: '🦈', label: 'Shark', client: 'Chesterfield Commerce Park', value: 185_000, status: 'Proposal Sent', days: 5 },
  { id: 'F-001', tier: '🐟', label: 'Fish', client: 'Windsor Farms Driveway', value: 14_500, status: 'Closed Won', days: 0 },
  { id: 'F-002', tier: '🐟', label: 'Fish', client: 'Midlothian HOA Sealcoat', value: 8_200, status: 'Scheduled', days: 2 },
];

const SECURITY_ALERTS = [
  { tier: 1, time: '06:14 AM', location: 'Yard — Gate A', event: 'Unidentified vehicle — logged', resolved: true },
  { tier: 2, time: '11:42 PM', location: 'Equipment Bay 3', event: 'Motion detected after hours — crew alerted', resolved: true },
  { tier: 3, time: 'N/A', location: '—', event: 'No Tier 3 events in last 30 days', resolved: true },
];

const AI_METRICS = [
  { label: 'Bid Proposals Generated', value: 47, delta: '+12 this week', icon: Bot },
  { label: 'Voice Queries (Field)', value: 134, delta: '+28 this week', icon: Zap },
  { label: 'RAG Knowledge Hits', value: 892, delta: '+203 this week', icon: Search },
  { label: 'Avg Response Latency', value: '2.8s', delta: '↓ 0.4s vs last week', icon: Activity },
];

const TOP_SEO_PAGES = getAllSEOPages().filter((p) => p.priority === 'whale').slice(0, 8);

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

const tierColor = (tier: string) =>
  tier === '🐋' ? 'text-[#ffcc00] border-[#ffcc00]' : tier === '🦈' ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-gray-600';

const alertColor = (tier: number) =>
  tier === 3 ? 'border-red-500 bg-red-950/30' : tier === 2 ? 'border-yellow-500 bg-yellow-950/30' : 'border-gray-700 bg-gray-900/30';

// ── Component ────────────────────────────────────────────────────────────────
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bids' | 'seo' | 'ai' | 'security' | 'twin'>('bids');
  const [twinTick, setTwinTick] = useState(0);

  // Simulate live telemetry pulse every 8 seconds
  useEffect(() => {
    if (activeTab !== 'twin') return;
    const id = setInterval(() => setTwinTick((t) => t + 1), 8000);
    return () => clearInterval(id);
  }, [activeTab]);

  // Derive slightly jittered live values from tick (simulating IoT telemetry)
  const liveFleet = FLEET.map((eq, i) => ({
    ...eq,
    fuelPct: Math.max(5, Math.min(100, eq.fuelPct + (((twinTick + i) % 3) - 1))),
    lastPing: twinTick > 0 && eq.status !== 'Maintenance Due' ? `${(twinTick + i) % 5}m ago` : eq.lastPing,
  }));

  const liveJobs = ACTIVE_JOBS.map((job, i) => ({
    ...job,
    compaction: parseFloat((job.compaction + ((((twinTick + i) % 5) - 2) * 0.05)).toFixed(1)),
    tempF: Math.round(job.tempF + (((twinTick + i) % 3) - 1) * 2),
  }));

  const totalPipeline = BID_PIPELINE.reduce((s, b) => s + b.value, 0);
  const whaleCount = BID_PIPELINE.filter((b) => b.tier === '🐋').length;
  const sharkCount = BID_PIPELINE.filter((b) => b.tier === '🦈').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <div className="bg-[#111] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Shield className="text-[#ffcc00]" size={28} />
            <h1 className="text-2xl font-black uppercase tracking-wider text-[#ffcc00]">JWORDENAI Command Center</h1>
          </div>
          <p className="text-gray-500 text-xs mt-1">J. Worden &amp; Sons · 4th Generation Since 1984 · Virginia Class A Licensed</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-bold uppercase">All Systems Operational</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-6">
        {[
          { icon: DollarSign, label: 'Active Pipeline', value: fmt(totalPipeline), sub: `${BID_PIPELINE.length} bids`, color: 'text-[#ffcc00]' },
          { icon: TrendingUp, label: 'Whale Bids', value: `${whaleCount} 🐋`, sub: `+ ${sharkCount} sharks`, color: 'text-white' },
          { icon: Globe, label: 'SEO Pages Ready', value: `${getAllSEOPages().length.toLocaleString()}`, sub: '35 markets · 6 services', color: 'text-blue-400' },
          { icon: Lock, label: 'Security Status', value: 'SECURE', sub: 'No Tier 3 events', color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#111] border border-gray-800 p-5 hover:border-gray-600 transition-colors">
            <kpi.icon size={20} className="text-gray-500 mb-3" />
            <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">{kpi.label}</div>
            <div className="text-xs text-gray-600 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div className="px-6 flex gap-1 border-b border-gray-800 mb-6 overflow-x-auto">
        {([
          ['bids', '💼 Bid Pipeline'],
          ['seo', '🌐 SEO Coverage'],
          ['ai', '🤖 AI Metrics'],
          ['security', '🛡️ Security'],
          ['twin', '🔮 Digital Twin'],
        ] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-black uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'text-[#ffcc00] border-b-2 border-[#ffcc00]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-6 pb-12">
        {/* ─── Bid Pipeline ─── */}
        {activeTab === 'bids' && (
          <div>
            <h2 className="text-xl font-black uppercase text-white mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-[#ffcc00]" /> Active Bid Pipeline
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-xs tracking-widest">
                    <th className="text-left py-3 pr-6">Tier</th>
                    <th className="text-left py-3 pr-6">Client / Project</th>
                    <th className="text-left py-3 pr-6">Value</th>
                    <th className="text-left py-3 pr-6">Status</th>
                    <th className="text-left py-3">Days Active</th>
                  </tr>
                </thead>
                <tbody>
                  {BID_PIPELINE.map((bid) => (
                    <tr key={bid.id} className="border-b border-gray-900 hover:bg-gray-900/30 transition-colors">
                      <td className={`py-4 pr-6 text-xl font-black border-l-2 pl-3 ${tierColor(bid.tier)}`}>
                        {bid.tier} {bid.label}
                      </td>
                      <td className="py-4 pr-6 text-white font-bold">{bid.client}</td>
                      <td className="py-4 pr-6 text-[#ffcc00] font-black">{fmt(bid.value)}</td>
                      <td className="py-4 pr-6">
                        <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${
                          bid.status === 'Closed Won' ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {bid.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500">{bid.days === 0 ? '—' : `${bid.days}d`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-[#ffcc00]/10 border border-[#ffcc00]/30">
              <p className="text-[#ffcc00] font-black text-sm">
                📊 Total Pipeline: {fmt(totalPipeline)} · Win Rate Target: 65% · Projected Revenue: {fmt(totalPipeline * 0.65)}
              </p>
            </div>
          </div>
        )}

        {/* ─── SEO Coverage ─── */}
        {activeTab === 'seo' && (
          <div>
            <h2 className="text-xl font-black uppercase text-white mb-4 flex items-center gap-2">
              <Globe size={20} className="text-[#ffcc00]" /> Programmatic SEO Coverage
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total SEO Pages', value: getAllSEOPages().length.toLocaleString(), desc: '35 markets × 6 services' },
                { label: 'Whale Markets', value: getAllSEOPages().filter((p) => p.priority === 'whale').length.toString(), desc: '$500K+ opportunity cities' },
                { label: 'States Covered', value: '7', desc: 'VA, MD, DC, NC, PA, WV, DE + national' },
              ].map((s) => (
                <div key={s.label} className="bg-[#111] border border-gray-800 p-5">
                  <div className="text-3xl font-black text-[#ffcc00]">{s.value}</div>
                  <div className="text-xs font-black uppercase tracking-wider text-gray-400 mt-1">{s.label}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3">Top Whale Pages (Preview)</h3>
            <div className="space-y-2">
              {TOP_SEO_PAGES.map((page) => (
                <div key={page.path} className="flex items-center justify-between bg-[#111] border border-gray-800 px-4 py-3 hover:border-[#ffcc00]/30 transition-colors">
                  <div>
                    <span className="text-[#ffcc00] font-bold text-sm">{page.path}</span>
                    <p className="text-gray-500 text-xs mt-0.5">{page.title}</p>
                  </div>
                  <span className="text-xs font-black text-[#ffcc00] bg-[#ffcc00]/10 px-2 py-1">🐋 WHALE</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── AI Metrics ─── */}
        {activeTab === 'ai' && (
          <div>
            <h2 className="text-xl font-black uppercase text-white mb-4 flex items-center gap-2">
              <Bot size={20} className="text-[#ffcc00]" /> JWORDENAI Usage Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {AI_METRICS.map((m) => (
                <div key={m.label} className="bg-[#111] border border-gray-800 p-5">
                  <m.icon size={20} className="text-[#ffcc00] mb-3" />
                  <div className="text-3xl font-black text-white">{m.value}</div>
                  <div className="text-xs font-black uppercase tracking-wider text-gray-500 mt-1">{m.label}</div>
                  <div className="text-xs text-green-400 mt-1">{m.delta}</div>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3">Model Routing Distribution</h3>
            <div className="space-y-3">
              {[
                { model: 'Claude 3.5 Sonnet (Anthropic)', task: 'Bidding + General', pct: 65, color: 'bg-[#ffcc00]' },
                { model: 'GPT-4o (OpenAI)', task: 'Scheduling + Logistics', pct: 20, color: 'bg-blue-500' },
                { model: 'Gemini 1.5 Pro (Google)', task: 'Specs + Standards Lookup', pct: 15, color: 'bg-green-500' },
              ].map((m) => (
                <div key={m.model}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300 font-bold">{m.model}</span>
                    <span className="text-gray-500">{m.task} · {m.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className={`h-2 rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Security ─── */}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-xl font-black uppercase text-white mb-4 flex items-center gap-2">
              <Shield size={20} className="text-[#ffcc00]" /> Security & Threat Intelligence
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Tier 1 Events', value: '1', sub: 'Advisory — logged', color: 'text-gray-400' },
                { label: 'Tier 2 Events', value: '1', sub: 'Warning — resolved', color: 'text-yellow-400' },
                { label: 'Tier 3 Events', value: '0', sub: 'Critical — clear', color: 'text-green-400' },
              ].map((s) => (
                <div key={s.label} className="bg-[#111] border border-gray-800 p-5">
                  <div className={`text-4xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs font-black uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {SECURITY_ALERTS.map((alert, i) => (
                <div key={i} className={`border-l-4 px-4 py-3 ${alertColor(alert.tier)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {alert.resolved
                        ? <CheckCircle size={16} className="text-green-400" />
                        : <AlertTriangle size={16} className="text-red-400" />
                      }
                      <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                        Tier {alert.tier} · {alert.time}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">{alert.location}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1 ml-7">{alert.event}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-900/20 border border-green-800">
              <p className="text-green-400 font-black text-sm flex items-center gap-2">
                <CheckCircle size={16} /> YARD SECURE — No Tier 3 lockdown events in last 30 days.
              </p>
            </div>
          </div>
        )}
        {/* ─── Digital Twin ─── */}
        {activeTab === 'twin' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                <Activity size={20} className="text-[#ffcc00]" /> Digital Twin — Live Asset Mirror
              </h2>
              <div className="flex items-center gap-2 text-xs text-green-400 font-black uppercase">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Telemetry · Sync {twinTick > 0 ? `#${twinTick}` : 'Initializing…'}
              </div>
            </div>

            {/* ── Oil Price Shield ── */}
            <section>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Flame size={14} className="text-orange-400" /> Liquid Asphalt · $9/Ton Oil-Price Shield
              </h3>
              <div className={`border p-5 grid grid-cols-2 md:grid-cols-4 gap-6 ${OIL_SHIELD.alert ? 'border-red-500 bg-red-950/20' : 'border-[#ffcc00]/40 bg-[#ffcc00]/5'}`}>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Baseline Bid Price</div>
                  <div className="text-2xl font-black text-white">${OIL_SHIELD.baselinePricePerTon.toFixed(2)}<span className="text-sm text-gray-500">/ton</span></div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Current Market</div>
                  <div className="text-2xl font-black text-orange-400">${OIL_SHIELD.currentMarketPrice.toFixed(2)}<span className="text-sm text-gray-500">/ton</span></div>
                  <div className="text-xs text-orange-300 mt-0.5">{OIL_SHIELD.trend}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Shield Buffer</div>
                  <div className="text-2xl font-black text-[#ffcc00]">+${OIL_SHIELD.shieldBuffer.toFixed(2)}<span className="text-sm text-gray-500">/ton</span></div>
                  <div className="text-xs text-gray-500 mt-0.5">Per GEMINI.md standard</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Max Protected</div>
                  <div className={`text-2xl font-black ${OIL_SHIELD.alert ? 'text-red-400' : 'text-green-400'}`}>${OIL_SHIELD.maxProtected.toFixed(2)}<span className="text-sm text-gray-500">/ton</span></div>
                  <div className={`text-xs mt-0.5 font-bold ${OIL_SHIELD.alert ? 'text-red-400' : 'text-green-400'}`}>
                    {OIL_SHIELD.alert ? '⚠️ SHIELD BREACHED — Reprice Bids' : '✅ SHIELD HOLDS — Margin Protected'}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Active Job Sites ── */}
            <section>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <MapPin size={14} className="text-[#ffcc00]" /> Active Job Sites — Live Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveJobs.map((job) => {
                  const compactionOk = job.compaction >= 96.0;
                  const statusColor =
                    job.status === 'Ahead' ? 'text-green-400 border-green-700' :
                    job.status === 'Delayed' ? 'text-red-400 border-red-700' :
                    'text-[#ffcc00] border-[#ffcc00]/40';
                  return (
                    <div key={job.id} className="bg-[#111] border border-gray-800 p-5 hover:border-gray-600 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-white font-black text-sm">{job.name}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{job.client} · {job.location}</div>
                        </div>
                        <span className={`text-xs font-black uppercase px-2 py-1 border ${statusColor}`}>{job.status}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500 font-bold uppercase tracking-wider">Phase: {job.phase}</span>
                          <span className="text-[#ffcc00] font-black">{job.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${job.progress === 100 ? 'bg-green-500' : 'bg-[#ffcc00]'}`}
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="bg-gray-900/60 px-2 py-2">
                          <div className="text-gray-500 uppercase tracking-wider font-bold mb-0.5">Crew</div>
                          <div className="text-white font-black flex items-center gap-1">
                            <HardHat size={12} className="text-[#ffcc00]" /> {job.crewCount}
                          </div>
                        </div>
                        <div className={`px-2 py-2 ${compactionOk ? 'bg-green-950/30' : 'bg-red-950/30'}`}>
                          <div className="text-gray-500 uppercase tracking-wider font-bold mb-0.5">Compaction</div>
                          <div className={`font-black ${compactionOk ? 'text-green-400' : 'text-red-400'}`}>
                            {job.compaction}% MUW
                          </div>
                          {!compactionOk && <div className="text-red-400 text-xs">⚠️ Below 96% floor!</div>}
                        </div>
                        <div className="bg-gray-900/60 px-2 py-2">
                          <div className="text-gray-500 uppercase tracking-wider font-bold mb-0.5">Mat Temp</div>
                          <div className={`font-black flex items-center gap-1 ${job.tempF < 280 ? 'text-red-400' : 'text-white'}`}>
                            <Thermometer size={12} className="text-orange-400" /> {job.tempF}°F
                          </div>
                          {job.tempF < 280 && <div className="text-red-400">⚠️ Low temp!</div>}
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">{job.weatherCondition}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Equipment Fleet Telemetry ── */}
            <section>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Truck size={14} className="text-[#ffcc00]" /> Equipment Fleet — Live Telemetry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 uppercase text-xs tracking-widest">
                      <th className="text-left py-3 pr-4">Unit</th>
                      <th className="text-left py-3 pr-4">Type</th>
                      <th className="text-left py-3 pr-4">Location</th>
                      <th className="text-left py-3 pr-4">Fuel</th>
                      <th className="text-left py-3 pr-4">Engine Hrs</th>
                      <th className="text-left py-3 pr-4">Next Svc</th>
                      <th className="text-left py-3 pr-4">Ping</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveFleet.map((eq) => {
                      const statusColor =
                        eq.status === 'Operational' ? 'text-green-400 bg-green-900/20' :
                        eq.status === 'En Route' ? 'text-blue-400 bg-blue-900/20' :
                        eq.status === 'Maintenance Due' ? 'text-red-400 bg-red-900/20' :
                        'text-gray-400 bg-gray-900/20';
                      const fuelColor = eq.fuelPct > 40 ? 'bg-green-500' : eq.fuelPct > 20 ? 'bg-yellow-500' : 'bg-red-500';
                      return (
                        <tr key={eq.id} className="border-b border-gray-900 hover:bg-gray-900/30 transition-colors">
                          <td className="py-3 pr-4 font-black text-[#ffcc00]">{eq.id}</td>
                          <td className="py-3 pr-4">
                            <div className="text-white font-bold text-xs">{eq.name}</div>
                            <div className="text-gray-500 text-xs">{eq.type}</div>
                          </td>
                          <td className="py-3 pr-4 text-gray-400 text-xs max-w-[140px]">{eq.location}</td>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <Droplets size={12} className="text-blue-400 shrink-0" />
                              <div className="w-20">
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div className={`h-1.5 rounded-full ${fuelColor} transition-all duration-700`} style={{ width: `${eq.fuelPct}%` }} />
                                </div>
                                <div className="text-xs text-gray-400 mt-0.5">{eq.fuelPct}%</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-gray-400 text-xs">{eq.engineHours.toLocaleString()} h</td>
                          <td className="py-3 pr-4 text-xs">
                            {eq.maintenanceDue < 0
                              ? <span className="text-red-400 font-black">OVERDUE {Math.abs(eq.maintenanceDue)}h</span>
                              : eq.maintenanceDue < 75
                              ? <span className="text-yellow-400 font-bold">{eq.maintenanceDue}h</span>
                              : <span className="text-gray-500">{eq.maintenanceDue}h</span>
                            }
                          </td>
                          <td className="py-3 pr-4 text-gray-500 text-xs">{eq.lastPing}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs font-black uppercase tracking-wider ${statusColor}`}>{eq.status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Material Yard Inventory ── */}
            <section>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <HardHat size={14} className="text-[#ffcc00]" /> Material Yard — Inventory (7011 Wood Rd)
              </h3>
              <div className="space-y-3">
                {MATERIAL_YARD.map((mat) => {
                  const pct = Math.round((mat.onHand / mat.capacity) * 100);
                  const critical = mat.onHand <= mat.criticalLevel;
                  const barColor = critical ? 'bg-red-500' : pct < 50 ? 'bg-yellow-500' : 'bg-green-500';
                  return (
                    <div key={mat.id} className={`border px-4 py-3 ${critical ? 'border-red-700 bg-red-950/10' : 'border-gray-800 bg-[#111]'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-white font-black text-sm">{mat.name}</span>
                          <span className="ml-3 text-xs text-gray-500 font-mono">{mat.spec}</span>
                        </div>
                        <div className="text-right">
                          <span className={`font-black text-sm ${critical ? 'text-red-400' : 'text-[#ffcc00]'}`}>
                            {mat.onHand.toLocaleString()} {mat.unit}
                          </span>
                          <span className="text-gray-500 text-xs ml-1">/ {mat.capacity.toLocaleString()}</span>
                          {critical && <div className="text-red-400 text-xs font-black">⚠️ REORDER NOW</div>}
                        </div>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-2 rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1 text-gray-600">
                        <span>Critical: {mat.criticalLevel.toLocaleString()} {mat.unit}</span>
                        <span>{pct}% of capacity</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Compaction Compliance Summary ── */}
            <section>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <CheckCircle size={14} className="text-green-400" /> 96% Marshall Unit Weight — Compaction Compliance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {liveJobs.map((job) => {
                  const pass = job.compaction >= 96.0;
                  return (
                    <div key={job.id} className={`border p-4 ${pass ? 'border-green-800 bg-green-950/20' : 'border-red-700 bg-red-950/20'}`}>
                      <div className={`text-2xl font-black ${pass ? 'text-green-400' : 'text-red-400'}`}>{job.compaction}%</div>
                      <div className="text-xs text-gray-400 font-bold mt-1 leading-tight">{job.name.split('—')[0].trim()}</div>
                      <div className={`text-xs font-black mt-2 ${pass ? 'text-green-400' : 'text-red-400'}`}>
                        {pass ? '✅ PASS ≥96%' : '❌ FAIL <96%'}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 p-3 bg-[#ffcc00]/10 border border-[#ffcc00]/30 text-xs text-[#ffcc00] font-black">
                ⚙️ Standard: 96% Marshall Unit Weight (AASHTO T245) — Worden Non-Negotiable Floor · VDOT Sec 315
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
