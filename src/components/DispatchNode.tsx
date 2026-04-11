import { useState, useMemo } from 'react';
import {
  CloudRain,
  Wind,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign,
  HardHat,
  Zap,
  Droplets,
  BarChart3,
  Calendar,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type TradeType = 'asphalt' | 'concrete' | 'excavation' | 'crane' | 'roofing';
type GoNoGoStatus = 'GO' | 'CAUTION' | 'NO-GO';

interface WeatherDay {
  date: Date;
  airTemp: number;    // °F
  groundTemp: number; // °F
  windSpeed: number;  // mph (sustained)
  gustSpeed: number;  // mph
  precipChance: number; // 0–100 %
  precipAmount: number; // inches in 24h
  humidity: number;   // %
  thunderstorm: boolean;
  lightning: boolean;
}

interface TradeEvaluation {
  status: GoNoGoStatus;
  primaryReason: string;
  risks: string[];
  financialRisk: number; // $ at risk
  profitProtection: number; // 0–100 %
}

// ─── Synthetic weather generator ─────────────────────────────────────────────
// Uses a deterministic pseudo-random sequence seeded on day index so the calendar
// is stable between re-renders but shows realistic weather variety.

function seededRand(seed: number, offset: number): number {
  const x = Math.sin(seed * 9301 + offset * 49297 + 233) * 100003;
  return x - Math.floor(x);
}

function generateWeather(baseDate: Date, days: number): WeatherDay[] {
  const result: WeatherDay[] = [];
  // Mid-spring baseline for Virginia (approx April)
  const baseAirTemp = 58;
  const baseGroundTemp = 52;

  for (let i = 0; i < days; i++) {
    const r1 = seededRand(i, 1);
    const r2 = seededRand(i, 2);
    const r3 = seededRand(i, 3);
    const r4 = seededRand(i, 4);
    const r5 = seededRand(i, 5);
    const r6 = seededRand(i, 6);
    const r7 = seededRand(i, 7);
    const r8 = seededRand(i, 8);

    // Temperature oscillates in a sine-like pattern (+/- ~15°F variance)
    const tempVariance = Math.sin(i * 0.45) * 12 + (r1 - 0.5) * 10;
    const airTemp = Math.round(baseAirTemp + tempVariance);
    // Ground temp lags air temp by 2–4 °F
    const groundTemp = Math.round(baseGroundTemp + tempVariance * 0.7 - 2 + (r2 - 0.5) * 4);

    const windSpeed = Math.round(5 + r3 * 22);
    const gustSpeed = Math.round(windSpeed + r4 * 12);
    const precipChance = Math.round(r5 * 100);
    const precipAmount = precipChance > 55 ? parseFloat((r6 * 1.8).toFixed(2)) : 0;
    const humidity = Math.round(40 + r7 * 50);
    const thunderstorm = precipChance > 75 && r8 > 0.55;
    const lightning = thunderstorm && r8 > 0.7;

    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    result.push({ date: d, airTemp, groundTemp, windSpeed, gustSpeed, precipChance, precipAmount, humidity, thunderstorm, lightning });
  }
  return result;
}

// ─── Trade logic evaluators ───────────────────────────────────────────────────

const BASE_PROJECT_VALUE = 85_000; // assumed daily project value

function evaluateAsphalt(day: WeatherDay): TradeEvaluation {
  const risks: string[] = [];
  let status: GoNoGoStatus = 'GO';
  let financialRisk = 0;

  if (day.precipAmount > 0.1) {
    status = 'NO-GO';
    risks.push(`Rain ${day.precipAmount}" — mat washout / bond failure`);
    financialRisk += 42_500;
  }
  if (day.groundTemp < 50) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`Ground temp ${day.groundTemp}°F — asphalt chills before compaction (96% Marshall failure)`);
    financialRisk += 18_000;
  }
  if (day.windSpeed > 15) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`${day.windSpeed} mph wind — mat surface cools 40% faster, rollers must tighten`);
    financialRisk += 5_000;
  }
  if (day.airTemp < 45) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`Air temp ${day.airTemp}°F — VDOT Section 315 minimum temp violation`);
    financialRisk += 22_000;
  }
  if (day.groundTemp - day.airTemp > 15) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`Ground/air delta ${day.groundTemp - day.airTemp}°F — rapid heat loss from bottom up`);
    financialRisk += 8_000;
  }

  const profitProtection = status === 'GO' ? 100 : status === 'CAUTION' ? 70 : 0;
  const primaryReason = risks[0] ?? 'All paving parameters within VDOT Section 315 spec';
  return { status, primaryReason, risks, financialRisk, profitProtection };
}

