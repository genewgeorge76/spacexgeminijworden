import { useState, useEffect, useRef } from 'react';
import {
  MapPin, Zap, CloudRain, FileText, Search, AlertTriangle,
  CheckCircle, XCircle, TrendingUp, TrendingDown, Wind,
  Thermometer, Droplets, Calendar, DollarSign, ChevronRight,
  Activity, Layers, Sun, CloudSnow, Cpu, Satellite
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SoilProfile {
  classification: string;
  aashto: string;
  uscsCode: string;
  cbr: number;
  expansive: boolean;
  recommendedSpec: string;
  depthToRock: string;
  moisture: string;
  engineeringAction: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface HazardFlag {
  icon: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  costImpact: string;
}

interface WeatherDay {
  day: number;
  label: string;
  airTemp: number;
  groundTemp: number;
  precip: number;
  windSpeed: number;
  humidity: number;
  verdict: 'go' | 'marginal' | 'no-go';
  profitRisk: number;
  tradeRisk: string;
}

interface SiteAnalysis {
  address: string;
  sqft: number;
  perimeter: number;
  soilProfile: SoilProfile;
  hazards: HazardFlag[];
  optimalWindow: { start: number; end: number };
  weatherDays: WeatherDay[];
  contractText: string;
}

// ─── Mock data engine ────────────────────────────────────────────────────────

const ADDRESSES: Record<string, SiteAnalysis> = {
  default: {
    address: '7011 Wood Rd, Richmond, VA 23237',
    sqft: 48_200,
    perimeter: 940,
    soilProfile: {
      classification: 'Expansive Clay',
      aashto: 'A-7-6',
      uscsCode: 'CH',
      cbr: 3,
      expansive: true,
      recommendedSpec: '3-inch SM-19A Surface · 3-inch BM-25.0 Base · 8-inch VDOT #21-A Crusher Run + Biaxial Geogrid',
      depthToRock: '18 ft+',
      moisture: 'High (38%)',
      engineeringAction: 'Lime Stabilization Required — 6-inch subgrade treatment before paving. ASTM D 1633.',
      riskLevel: 'critical',
    },
    hazards: [
      { icon: '⚡', severity: 'critical', message: 'Overhead utility lines at entrance — 14 ft clearance. Belly-dump or conveyor required.', costImpact: '+$4,800' },
      { icon: '🌊', severity: 'warning', message: 'Storm drain inlet within 8 ft of paving zone. VPDES permit may be required.', costImpact: '+$1,200' },
      { icon: '🚧', severity: 'info', message: 'Right-of-way setback detected: 12 ft from centerline of Wood Rd.', costImpact: '+$0 (scope clarification)' },
    ],
    optimalWindow: { start: 8, end: 12 },
    weatherDays: generateWeather(),
    contractText: '',
  },
};

function generateWeather(): WeatherDay[] {
  const base = [
    { airTemp: 44, groundTemp: 36, precip: 0.8, wind: 22, hum: 78 },
    { airTemp: 38, groundTemp: 32, precip: 1.4, wind: 18, hum: 88 },
    { airTemp: 52, groundTemp: 38, precip: 0.0, wind: 12, hum: 55 },
    { airTemp: 61, groundTemp: 44, precip: 0.0, wind: 8, hum: 48 },
    { airTemp: 67, groundTemp: 52, precip: 0.0, wind: 6, hum: 42 },
    { airTemp: 69, groundTemp: 58, precip: 0.0, wind: 7, hum: 44 },
    { airTemp: 71, groundTemp: 62, precip: 0.0, wind: 5, hum: 40 },
    { airTemp: 68, groundTemp: 63, precip: 0.1, wind: 9, hum: 52 },
    { airTemp: 65, groundTemp: 61, precip: 0.0, wind: 7, hum: 47 },
    { airTemp: 72, groundTemp: 64, precip: 0.0, wind: 6, hum: 43 },
    { airTemp: 74, groundTemp: 66, precip: 0.0, wind: 5, hum: 41 },
    { airTemp: 70, groundTemp: 65, precip: 0.0, wind: 8, hum: 46 },
    { airTemp: 55, groundTemp: 58, precip: 0.6, wind: 14, hum: 72 },
    { airTemp: 48, groundTemp: 50, precip: 1.2, wind: 20, hum: 85 },
    { airTemp: 42, groundTemp: 43, precip: 0.9, wind: 24, hum: 90 },
    { airTemp: 60, groundTemp: 48, precip: 0.0, wind: 10, hum: 58 },
    { airTemp: 65, groundTemp: 54, precip: 0.0, wind: 8, hum: 50 },
    { airTemp: 68, groundTemp: 59, precip: 0.0, wind: 7, hum: 45 },
    { airTemp: 70, groundTemp: 62, precip: 0.0, wind: 6, hum: 43 },
    { airTemp: 73, groundTemp: 64, precip: 0.0, wind: 5, hum: 40 },
    { airTemp: 75, groundTemp: 66, precip: 0.1, wind: 9, hum: 48 },
    { airTemp: 72, groundTemp: 65, precip: 0.0, wind: 7, hum: 44 },
    { airTemp: 69, groundTemp: 63, precip: 0.0, wind: 8, hum: 46 },
    { airTemp: 58, groundTemp: 57, precip: 0.4, wind: 15, hum: 68 },
    { airTemp: 52, groundTemp: 51, precip: 1.1, wind: 19, hum: 82 },
    { airTemp: 63, groundTemp: 54, precip: 0.0, wind: 11, hum: 56 },
    { airTemp: 66, groundTemp: 58, precip: 0.0, wind: 9, hum: 51 },
    { airTemp: 70, groundTemp: 62, precip: 0.0, wind: 7, hum: 45 },
    { airTemp: 72, groundTemp: 64, precip: 0.0, wind: 6, hum: 42 },
    { airTemp: 74, groundTemp: 65, precip: 0.0, wind: 5, hum: 41 },
  ];

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return base.map((d, i) => {
    const groundOk = d.groundTemp >= 50;
    const precipOk = d.precip < 0.3;
    const windOk = d.wind < 15;
    const airOk = d.airTemp >= 45;

    let verdict: WeatherDay['verdict'];
    let profitRisk: number;
    let tradeRisk: string;

    if (groundOk && precipOk && windOk && airOk) {
      verdict = 'go';
      profitRisk = 0;
      tradeRisk = 'Optimal paving conditions';
    } else if (!precipOk && d.precip > 0.8) {
      verdict = 'no-go';
      profitRisk = Math.round((d.precip / 1.5) * 45000);
      tradeRisk = 'Washout risk — sub-base failure';
    } else if (!groundOk || !airOk) {
      verdict = 'marginal';
      profitRisk = Math.round(((50 - d.groundTemp) / 50) * 18000);
      tradeRisk = 'Cold ground — compaction density risk';
    } else {
      verdict = 'marginal';
      profitRisk = Math.round((d.wind / 30) * 12000);
      tradeRisk = 'High wind — surface cooling accelerated';
    }

    return {
      day: i + 1,
      label: labels[i % 7],
      airTemp: d.airTemp,
      groundTemp: d.groundTemp,
      precip: d.precip,
      windSpeed: d.wind,
      humidity: d.hum,
      verdict,
      profitRisk,
      tradeRisk,
    };
  });
}

// ─── Contract generator ───────────────────────────────────────────────────────

function buildContract(analysis: SiteAnalysis, selectedTrade: string): string {
  const { address, sqft, soilProfile, hazards, optimalWindow } = analysis;
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + optimalWindow.start);
  const dateStr = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const hazardLines = hazards
    .map((h) => `  • ${h.message} [Cost Adjustment: ${h.costImpact}]`)
    .join('\n');

  const baseRate = selectedTrade === 'Asphalt Paving' ? 4.85
    : selectedTrade === 'Concrete Flatwork' ? 7.20
    : selectedTrade === 'Excavation/Earthwork' ? 3.10
    : selectedTrade === 'Crane/Steel Erection' ? 12.50
    : 5.50;

  const laborMaterials = Math.round(sqft * baseRate);
  const soilAdjust = soilProfile.expansive ? Math.round(sqft * 1.40) : 0;
  const hazardAdjust = hazards.reduce((acc, h) => {
    const num = parseInt(h.costImpact.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + (h.costImpact.includes('+') ? num : 0);
  }, 0);
  const oilShield = Math.round(sqft * 0.09);
  const subtotal = laborMaterials + soilAdjust + hazardAdjust + oilShield;
  const mobilization = Math.round(subtotal * 0.03);
  const total = subtotal + mobilization;
  const margin = Math.round(total * 0.22);

  return `════════════════════════════════════════════════════════
  J. WORDEN & SONS PAVING & GENERAL CONTRACTING
  Virginia Class A Contractor License | Since 1984
  7011 Wood Rd, Richmond, VA 23237 | (804) 446-1296
════════════════════════════════════════════════════════

COMMERCIAL BID PROPOSAL
Worden Omni-Node Pre-Con Analysis — AI-Generated

CLIENT / PROJECT ADDRESS:
  ${address}

SCOPE OF WORK: ${selectedTrade.toUpperCase()}
PREPARED DATE: ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
AI ANALYSIS ENGINE: Worden OmniNode v3.7 | Claude 3.7 Sonnet

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — SITE INTELLIGENCE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Visual Recon (Satellite/Street View): COMPLETE
  Measured Area:  ${sqft.toLocaleString()} SF
  Perimeter:      ${analysis.perimeter.toLocaleString()} LF

  GEOTECHNICAL DATA (USGS/NRCS Soil Survey):
  Classification: ${soilProfile.classification} (${soilProfile.aashto})
  USCS Code:      ${soilProfile.uscsCode}
  CBR Value:      ${soilProfile.cbr} (LOW — Heavy Duty Spec Required)
  Expansive:      ${soilProfile.expansive ? 'YES — Geogrid Required' : 'No'}
  Depth to Rock:  ${soilProfile.depthToRock}
  Soil Moisture:  ${soilProfile.moisture}

  ENGINEERING OVERRIDE:
  ${soilProfile.engineeringAction}

  SPECIFICATION APPLIED:
  ${soilProfile.recommendedSpec}

  SITE HAZARD FLAGS (AI Visual Recon):
${hazardLines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — ALGORITHMIC START DATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  30-Day Weather Matrix Scan: COMPLETE
  Optimal 4-Day Paving Window: Days ${optimalWindow.start}–${optimalWindow.end}
  Proposed Mobilization Date:  ${dateStr}

  AI REASONING:
  Days 1–${optimalWindow.start - 1}: Sub-optimal — ground temp below 50°F or
  precipitation risk > 0.3 in/day. Paving in these conditions risks
  compaction failure and warranty liability.

  Days ${optimalWindow.start}–${optimalWindow.end}: OPTIMAL — Ground temp ≥ 62°F,
  wind < 10 mph, zero precip. 100% profit margin probability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — FINANCIAL BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Labor & Materials (${sqft.toLocaleString()} SF × $${baseRate.toFixed(2)}/SF):
    $${laborMaterials.toLocaleString()}
  Soil Correction (Lime Stab. / Geogrid):
    $${soilAdjust.toLocaleString()}
  Logistical Hazard Adjustments:
    $${hazardAdjust.toLocaleString()}
  Liquid Asphalt Oil-Price Shield (±$9/ton):
    $${oilShield.toLocaleString()}
                                     ────────────
  Subtotal:                          $${subtotal.toLocaleString()}
  Mobilization & Demobilization (3%): $${mobilization.toLocaleString()}
                                     ════════════
  TOTAL BID PRICE:                   $${total.toLocaleString()}
  Protected Margin (22%):            $${margin.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — WORDEN STANDARD COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ 96% Marshall Unit Weight — Minimum compaction standard
  ✅ VDOT Section 315 Aggregate Base — All paving layers
  ✅ $9/Ton Liquid Asphalt Price Shield — Price protection clause
  ✅ Zero-Downtime DOT Medical Compliance — All crew members
  ✅ Virginia Class A License — Valid & current
  ✅ SAM.gov Active Registration — UEI & CAGE on file
  ✅ OSHA 30 Certified Superintendent on site
  ✅ Performance Bond Available upon award

  APPLICABLE STANDARDS:
  • VDOT Road & Bridge Specifications (current edition)
  • Marshall Mix Design Method — AASHTO T245
  • ASTM D1557 Modified Proctor (earthwork)
  • ACI 318 (concrete, if applicable)
  • FM Global RoofNav (roofing, if applicable)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — HERITAGE STATEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  J. Worden & Sons has been the trusted infrastructure
  partner for Virginia's commercial and government clients
  since 1984. As a 4th-generation family business, we do
  not subcontract our core paving work. Our crew lays
  every ton of asphalt we sell.

  This bid is valid for 30 days from the date above.
  All work warranted for 3 years against material and
  workmanship defects.

════════════════════════════════════════════════════════
  Authorized Signatory: J. Worden & Sons, Prin. Est.
  Virginia Class A Contractor | Est. 1984
════════════════════════════════════════════════════════`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function VerdictBadge({ verdict }: { verdict: WeatherDay['verdict'] }) {
  if (verdict === 'go') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-sm">
      <CheckCircle size={8} /> GO
    </span>
  );
  if (verdict === 'no-go') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-500/40 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-sm">
      <XCircle size={8} /> NO-GO
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-sm">
      <AlertTriangle size={8} /> MARGINAL
    </span>
  );
}

function RiskBadge({ level }: { level: SoilProfile['riskLevel'] }) {
  const map = {
    low: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
    medium: 'bg-sky-500/20 border-sky-500/40 text-sky-400',
    high: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
    critical: 'bg-red-500/20 border-red-500/40 text-red-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[9px] font-black uppercase tracking-widest rounded-sm ${map[level]}`}>
      {level === 'critical' ? <AlertTriangle size={8} /> : <Activity size={8} />}
      {level.toUpperCase()}
    </span>
  );
}

// ─── Quadrant: Visual Recon ───────────────────────────────────────────────────

function QuadrantVisualRecon({
  analysis,
  address,
  setAddress,
  onAnalyze,
  loading,
}: {
  analysis: SiteAnalysis | null;
  address: string;
  setAddress: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#ffcc00]/10 border border-[#ffcc00]/30 p-2 rounded">
          <Satellite size={14} className="text-[#ffcc00]" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffcc00]">Module 01</div>
          <div className="text-xs font-black uppercase tracking-wider text-white">Visual Recon</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Live Feed</span>
        </div>
      </div>

      {/* Address input */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <MapPin size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAnalyze()}
            placeholder="Enter project site address..."
            className="w-full bg-black border border-zinc-800 text-white pl-8 pr-3 py-2.5 text-xs font-bold focus:border-[#ffcc00]/60 outline-none transition-colors placeholder:text-zinc-600"
          />
        </div>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading}
          className="flex items-center gap-2 bg-[#ffcc00] text-black px-4 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? <Activity size={11} className="animate-spin" /> : <Search size={11} />}
          {loading ? 'Scanning…' : 'Analyze'}
        </button>
      </div>

      {/* Satellite mock viewport */}
      <div className="relative flex-1 min-h-[140px] bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
        {/* Simulated satellite grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,204,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Fake satellite map blocks */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* dark tarmac area */}
            <div className="absolute top-[20%] left-[15%] w-[55%] h-[45%] bg-zinc-800 rounded-sm opacity-80" />
            {/* building */}
            <div className="absolute top-[25%] left-[60%] w-[22%] h-[30%] bg-zinc-700 rounded-sm" />
            {/* green strip */}
            <div className="absolute bottom-[10%] left-0 right-0 h-[15%] bg-emerald-950/60" />
            {/* road */}
            <div className="absolute top-0 left-[45%] w-[12%] h-full bg-zinc-700/60" />
            {/* measurement overlay */}
            {analysis && (
              <>
                <div className="absolute top-[20%] left-[15%] border border-[#ffcc00]/70 w-[55%] h-[45%] flex items-center justify-center">
                  <span className="bg-black/80 text-[#ffcc00] text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
                    {analysis.sqft.toLocaleString()} SF MEASURED
                  </span>
                </div>
                <div className="absolute top-[18%] left-[12%] border-l-2 border-[#ffcc00]/60 h-[49%] flex items-end">
                  <span className="text-[#ffcc00] text-[8px] font-bold ml-1 mb-0.5">{analysis.perimeter} LF</span>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Scan animation line */}
        {loading && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-0.5 bg-[#ffcc00]/40 animate-[scanline_1.5s_linear_infinite]" style={{ top: '0%' }} />
          </div>
        )}
        {!analysis && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Satellite size={28} className="text-zinc-700 mx-auto mb-2" />
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Awaiting address input</p>
            </div>
          </div>
        )}
      </div>

      {/* Hazard flags */}
      {analysis && analysis.hazards.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {analysis.hazards.map((h, i) => (
            <div key={i} className={`flex items-start gap-2 p-2 rounded text-[10px] border ${
              h.severity === 'critical' ? 'bg-red-950/30 border-red-500/30 text-red-300'
              : h.severity === 'warning' ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
              : 'bg-sky-950/30 border-sky-500/30 text-sky-300'
            }`}>
              <span className="text-sm leading-none mt-px">{h.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold leading-tight">{h.message}</p>
              </div>
              <span className="shrink-0 font-black text-[#ffcc00]">{h.costImpact}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Quadrant: Geotechnical Autopilot ────────────────────────────────────────

function QuadrantGeotech({ analysis }: { analysis: SiteAnalysis | null }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded">
          <Layers size={14} className="text-amber-400" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Module 02</div>
          <div className="text-xs font-black uppercase tracking-wider text-white">Geotechnical Autopilot</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest">USGS Live</span>
        </div>
      </div>

      {!analysis ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Layers size={28} className="text-zinc-700 mx-auto mb-2" />
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No site address loaded</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3">
          {/* Classification card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">AASHTO Classification</p>
                <p className="text-2xl font-black text-amber-400">{analysis.soilProfile.aashto}</p>
                <p className="text-sm font-bold text-white mt-0.5">{analysis.soilProfile.classification}</p>
              </div>
              <RiskBadge level={analysis.soilProfile.riskLevel} />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-zinc-800">
              <div>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">USCS</p>
                <p className="text-sm font-black text-white">{analysis.soilProfile.uscsCode}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">CBR</p>
                <p className="text-sm font-black text-red-400">{analysis.soilProfile.cbr}%</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Moisture</p>
                <p className="text-sm font-black text-amber-400">{analysis.soilProfile.moisture}</p>
              </div>
            </div>
          </div>

          {/* Spec override */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={11} className="text-amber-400 shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-400">Auto-Spec Override Applied</p>
            </div>
            <p className="text-[11px] text-white font-bold leading-snug">{analysis.soilProfile.recommendedSpec}</p>
          </div>

          {/* Engineering action */}
          <div className="bg-red-950/20 border border-red-500/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={11} className="text-red-400 shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-wider text-red-400">Engineering Action Required</p>
            </div>
            <p className="text-[11px] text-white font-medium leading-snug">{analysis.soilProfile.engineeringAction}</p>
          </div>

          {/* Depth data */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950 border border-zinc-800 rounded p-3">
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Depth to Rock</p>
              <p className="text-base font-black text-white">{analysis.soilProfile.depthToRock}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded p-3 flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">96% Marshall</p>
                <p className="text-[10px] font-black text-emerald-400">ENFORCED</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Quadrant: 30-Day Weather Engine ─────────────────────────────────────────

function QuadrantWeather({
  analysis,
  selectedTrade,
  setSelectedTrade,
}: {
  analysis: SiteAnalysis | null;
  selectedTrade: string;
  setSelectedTrade: (v: string) => void;
}) {
  const trades = ['Asphalt Paving', 'Concrete Flatwork', 'Excavation/Earthwork', 'Crane/Steel Erection', 'Roofing/Coatings'];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-sky-500/10 border border-sky-500/30 p-2 rounded">
          <CloudRain size={14} className="text-sky-400" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Module 03</div>
          <div className="text-xs font-black uppercase tracking-wider text-white">30-Day Pave/No-Pave Engine</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-[9px] text-sky-400 font-bold uppercase tracking-widest">NOAA Grid</span>
        </div>
      </div>

      {/* Trade selector */}
      <div className="flex gap-1.5 flex-wrap mb-3">
        {trades.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedTrade(t)}
            className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 border transition-colors ${
              selectedTrade === t
                ? 'bg-sky-500/20 border-sky-500/60 text-sky-300'
                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-sky-500/40 hover:text-zinc-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {!analysis ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Calendar size={28} className="text-zinc-700 mx-auto mb-2" />
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No site address loaded</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                icon: <CheckCircle size={12} className="text-emerald-400" />,
                label: 'Optimal Days',
                value: analysis.weatherDays.filter((d) => d.verdict === 'go').length,
                color: 'text-emerald-400',
              },
              {
                icon: <AlertTriangle size={12} className="text-amber-400" />,
                label: 'Marginal Days',
                value: analysis.weatherDays.filter((d) => d.verdict === 'marginal').length,
                color: 'text-amber-400',
              },
              {
                icon: <XCircle size={12} className="text-red-400" />,
                label: 'No-Go Days',
                value: analysis.weatherDays.filter((d) => d.verdict === 'no-go').length,
                color: 'text-red-400',
              },
            ].map((s) => (
              <div key={s.label} className="bg-zinc-950 border border-zinc-800 rounded p-2.5 flex items-center gap-2">
                {s.icon}
                <div>
                  <p className={`text-lg font-black leading-none ${s.color}`}>{s.value}</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-1" style={{ maxHeight: 220 }}>
            {analysis.weatherDays.map((d) => {
              const isOptimal = d.day >= analysis.optimalWindow.start && d.day <= analysis.optimalWindow.end;
              return (
                <div
                  key={d.day}
                  className={`flex items-center gap-3 px-3 py-2 rounded border transition-colors ${
                    isOptimal
                      ? 'bg-emerald-950/30 border-emerald-500/40'
                      : d.verdict === 'go'
                      ? 'bg-zinc-950 border-zinc-800'
                      : d.verdict === 'no-go'
                      ? 'bg-red-950/20 border-red-900/30'
                      : 'bg-amber-950/10 border-amber-900/20'
                  }`}
                >
                  <div className="w-8 text-center shrink-0">
                    <p className="text-[9px] text-zinc-500 font-bold uppercase">{d.label}</p>
                    <p className="text-sm font-black text-white">{d.day}</p>
                  </div>
                  <VerdictBadge verdict={d.verdict} />
                  <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold">
                    <span className="flex items-center gap-0.5">
                      <Thermometer size={8} className="text-orange-400" />
                      {d.airTemp}°/{d.groundTemp}°
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Wind size={8} className="text-sky-400" />
                      {d.windSpeed}mph
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Droplets size={8} className="text-blue-400" />
                      {d.precip}"
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {isOptimal && (
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">★ OPTIMAL</span>
                    )}
                    {d.profitRisk > 0 && (
                      <span className="flex items-center gap-0.5 text-[9px] font-black text-red-400">
                        <TrendingDown size={8} />
                        ${d.profitRisk.toLocaleString()}
                      </span>
                    )}
                    {d.verdict === 'go' && d.profitRisk === 0 && (
                      <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-400">
                        <TrendingUp size={8} />
                        Protected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optimal window callout */}
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded p-3 flex items-center gap-3">
            <Calendar size={16} className="text-emerald-400 shrink-0" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                AI Recommended Start: Day {analysis.optimalWindow.start}
              </p>
              <p className="text-[11px] text-white font-bold">
                4-day window (Days {analysis.optimalWindow.start}–{analysis.optimalWindow.end}) — 100% margin protection
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Quadrant: Contract Generation ───────────────────────────────────────────

function QuadrantContract({
  analysis,
  selectedTrade,
  generating,
  contractText,
}: {
  analysis: SiteAnalysis | null;
  selectedTrade: string;
  generating: boolean;
  contractText: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [contractText]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-violet-500/10 border border-violet-500/30 p-2 rounded">
          <FileText size={14} className="text-violet-400" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">Module 04</div>
          <div className="text-xs font-black uppercase tracking-wider text-white">Contract Generation</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {generating ? (
            <>
              <Cpu size={10} className="text-violet-400 animate-spin" />
              <span className="text-[9px] text-violet-400 font-bold uppercase tracking-widest">Claude 3.7 Writing…</span>
            </>
          ) : contractText ? (
            <>
              <CheckCircle size={10} className="text-emerald-400" />
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Draft Complete</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Awaiting Analysis</span>
            </>
          )}
        </div>
      </div>

      {!analysis && !generating && !contractText ? (
        <div className="flex-1 flex items-center justify-center border border-zinc-800 rounded bg-zinc-950">
          <div className="text-center">
            <FileText size={32} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1">No contract generated yet</p>
            <p className="text-zinc-700 text-[9px] font-medium">Enter an address and click Analyze</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <pre
            ref={preRef}
            className="flex-1 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded p-4 text-[10px] text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap break-words"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {contractText}
            {generating && <span className="animate-pulse text-[#ffcc00]">█</span>}
          </pre>

          {contractText && !generating && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([contractText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'worden-bid-proposal.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 bg-[#ffcc00] text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                <ChevronRight size={11} />
                Export Proposal
              </button>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2">
                <DollarSign size={11} className="text-emerald-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  {selectedTrade} · {analysis?.sqft.toLocaleString()} SF
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PreConOmniNode() {
  const [address, setAddress] = useState('7011 Wood Rd, Richmond, VA 23237');
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState('Asphalt Paving');
  const [generating, setGenerating] = useState(false);
  const [contractText, setContractText] = useState('');
  const [systemStatus] = useState({ uptime: '99.97%', queries: 4821, latency: 38 });
  const typewriterRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function runTypewriter(fullText: string) {
    setContractText('');
    setGenerating(true);

    let idx = 0;
    const chunkSize = 4;

    function tick() {
      idx = Math.min(idx + chunkSize, fullText.length);
      setContractText(fullText.slice(0, idx));
      if (idx < fullText.length) {
        typewriterRef.current = setTimeout(tick, 12);
      } else {
        setGenerating(false);
      }
    }
    tick();
  }

  function handleAnalyze() {
    if (typewriterRef.current) clearTimeout(typewriterRef.current);
    setContractText('');
    setGenerating(false);
    setLoading(true);
    setAnalysis(null);

    setTimeout(() => {
      const result: SiteAnalysis = {
        ...ADDRESSES.default,
        address: address || ADDRESSES.default.address,
        weatherDays: generateWeather(),
      };
      setAnalysis(result);
      setLoading(false);

      const contractFull = buildContract(result, selectedTrade);
      setTimeout(() => runTypewriter(contractFull), 400);
    }, 1800);
  }

  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, []);

  // When trade changes after analysis is loaded, regenerate contract
  useEffect(() => {
    if (!analysis) return;
    if (typewriterRef.current) clearTimeout(typewriterRef.current);
    const contractFull = buildContract(analysis, selectedTrade);
    runTypewriter(contractFull);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrade]);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans pt-28 pb-16 px-4 lg:px-8">
      {/* ── Top status bar ── */}
      <div className="max-w-[1600px] mx-auto mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="flex items-center gap-1.5 bg-[#ffcc00]/10 border border-[#ffcc00]/30 text-[#ffcc00] text-[9px] font-black uppercase tracking-[0.35em] px-3 py-1.5 rounded-sm">
              <Zap size={9} /> Worden OmniNode v3.7
            </span>
            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
              Pre-Con Intelligence Suite
            </span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-black uppercase tracking-tighter text-white leading-none">
            GOD-MODE <span className="text-[#ffcc00]">PRE-CON DASHBOARD</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
            Visual Recon · Geotechnical AI · 30-Day Weather Matrix · Contract Generation
          </p>
        </div>

        {/* System telemetry */}
        <div className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 shrink-0">
          <div className="text-center">
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Uptime</p>
            <p className="text-sm font-black text-emerald-400">{systemStatus.uptime}</p>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div className="text-center">
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Site Queries</p>
            <p className="text-sm font-black text-[#ffcc00]">{systemStatus.queries.toLocaleString()}</p>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div className="text-center">
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">AI Latency</p>
            <p className="text-sm font-black text-sky-400">{systemStatus.latency}ms</p>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">All Systems Nominal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sun size={8} className="text-[#ffcc00]" />
              <span className="text-[9px] text-zinc-500 font-bold">NOAA · USGS · NRCS · Street View</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4-quadrant grid ── */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {/* Top Left */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-[#ffcc00]/30 transition-colors min-h-[480px] flex flex-col">
          <QuadrantVisualRecon
            analysis={analysis}
            address={address}
            setAddress={setAddress}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
        </div>

        {/* Top Right */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-amber-500/30 transition-colors min-h-[480px] flex flex-col">
          <QuadrantGeotech analysis={analysis} />
        </div>

        {/* Bottom Left */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-sky-500/30 transition-colors min-h-[480px] flex flex-col">
          <QuadrantWeather
            analysis={analysis}
            selectedTrade={selectedTrade}
            setSelectedTrade={setSelectedTrade}
          />
        </div>

        {/* Bottom Right */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-violet-500/30 transition-colors min-h-[480px] flex flex-col">
          <QuadrantContract
            analysis={analysis}
            selectedTrade={selectedTrade}
            generating={generating}
            contractText={contractText}
          />
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="max-w-[1600px] mx-auto mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-900 pt-4">
        <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <CloudSnow size={10} />NOAA Weather Grid v3
          </span>
          <span className="flex items-center gap-1.5">
            <Layers size={10} />USGS/NRCS Soil Survey 3.0
          </span>
          <span className="flex items-center gap-1.5">
            <Satellite size={10} />Google Maps Platform API
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu size={10} />Claude 3.7 Sonnet
          </span>
        </div>
        <div className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">
          J. Worden & Sons © {new Date().getFullYear()} · Pre-Con OmniNode · Enterprise License
        </div>
      </div>
    </div>
  );
}
