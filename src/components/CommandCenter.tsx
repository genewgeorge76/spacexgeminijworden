import { useState, useEffect } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface KickservPayload {
  project_id: string;
  client_priority: string;
  sq_ft: number;
  tons_required: number;
  binder_index_applied: number;
  grading_hours: number;
  striping_linear_ft: number;
  mauldin_690_surcharge: number;
  net_margin_target: string;
  final_bid_total: number;
  emergency_threshold_flag: boolean;
  job_type: string;
}

// ── CFO Math ──────────────────────────────────────────────────────────────────
const DENSITY_RESIDENTIAL = 145; // lbs/sq yd per inch
const DENSITY_INDUSTRIAL = 148;
const BINDER_INDEX = 627.50;
const MARGIN_TARGET = 0.35;
const MAULDIN_SURCHARGE_PER_TON = 0.08;
const OIL_SHIELD = 9; // ±$9/ton
const EMERGENCY_THRESHOLD_SQ_FT = 20000;

function calcTons(sqFt: number, depthInches: number, industrial = false): number {
  const density = industrial ? DENSITY_INDUSTRIAL : DENSITY_RESIDENTIAL;
  return (sqFt / 9) * depthInches * density / 2000;
}

function calcBid(tons: number): { base: number; withMargin: number; mauldinFund: number } {
  const base = tons * (BINDER_INDEX / 100);
  const mauldinFund = tons * MAULDIN_SURCHARGE_PER_TON;
  const subtotal = base + mauldinFund;
  const withMargin = subtotal / (1 - MARGIN_TARGET);
  return { base, withMargin, mauldinFund };
}