function evaluateConcrete(day: WeatherDay): TradeEvaluation {
  const risks: string[] = [];
  let status: GoNoGoStatus = 'GO';
  let financialRisk = 0;

  if (day.airTemp < 35) {
    status = 'NO-GO';
    risks.push(`Freezing temps ${day.airTemp}°F — water in mix will freeze (ACI 306 cold-weather violation)`);
    financialRisk += 80_000;
  }
  if (day.airTemp > 90) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`Flash-cure risk ${day.airTemp}°F — surface cracks before structural set; schedule 4 AM pour`);
    financialRisk += 35_000;
  }
  if (day.precipAmount > 0.2) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`Rain ${day.precipAmount}" — ruins surface finish, dilutes water-cement ratio`);
    financialRisk += 25_000;
  }
  if (day.windSpeed > 20 && day.humidity < 50) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`High wind + low humidity — rapid evaporation causing plastic shrinkage cracking`);
    financialRisk += 15_000;
  }
  if (day.thunderstorm) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push('Thunderstorm — electrical hazard, rain damage to fresh pour');
    financialRisk += 20_000;
  }

  const profitProtection = status === 'GO' ? 100 : status === 'CAUTION' ? 65 : 0;
  const primaryReason = risks[0] ?? 'All concrete parameters within ACI 305/306 spec';
  return { status, primaryReason, risks, financialRisk, profitProtection };
}

function evaluateExcavation(day: WeatherDay): TradeEvaluation {
  const risks: string[] = [];
  let status: GoNoGoStatus = 'GO';
  let financialRisk = 0;

  if (day.precipAmount > 0.5) {
    status = 'NO-GO';
    risks.push(`Heavy rain ${day.precipAmount}" — soil saturation; compaction test will fail`);
    financialRisk += 30_000;
  }
  if (day.precipChance > 60 && day.precipAmount > 0.25) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`${day.precipChance}% rain chance — equipment sinking risk, diesel burn loss`);
    financialRisk += 12_000;
  }
  if (day.humidity > 80 && day.precipAmount > 0.1) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`High humidity ${day.humidity}% + rain — mud pumping risk under sub-base`);
    financialRisk += 18_000;
  }
  if (day.groundTemp < 32) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`Ground temp ${day.groundTemp}°F — frozen soil; excavation impossible, blade damage risk`);
    financialRisk += 8_000;
  }
  if (day.precipAmount > 1.0) {
    financialRisk += 20_000;
    risks.push('Flood-level rain — trench collapse hazard (OSHA 1926 Subpart P violation)');
  }

  const profitProtection = status === 'GO' ? 100 : status === 'CAUTION' ? 60 : 0;
  const primaryReason = risks[0] ?? 'Soil conditions acceptable for grading/compaction ops';
  return { status, primaryReason, risks, financialRisk, profitProtection };
}

function evaluateCrane(day: WeatherDay): TradeEvaluation {
  const risks: string[] = [];
  let status: GoNoGoStatus = 'GO';
  let financialRisk = 0;

  if (day.windSpeed >= 20) {
    status = 'NO-GO';
    risks.push(`${day.windSpeed} mph sustained wind — OSHA 1926.1417 crane shutdown required`);
    financialRisk += 5_000; // daily crane rental
  }
  if (day.gustSpeed >= 28) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`${day.gustSpeed} mph gusts — boom deflection risk, load swing hazard`);
    financialRisk += 15_000;
  }
  if (day.lightning) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push('Lightning detected — immediate all-personnel ground evacuation (ANSI/ASSP A10.48)');
    financialRisk += 5_000;
  }
  if (day.thunderstorm) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push('Active thunderstorm — crane boom is the highest point on site');
    financialRisk += 5_000;
  }
  if (day.windSpeed >= 15 && day.windSpeed < 20) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`${day.windSpeed} mph wind — monitor continuously, reduce load radius`);
    financialRisk += 2_500;
  }
  if (day.precipAmount > 0.5) {
    if (status === 'GO') status = 'CAUTION';
    risks.push('Heavy precipitation — reduced visibility, slick steel connections');
    financialRisk += 3_000;
  }

  const profitProtection = status === 'GO' ? 100 : status === 'CAUTION' ? 75 : 0;
  const primaryReason = risks[0] ?? 'Wind and electrical conditions safe for crane operations';
  return { status, primaryReason, risks, financialRisk, profitProtection };
}

