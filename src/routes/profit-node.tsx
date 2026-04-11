import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Camera,
  CloudRain,
  Sun,
  Wind,
  Truck,
  DollarSign,
  Layers,
  Clock,
  Activity,
  Thermometer,
  Calendar,
  FileText,
  ZapOff,
  Zap,
  Shield,
} from 'lucide-react';

export const Route = createFileRoute('/profit-node')({
  component: LiveExecutionDashboard,
});

// ─── Mock job data representing the original AI estimate ───────────────────
const ORIGINAL_BID = {
  jobNumber: 'WS-2026-0042',
  client: 'Chesterfield County Public Schools',
  site: '12400 Branders Bridge Rd, Chester, VA 23831',
  bidDate: '2026-03-01',
  contractDeadline: '2026-05-15',
  ldPerDay: 5000,
  estimatedTons: 1200,
  tonRate: 110, // $/ton material + lay
  estimatedLaborHours: 480,
  laborRate: 65, // $/hr
  oilIndexAtBid: 78.4, // USD/barrel WTI
  liquidAsphaltAtBid: 620, // $/ton liquid asphalt binder
  estimatedMaterialCost: 132000, // 1200 * 110
  estimatedLaborCost: 31200, // 480 * 65
  estimatedTotal: 175000,
  grossProfit: 11800,
  profitMarginPct: 6.74,
};

const PHASES = [
  { id: 1, name: 'Phase 1 – Mobilization & Grading', progress: 100, status: 'COMPLETE', startDay: 1, endDay: 5 },
  { id: 2, name: 'Phase 2 – Base Stone (VDOT 21A)', progress: 100, status: 'COMPLETE', startDay: 6, endDay: 12 },
  { id: 3, name: 'Phase 3 – Binder Asphalt (SM-9.5A)', progress: 68, status: 'IN PROGRESS', startDay: 13, endDay: 22 },
  { id: 4, name: 'Phase 4 – Surface Course (SM-9.5D)', progress: 0, status: 'PENDING', startDay: 23, endDay: 28 },
  { id: 5, name: 'Phase 5 – Striping & ADA Compliance', progress: 0, status: 'PENDING', startDay: 29, endDay: 32 },
];

const WEATHER_LOG = [
  { day: 'Apr 1', forecast: 'Clear 68°F', actual: 'Clear 71°F', delay: false },
  { day: 'Apr 2', forecast: 'Partly Cloudy 65°F', actual: 'Heavy Rain 58°F', delay: true, hours: 8 },
  { day: 'Apr 3', forecast: 'Rain 55°F', actual: 'Rain 53°F', delay: true, hours: 10 },
  { day: 'Apr 4', forecast: 'Clearing 60°F', actual: 'Clearing 62°F', delay: false },
  { day: 'Apr 5', forecast: 'Clear 74°F', actual: 'Clear 76°F', delay: false },
  { day: 'Apr 7', forecast: 'Clear 72°F', actual: 'Micro-burst storm 61°F', delay: true, hours: 6 },
  { day: 'Apr 8', forecast: 'Clear 70°F', actual: 'Clear 69°F', delay: false },
  { day: 'Apr 9', forecast: 'Clear 75°F', actual: 'Clear 77°F', delay: false },
];

const HOLIDAY_LOG = [
  { date: 'Apr 18', event: 'Good Friday — Plant Holiday Shutdown', impact: 'Lost 1 full production day (120 tons est.)' },
  { date: 'May 26', event: 'Memorial Day — Plant Holiday Shutdown', impact: 'Lost 1 full production day (120 tons est.)' },
];

const CAMERA_FEEDS = [
  { id: 'CAM-01', label: 'North Entry — Paver Position', status: 'LIVE', phase: 'Binder Lay Active', temp: '71°F', alert: false },
  { id: 'CAM-02', label: 'South Lot — Roller Coverage', status: 'LIVE', phase: 'Breakdown Roll Pass 2', temp: '71°F', alert: false },
  { id: 'CAM-03', label: 'Scale Ticket Station', status: 'LIVE', phase: 'Truck #14 — 22.4 tons', temp: 'N/A', alert: false },
  { id: 'CAM-04', label: 'ADA Ramp Zone (NW Corner)', status: 'OFFLINE', phase: 'Phase Pending — Day 29', temp: 'N/A', alert: true },
];

