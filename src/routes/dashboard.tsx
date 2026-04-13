import { createFileRoute, Link } from '@tanstack/react-router';
import IronGridMap from '../components/IronGridMap';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  CheckCircle,
  Construction,
  DollarSign,
  Hammer,
  HardHat,
  MapPin,
  Mic,
  Phone,
  Radio,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { SERVICE_AREAS_41 } from '../constants/serviceAreas';
import { richmondVoiceHub } from '../utils/richmondVoiceHub';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

// ── Richmond Voice Hub — demo intercept log ───────────────────────────────────
const richmondVoiceHubDemoLog = [
  {
    time: '03:14 AM',
    caller: 'Mike T.',
    address: '4210 Midlothian Tpke, Richmond, VA',
    cityNode: richmondVoiceHub.matchCityNode('Midlothian'),
    sqft: '14,800 sqft',
    status: 'AI-Qualified → Kickserv',
    highlight: true,
  },
  {
    time: '07:42 AM',
    caller: 'Sandra J.',
    address: '1020 Hull Street, Richmond, VA',
    cityNode: richmondVoiceHub.matchCityNode('Richmond'),
    sqft: '3,200 sqft',
    status: 'AI-Qualified → Kickserv',
    highlight: false,
  },
  {
    time: '11:58 AM',
    caller: 'Brandon K.',
    address: '355 Colonial Ave, Petersburg, VA',
    cityNode: richmondVoiceHub.matchCityNode('Petersburg'),
    sqft: '8,600 sqft',
    status: 'AI-Qualified → Kickserv',
    highlight: false,
  },
];

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
  { label: '🎙 AI-Foreman', route: '/dashboard#ai-foreman', desc: 'Voice reception & lead lock' },
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

// ── Demo callers for the AI-Foreman panel ─────────────────────────────────────
const demoCallers = [
  { callerID: '+1-804-555-0101', callerName: 'Mike Thornton', address: '412 Bermuda Hundred Rd, Chester, VA' },
  { callerID: '+1-804-555-0188', callerName: 'Lisa Greenway', address: '7700 Hull Street Rd, Richmond, VA' },
  { callerID: '+1-804-555-0247', callerName: 'Carlos Vega', address: '2201 Ironbridge Rd, Chesterfield, VA' },
];