function evaluateRoofing(day: WeatherDay): TradeEvaluation {
  const risks: string[] = [];
  let status: GoNoGoStatus = 'GO';
  let financialRisk = 0;

  if (day.precipAmount > 0) {
    status = 'NO-GO';
    risks.push(`Rain ${day.precipAmount}" — wet decking voids adhesion; FM Global / UL assembly failure`);
    financialRisk += 28_000;
  }
  if (day.windSpeed > 25) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`${day.windSpeed} mph wind — membrane blow-off risk; OSHA fall-protection violation`);
    financialRisk += 18_000;
  }
  if (day.airTemp < 40) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push(`${day.airTemp}°F — TPO/EPDM below minimum application temperature (FM Global 1-29)`);
    financialRisk += 12_000;
  }
  if (day.windSpeed > 15 && day.windSpeed <= 25) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`${day.windSpeed} mph wind — membrane sheets difficult to control, seam alignment issues`);
    financialRisk += 6_000;
  }
  if (day.precipChance > 50) {
    if (status === 'GO') status = 'CAUTION';
    risks.push(`${day.precipChance}% rain probability — keep open penetrations minimized`);
    financialRisk += 4_000;
  }
  if (day.thunderstorm) {
    if (status !== 'NO-GO') status = 'NO-GO';
    risks.push('Thunderstorm — rooftop is highest elevation; immediate evacuation required');
    financialRisk += 5_000;
  }

  const profitProtection = status === 'GO' ? 100 : status === 'CAUTION' ? 65 : 0;
  const primaryReason = risks[0] ?? 'Conditions suitable for membrane application (FM Global / UL assemblies)';
  return { status, primaryReason, risks, financialRisk, profitProtection };
}

function evaluateDay(trade: TradeType, day: WeatherDay): TradeEvaluation {
  switch (trade) {
    case 'asphalt':    return evaluateAsphalt(day);
    case 'concrete':   return evaluateConcrete(day);
    case 'excavation': return evaluateExcavation(day);
    case 'crane':      return evaluateCrane(day);
    case 'roofing':    return evaluateRoofing(day);
  }
}

// ─── Trade metadata ───────────────────────────────────────────────────────────