// ─── Oil price history (mock WTI crude) ──────────────────────────────────
const OIL_HISTORY = [
  { label: 'Mar 1 (Bid Day)', wti: 78.4, liquidAsphalt: 620 },
  { label: 'Mar 15', wti: 79.1, liquidAsphalt: 625 },
  { label: 'Apr 1', wti: 81.6, liquidAsphalt: 638 },
  { label: 'Apr 7', wti: 82.9, liquidAsphalt: 646 },
  { label: 'Today (Apr 11)', wti: 82.4, liquidAsphalt: 643 },
];

// ─── Domain constants ────────────────────────────────────────────────────
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const HOURS_PER_WORK_DAY = 8;
/** Approximate liquid asphalt binder content by weight in a standard SM-9.5 mix */
const ASPHALT_BINDER_CONTENT_PCT = 0.06;
/** WTI price baseline for progress-bar visualization (low end of typical range) */
const WTI_PROGRESS_MIN = 70;
/** WTI price range span for progress-bar visualization */
const WTI_PROGRESS_RANGE = 30;
/** Starting ticket number offset — first three tickets were pre-loaded in initial state */
const INITIAL_TICKET_OFFSET = 42;

// ─── Helper utilities ────────────────────────────────────────────────────
function currency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}
function pct(n: number) {
  return n.toFixed(2) + '%';
}
function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