function generateKickservJSON(
  sqFt: number,
  depthInches: number,
  gradingHours: number,
  stripingLinearFt: number,
): KickservPayload {
  const isIndustrial = sqFt > EMERGENCY_THRESHOLD_SQ_FT;
  const tons = calcTons(sqFt, depthInches, isIndustrial);
  const { withMargin, mauldinFund } = calcBid(tons);
  return {
    project_id: `JWA-${Date.now()}`,
    client_priority: isIndustrial ? 'WHALE-EMERGENCY' : 'Prized-Lead',
    sq_ft: sqFt,
    tons_required: parseFloat(tons.toFixed(2)),
    binder_index_applied: BINDER_INDEX,
    grading_hours: gradingHours,
    striping_linear_ft: stripingLinearFt,
    mauldin_690_surcharge: parseFloat(mauldinFund.toFixed(2)),
    net_margin_target: `${(MARGIN_TARGET * 100).toFixed(0)}%`,
    final_bid_total: parseFloat(withMargin.toFixed(2)),
    emergency_threshold_flag: isIndustrial,
    job_type: isIndustrial ? 'Industrial Volume — Gene George Review Required' : 'Standard Residential/Commercial',
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function PanelHeader({ label, color = 'text-[#ffcc00]', dot = 'bg-green-400' }: { label: string; color?: string; dot?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className={`inline-block w-2 h-2 rounded-full ${dot} animate-pulse`} />
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${color}`}>{label}</span>
    </div>
  );
}

function AlertBadge({ children, variant = 'yellow' }: { children: React.ReactNode; variant?: 'yellow' | 'red' | 'green' | 'blue' | 'orange' }) {
  const colors: Record<string, string> = {
    yellow: 'bg-[#ffcc00] text-black',
    red: 'bg-red-600 text-white',
    green: 'bg-green-600 text-white',
    blue: 'bg-blue-600 text-white',
    orange: 'bg-orange-500 text-white',
  };
  return (
    <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${colors[variant]}`}>
      {children}
    </span>
  );
}

// ── Panel: CFO Math & Kickserv ────────────────────────────────────────────────
function CfoKickservPanel() {
  const [sqFt, setSqFt] = useState(8500);
  const [depth, setDepth] = useState(2);
  const [copied, setCopied] = useState(false);

  const isEmergency = sqFt > EMERGENCY_THRESHOLD_SQ_FT;
  const isIndustrial = isEmergency;
  const tons = calcTons(sqFt, depth, isIndustrial);
  const { withMargin, mauldinFund } = calcBid(tons);
  const oilHigh = withMargin + OIL_SHIELD * tons;
  const oilLow = withMargin - OIL_SHIELD * tons;

  const payload = generateKickservJSON(sqFt, depth, Math.ceil(sqFt / 5000), Math.round(sqFt / 100));

  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-4">
      <PanelHeader label="CFO Math · Kickserv Auto-Sync" dot="bg-[#ffcc00]" />

      {/* Recent Lead Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Sq Ft</label>
          <input
            type="number"
            value={sqFt}
            onChange={(e) => setSqFt(Number(e.target.value))}
            className="w-full bg-black border border-gray-700 text-white text-sm font-bold px-3 py-2 rounded focus:outline-none focus:border-[#ffcc00]"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Depth (in)</label>
          <select
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full bg-black border border-gray-700 text-white text-sm font-bold px-3 py-2 rounded focus:outline-none focus:border-[#ffcc00]"
          >
            {[1.5, 2, 2.5, 3, 3.5, 4, 5, 6].map((d) => (
              <option key={d} value={d}>{d}"</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calculated Output */}
      <div className="bg-black/60 border border-gray-800 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-bold">Density</span>
          <span className="text-white font-black">{isIndustrial ? DENSITY_INDUSTRIAL : DENSITY_RESIDENTIAL} lbs/sq yd/in {isIndustrial && <AlertBadge variant="orange">Industrial</AlertBadge>}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-bold">Tons Required</span>
          <span className="text-[#ffcc00] font-black">{tons.toFixed(2)} T</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-bold">Mauldin 690 Fund</span>
          <span className="text-orange-400 font-black">${mauldinFund.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-bold">Binder Index</span>
          <span className="text-blue-400 font-black">${BINDER_INDEX.toFixed(2)}/ton</span>
        </div>
        <div className="border-t border-gray-800 pt-2 flex justify-between text-sm">
          <span className="text-gray-400 font-bold">35% Margin Bid</span>
          <span className="text-green-400 font-black text-base">${withMargin.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600 font-bold">±$9 Oil Shield</span>
          <span className="text-gray-500 font-bold">${oilLow.toFixed(0)} – ${oilHigh.toFixed(0)}</span>
        </div>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="w-full bg-[#ffcc00] hover:bg-white text-black font-black uppercase tracking-widest text-xs py-3 rounded transition-colors flex items-center justify-center gap-2"
      >
        {copied ? '✓ COPIED!' : '⧉ COPY KICKSERV DATA'}
      </button>

      {/* VDOT Compliance Flag */}
      <p className="text-[10px] text-blue-400 font-bold border-l-2 border-blue-600 pl-2">
        ⚙ Verify mix against 2026 VDOT Section 211 before submission
      </p>
    </div>
  );
}

// ── Panel: Emergency Whale Alert ──────────────────────────────────────────────
function WhaleAlertPanel() {
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setFlash((f) => !f), 800);
    return () => clearInterval(t);
  }, []);

  const lead = { sqFt: 24000, client: 'Stonegate Commerce Center', zip: '23228', service: 'Full-Depth Asphalt + Striping', submitted: '2 min ago' };
  const tons = calcTons(lead.sqFt, 3, true);
  const { withMargin } = calcBid(tons);

  return (
    <div className={`border-2 rounded-xl p-5 flex flex-col gap-4 transition-all duration-300 ${flash ? 'border-red-500 bg-red-950/20' : 'border-red-800 bg-red-950/10'}`}>
      <div className="flex items-center justify-between">
        <PanelHeader label="🐋 Whale Alert — Gene George Review" color="text-red-400" dot="bg-red-500" />
        <AlertBadge variant="red">EMERGENCY</AlertBadge>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-black text-red-400">{lead.sqFt.toLocaleString()} SQ FT</div>
        <div className="text-white font-black text-lg">{lead.client}</div>
        <div className="text-gray-400 text-sm font-bold">ZIP {lead.zip} · {lead.service}</div>
        <div className="text-gray-600 text-xs font-bold">Submitted: {lead.submitted}</div>
      </div>

      <div className="bg-black/60 border border-red-900 rounded-lg p-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Industrial Tons</div>
          <div className="text-red-400 font-black text-lg">{tons.toFixed(1)} T</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Est. Contract</div>
          <div className="text-green-400 font-black text-lg">${withMargin.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        </div>
      </div>

      <div className={`text-center text-xs font-black uppercase tracking-widest py-2 rounded transition-colors ${flash ? 'bg-red-600 text-white' : 'bg-red-900 text-red-300'}`}>
        ⚠ FLAGGED FOR GENE GEORGE PERSONAL REVIEW
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="bg-red-700 hover:bg-red-600 text-white font-black uppercase text-xs py-2 rounded transition-colors">
          📋 Open in Kickserv
        </button>
        <button className="bg-[#ffcc00] hover:bg-white text-black font-black uppercase text-xs py-2 rounded transition-colors">
          📞 Call Client
        </button>
      </div>
    </div>
  );
}