const TRADES: { id: TradeType; label: string; icon: string; csiDiv: string; standard: string }[] = [
  { id: 'asphalt',    label: 'Asphalt Paving',                    icon: '🛣️',  csiDiv: 'Div 32', standard: 'VDOT Section 315' },
  { id: 'concrete',   label: 'Concrete Flatwork / Structural',     icon: '🏗️',  csiDiv: 'Div 03', standard: 'ACI 305 / ACI 306' },
  { id: 'excavation', label: 'Excavation / Earthwork',             icon: '🚜',  csiDiv: 'Div 31', standard: 'AASHTO T99 / T180' },
  { id: 'crane',      label: 'Crane Ops / Steel Erection',         icon: '🏗️',  csiDiv: 'Div 05', standard: 'OSHA 1926.1417' },
  { id: 'roofing',    label: 'Exterior Coatings / Roofing',        icon: '🏠',  csiDiv: 'Div 07', standard: 'FM Global / UL' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<GoNoGoStatus, { bg: string; text: string; border: string; label: string }> = {
  'GO':      { bg: 'bg-emerald-900/40', text: 'text-emerald-400', border: 'border-emerald-500/50', label: 'GO' },
  'CAUTION': { bg: 'bg-yellow-900/40',  text: 'text-yellow-400',  border: 'border-yellow-500/50',  label: 'CAUTION' },
  'NO-GO':   { bg: 'bg-red-900/50',     text: 'text-red-400',     border: 'border-red-500/50',     label: 'NO-GO' },
};

function shortDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function dayOfWeek(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DispatchNode() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const weatherDays = useMemo(() => generateWeather(today, 30), [today]);

  const [selectedTrade, setSelectedTrade] = useState<TradeType>('asphalt');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const evaluations = useMemo(
    () => weatherDays.map((day) => evaluateDay(selectedTrade, day)),
    [selectedTrade, weatherDays],
  );

  const activeTrade = TRADES.find((t) => t.id === selectedTrade)!;
  const selectedDay = weatherDays[selectedDayIndex];
  const selectedEval = evaluations[selectedDayIndex];

  // Summary stats
  const goDays = evaluations.filter((e) => e.status === 'GO').length;
  const cautionDays = evaluations.filter((e) => e.status === 'CAUTION').length;
  const noGoDays = evaluations.filter((e) => e.status === 'NO-GO').length;
  const totalFinancialRisk = evaluations.reduce((sum, e) => sum + e.financialRisk, 0);
  const bestDayIndex = evaluations.findIndex(
    (e, i) => e.status === 'GO' && i >= 0 &&
      evaluations.slice(0, i).every((prev) => prev.status !== 'GO'),
  );

  return (
    <div className="bg-zinc-950 min-h-screen font-sans text-white">
      {/* ── HEADER BANNER ── */}
      <div className="bg-[#ffcc00] text-black py-3 px-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em]">
          ⚡ WORDEN GC DISPATCH NODE — 30-Day Meteorological Intelligence Engine
          &nbsp;·&nbsp; J. Worden &amp; Sons &nbsp;·&nbsp; 4th Generation Since 1984
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* ── TITLE ── */}
        <div>
          <span className="text-[#ffcc00] text-xs font-black uppercase tracking-[0.35em]">
            Enterprise GC Operating System · All CSI MasterFormat Trades
          </span>
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter mt-2">
            GC Weather <span className="text-[#ffcc00]">Intelligence</span>
          </h1>
          <p className="text-zinc-400 text-lg font-bold mt-3 max-w-3xl italic">
            30-day Go/No-Go dispatch matrix. Select your active trade phase to instantly
            recalculate financial risk and crew scheduling across the forecast window.
          </p>
        </div>

        {/* ── TRADE SELECTOR ── */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#ffcc00] mb-4">
            Trade / Phase Selector
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TRADES.map((trade) => {
              const active = selectedTrade === trade.id;
              return (
                <button
                  key={trade.id}
                  type="button"
                  onClick={() => { setSelectedTrade(trade.id); setSelectedDayIndex(0); }}
                  className={`flex flex-col items-start gap-2 p-4 border-2 rounded-xl transition-all duration-200 text-left ${
                    active
                      ? 'bg-[#ffcc00]/10 border-[#ffcc00] text-white'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  <span className="text-2xl">{trade.icon}</span>
                  <span className="text-xs font-black uppercase tracking-wide leading-tight">{trade.label}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-[#ffcc00]' : 'text-zinc-600'}`}>
                    {trade.csiDiv} · {trade.standard}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 30-DAY SUMMARY STATS ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Workable Days', value: goDays, color: 'text-emerald-400', icon: <CheckCircle className="w-5 h-5" /> },
            { label: 'Caution Days', value: cautionDays, color: 'text-yellow-400', icon: <AlertTriangle className="w-5 h-5" /> },
            { label: 'Shutdown Days', value: noGoDays, color: 'text-red-400', icon: <XCircle className="w-5 h-5" /> },
            {
              label: '30-Day Risk Exposure',
              value: formatMoney(totalFinancialRisk),
              color: 'text-[#ffcc00]',
              icon: <DollarSign className="w-5 h-5" />,
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
              <div className={`flex items-center gap-2 ${stat.color}`}>
                {stat.icon}
                <span className="text-xs font-black uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </section>

        {/* ── NEXT GO-DAY ALERT ── */}
        {bestDayIndex >= 0 && (
          <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-xl px-6 py-4 flex items-center gap-4">
            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Next Optimal {activeTrade.label} Window
              </p>
              <p className="text-white font-bold text-lg mt-1">
                {shortDate(weatherDays[bestDayIndex].date)} ({dayOfWeek(weatherDays[bestDayIndex].date)}) —{' '}
                100% Profit Margin Protected
              </p>
            </div>
          </div>
        )}

        {/* ── 30-DAY CALENDAR ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#ffcc00]">
              30-Day Go / No-Go Matrix — {activeTrade.label}
            </h2>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-2">
            {weatherDays.map((day, i) => {
              const ev = evaluations[i];
              const s = STATUS_STYLES[ev.status];
              const isSelected = i === selectedDayIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDayIndex(i)}
                  className={`relative flex flex-col items-center justify-center gap-1 rounded-lg p-2 border-2 transition-all duration-150 min-h-[72px] ${s.bg} ${s.border} ${
                    isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-zinc-950 scale-105' : 'hover:scale-102'
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    {dayOfWeek(day.date)}
                  </span>
                  <span className="text-xs font-black text-white">{shortDate(day.date)}</span>
                  <span className={`text-[8px] font-black uppercase tracking-wider ${s.text}`}>
                    {ev.status}
                  </span>
                  <span className="text-[9px] text-zinc-500">{day.airTemp}°F</span>
                  {day.precipAmount > 0 && (
                    <Droplets className="w-2.5 h-2.5 text-blue-400 absolute top-1 right-1" />
                  )}
                  {day.windSpeed > 20 && (
                    <Wind className="w-2.5 h-2.5 text-purple-400 absolute top-1 left-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4">
            {(['GO', 'CAUTION', 'NO-GO'] as GoNoGoStatus[]).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm border ${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].border}`} />
                <span className={`text-[10px] font-black uppercase tracking-wider ${STATUS_STYLES[s].text}`}>{s}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Droplets className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Precipitation</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] text-zinc-500 uppercase font-bold">High Wind</span>
            </div>
          </div>
        </section>

        {/* ── SELECTED DAY DETAIL ── */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Left: conditions */}
          <div className={`rounded-2xl border-2 p-6 ${STATUS_STYLES[selectedEval.status].bg} ${STATUS_STYLES[selectedEval.status].border}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                  Selected Day — {activeTrade.label}
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {shortDate(selectedDay.date)}, {dayOfWeek(selectedDay.date)}
                </h3>
              </div>
              <div className={`px-4 py-2 rounded-lg font-black uppercase text-sm tracking-wider border ${STATUS_STYLES[selectedEval.status].text} ${STATUS_STYLES[selectedEval.status].border} bg-black/30`}>
                {selectedEval.status}
              </div>
            </div>

            {/* Weather grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {[
                { icon: <Thermometer className="w-4 h-4" />, label: 'Air Temp', value: `${selectedDay.airTemp}°F` },
                { icon: <Thermometer className="w-4 h-4 text-orange-400" />, label: 'Ground Temp', value: `${selectedDay.groundTemp}°F` },
                { icon: <Wind className="w-4 h-4 text-blue-400" />, label: 'Wind Speed', value: `${selectedDay.windSpeed} mph` },
                { icon: <Wind className="w-4 h-4 text-purple-400" />, label: 'Gusts', value: `${selectedDay.gustSpeed} mph` },
                { icon: <CloudRain className="w-4 h-4 text-blue-400" />, label: 'Precip', value: `${selectedDay.precipAmount}"` },
                { icon: <Droplets className="w-4 h-4 text-cyan-400" />, label: 'Humidity', value: `${selectedDay.humidity}%` },
              ].map((item) => (
                <div key={item.label} className="bg-black/30 rounded-lg p-3 flex items-center gap-2">
                  <span className="text-zinc-400">{item.icon}</span>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{item.label}</p>
                    <p className="text-sm font-black text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reason */}
            <div className="bg-black/40 rounded-lg p-4 mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Primary Decision Factor</p>
              <p className="text-sm font-bold text-white leading-relaxed">{selectedEval.primaryReason}</p>
            </div>

            {/* Risk list */}
            {selectedEval.risks.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Risk Flags</p>
                {selectedEval.risks.map((risk, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{risk}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: financial risk */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-[#ffcc00]" />
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#ffcc00]">
                Financial Risk Analysis
              </h3>
            </div>

            {/* Profit gauge */}
            <div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Profit Margin Protection</span>
                <span className="text-2xl font-black text-white">{selectedEval.profitProtection}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    selectedEval.profitProtection === 100
                      ? 'bg-emerald-500'
                      : selectedEval.profitProtection >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${selectedEval.profitProtection}%` }}
                />
              </div>
            </div>

            {/* Risk dollar amount */}
            <div className="bg-zinc-950 rounded-xl p-5 text-center">
              {selectedEval.financialRisk === 0 ? (
                <div>
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <p className="text-emerald-400 font-black uppercase text-sm tracking-wider">Zero Risk Exposure</p>
                  <p className="text-zinc-400 text-sm mt-1">Full project margin protected on this day.</p>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Estimated $ At Risk</p>
                  <p className="text-4xl font-black text-red-400">{formatMoney(selectedEval.financialRisk)}</p>
                  <p className="text-zinc-400 text-xs mt-2 italic">
                    {selectedEval.status === 'NO-GO'
                      ? 'Proceeding on this day could result in the above loss'
                      : 'Mitigable risk — proceed with noted precautions'}
                  </p>
                </div>
              )}
            </div>

            {/* Trade-specific risk notes */}
            <div className="bg-zinc-950 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {activeTrade.label} — Governing Standard
              </p>
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm font-bold text-white">{activeTrade.standard}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400">
                  {activeTrade.csiDiv} — J. Worden &amp; Sons verified capability
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-xs text-zinc-400">
                  Base project value: {formatMoney(BASE_PROJECT_VALUE)} / scheduled day
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRADE RISK REFERENCE CARDS ── */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#ffcc00] mb-5">
            GC Trade Risk Reference Matrix
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                trade: 'Asphalt Paving',
                icon: '🛣️',
                standard: 'VDOT Section 315',
                threats: [
                  { threat: 'Rain > 0.1"', impact: 'Mat washout / bond failure', risk: '$42,500' },
                  { threat: 'Ground temp < 50°F', impact: 'Failed 96% Marshall compaction', risk: '$18,000' },
                  { threat: 'Wind > 15 mph', impact: 'Surface cools 40% faster', risk: '$5,000' },
                  { threat: 'Air temp < 45°F', impact: 'VDOT Section 315 violation', risk: '$22,000' },
                ],
              },
              {
                trade: 'Concrete Flatwork',
                icon: '🏗️',
                standard: 'ACI 305 / ACI 306',
                threats: [
                  { threat: 'Temp < 35°F', impact: 'Frozen mix — structural failure', risk: '$80,000' },
                  { threat: 'Temp > 90°F', impact: 'Flash-cure cracking', risk: '$35,000' },
                  { threat: 'Rain > 0.2"', impact: 'Surface finish ruined', risk: '$25,000' },
                  { threat: 'High wind + low humidity', impact: 'Plastic shrinkage cracks', risk: '$15,000' },
                ],
              },
              {
                trade: 'Excavation / Earthwork',
                icon: '🚜',
                standard: 'AASHTO T99 / T180',
                threats: [
                  { threat: 'Rain > 0.5"', impact: 'Soil saturation — compaction fail', risk: '$30,000' },
                  { threat: 'High humidity + rain', impact: 'Mud pumping under sub-base', risk: '$18,000' },
                  { threat: 'Ground temp < 32°F', impact: 'Frozen soil — blade damage', risk: '$8,000' },
                  { threat: 'Rain > 1.0"', impact: 'OSHA trench collapse hazard', risk: '$20,000' },
                ],
              },
              {
                trade: 'Crane / Steel Erection',
                icon: '🏗️',
                standard: 'OSHA 1926.1417',
                threats: [
                  { threat: 'Wind ≥ 20 mph', impact: 'OSHA crane shutdown', risk: '$5,000/day' },
                  { threat: 'Gusts ≥ 28 mph', impact: 'Load swing / boom deflection', risk: '$15,000' },
                  { threat: 'Lightning detected', impact: 'Full-site evacuation', risk: '$5,000/day' },
                  { threat: 'Thunderstorm', impact: 'Boom = highest point on site', risk: '$5,000/day' },
                ],
              },
              {
                trade: 'Roofing / Coatings',
                icon: '🏠',
                standard: 'FM Global / UL',
                threats: [
                  { threat: 'Any rain', impact: 'Adhesion void — FM Global failure', risk: '$28,000' },
                  { threat: 'Wind > 25 mph', impact: 'Membrane blow-off', risk: '$18,000' },
                  { threat: 'Temp < 40°F', impact: 'Below TPO/EPDM min app temp', risk: '$12,000' },
                  { threat: 'Wind 15–25 mph', impact: 'Seam alignment issues', risk: '$6,000' },
                ],
              },
            ].map((card) => (
              <div
                key={card.trade}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h3 className="text-sm font-black uppercase text-white tracking-tight">{card.trade}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#ffcc00]">{card.standard}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {card.threats.map((t) => (
                    <div key={t.threat} className="bg-zinc-950 rounded-lg px-3 py-2 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-black text-zinc-300">{t.threat}</p>
                        <p className="text-[9px] text-zinc-500 italic">{t.impact}</p>
                      </div>
                      <span className="text-[10px] font-black text-red-400 whitespace-nowrap">{t.risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
            J. Worden &amp; Sons Paving &amp; General Contracting · 4th Generation · Est. 1984
            &nbsp;·&nbsp; Virginia Class A Contractor &nbsp;·&nbsp; 7011 Wood Rd, Richmond, VA
          </p>
          <p className="text-zinc-700 text-[10px] mt-2 uppercase tracking-wider">
            Weather intelligence powered by Worden GC OS · Enterprise SaaS Tier · All CSI MasterFormat Divisions
          </p>
        </div>

      </div>
    </div>
  );
}