// ─── Sub-components ──────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    COMPLETE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    'IN PROGRESS': 'bg-[#ffcc00]/20 text-[#ffcc00] border-[#ffcc00]/40',
    PENDING: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/40',
    LIVE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    OFFLINE: 'bg-red-500/20 text-red-400 border-red-500/40',
  };
  return (
    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border rounded-sm ${map[status] ?? 'bg-zinc-700 text-zinc-300 border-zinc-600'}`}>
      {status}
    </span>
  );
}

function ProgressBar({ value, color = '#ffcc00' }: { value: number; color?: string }) {
  return (
    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────
function LiveExecutionDashboard() {
  // Ticket reconciliation state
  const [tonsToDate, setTonsToDate] = useState<string>('815');
  const [laborToDate, setLaborToDate] = useState<string>('312');

  // Oil price state (live mock — ticks every 8 seconds)
  const [currentOil, setCurrentOil] = useState(82.4);
  const [oilTick, setOilTick] = useState<'up' | 'down' | 'flat'>('flat');

  // Ticket log
  const [ticketLog, setTicketLog] = useState([
    { ts: '2026-04-11 06:14', ticket: 'TKT-0041', tons: 24.2, truck: 'T-07', temp: '71°F' },
    { ts: '2026-04-11 05:51', ticket: 'TKT-0040', tons: 23.8, truck: 'T-12', temp: '70°F' },
    { ts: '2026-04-11 05:29', ticket: 'TKT-0039', tons: 22.9, truck: 'T-03', temp: '69°F' },
  ]);
  const [newTicketTons, setNewTicketTons] = useState('');
  const [newTicketTruck, setNewTicketTruck] = useState('T-01');

  // Simulate live oil price ticks
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentOil((prev) => {
        const delta = (Math.random() - 0.5) * 0.3;
        const next = Math.round((prev + delta) * 100) / 100;
        setOilTick(delta > 0.05 ? 'up' : delta < -0.05 ? 'down' : 'flat');
        return next;
      });
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Derived profit calculations
  const tonsNum = parseFloat(tonsToDate) || 0;
  const laborNum = parseFloat(laborToDate) || 0;
  const currentLiquidAsphalt = OIL_HISTORY[OIL_HISTORY.length - 1].liquidAsphalt;
  const oilDeltaPct = ((currentOil - ORIGINAL_BID.oilIndexAtBid) / ORIGINAL_BID.oilIndexAtBid) * 100;
  const materialCostActual = tonsNum * ORIGINAL_BID.tonRate;
  const laborCostActual = laborNum * ORIGINAL_BID.laborRate;
  const oilEscalationCost = tonsNum * (currentLiquidAsphalt - ORIGINAL_BID.liquidAsphaltAtBid) * ASPHALT_BINDER_CONTENT_PCT;
  const totalActualCost = materialCostActual + laborCostActual + oilEscalationCost;
  const projectedRevenue = ORIGINAL_BID.estimatedTotal;
  const estimatedOverhead = ORIGINAL_BID.estimatedTotal - ORIGINAL_BID.estimatedMaterialCost - ORIGINAL_BID.estimatedLaborCost;
  const projectedProfit = projectedRevenue - totalActualCost - estimatedOverhead;
  const isEscalationTriggered = oilDeltaPct >= 5;
  const escalationRecovery = isEscalationTriggered ? Math.abs(oilEscalationCost) : 0;

  // Weather delay totals
  const totalDelayHours = WEATHER_LOG.filter(d => d.delay).reduce((s, d) => s + (d.hours ?? 0), 0);
  const holidayDays = HOLIDAY_LOG.length;

  const addTicket = useCallback(() => {
    const tons = parseFloat(newTicketTons);
    if (!tons || isNaN(tons)) return;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const ticketNum = `TKT-${String(ticketLog.length + INITIAL_TICKET_OFFSET).padStart(4, '0')}`;
    setTicketLog(prev => [{ ts: now, ticket: ticketNum, tons, truck: newTicketTruck, temp: `${Math.round(65 + Math.random() * 15)}°F` }, ...prev]);
    setTonsToDate(prev => String(roundToOneDecimal(parseFloat(prev) + tons)));
    setNewTicketTons('');
  }, [newTicketTons, newTicketTruck, ticketLog.length]);

  const varTons = tonsNum - ORIGINAL_BID.estimatedTons;
  const varLabor = laborNum - ORIGINAL_BID.estimatedLaborHours;
  const varTonsPct = (varTons / ORIGINAL_BID.estimatedTons) * 100;
  const varLaborPct = (varLabor / ORIGINAL_BID.estimatedLaborHours) * 100;
  const netVarianceCost = (varTons * ORIGINAL_BID.tonRate) + (varLabor * ORIGINAL_BID.laborRate);

  return (
    <main className="min-h-screen bg-[#080808] text-white font-sans pb-32">

      {/* ── HERO HEADER ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-6 bg-[#0d0d0d] border-b-[6px] border-[#ffcc00] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,204,0,0.03) 39px,rgba(255,204,0,0.03) 40px)', backgroundSize: '100% 40px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-[10px] tracking-[0.4em]">
              Internal Operations — Phase III
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 font-black uppercase text-[10px] tracking-widest animate-pulse">
              ● LIVE
            </span>
            <span className="bg-zinc-800 text-zinc-400 border border-zinc-700 px-3 py-1 font-black uppercase text-[10px] tracking-widest">
              Contract #{ORIGINAL_BID.jobNumber}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-4">
            PROFIT <span className="text-[#ffcc00]">NODE</span>
          </h1>
          <p className="text-xl text-zinc-400 font-bold max-w-3xl mb-2">
            Post-Construction &amp; Live Execution Reconciliation — AI Estimate vs. Reality
          </p>
          <p className="text-sm text-zinc-600 font-bold uppercase tracking-widest">
            {ORIGINAL_BID.client} · {ORIGINAL_BID.site}
          </p>
        </div>
      </section>

      {/* ── KPI STRIP ───────────────────────────────────────────────── */}
      <section className="bg-[#111] border-b border-zinc-900 px-6 py-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Contract Value', value: currency(ORIGINAL_BID.estimatedTotal), icon: DollarSign, accent: '#ffcc00' },
            { label: 'Tons Placed (To Date)', value: `${tonsNum} / ${ORIGINAL_BID.estimatedTons}`, icon: Layers, accent: '#ffcc00' },
            { label: 'Labor Hours (To Date)', value: `${laborNum} / ${ORIGINAL_BID.estimatedLaborHours}`, icon: Clock, accent: '#ffcc00' },
            { label: 'WTI Crude (Live)', value: `$${currentOil.toFixed(2)}/bbl`, icon: Activity, accent: currentOil > ORIGINAL_BID.oilIndexAtBid ? '#f87171' : '#34d399' },
            { label: 'Weather Delay Hours', value: `${totalDelayHours} hrs`, icon: CloudRain, accent: totalDelayHours > 20 ? '#f87171' : '#ffcc00' },
            { label: 'Days to Deadline', value: String(Math.max(0, Math.round((new Date(ORIGINAL_BID.contractDeadline).getTime() - Date.now()) / MS_PER_DAY))), icon: Calendar, accent: '#ffcc00' },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-black border border-zinc-800 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: kpi.accent }} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{kpi.label}</span>
                </div>
                <div className="text-xl font-black" style={{ color: kpi.accent }}>{kpi.value}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10 space-y-10">

        {/* ── SECTION 1: JOB COSTING & TICKET RECONCILIATION ──────── */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <Truck className="text-[#ffcc00]" size={24} />
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Scale Ticket &amp; <span className="text-[#ffcc00]">Variance Engine</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-1 bg-[#111] border border-zinc-800 p-6 space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-4">Enter Actual Job Data</h3>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Actual Tons (Cumulative)</label>
                <input
                  type="number"
                  value={tonsToDate}
                  onChange={e => setTonsToDate(e.target.value)}
                  className="w-full bg-black border border-zinc-700 text-white text-xl font-black p-3 focus:border-[#ffcc00] outline-none transition-colors"
                  placeholder="0"
                />
                <div className="text-xs text-zinc-600 mt-1">Estimated: {ORIGINAL_BID.estimatedTons} tons</div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Actual Labor Hours</label>
                <input
                  type="number"
                  value={laborToDate}
                  onChange={e => setLaborToDate(e.target.value)}
                  className="w-full bg-black border border-zinc-700 text-white text-xl font-black p-3 focus:border-[#ffcc00] outline-none transition-colors"
                  placeholder="0"
                />
                <div className="text-xs text-zinc-600 mt-1">Estimated: {ORIGINAL_BID.estimatedLaborHours} hrs @ ${ORIGINAL_BID.laborRate}/hr</div>
              </div>

              {/* Add Ticket */}
              <div className="border-t border-zinc-800 pt-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Add Scale Ticket (Live)</h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    value={newTicketTons}
                    onChange={e => setNewTicketTons(e.target.value)}
                    placeholder="Tons"
                    className="flex-1 bg-black border border-zinc-700 text-white font-black p-2 focus:border-[#ffcc00] outline-none text-sm"
                  />
                  <select
                    value={newTicketTruck}
                    onChange={e => setNewTicketTruck(e.target.value)}
                    className="bg-black border border-zinc-700 text-[#ffcc00] font-black p-2 focus:border-[#ffcc00] outline-none text-sm appearance-none"
                  >
                    {['T-01','T-03','T-07','T-09','T-12','T-14'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <button
                  onClick={addTicket}
                  className="w-full bg-[#ffcc00] text-black font-black uppercase tracking-widest py-2 text-sm hover:bg-white transition-all"
                >
                  + Log Ticket
                </button>
              </div>
            </div>

            {/* Variance Cards */}
            <div className="lg:col-span-2 space-y-4">
              {/* Tons Variance */}
              <div className={`p-5 border-l-[6px] ${varTons > 0 ? 'border-red-500 bg-red-500/5' : 'border-emerald-500 bg-emerald-500/5'} border border-zinc-800`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Tons Variance</span>
                  {varTons > 0 ? <TrendingUp size={18} className="text-red-400" /> : <TrendingDown size={18} className="text-emerald-400" />}
                </div>
                <div className={`text-3xl font-black mb-1 ${varTons > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {varTons > 0 ? '+' : ''}{varTons.toFixed(1)} tons ({pct(varTonsPct)})
                </div>
                <div className="text-zinc-400 text-sm font-bold">
                  {varTons > 0
                    ? `Overrun: ${currency(varTons * ORIGINAL_BID.tonRate)} — Subgrade yielded / add. material required`
                    : `Under estimate — ${currency(Math.abs(varTons * ORIGINAL_BID.tonRate))} material savings`}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-zinc-600 mb-1">
                    <span>Placed: {tonsNum} tons</span>
                    <span>Estimated: {ORIGINAL_BID.estimatedTons} tons</span>
                  </div>
                  <ProgressBar value={Math.min((tonsNum / ORIGINAL_BID.estimatedTons) * 100, 100)} color={varTons > 0 ? '#f87171' : '#34d399'} />
                </div>
              </div>

              {/* Labor Variance */}
              <div className={`p-5 border-l-[6px] ${varLabor > 0 ? 'border-red-500 bg-red-500/5' : 'border-emerald-500 bg-emerald-500/5'} border border-zinc-800`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Labor Hours Variance</span>
                  {varLabor > 0 ? <TrendingUp size={18} className="text-red-400" /> : <TrendingDown size={18} className="text-emerald-400" />}
                </div>
                <div className={`text-3xl font-black mb-1 ${varLabor > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {varLabor > 0 ? '+' : ''}{varLabor.toFixed(0)} hrs ({pct(varLaborPct)})
                </div>
                <div className="text-zinc-400 text-sm font-bold">
                  {varLabor > 0
                    ? `Labor overrun: ${currency(varLabor * ORIGINAL_BID.laborRate)} — Weather delays + material overrun`
                    : `Labor savings: ${currency(Math.abs(varLabor * ORIGINAL_BID.laborRate))} — Crew efficiency above forecast`}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-zinc-600 mb-1">
                    <span>Logged: {laborNum} hrs</span>
                    <span>Estimated: {ORIGINAL_BID.estimatedLaborHours} hrs</span>
                  </div>
                  <ProgressBar value={Math.min((laborNum / ORIGINAL_BID.estimatedLaborHours) * 100, 100)} color={varLabor > 0 ? '#f87171' : '#34d399'} />
                </div>
              </div>

              {/* Net P&L */}
              <div className="p-5 bg-black border-2 border-[#ffcc00]/40">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Net Cost Variance (Materials + Labor)</span>
                  <DollarSign className="text-[#ffcc00]" size={18} />
                </div>
                <div className={`text-4xl font-black ${netVarianceCost > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {netVarianceCost > 0 ? '+' : ''}{currency(netVarianceCost)}
                </div>
                <div className="text-zinc-500 text-sm font-bold mt-1">
                  {netVarianceCost > 0 ? 'OVERRUN vs. AI Estimate — review billing adjustments' : 'UNDER ESTIMATE — margin expansion confirmed'}
                </div>
                {isEscalationTriggered && (
                  <div className="mt-3 flex items-start gap-3 bg-red-500/10 border border-red-500/30 p-3">
                    <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-red-300 text-xs font-bold">Material Escalation Clause ACTIVE — Oil spiked {oilDeltaPct.toFixed(1)}% since bid day. Billing client {currency(escalationRecovery)} per Contract §4.C.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ticket Log */}
          <div className="mt-6 bg-[#111] border border-zinc-800">
            <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-3">
              <FileText size={16} className="text-[#ffcc00]" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Live Scale Ticket Log</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    {['Timestamp', 'Ticket #', 'Tons', 'Truck', 'Mat Temp'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketLog.map((t, i) => (
                    <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors">
                      <td className="px-5 py-3 text-zinc-500 font-mono text-xs">{t.ts}</td>
                      <td className="px-5 py-3 text-[#ffcc00] font-black text-xs">{t.ticket}</td>
                      <td className="px-5 py-3 text-white font-black">{t.tons}</td>
                      <td className="px-5 py-3 text-zinc-300 font-bold">{t.truck}</td>
                      <td className="px-5 py-3 text-zinc-400 font-bold">{t.temp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: OIL PRICE INDEX ───────────────────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <Activity className="text-[#ffcc00]" size={24} />
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Macro-Economic <span className="text-[#ffcc00]">Oil Index Tracker</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Live Price Widget */}
            <div className="bg-[#111] border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">WTI Crude Oil (Mock Live)</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase px-2 py-0.5 animate-pulse">● LIVE</span>
              </div>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-black text-white">${currentOil.toFixed(2)}</span>
                <span className="text-zinc-500 text-lg font-bold mb-1">/bbl</span>
                {oilTick === 'up' && <TrendingUp className="text-red-400 mb-1" size={20} />}
                {oilTick === 'down' && <TrendingDown className="text-emerald-400 mb-1" size={20} />}
              </div>
              <div className={`text-sm font-black mb-6 ${oilDeltaPct > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {oilDeltaPct > 0 ? '▲' : '▼'} {Math.abs(oilDeltaPct).toFixed(2)}% since Bid Day (${ORIGINAL_BID.oilIndexAtBid}/bbl)
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-600 font-bold uppercase tracking-widest">Liquid Asphalt Binder</span>
                  <span className="text-white font-black">${currentLiquidAsphalt}/ton</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-600 font-bold uppercase tracking-widest">At Bid Day</span>
                  <span className="text-zinc-400 font-black">${ORIGINAL_BID.liquidAsphaltAtBid}/ton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 font-bold uppercase tracking-widest">Binder Delta</span>
                  <span className={`font-black ${currentLiquidAsphalt > ORIGINAL_BID.liquidAsphaltAtBid ? 'text-red-400' : 'text-emerald-400'}`}>
                    {currentLiquidAsphalt > ORIGINAL_BID.liquidAsphaltAtBid ? '+' : ''}{currentLiquidAsphalt - ORIGINAL_BID.liquidAsphaltAtBid}/ton
                  </span>
                </div>
              </div>
            </div>

            {/* Price History Table */}
            <div className="lg:col-span-2 bg-[#111] border border-zinc-800">
              <div className="px-5 py-4 border-b border-zinc-800">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Price History Since Bid Day</span>
              </div>
              <div className="p-5 space-y-3">
                {OIL_HISTORY.map((row, i) => {
                  const delta = row.wti - OIL_HISTORY[0].wti;
                  const laDelta = row.liquidAsphalt - OIL_HISTORY[0].liquidAsphalt;
                  const isToday = i === OIL_HISTORY.length - 1;
                  return (
                    <div key={row.label} className={`flex items-center gap-4 p-3 ${isToday ? 'bg-[#ffcc00]/5 border border-[#ffcc00]/20' : 'bg-black border border-zinc-900'}`}>
                      <div className="w-40 shrink-0">
                        <div className="text-xs font-black text-zinc-300">{row.label}</div>
                        {isToday && <div className="text-[10px] font-black uppercase tracking-widest text-[#ffcc00]">Today</div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-black">${row.wti}/bbl</span>
                          {delta !== 0 && (
                            <span className={`text-xs font-black ${delta > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                              {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <div className="mt-1">
                          <ProgressBar value={((row.wti - WTI_PROGRESS_MIN) / WTI_PROGRESS_RANGE) * 100} color={isToday ? '#ffcc00' : '#52525b'} />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-sm font-black ${laDelta > 0 ? 'text-red-400' : laDelta < 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                          ${row.liquidAsphalt} LA
                        </div>
                        {laDelta !== 0 && <div className="text-[10px] text-zinc-600">{laDelta > 0 ? '+' : ''}{laDelta}/ton</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Escalation Logic */}
              <div className={`mx-5 mb-5 p-4 border ${isEscalationTriggered ? 'border-red-500/40 bg-red-500/10' : 'border-[#ffcc00]/20 bg-[#ffcc00]/5'}`}>
                <div className="flex items-start gap-3">
                  {isEscalationTriggered
                    ? <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    : <Shield size={18} className="text-[#ffcc00] shrink-0 mt-0.5" />}
                  <div>
                    <div className={`text-xs font-black uppercase tracking-widest mb-1 ${isEscalationTriggered ? 'text-red-400' : 'text-[#ffcc00]'}`}>
                      {isEscalationTriggered ? 'Material Escalation Clause — TRIGGERED' : 'Material Escalation Clause — Monitoring'}
                    </div>
                    <div className="text-zinc-400 text-xs font-bold leading-relaxed">
                      {isEscalationTriggered
                        ? `Oil spiked ${oilDeltaPct.toFixed(1)}% since bid day. Liquid asphalt cost increased $${currentLiquidAsphalt - ORIGINAL_BID.liquidAsphaltAtBid}/ton. Estimated impact: ${currency(Math.abs(oilEscalationCost))}. Activating Contract §4.C — billing client for material escalation.`
                        : `WTI delta is ${oilDeltaPct.toFixed(2)}%. Escalation clause triggers at +5%. The $9/ton Worden Oil-Price Shield absorbs current delta. No client billing required.`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: SCHEDULE & DELAY TRACKING ────────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="text-[#ffcc00]" size={24} />
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Schedule <span className="text-[#ffcc00]">Autopsy &amp; Delay Log</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weather Log */}
            <div className="bg-[#111] border border-zinc-800">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-3">
                <CloudRain size={16} className="text-blue-400" />
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Forecast vs. Actual Weather</span>
                <span className="ml-auto text-xs font-black text-red-400">{totalDelayHours} hrs lost</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left px-4 py-2 text-zinc-600 font-black uppercase tracking-wider">Date</th>
                      <th className="text-left px-4 py-2 text-zinc-600 font-black uppercase tracking-wider">Forecast</th>
                      <th className="text-left px-4 py-2 text-zinc-600 font-black uppercase tracking-wider">Actual</th>
                      <th className="text-left px-4 py-2 text-zinc-600 font-black uppercase tracking-wider">Delay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEATHER_LOG.map((row) => (
                      <tr key={row.day} className={`border-b border-zinc-900 ${row.delay ? 'bg-red-500/5' : ''}`}>
                        <td className="px-4 py-2 text-zinc-400 font-bold">{row.day}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1 text-zinc-400">
                            <Sun size={11} className="text-yellow-400" /> {row.forecast}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className={`flex items-center gap-1 ${row.delay ? 'text-red-400' : 'text-zinc-400'}`}>
                            {row.delay ? <CloudRain size={11} /> : <Sun size={11} />} {row.actual}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          {row.delay
                            ? <span className="text-red-400 font-black">{row.hours}h lost</span>
                            : <CheckCircle size={13} className="text-emerald-500" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-4 border-t border-zinc-800 bg-zinc-900/30">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs font-bold text-zinc-400 leading-relaxed">
                    <span className="text-emerald-400 font-black">Liquidated Damages — NULLIFIED.</span>{' '}
                    {totalDelayHours} hours of documented unforeseeable weather events per VDOT-standard Force Majeure. Schedule extension of {Math.ceil(totalDelayHours / HOURS_PER_WORK_DAY)} work days granted per Contract §8.B.
                  </div>
                </div>
              </div>
            </div>

            {/* Holiday / Plant Shutdown Log */}
            <div className="bg-[#111] border border-zinc-800">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-3">
                <ZapOff size={16} className="text-red-400" />
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Holiday &amp; Plant Shutdown Log</span>
                <span className="ml-auto text-xs font-black text-red-400">{holidayDays} day(s) lost</span>
              </div>
              <div className="p-5 space-y-4">
                {HOLIDAY_LOG.map((h) => (
                  <div key={h.date} className="flex gap-4 bg-red-500/5 border border-red-500/20 p-4">
                    <div className="bg-red-500/20 p-2 rounded shrink-0">
                      <Calendar size={16} className="text-red-400" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">{h.date}</div>
                      <div className="text-white font-black text-sm">{h.event}</div>
                      <div className="text-zinc-500 text-xs font-bold mt-1">{h.impact}</div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 bg-[#ffcc00]/5 border border-[#ffcc00]/20 p-4">
                  <div className="bg-[#ffcc00]/20 p-2 rounded shrink-0">
                    <Zap size={16} className="text-[#ffcc00]" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-1">Supply Chain Note</div>
                    <div className="text-white font-black text-sm">Trucking shortage — CEMEX Richmond Plant</div>
                    <div className="text-zinc-500 text-xs font-bold mt-1">Apr 3: Only 3 of 6 trucks available. 80 ton shortfall recovered Apr 4 with extended shift.</div>
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-zinc-800 bg-zinc-900/30">
                <div className="text-xs font-bold text-zinc-400 leading-relaxed">
                  <span className="text-[#ffcc00] font-black">Total Plant-Down Days: {holidayDays}.</span>{' '}
                  All holiday shutdowns documented in Project Diary. Schedule extension filed with client on <strong>Apr 1, 2026</strong>. Penalties waived per AIA A201 §8.3.
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Crashing Alert */}
          <div className="mt-4 bg-[#1a1200] border border-[#ffcc00]/30 p-5">
            <div className="flex items-start gap-4">
              <Thermometer size={20} className="text-[#ffcc00] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-1">Worden Reality Engine — Schedule Status</div>
                <div className="text-white font-bold text-sm leading-relaxed">
                  Current delay: <strong className="text-[#ffcc00]">{Math.ceil(totalDelayHours / HOURS_PER_WORK_DAY) + holidayDays} work days</strong> behind original baseline.
                  Liquidated damages exposure: <strong className="text-red-400">{currency((Math.ceil(totalDelayHours / HOURS_PER_WORK_DAY) + holidayDays) * ORIGINAL_BID.ldPerDay)}</strong>.
                  Force Majeure documentation nullifies weather penalties. Recommend <strong className="text-emerald-400">weekend crew authorization</strong> to recover timeline and protect {currency(ORIGINAL_BID.estimatedTotal * 0.05)} completion bonus.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: INTERACTIVE SITE SURVEILLANCE ─────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <Camera className="text-[#ffcc00]" size={24} />
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Live Site <span className="text-[#ffcc00]">Surveillance Grid</span>
            </h2>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase px-2 py-0.5 animate-pulse">● 3 Feeds Active</span>
          </div>

          {/* Camera Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {CAMERA_FEEDS.map((cam) => (
              <div key={cam.id} className={`bg-black border ${cam.alert ? 'border-red-500/40' : 'border-zinc-700'} overflow-hidden`}>
                {/* Mock camera viewport */}
                <div className={`relative h-40 ${cam.status === 'LIVE' ? 'bg-zinc-900' : 'bg-zinc-950'} overflow-hidden`}>
                  {cam.status === 'LIVE' ? (
                    <>
                      {/* Fake scanline grid overlay */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0.4) 1px,transparent 1px,transparent 4px)', backgroundSize: '100% 4px' }} />
                      {/* Fake visual noise / activity */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Camera size={28} className="text-zinc-600 mx-auto mb-2" />
                          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{cam.phase}</div>
                        </div>
                      </div>
                      {/* Corner tags */}
                      <div className="absolute top-2 left-2 bg-emerald-500/80 text-black text-[8px] font-black uppercase px-1.5 py-0.5 tracking-widest">LIVE</div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-zinc-400 text-[8px] font-mono px-1.5 py-0.5">{cam.temp}</div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ZapOff size={28} className="text-red-700 mx-auto mb-2" />
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-700">OFFLINE</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#ffcc00]">{cam.id}</span>
                    <StatusBadge status={cam.status} />
                  </div>
                  <div className="text-xs font-bold text-zinc-400">{cam.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Phase Completion Progress */}
          <div className="bg-[#111] border border-zinc-800">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-3">
              <Layers size={16} className="text-[#ffcc00]" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Phase Completion Map — {ORIGINAL_BID.jobNumber}</span>
            </div>
            <div className="p-5 space-y-5">
              {PHASES.map((phase) => (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[#ffcc00] font-black text-xs w-5">{phase.id}.</span>
                      <span className="text-white font-black text-sm">{phase.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 text-xs font-bold">Day {phase.startDay}–{phase.endDay}</span>
                      <StatusBadge status={phase.status} />
                      <span className={`text-sm font-black w-12 text-right ${phase.progress === 100 ? 'text-emerald-400' : phase.progress > 0 ? 'text-[#ffcc00]' : 'text-zinc-600'}`}>
                        {phase.progress}%
                      </span>
                    </div>
                  </div>
                  <ProgressBar
                    value={phase.progress}
                    color={phase.progress === 100 ? '#34d399' : phase.progress > 0 ? '#ffcc00' : '#27272a'}
                  />
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-zinc-800 bg-zinc-900/30">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Wind size={14} className="text-blue-400" />
                  <span className="text-zinc-400 font-bold">Overall Project Completion</span>
                </div>
                <span className="text-[#ffcc00] font-black text-lg">
                  {Math.round(PHASES.reduce((s, p) => s + p.progress, 0) / PHASES.length)}%
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={Math.round(PHASES.reduce((s, p) => s + p.progress, 0) / PHASES.length)} />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FINAL P&L SUMMARY ─────────────────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <DollarSign className="text-[#ffcc00]" size={24} />
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Final <span className="text-[#ffcc00]">P&amp;L Reconciliation</span>
            </h2>
          </div>
          <div className="bg-black border-2 border-zinc-800 p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Original Contract Value', value: currency(ORIGINAL_BID.estimatedTotal), sub: 'AI Estimate', color: 'text-white' },
                { label: 'Actual Material + Labor Cost', value: currency(materialCostActual + laborCostActual), sub: 'To-Date', color: netVarianceCost > 0 ? 'text-red-400' : 'text-emerald-400' },
                { label: 'Oil Escalation Charge', value: isEscalationTriggered ? currency(escalationRecovery) : '$0', sub: isEscalationTriggered ? 'Billing to Client' : 'Not Triggered', color: isEscalationTriggered ? 'text-[#ffcc00]' : 'text-zinc-600' },
                { label: 'AI Estimated Profit', value: currency(ORIGINAL_BID.grossProfit), sub: pct(ORIGINAL_BID.profitMarginPct) + ' margin', color: 'text-zinc-400' },
                { label: 'Projected Net Profit', value: currency(Math.max(0, projectedProfit + escalationRecovery)), sub: 'After variances', color: projectedProfit > 0 ? 'text-emerald-400' : 'text-red-400' },
                { label: 'Force Majeure Days', value: String(Math.ceil(totalDelayHours / HOURS_PER_WORK_DAY) + holidayDays), sub: 'LD Exposure Nullified', color: 'text-emerald-400' },
              ].map((item) => (
                <div key={item.label} className="border border-zinc-800 p-5">
                  <div className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-2">{item.label}</div>
                  <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-zinc-600 font-bold mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-6 flex flex-wrap gap-4 items-center">
              <div className="text-xs font-black uppercase tracking-widest text-zinc-600">Worden OS — 4th Generation. Since 1984.</div>
              <div className="ml-auto flex gap-3 flex-wrap">
                <span className="bg-zinc-800 text-zinc-400 text-[10px] font-black uppercase px-3 py-1 tracking-widest">VDOT Sec. 315 Compliant</span>
                <span className="bg-zinc-800 text-zinc-400 text-[10px] font-black uppercase px-3 py-1 tracking-widest">96% Marshall Density</span>
                <span className="bg-[#ffcc00]/10 text-[#ffcc00] border border-[#ffcc00]/20 text-[10px] font-black uppercase px-3 py-1 tracking-widest">$9/Ton Oil Shield Active</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