// ── Panel: Operations — Plant Wait Times ──────────────────────────────────────
function PlantWaitPanel() {
  const plants = [
    { name: 'Vulcan – Richmond North', wait: 45, status: 'HIGH', color: 'text-red-400', action: 'REROUTE → Southside' },
    { name: 'Superior – Midlothian', wait: 12, status: 'LOW', color: 'text-green-400', action: 'PREFERRED' },
    { name: 'Allan Myers – Chester', wait: 28, status: 'MED', color: 'text-yellow-400', action: 'MONITOR' },
    { name: 'APAC – Hanover', wait: 8, status: 'LOW', color: 'text-green-400', action: 'PREFERRED' },
  ];

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="🏭 Plant Wait Times · Truck Routing" dot="bg-orange-400" />
      <div className="space-y-2">
        {plants.map((p) => (
          <div key={p.name} className="flex items-center justify-between bg-black/40 border border-gray-800 rounded-lg px-3 py-2">
            <div>
              <div className="text-white text-xs font-black">{p.name}</div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{p.action}</div>
            </div>
            <div className="text-right">
              <div className={`${p.color} font-black text-sm`}>{p.wait} min</div>
              <AlertBadge variant={p.status === 'HIGH' ? 'red' : p.status === 'MED' ? 'yellow' : 'green'}>{p.status}</AlertBadge>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-orange-400 border-l-2 border-orange-600 pl-2 font-bold">
        🚚 Avoiding I-95 DOT Scale Zones · Soft-shoulder alert active on Rt 10
      </p>
    </div>
  );
}

// ── Panel: Weather Doppler ────────────────────────────────────────────────────
function WeatherDopplerPanel() {
  const alerts = [
    { zip: '23221', forecast: 'Rain at 2:00 PM', action: 'HOLD APPLIED', severity: 'red' as const },
    { zip: '23060', forecast: 'Clear through 6 PM', action: 'PAVE WINDOW OPEN', severity: 'green' as const },
    { zip: '23320', forecast: '35% chance PM showers', action: 'MONITOR', severity: 'yellow' as const },
    { zip: '22901', forecast: 'Overcast, 58°F', action: 'MARGINAL — CONFIRM', severity: 'orange' as const },
  ];

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="🌩 Weather Doppler · Pave/No-Pave" dot="bg-blue-400" color="text-blue-400" />
      <div className="space-y-2">
        {alerts.map((a) => (
          <div key={a.zip} className="flex items-center justify-between bg-black/40 border border-gray-800 rounded-lg px-3 py-2">
            <div>
              <div className="text-white text-xs font-black">ZIP {a.zip}</div>
              <div className="text-gray-400 text-[10px] font-bold">{a.forecast}</div>
            </div>
            <AlertBadge variant={a.severity}>{a.action}</AlertBadge>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-blue-400 border-l-2 border-blue-600 pl-2 font-bold">
        📡 NOAA Doppler feed · 6-hr rolling window · Auto-hold below 50°F
      </p>
    </div>
  );
}

// ── Panel: Crew Burn Rate ─────────────────────────────────────────────────────
function CrewBurnPanel() {
  const crews = [
    { name: 'Crew Alpha', hours: 38, max: 40, complete: 60, status: '2 hrs to OT', color: 'text-red-400', border: 'border-red-800' },
    { name: 'Crew Bravo', hours: 32, max: 40, complete: 85, status: 'On Track', color: 'text-green-400', border: 'border-green-900' },
    { name: 'Crew Charlie', hours: 28, max: 40, complete: 40, status: 'Under-Utilized', color: 'text-yellow-400', border: 'border-yellow-900' },
    { name: 'Crew Delta', hours: 36, max: 40, complete: 75, status: '4 hrs to OT', color: 'text-orange-400', border: 'border-orange-900' },
  ];

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="👷 Crew Burn Rate · Labor Control" dot="bg-purple-400" color="text-purple-400" />
      <div className="space-y-3">
        {crews.map((c) => (
          <div key={c.name} className={`bg-black/40 border ${c.border} rounded-lg px-3 py-2`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-white text-xs font-black">{c.name}</span>
              <span className={`${c.color} text-xs font-black`}>{c.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${c.hours >= 38 ? 'bg-red-500' : c.hours >= 35 ? 'bg-orange-500' : 'bg-green-500'}`}
                  style={{ width: `${(c.hours / c.max) * 100}%` }}
                />
              </div>
              <span className="text-gray-500 text-[10px] font-bold">{c.hours}/{c.max}h</span>
            </div>
            <div className="text-[10px] text-gray-600 font-bold mt-1">Job completion: {c.complete}%</div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-purple-400 border-l-2 border-purple-600 pl-2 font-bold">
        ⚡ DOT Medical Cards: All current · Next expiry: 47 days
      </p>
    </div>
  );
}

// ── Panel: SEO Rankings ───────────────────────────────────────────────────────
function SeoRankingsPanel() {
  const rankings = [
    { hub: 'Commercial Paving Richmond', google: 1, bing: 2, yahoo: 1, trend: '▲' },
    { hub: 'Asphalt Contractor Chester VA', google: 3, bing: 1, yahoo: 4, trend: '▲' },
    { hub: 'MD Coastal Hub Sealcoating', google: 1, bing: 3, yahoo: 2, trend: '▲' },
    { hub: 'Heritage Restoration Savannah', google: 7, bing: 5, yahoo: 9, trend: '▼' },
    { hub: 'Paving Contractor Fredericksburg', google: 2, bing: 4, yahoo: 2, trend: '▲' },
    { hub: 'Federal Highway Contractor VA', google: 4, bing: 6, yahoo: 5, trend: '—' },
  ];

  function rankColor(r: number) {
    if (r === 1) return 'text-[#ffcc00]';
    if (r <= 3) return 'text-green-400';
    if (r <= 7) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="📈 Live SEO Rankings · Google / Bing / Yahoo" dot="bg-cyan-400" color="text-cyan-400" />
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-[10px] text-gray-500 uppercase tracking-widest pb-2 font-bold">Hub / Keyword</th>
              <th className="text-center text-[10px] text-gray-500 uppercase tracking-widest pb-2 font-bold">G</th>
              <th className="text-center text-[10px] text-gray-500 uppercase tracking-widest pb-2 font-bold">B</th>
              <th className="text-center text-[10px] text-gray-500 uppercase tracking-widest pb-2 font-bold">Y</th>
              <th className="text-center text-[10px] text-gray-500 uppercase tracking-widest pb-2 font-bold">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r) => (
              <tr key={r.hub} className="border-b border-gray-900">
                <td className="text-white font-bold py-1.5 pr-2 leading-tight">{r.hub}</td>
                <td className={`text-center font-black py-1.5 ${rankColor(r.google)}`}>#{r.google}</td>
                <td className={`text-center font-black py-1.5 ${rankColor(r.bing)}`}>#{r.bing}</td>
                <td className={`text-center font-black py-1.5 ${rankColor(r.yahoo)}`}>#{r.yahoo}</td>
                <td className={`text-center font-black py-1.5 ${r.trend === '▲' ? 'text-green-400' : r.trend === '▼' ? 'text-red-400' : 'text-gray-500'}`}>{r.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-cyan-400 border-l-2 border-cyan-600 pl-2 font-bold">
        🔍 50-state crawl active · Citation building: 14 directories synced
      </p>
    </div>
  );
}

// ── Panel: Cash Flow / A/R ─────────────────────────────────────────────────────
function CashFlowPanel() {
  const [lienGenerated, setLienGenerated] = useState<string | null>(null);

  const invoices = [
    { client: 'Plaza LLC', amount: 45000, days: 45, status: 'OVERDUE', zip: '23228' },
    { client: 'Stonegate GC', amount: 128000, days: 22, status: 'DUE SOON', zip: '23114' },
    { client: 'Bayview HOA', amount: 18750, days: 60, status: 'CRITICAL', zip: '23451' },
    { client: 'KFC – Colonial Div.', amount: 87500, days: 5, status: 'CURRENT', zip: '23060' },
  ];

  function handleLien(client: string) {
    setLienGenerated(client);
    setTimeout(() => setLienGenerated(null), 3000);
  }

  function invoiceColor(status: string) {
    if (status === 'CRITICAL') return 'border-red-800 bg-red-950/20';
    if (status === 'OVERDUE') return 'border-orange-800 bg-orange-950/20';
    if (status === 'DUE SOON') return 'border-yellow-800 bg-yellow-950/10';
    return 'border-gray-800 bg-black/20';
  }

  function badgeVariant(status: string): 'red' | 'orange' | 'yellow' | 'green' {
    if (status === 'CRITICAL') return 'red';
    if (status === 'OVERDUE') return 'orange';
    if (status === 'DUE SOON') return 'yellow';
    return 'green';
  }

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="💰 Cash Flow · A/R Interception" dot="bg-green-400" color="text-green-400" />
      <div className="space-y-2">
        {invoices.map((inv) => (
          <div key={inv.client} className={`border rounded-lg px-3 py-2 ${invoiceColor(inv.status)}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white text-xs font-black">{inv.client}</div>
                <div className="text-gray-400 text-[10px] font-bold">${inv.amount.toLocaleString()} · {inv.days} days</div>
              </div>
              <AlertBadge variant={badgeVariant(inv.status)}>{inv.status}</AlertBadge>
            </div>
            {(inv.status === 'OVERDUE' || inv.status === 'CRITICAL') && (
              <button
                onClick={() => handleLien(inv.client)}
                className="mt-2 w-full text-[10px] font-black uppercase tracking-widest border border-red-700 text-red-400 hover:bg-red-700 hover:text-white py-1 rounded transition-colors"
              >
                {lienGenerated === inv.client ? '✓ INTENT TO LIEN GENERATED' : '⚖ GENERATE INTENT TO LIEN'}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs border-t border-gray-800 pt-3">
        <span className="text-gray-500 font-bold">Total Outstanding</span>
        <span className="text-[#ffcc00] font-black">${invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}</span>
      </div>
    </div>
  );
}

// ── Panel: Live Drone / Satellite ─────────────────────────────────────────────
function DroneSatellitePanel() {
  const sites = [
    { name: 'I-95 Resurfacing · Chesterfield', status: 'ACTIVE', progress: 65 },
    { name: 'Stonegate Commerce Lot · Richmond', status: 'MOBILIZING', progress: 10 },
    { name: 'KFC Overlay · Chester', status: 'COMPLETE', progress: 100 },
  ];

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="🛸 Live Drone · Satellite Job Sites" dot="bg-indigo-400" color="text-indigo-400" />

      {/* Placeholder viewport */}
      <div className="relative bg-black border border-indigo-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="text-center z-10">
          <div className="text-4xl mb-2">🛸</div>
          <div className="text-indigo-400 font-black text-xs uppercase tracking-widest">DJI · DroneDeploy Feed</div>
          <div className="text-gray-600 text-[10px] font-bold mt-1">Stream active — connect field tablet to broadcast</div>
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] text-red-400 font-black uppercase">LIVE</span>
        </div>
      </div>

      {/* Active Sites */}
      <div className="space-y-2">
        {sites.map((s) => (
          <div key={s.name} className="bg-black/40 border border-gray-800 rounded-lg px-3 py-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white text-[11px] font-black">{s.name}</span>
              <AlertBadge variant={s.status === 'ACTIVE' ? 'green' : s.status === 'MOBILIZING' ? 'blue' : 'yellow'}>{s.status}</AlertBadge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-800 rounded-full h-1">
                <div className="h-1 rounded-full bg-indigo-500" style={{ width: `${s.progress}%` }} />
              </div>
              <span className="text-gray-500 text-[10px] font-bold">{s.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Panel: Competitor Intel ───────────────────────────────────────────────────
function CompetitorIntelPanel() {
  const bids = [
    { job: 'Beaufort Grading Phase 1', result: 'LOST', margin: -12, note: 'Competitor underbid base prep by 12%' },
    { job: 'GreenSpring HOA Overlay', result: 'WON', margin: 8, note: 'Only qualified bidder VDOT Section 315' },
    { job: 'Chester Commerce Sealcoat', result: 'WON', margin: 15, note: 'Heritage credential closed the deal' },
    { job: 'Hanover Parks & Rec Lot', result: 'LOST', margin: -6, note: 'Price competition — MBE set-aside goal' },
    { job: 'DOT Rt 10 Resurfacing', result: 'PENDING', margin: 0, note: 'Submitted 3 days ago — decision Mon' },
  ];

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="🎯 Competitor Intel · Bid Win/Loss" dot="bg-yellow-400" color="text-yellow-400" />
      <div className="space-y-2">
        {bids.map((b) => (
          <div key={b.job} className={`border rounded-lg px-3 py-2 ${b.result === 'WON' ? 'border-green-900 bg-green-950/10' : b.result === 'LOST' ? 'border-red-900 bg-red-950/10' : 'border-gray-800 bg-black/20'}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2">
                <div className="text-white text-[11px] font-black leading-tight">{b.job}</div>
                <div className="text-gray-500 text-[10px] font-bold mt-0.5">{b.note}</div>
              </div>
              <div className="text-right">
                <AlertBadge variant={b.result === 'WON' ? 'green' : b.result === 'LOST' ? 'red' : 'blue'}>{b.result}</AlertBadge>
                {b.margin !== 0 && (
                  <div className={`text-[10px] font-black mt-0.5 ${b.margin > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {b.margin > 0 ? '+' : ''}{b.margin}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-gray-800 pt-3">
        <div className="text-center">
          <div className="text-green-400 font-black text-xl">2</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Won</div>
        </div>
        <div className="text-center">
          <div className="text-red-400 font-black text-xl">2</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Lost</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 font-black text-xl">60%</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Win Rate</div>
        </div>
      </div>
    </div>
  );
}

// ── Panel: Fleet Routing / Telemetry ──────────────────────────────────────────
function FleetRoutingPanel() {
  const trucks = [
    { id: 'T-1 · Dump · F-750', route: 'I-95 N → Chester Plant', alert: null, status: 'EN ROUTE' },
    { id: 'T-2 · Lowboy · Peterbilt', route: 'Rerouted: avoided Rt 10 soft shoulder', alert: 'SOFT SHOULDER AVOIDED', status: 'REROUTED' },
    { id: 'T-3 · Tanker · KW T800', route: 'Waiting: Vulcan Plant', alert: 'HIGH WAIT — 45 min', status: 'WAITING' },
    { id: 'Mauldin 690 Paver', route: 'On-site: Stonegate Commerce', alert: null, status: 'PAVING' },
    { id: 'T-4 · Dump · Freightliner', route: 'DOT Scale Zone avoided — Alt Rt 288', alert: 'DOT ZONE BYPASSED', status: 'REROUTED' },
  ];

  return (
    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
      <PanelHeader label="🚛 Fleet Routing · Telemetry" dot="bg-orange-400" color="text-orange-400" />
      <div className="space-y-2">
        {trucks.map((t) => (
          <div key={t.id} className="bg-black/40 border border-gray-800 rounded-lg px-3 py-2">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2">
                <div className="text-white text-[11px] font-black">{t.id}</div>
                <div className="text-gray-400 text-[10px] font-bold">{t.route}</div>
                {t.alert && (
                  <div className="text-orange-400 text-[10px] font-black mt-0.5">⚠ {t.alert}</div>
                )}
              </div>
              <AlertBadge variant={t.status === 'PAVING' ? 'green' : t.status === 'REROUTED' ? 'orange' : t.status === 'WAITING' ? 'red' : 'blue'}>{t.status}</AlertBadge>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-orange-400 border-l-2 border-orange-600 pl-2 font-bold">
        🛣 Active avoidance: DOT Scale Zones · Soft Shoulders · High-Traffic Corridors
      </p>
    </div>
  );
}

// ── Panel: System Ticker ──────────────────────────────────────────────────────
function SystemTicker() {
  const alerts = [
    '🐋 WHALE ALERT: 24,000 SQ FT — GENE GEORGE REVIEW',
    '⚠ Vulcan Plant 45-min wait — Truck 3 rerouted to Superior',
    '🌧 Rain hold applied ZIP 23221 — Crew Alpha notified',
    '💰 Plaza LLC 45 days past due — Intent to Lien available',
    '📈 "Commercial Paving Richmond" — RANK #1 GOOGLE',
    '🔧 Mauldin 690: Engine hours 1,204 — Service in 296 hrs',
    '📋 DOT Rt 10 bid pending — Decision Monday',
    '✅ KFC Chester overlay complete — 85% punchlist cleared',
    '🛸 Drone feed active — Stonegate Commerce job site',
    '⚙ 2026 VDOT Section 211 compliance: ALL MIXES VERIFIED',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % alerts.length), 4000);
    return () => clearInterval(t);
  }, [alerts.length]);

  return (
    <div className="bg-black border-t border-b border-gray-800 py-2 px-4 flex items-center gap-3 overflow-hidden">
      <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-widest shrink-0">JWORDENAI LIVE</span>
      <div className="w-px h-3 bg-gray-700 shrink-0" />
      <p className="text-gray-300 text-[11px] font-bold truncate">{alerts[index]}</p>
    </div>
  );
}

// ── Main CommandCenter ────────────────────────────────────────────────────────
export default function CommandCenter() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const [time, setTime] = useState(timeStr);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* ── Master Header ── */}
      <header className="bg-black border-b-2 border-[#ffcc00] px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-400">System Online</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
              <span className="text-[#ffcc00]">J.WORDEN</span>
              <span className="text-white"> COMMAND CENTER</span>
              <span className="text-gray-600"> — SYSTEM ONLINE</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">
              4th Generation · Est. 1984 · VA Class A · HQ: Chester, VA 23836 · JWORDENAI v4
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="text-[#ffcc00] font-black text-xl tabular-nums">{time}</div>
            <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex gap-2">
              <AlertBadge variant="green">VDOT COMPLIANT</AlertBadge>
              <AlertBadge variant="blue">SAM.GOV ACTIVE</AlertBadge>
            </div>
          </div>
        </div>
      </header>

      {/* ── Live Ticker ── */}
      <SystemTicker />

      {/* ── Main Grid ── */}
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* Row 1 */}
          <CfoKickservPanel />
          <WhaleAlertPanel />
          <CashFlowPanel />

          {/* Row 2 */}
          <PlantWaitPanel />
          <WeatherDopplerPanel />
          <CrewBurnPanel />

          {/* Row 3 */}
          <SeoRankingsPanel />
          <DroneSatellitePanel />
          <FleetRoutingPanel />

          {/* Row 4: Competitor Intel spans 3 cols on xl */}
          <div className="xl:col-span-3">
            <CompetitorIntelPanel />
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-800 bg-black/60 px-6 py-4 mt-6">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <span>J. Worden &amp; Sons · 4th Generation · Since 1984 · Chester, VA</span>
          <span>96% Marshall · VDOT Sec 315 · $9/Ton Oil Shield · Zero-Downtime Medical</span>
          <span>All data simulated — connect live APIs for production</span>
        </div>
      </footer>

    </div>
  );
}