function AiForemanPanel() {
  const [log, setLog] = useState<CallLogEntry[]>([]);
  const [simulating, setSimulating] = useState(false);

  function simulateCall() {
    setSimulating(true);
    const caller = demoCallers[log.length % demoCallers.length];
    setTimeout(() => {
      const entry = virtualForeman.onIncomingCall(caller.callerID, caller.callerName, caller.address);
      setLog((prev) => [entry, ...prev]);
      setSimulating(false);
    }, 800);
  }

  return (
    <section className="py-12 px-6 border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-[#ffcc00]" />
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                AI-Foreman Voice Reception
              </h2>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">
                JWORDENAI v1.0 · {virtualForeman.voiceModel} · After-Hours Lead Lock
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              LIVE · {virtualForeman.hq}
            </div>
            <button
              onClick={simulateCall}
              disabled={simulating}
              className="bg-[#ffcc00] text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {simulating ? '⏳ Processing…' : '📞 Simulate Incoming Call'}
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Calls Intercepted', value: log.length.toString(), color: 'border-[#ffcc00]' },
            { label: 'Avg. Sqft Measured', value: log.length ? Math.round(log.reduce((s, e) => s + e.sqft, 0) / log.length).toLocaleString() : '—', color: 'border-cyan-500' },
            { label: 'Kickserv Leads Created', value: log.length.toString(), color: 'border-green-500' },
          ].map((stat) => (
            <div key={stat.label} className={`border-l-4 ${stat.color} bg-zinc-900/60 rounded-r-xl px-5 py-4`}>
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Call log */}
        {log.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-xl p-10 text-center">
            <Mic className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-600 font-bold text-sm uppercase tracking-widest">
              No calls yet — click "Simulate Incoming Call" to trigger the AI-Foreman
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {log.map((entry, i) => (
              <div
                key={i}
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 grid md:grid-cols-[1fr_auto] gap-4 items-start"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#ffcc00] font-black text-sm uppercase tracking-wide">{entry.callerName}</span>
                    <span className="text-[10px] text-zinc-600 font-bold">{entry.callerID}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-green-900/40 text-green-400 border border-green-800/40 px-2 py-0.5 rounded">
                      AI-Qualified
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-bold">{entry.address}</div>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-cyan-400">
                      <span className="text-zinc-600 font-bold">📡 Satellite:</span>
                      {entry.sqft.toLocaleString()} sqft measured
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-purple-400">
                      <span className="text-zinc-600 font-bold">🏗 Social Proof:</span>
                      Cited {entry.socialProof.year} {entry.socialProof.project} in {entry.socialProof.city}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-[10px] font-black text-green-400 mt-1">✓ Kickserv Lead Created</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="py-12 px-6 border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-[#ffcc00]" />
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                AI-Foreman Voice Reception
              </h2>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">
                JWORDENAI v1.0 · {virtualForeman.voiceModel} · After-Hours Lead Lock
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              LIVE · {virtualForeman.hq}
            </div>
            <button
              onClick={simulateCall}
              disabled={simulating}
              className="bg-[#ffcc00] text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {simulating ? '⏳ Processing…' : '📞 Simulate Incoming Call'}
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Calls Intercepted', value: log.length.toString(), color: 'border-[#ffcc00]' },
            { label: 'Avg. Sqft Measured', value: log.length ? Math.round(log.reduce((s, e) => s + e.sqft, 0) / log.length).toLocaleString() : '—', color: 'border-cyan-500' },
            { label: 'Kickserv Leads Created', value: log.length.toString(), color: 'border-green-500' },
          ].map((stat) => (
            <div key={stat.label} className={`border-l-4 ${stat.color} bg-zinc-900/60 rounded-r-xl px-5 py-4`}>
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Call log */}
        {log.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-xl p-10 text-center">
            <Mic className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-600 font-bold text-sm uppercase tracking-widest">
              No calls yet — click "Simulate Incoming Call" to trigger the AI-Foreman
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {log.map((entry, i) => (
              <div
                key={i}
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 grid md:grid-cols-[1fr_auto] gap-4 items-start"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#ffcc00] font-black text-sm uppercase tracking-wide">{entry.callerName}</span>
                    <span className="text-[10px] text-zinc-600 font-bold">{entry.callerID}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-green-900/40 text-green-400 border border-green-800/40 px-2 py-0.5 rounded">
                      AI-Qualified
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-bold">{entry.address}</div>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-cyan-400">
                      <span className="text-zinc-600 font-bold">📡 Satellite:</span>
                      {entry.sqft.toLocaleString()} sqft measured
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-purple-400">
                      <span className="text-zinc-600 font-bold">🏗 Social Proof:</span>
                      Cited {entry.socialProof.year} {entry.socialProof.project} in {entry.socialProof.city}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-[10px] font-black text-green-400 mt-1">✓ Kickserv Lead Created</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Dummy inputs for Claude Drop demo ────────────────────────────────────────
const DEMO_SQFT = 50000;
const DEMO_STATE = 'TX';
const DEMO_ADDRESS = '12345 Lone Star Blvd, Dallas, TX 75201';
const DEMO_DEPTH = 3;
const DEMO_TYPE = 'INDUSTRIAL' as const;
const DEMO_PROJECT_ID = `JWA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`;
const DEMO_DELAY_MS = 600; // Artificial delay to simulate async AI processing

// ── Ghost Protocol Activity Feed ──────────────────────────────────────────────
const ghostFeed = [
  { time: '04:12 AM', type: 'SYSTEM', color: 'text-red-400',    msg: 'GHOST PROTOCOL ACTIVE: Scanned 14 municipal commercial permits.' },
  { time: '04:14 AM', type: 'BID',    color: 'text-orange-400', msg: 'AUTONOMOUS BID: Calculated 42,000 sq ft for Plaza Street Partners (TX). 35% margin locked.' },
  { time: '04:15 AM', type: 'MAIL',   color: 'text-yellow-400', msg: 'AUTO-DISPATCH: Commercial proposal generated and emailed to GC Estimating Dept.' },
  { time: '04:18 AM', type: 'CREW',   color: 'text-green-400',  msg: 'FOREMAN ALERT: Job won. Dispatching GPS and 410-ton target to Crew Alpha app.' },
];

type DropResult = {
  payload: ReturnType<typeof claudeDropEngine.generateKickservPayload>;
  prompt: string;
};

function Dashboard() {
  const isAutonomousMode = false;
  const [dropping, setDropping] = useState(false);
  const [dropResult, setDropResult] = useState<DropResult | null>(null);

  function initiateDrop() {
    setDropping(true);
    setDropResult(null);
    setTimeout(() => {
      const payload = claudeDropEngine.generateKickservPayload(
        DEMO_PROJECT_ID, DEMO_STATE, DEMO_SQFT, DEMO_DEPTH, DEMO_TYPE,
      );
      const prompt = claudeDropEngine.generateClaudePrompt(payload, DEMO_ADDRESS);
      setDropResult({ payload, prompt });
      setDropping(false);
    }, DEMO_DELAY_MS);
  }

  return (
    <main className={`min-h-screen bg-[#0a0a0a] text-white font-sans transition-colors duration-500 ${isAutonomousMode ? 'bg-[#0a0505]' : ''}`}>

      {/* ── LIVE OPERATIONAL STATUS ───────────────────────────────────────── */}
      <section className="px-6 py-4 bg-black border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-[#f59e0b] animate-pulse" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f59e0b]">
              Live Operational Status
            </h2>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-auto" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-400">ALL SYSTEMS GO</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* System Health */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">System Health</div>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'PWA Core', status: 'ACTIVE', color: 'text-green-400' },
                  { label: 'Claude-3-Opus API', status: 'CONNECTED', color: 'text-green-400' },
                  { label: 'Kickserv CRM', status: 'SYNCED', color: 'text-[#f59e0b]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-400">{item.label}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.color}`}>
                      ● {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Active Crews */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">Active Crews Online</div>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'Crew Alpha [TX]', status: 'App Online' },
                  { label: 'Crew Beta [VA]', status: 'App Online' },
                  { label: 'Crew Gamma [NC]', status: 'App Online' },
                ].map((crew) => (
                  <div key={crew.label} className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-400">{crew.label}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-400">
                      ● {crew.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Live Active Sites */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">Live Active Sites</div>
              <div className="text-xs font-black text-[#f59e0b] mb-1">
                3 Active Pours
              </div>
              <div className="text-[10px] font-bold text-zinc-400 mb-2">
                Dallas · Richmond · Charlotte
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-green-400">
                  All Margins Locked {'>'} 35%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* ── IRON GRID WAR ROOM MAP ───────────────────────────────────────── */}
      <section className="py-8 px-6 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              The Iron Grid — 50-State War Room Command Map
            </h2>
            <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-[#ffcc00] bg-[#ffcc00]/10 border border-[#ffcc00]/30 rounded-full px-3 py-1 animate-pulse">
              LIVE WAR ROOM
            </span>
          </div>
          <IronGridMap />
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

      {/* ── QSR & FRANCHISE NSO RADAR ─────────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">QSR &amp; Franchise NSO Radar — 5-State Coastal Empire</h2>
            <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-[#ffcc00] bg-[#ffcc00]/10 border border-[#ffcc00]/30 rounded-full px-3 py-1 animate-pulse">
              LIVE MONITORING
            </span>
          </div>
          {/* Target Developers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {franchiseTracker.targets.map((target) => (
              <div key={target} className="border-l-4 border-[#ffcc00] bg-zinc-900/40 rounded-r-xl p-5">
                <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Target Developer</div>
                <div className="text-sm font-black uppercase text-white mb-1">{target}</div>
                <div className="text-[10px] text-[#ffcc00]/70 font-bold uppercase tracking-wider">Acquisition / Permitting Watch</div>
              </div>
            ))}
          </div>
          {/* High Priority Brands */}
          <div className="flex flex-wrap gap-3 mb-6">
            {franchiseTracker.highPriorityBrands.map((brand) => (
              <span key={brand} className="bg-zinc-900 border border-[#ffcc00]/30 text-[#ffcc00] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                🍔 {brand}
              </span>
            ))}
          </div>
          {/* Coastal Empire States */}
          <div className="flex flex-wrap gap-3">
            {franchiseTracker.coastalEmpireStates.map((state) => (
              <div key={state} className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3 text-center">
                <div className="text-lg font-black text-white">{state}</div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Coastal Empire</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-zinc-500 font-bold uppercase tracking-widest">
            Auto-triggers 90-day fast-track bid · Industrial math (148 lbs/sq yd) · 35% margin target · Kickserv lead generation
          </p>
        </div>
      </section>
      {/* ── CLAUDE AI INTELLIGENCE & PROJECTIONS ─────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <Bot className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              Claude AI Intelligence &amp; Projections
            </h2>
            <span className="ml-auto flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest text-yellow-400">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Active Model Status ── */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-900/60 border border-yellow-400/20 rounded-xl p-6">
              <div className="text-[9px] font-black uppercase tracking-widest text-yellow-400/60 mb-2">
                Active Model Status
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 text-green-400 font-black text-sm uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Status: ACTIVE
                </span>
                <span className="text-zinc-700">|</span>
                <span className="text-yellow-400 font-black text-sm uppercase tracking-widest">
                  Model: Claude-3-Opus
                </span>
                <span className="text-zinc-700">|</span>
                <span className="text-orange-400 font-black text-sm uppercase tracking-widest">
                  Scope: 50-State National Operation
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold mt-3 leading-relaxed">
                JWORDENAI Drop Engine armed — dynamic DOT compliance active across all 50 states. Binder index $627.50 · Machine health surcharge $0.08/ton · 35% net margin floor enforced.
              </p>
            </div>

            {/* ── Live Pipeline Projections ── */}
            <div className="bg-zinc-900/60 border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <div className="text-[9px] font-black uppercase tracking-widest text-orange-500/70">
                  Live Pipeline Projections
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-white">14</span>
                  <span className="text-sm font-black text-orange-400 uppercase tracking-wider mb-1">
                    Commercial Bids Auto-Generated This Week
                  </span>
                </div>
                <div className="h-px bg-zinc-800" />
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-yellow-400">$2.4M</span>
                  <span className="text-sm font-black text-zinc-400 uppercase tracking-wider mb-1">
                    Projected Pipeline Value
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { label: 'Federal / SAM.gov', value: '3', color: 'text-cyan-400' },
                    { label: 'State DOT', value: '5', color: 'text-purple-400' },
                    { label: 'Commercial', value: '6', color: 'text-orange-400' },
                  ].map((item) => (
                    <div key={item.label} className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Whale Win Probability ── */}
            <div className="bg-zinc-900/60 border border-yellow-400/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-yellow-400" />
                <div className="text-[9px] font-black uppercase tracking-widest text-yellow-400/70">
                  Whale Win Probability — Active {'>'} 20,000 sq ft Targets
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Texas Plaza Street Partners', sqft: '50k sqft', prob: 82, state: 'TX', dot: 'TxDOT' },
                  { name: 'KBP Brands — Southeast Cluster', sqft: '38k sqft', prob: 74, state: 'GA', dot: 'GDOT' },
                  { name: 'Food City — K-VA-T Expansion', sqft: '27k sqft', prob: 69, state: 'VA', dot: 'VDOT' },
                  { name: 'National Mall Overlay — USACE', sqft: '120k sqft', prob: 58, state: 'DC', dot: 'FHWA' },
                ].map((target) => (
                  <div key={target.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wide text-white truncate">{target.name}</span>
                        <span aria-label="Warning: Industrial volume" className="shrink-0 text-[8px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded px-1.5 py-0.5">
                          ⚠ {target.sqft}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300"
                            style={{ width: `${target.prob}%` }}
                          />
                        </div>
                        <span className={`shrink-0 text-[10px] font-black ${target.prob >= 75 ? 'text-green-400' : target.prob >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>
                          {target.prob}%
                        </span>
                        <span className="shrink-0 text-[9px] font-bold text-zinc-600 uppercase">{target.dot}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                Win Probability · Powered by Claude-3-Opus · DOT-Compliant Proposals Ready
              </div>
            </div>

            {/* ── Margin Forecast ── */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-900/60 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4 text-green-400" />
                <div className="text-[9px] font-black uppercase tracking-widest text-green-400/70">
                  Margin Forecast — 35% Net Floor Lock
                </div>
                <span aria-label="All bids compliant" className="ml-auto flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-3 py-1">
                  <CheckCircle className="w-3 h-3" />
                  ALL BIDS COMPLIANT
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'TX Plaza Street Partners', margin: 41, value: '$487K' },
                  { label: 'KBP SE Cluster', margin: 38, value: '$312K' },
                  { label: 'K-VA-T Food City', margin: 36, value: '$198K' },
                  { label: 'USACE Mall Overlay', margin: 35, value: '$1.4M' },
                ].map((bid) => (
                  <div key={bid.label} className="bg-zinc-800/40 rounded-lg p-4">
                    <div className="text-[9px] font-black uppercase tracking-wide text-zinc-500 mb-2 leading-tight">{bid.label}</div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className={`text-2xl font-black ${bid.margin >= 40 ? 'text-green-400' : bid.margin >= 36 ? 'text-yellow-400' : 'text-orange-400'}`}>
                        {bid.margin}%
                      </span>
                      <span className="text-xs font-bold text-zinc-500 mb-0.5">margin</span>
                    </div>
                    <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                        style={{ width: `${Math.min((bid.margin / 50) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-zinc-600 uppercase">Floor: 35%</span>
                      <span className="text-[10px] font-black text-white">{bid.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  Binder Index Applied: $627.50/ton
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  Machine Health Surcharge: $0.08/ton
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  Oil-Price Shield: ±$9/ton
                </div>
              </div>
            </div>

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

      {/* ── AI-FOREMAN VOICE RECEPTION ───────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-zinc-900 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">

          {/* Panel header */}
          <div className="flex items-center gap-3 mb-2">
            <Mic className="w-4 h-4 text-green-400 animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              AI-Foreman Voice Reception — Richmond Metro Node
            </h2>
          </div>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-6">
            JWORDENAI · 804 Hub · 72-City SEO Grid · Satellite Auto-Measure · Kickserv Auto-Inject
          </p>

          {/* Node status card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-1 bg-zinc-900/80 border border-green-800/60 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Live Node — 804 Metro</span>
              </div>
              <div className="text-3xl font-black text-white tracking-tighter">804-446-1296</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase leading-relaxed">
                {richmondVoiceHub.primaryHQ}
              </div>
              <div className="mt-auto pt-3 border-t border-zinc-800">
                <a
                  href={`tel:${richmondVoiceHub.activeNumber}`}
                  className="flex items-center gap-2 bg-green-900/30 border border-green-700/40 text-green-400 font-black uppercase tracking-widest text-[10px] px-4 py-2 hover:bg-green-800/40 transition-colors rounded"
                >
                  <Phone className="w-3 h-3" fill="currentColor" />
                  Call Richmond Node
                </a>
              </div>
            </div>

            {/* Capability tags */}
            <div className="md:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-3">Node Capabilities</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  '72-City SEO Grid Match',
                  'Satellite Auto-Measure',
                  '30-Year Social Proof Lookup',
                  'Kickserv Auto-Inject',
                  'CFO Margin Math',
                  'After-Hours Lead Lock',
                  'AI-Qualified Status',
                  'Chester HQ Sync',
                ].map((cap) => (
                  <span
                    key={cap}
                    className="text-[9px] font-black uppercase tracking-wider bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-1 rounded"
                  >
                    {cap}
                  </span>
                ))}
              </div>
              <div className="text-[10px] text-zinc-600 font-bold leading-relaxed">
                Every inbound call on <span className="text-green-400 font-black">804-446-1296</span> is intercepted by the AI-Foreman,
                matched to the nearest SEO city node in the 72-city Richmond Metro grid, satellite-measured for square footage,
                and injected into Kickserv with CFO-grade margin math — before Gene picks up his coffee.
              </div>
            </div>
          </div>

          {/* Intercept log */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
              <Activity className="w-3 h-3 text-[#ffcc00]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Live Intercept Log — 804 Richmond Node</span>
              <span className="ml-auto flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase text-green-500 tracking-widest">Active</span>
              </span>
            </div>
            <div className="divide-y divide-zinc-900">
              {richmondVoiceHubDemoLog.map((entry) => (
                <div
                  key={entry.time}
                  className={`grid grid-cols-2 md:grid-cols-5 gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-wide ${entry.highlight ? 'bg-green-950/20' : ''}`}
                >
                  <div className="text-zinc-600">{entry.time}</div>
                  <div className="text-white">{entry.caller}</div>
                  <div className="text-zinc-400 hidden md:block truncate">{entry.address}</div>
                  <div className={`${entry.highlight ? 'text-green-400' : 'text-[#ffcc00]'}`}>
                    ⬡ {entry.cityNode}
                  </div>
                  <div className="text-zinc-500">{entry.sqft} · {entry.status}</div>
                </div>
              ))}
            </div>
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
