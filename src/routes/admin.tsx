import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  CheckCircle,
  DollarSign,
  Globe,
  Lock,
  Search,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { getAllSEOPages } from '../data/programmaticSEO';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

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
  const [activeTab, setActiveTab] = useState<'bids' | 'seo' | 'ai' | 'security'>('bids');

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
      <div className="px-6 flex gap-1 border-b border-gray-800 mb-6">
        {([
          ['bids', '💼 Bid Pipeline'],
          ['seo', '🌐 SEO Coverage'],
          ['ai', '🤖 AI Metrics'],
          ['security', '🛡️ Security'],
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
      </div>
    </div>
  );
}
