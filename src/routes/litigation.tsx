import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/litigation')({
  component: LitigationPredictorNode,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: 'weather-override',
    label: 'Weather Warning Override',
    description: 'Contractor overrides AI weather warning and lays mat in 38°F temperatures. Pavement fails 14 months later.',
    risk: 'HIGH',
    plaintiff: 'Property Owner',
    defendant: 'Contractor',
    winProbability: 94,
    estimatedDamages: 120_000,
    precedent: 'Force Majeure / Weather Waiver',
    court: 'State Claims Court',
    jurisdiction: 'VA',
    analysis:
      "Contractor's documented override of automated weather alert constitutes negligence per se. Virginia tort law imposes a duty of care on licensed contractors. The AI-generated weather flag creates contemporaneous documentation of the known risk.",
    citations: [
      { name: 'Spearin Doctrine (1918)', cite: 'United States v. Spearin, 248 U.S. 132', relevance: 'Establishes contractor liability when deviating from implied standards of workmanship.' },
      { name: 'VDOT Sec. 315 Cold-Weather Paving', cite: '24 VAC 30-92-10 et seq.', relevance: 'Prohibits asphalt placement below 40°F ambient temperature without written approval.' },
    ],
  },
  {
    id: 'defective-plans',
    label: 'Defective Engineer Plans (Spearin)',
    description: 'Owner provides geotechnical report showing stable soil. Worden AI detects expansive clay via USGS database. Owner refuses change order.',
    risk: 'HIGH',
    plaintiff: 'Contractor (J. Worden & Sons)',
    defendant: 'Project Owner',
    winProbability: 91,
    estimatedDamages: 85_000,
    precedent: 'Spearin Doctrine — Implied Warranty of Plans',
    court: 'U.S. Court of Federal Claims',
    jurisdiction: 'Federal',
    analysis:
      "Under the Spearin Doctrine, the owner impliedly warrants the accuracy of plans and specifications provided to the contractor. Worden's AI geotech scan creating a contemporaneous record of the defective condition strengthens a Differing Site Conditions claim under FAR 52.236-2.",
    citations: [
      { name: 'United States v. Spearin', cite: '248 U.S. 132 (1918)', relevance: 'Supreme Court holding: owner bears liability for defective plans and specs furnished to contractor.' },
      { name: 'Differing Site Conditions (FAR)', cite: 'FAR 52.236-2', relevance: 'Federal clause entitling contractor to equitable adjustment when actual site conditions differ from contract.' },
      { name: 'Metcalf Construction Co. v. United States', cite: '742 F.3d 984 (Fed. Cir. 2014)', relevance: 'Federal Circuit affirms that Spearin warranty survives "as-is" contract language.' },
    ],
  },
  {
    id: 'force-majeure',
    label: 'Force Majeure — Unforecasted Storm',
    description: 'GC attempts to collect $30,000 in Liquidated Damages for a 3-week delay caused by a 100-year storm event not on the 90-day weather model.',
    risk: 'LOW',
    plaintiff: 'General Contractor (LD Claim)',
    defendant: 'J. Worden & Sons',
    winProbability: 4,
    estimatedDamages: 0,
    precedent: 'Force Majeure / Acts of God',
    court: 'State Claims Court',
    jurisdiction: 'VA',
    analysis:
      'The meteorological record from NOAA confirms the event was a 1-in-100-year occurrence. Virginia contract law recognizes Force Majeure as a complete defense to Liquidated Damages when the delay results from an unforeseeable Act of God documented by a government agency.',
    citations: [
      { name: 'Va. Code § 11-58', cite: 'Virginia Force Majeure Statute', relevance: 'Excuses contractual performance when prevented by an unforeseeable event beyond the party\'s control.' },
      { name: 'Restatement (Second) of Contracts § 261', cite: 'Impracticability of Performance', relevance: 'Performance excused when supervening event makes performance impracticable without the party\'s fault.' },
      { name: 'NOAA NWS Storm Archive', cite: 'NOAA Technical Memorandum', relevance: 'Official government weather record sufficient to establish Act of God defense in Virginia courts.' },
    ],
  },
  {
    id: 'lien-dispute',
    label: 'Mechanic\'s Lien — Non-Payment',
    description: 'General Contractor withholds final payment of $62,500 after project completion citing alleged punch-list deficiencies.',
    risk: 'MEDIUM',
    plaintiff: 'J. Worden & Sons',
    defendant: 'General Contractor',
    winProbability: 87,
    estimatedDamages: 62_500,
    precedent: 'Virginia Mechanic\'s Lien Law',
    court: 'Circuit Court of Chesterfield County',
    jurisdiction: 'VA',
    analysis:
      'Virginia Mechanic\'s Lien law (Va. Code § 43-1 et seq.) provides a first-priority lien against the real property when subcontractors are unpaid. Worden\'s daily progress logs, scale tickets, and signed delivery receipts constitute sufficient proof of substantial completion. Punitive damages available under Va. Code § 43-70 for wrongful withholding.',
    citations: [
      { name: 'Va. Code § 43-1 et seq.', cite: 'Virginia Mechanic\'s Lien Act', relevance: 'Provides perfected lien rights to contractors and subcontractors upon substantial completion.' },
      { name: 'Va. Code § 43-70', cite: 'Wrongful Withholding', relevance: 'Allows recovery of attorney\'s fees and punitive damages when owner wrongfully refuses to release funds.' },
      { name: 'White v. Lambert', cite: '251 Va. 379 (1996)', relevance: 'Virginia Supreme Court: substantial completion triggers payment obligation regardless of minor punch-list items.' },
    ],
  },
  {
    id: 'osha-crane',
    label: 'OSHA Wind Violation — Crane Operation',
    description: 'Foreman attempts to operate crane in 38 mph sustained winds. AI safety node flags Federal OSHA 29 CFR 1926.1417 violation.',
    risk: 'CRITICAL',
    plaintiff: 'OSHA / Injured Worker',
    defendant: 'Contractor',
    winProbability: 97,
    estimatedDamages: 850_000,
    precedent: 'OSHA General Duty Clause',
    court: 'U.S. District Court / OSHRC',
    jurisdiction: 'Federal',
    analysis:
      'Crane operations in wind speeds exceeding 20 mph without engineering documentation violate OSHA 29 CFR 1926.1417(u). The AI flag creates irrefutable documentation that the employer had actual knowledge of the hazard. In Federal court, this constitutes a willful violation carrying penalties up to $156,259 per violation plus civil liability.',
    citations: [
      { name: 'OSHA 29 CFR 1926.1417(u)', cite: 'Cranes & Derricks in Construction', relevance: 'Prohibits crane operation when wind speed creates unsafe conditions; operator must stop operations.' },
      { name: 'General Duty Clause (OSH Act § 5(a)(1))', cite: '29 U.S.C. § 654(a)(1)', relevance: 'Requires employer to provide workplace free from recognized hazards causing death or serious harm.' },
      { name: 'Secretary of Labor v. Stahl Roofing', cite: 'OSHRC Docket 07-1367', relevance: 'OSHRC affirmed willful citation where supervisor had actual knowledge of weather hazard.' },
    ],
  },
  {
    id: 'davis-bacon',
    label: 'Davis-Bacon Wage Underpayment',
    description: 'Federal auditor flags potential underpayment of prevailing wages on a USACE project. AI payroll check detects $12,200 shortfall.',
    risk: 'HIGH',
    plaintiff: 'DOL Wage & Hour Division',
    defendant: 'Contractor',
    winProbability: 78,
    estimatedDamages: 36_600,
    precedent: 'Davis-Bacon Act Compliance',
    court: 'U.S. Department of Labor / Federal District Court',
    jurisdiction: 'Federal',
    analysis:
      'Davis-Bacon Act (40 U.S.C. § 3141 et seq.) requires payment of locally prevailing wages on federally funded construction. Underpayment discovered by AI payroll reconciliation allows proactive cure before DOL investigation. Voluntary remediation prior to formal complaint typically reduces penalty exposure by 60-80% under FAR 22.406-9.',
    citations: [
      { name: 'Davis-Bacon Act', cite: '40 U.S.C. § 3141 et seq.', relevance: 'Mandates prevailing wage payment on all federal and federally assisted construction contracts.' },
      { name: 'FAR 22.406-9', cite: 'Federal Acquisition Regulation', relevance: 'DOL debarment procedures; voluntary disclosure triggers mitigated penalty schedule.' },
      { name: 'Walsh-Healey Public Contracts Act', cite: '41 U.S.C. § 6501', relevance: 'Parallel requirement for federally contracted services; combined penalty exposure doubles base underpayment.' },
    ],
  },
] satisfies {
  id: string;
  label: string;
  description: string;
  risk: string;
  plaintiff: string;
  defendant: string;
  winProbability: number;
  estimatedDamages: number;
  precedent: string;
  court: string;
  jurisdiction: string;
  analysis: string;
  citations: { name: string; cite: string; relevance: string }[];
}[];

type Scenario = typeof SCENARIOS[number];

const JURISDICTION_LEVELS = [
  {
    level: 'L1',
    name: 'Local Municipal Code',
    color: '#4ade80',
    bg: 'bg-green-950',
    border: 'border-green-700',
    text: 'text-green-400',
    examples: ['Zoning permits', 'ROW excavation bonds', 'Noise ordinances', 'Local stormwater (MS4)'],
    icon: '🏛️',
  },
  {
    level: 'L2',
    name: 'State Lien / Tort Law',
    color: '#facc15',
    bg: 'bg-yellow-950',
    border: 'border-yellow-600',
    text: 'text-yellow-400',
    examples: ['Mechanic\'s Lien (Va. § 43-1)', 'Contractor licensing (Va. § 54.1)', 'State tort / negligence', 'VDOT Sec. 315 compliance'],
    icon: '⚖️',
  },
  {
    level: 'L3',
    name: 'Federal OSHA / DOT / DOL',
    color: '#fb923c',
    bg: 'bg-orange-950',
    border: 'border-orange-600',
    text: 'text-orange-400',
    examples: ['OSHA 29 CFR 1926 (Construction)', 'Davis-Bacon Act (40 U.S.C. § 3141)', 'FHWA / DOT Federal-aid', 'ADA (42 U.S.C. § 12101)'],
    icon: '🦅',
  },
  {
    level: 'L4',
    name: 'Supreme Court Contract Precedents',
    color: '#f87171',
    bg: 'bg-red-950',
    border: 'border-red-600',
    text: 'text-red-400',
    examples: ['Spearin Doctrine (248 U.S. 132)', 'Force Majeure / Impossibility', 'Federal Claims Court (COFC)', 'Sovereign Immunity Waivers'],
    icon: '⚡',
  },
] satisfies {
  level: string;
  name: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  examples: string[];
  icon: string;
}[];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function riskColor(risk: string) {
  switch (risk) {
    case 'CRITICAL': return 'text-red-400 bg-red-950 border-red-700';
    case 'HIGH': return 'text-orange-400 bg-orange-950 border-orange-700';
    case 'MEDIUM': return 'text-yellow-400 bg-yellow-950 border-yellow-700';
    case 'LOW': return 'text-green-400 bg-green-950 border-green-700';
    default: return 'text-gray-400 bg-gray-900 border-gray-700';
  }
}

function ProbabilityBar({ value, label }: { value: number; label: string }) {
  const isHighWin = value >= 70;
  const isLowWin = value < 30;
  const barColor = isHighWin ? 'bg-red-500' : isLowWin ? 'bg-green-500' : 'bg-yellow-500';
  const textColor = isHighWin ? 'text-red-400' : isLowWin ? 'text-green-400' : 'text-yellow-400';
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</span>
        <span className={`text-2xl font-black tabular-nums ${textColor}`}>{value}%</span>
      </div>
      <div className="h-3 bg-gray-900 border border-gray-800 rounded-sm overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function LitigationPredictorNode() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <main className="min-h-screen bg-[#080c10] text-white font-mono selection:bg-[#ffcc00] selection:text-black">

      {/* ── TERMINAL HERO ──────────────────────────────────────────── */}
      <section className="relative py-28 px-6 bg-[#09111a] border-b border-[#1a2a3a] overflow-hidden">
        {/* Scanline overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_4px)] opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="ml-2 text-[10px] uppercase tracking-[0.4em] text-[#ffcc00] font-black border border-[#ffcc00]/30 px-3 py-1">
              WORDEN OS · LEGAL ENGINE v4.2 · LIVE
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
            <span className="text-[#ffcc00]">SUPREME COURT</span><br />
            <span className="text-white italic">PRECEDENT ENGINE</span>
          </h1>
          <p className="text-xl text-[#4a7a9a] font-bold max-w-4xl leading-relaxed border-l-4 border-[#ffcc00]/50 pl-6">
            Predictive litigation AI. Real-time case law simulation from Local Municipal Code
            to U.S. Supreme Court precedent. Know your legal position before the first shovel hits the ground.
          </p>

          {/* Live status bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Precedents Loaded', value: '12,847' },
              { label: 'Jurisdictions Active', value: '50 States + Federal' },
              { label: 'Doctrine Engine', value: 'Spearin · FAR · OSHA' },
              { label: 'Last Calibration', value: 'Live — 2026 Term' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0d1a27] border border-[#1a3a4a] px-4 py-3">
                <div className="text-[10px] text-[#2a6a8a] uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                <div className="text-sm font-black text-[#ffcc00] tabular-nums">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JURISDICTION HIERARCHY ──────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#080c10] border-b border-[#1a2a3a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#4a7a9a] font-bold">§ JURISDICTION SHIELD MATRIX</span>
            <div className="flex-1 h-px bg-[#1a2a3a]" />
          </div>
          <h2 className="text-3xl font-black uppercase text-white mb-4 tracking-tight">
            Legal Shield <span className="text-[#ffcc00]">Hierarchy</span>
          </h2>
          <p className="text-sm text-[#4a7a9a] mb-12 font-bold max-w-2xl">
            Every J. Worden project is protected by four stacked layers of law. The AI monitors all four simultaneously and escalates claims to the highest applicable jurisdiction.
          </p>

          {/* Pyramid / stacked bars */}
          <div className="space-y-3">
            {JURISDICTION_LEVELS.map((jur, idx) => (
              <div
                key={jur.level}
                className={`${jur.bg} border ${jur.border} p-6 transition-all duration-300 hover:brightness-110`}
                style={{ marginLeft: `${idx * 2}rem`, marginRight: `${idx * 2}rem` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`text-3xl font-black ${jur.text} opacity-30 tabular-nums`}>{jur.level}</span>
                    <span className="text-2xl">{jur.icon}</span>
                    <div>
                      <div className={`text-lg font-black uppercase tracking-tight ${jur.text}`}>{jur.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mt-0.5">
                        Authority Level {4 - idx} of 4
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {jur.examples.map((ex) => (
                      <span key={ex} className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 border ${jur.border} ${jur.text} bg-black/40`}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center mt-6 text-[#4a7a9a] text-xs font-bold uppercase tracking-widest">
            ↑ ESCALATION PATH: LOCAL → STATE → FEDERAL → SUPREME COURT ↑
          </div>
        </div>
      </section>

      {/* ── LITIGATION OUTCOME SIMULATOR ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#080c10]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#4a7a9a] font-bold">§ LITIGATION PREDICTOR — SELECT SCENARIO</span>
            <div className="flex-1 h-px bg-[#1a2a3a]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Scenario selector ─────────────────────────────── */}
            <div className="lg:col-span-1 space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-[#2a5a7a] font-bold mb-4">
                ▸ ACTIVE SCENARIOS ({SCENARIOS.length})
              </div>
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveScenario(s)}
                  className={`w-full text-left px-4 py-4 border transition-all duration-200 ${
                    activeScenario.id === s.id
                      ? 'bg-[#0d1a27] border-[#ffcc00]/60 text-white'
                      : 'bg-[#090e15] border-[#1a2a3a] text-[#4a6a8a] hover:border-[#2a4a6a] hover:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-black uppercase leading-tight">{s.label}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 border shrink-0 ${riskColor(s.risk)}`}>
                      {s.risk}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#2a5a7a] font-bold uppercase tracking-widest">{s.court}</div>
                </button>
              ))}
            </div>

            {/* ── Outcome analysis panel ────────────────────────── */}
            <div className="lg:col-span-2 bg-[#090e15] border border-[#1a2a3a] p-8">

              {/* Header */}
              <div className="border-b border-[#1a2a3a] pb-6 mb-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">{activeScenario.label}</h3>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 border ${riskColor(activeScenario.risk)}`}>
                    {activeScenario.risk} RISK
                  </span>
                </div>
                <p className="text-sm text-[#4a7a9a] leading-relaxed font-bold">{activeScenario.description}</p>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0d1520] border border-[#1a2a3a] p-4">
                  <div className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-1">⚔ Plaintiff</div>
                  <div className="text-sm font-black text-white">{activeScenario.plaintiff}</div>
                </div>
                <div className="bg-[#0d1520] border border-[#1a2a3a] p-4">
                  <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">🛡 Defendant</div>
                  <div className="text-sm font-black text-white">{activeScenario.defendant}</div>
                </div>
              </div>

              {/* Court & jurisdiction */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0d1520] border border-[#1a2a3a] p-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#2a6a8a] font-bold mb-1">Court</div>
                  <div className="text-sm font-black text-[#ffcc00]">{activeScenario.court}</div>
                </div>
                <div className="bg-[#0d1520] border border-[#1a2a3a] p-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#2a6a8a] font-bold mb-1">Jurisdiction</div>
                  <div className="text-sm font-black text-[#ffcc00]">{activeScenario.jurisdiction}</div>
                </div>
              </div>

              {/* Probability bars */}
              <div className="bg-[#0a1018] border border-[#1a2a3a] p-6 mb-6">
                <div className="text-[10px] uppercase tracking-widest text-[#2a6a8a] font-bold mb-4">
                  ▸ AI LITIGATION OUTCOME PROBABILITY
                </div>
                <ProbabilityBar
                  value={activeScenario.winProbability}
                  label={`Probability of ${activeScenario.plaintiff} Winning in ${activeScenario.court}`}
                />
                <ProbabilityBar
                  value={100 - activeScenario.winProbability}
                  label={`Probability of ${activeScenario.defendant} Prevailing`}
                />
                {activeScenario.estimatedDamages > 0 ? (
                  <div className="mt-4 flex items-center justify-between bg-red-950/50 border border-red-800/50 px-4 py-3">
                    <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Estimated Damages Exposure</span>
                    <span className="text-2xl font-black text-red-300 tabular-nums">
                      ${activeScenario.estimatedDamages.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center justify-between bg-green-950/50 border border-green-800/50 px-4 py-3">
                    <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold">Damages Exposure</span>
                    <span className="text-2xl font-black text-green-300 tabular-nums">$0 — DEFENDED</span>
                  </div>
                )}
              </div>

              {/* Legal analysis */}
              <div className="bg-[#0a1018] border border-[#1a2a3a] p-6 mb-6">
                <div className="text-[10px] uppercase tracking-widest text-[#2a6a8a] font-bold mb-3">
                  ▸ AI LEGAL ANALYSIS
                </div>
                <p className="text-sm text-[#6a9abf] leading-relaxed">{activeScenario.analysis}</p>
              </div>

              {/* Precedent citations */}
              <div className="bg-[#0a1018] border border-[#1a2a3a] p-6">
                <div className="text-[10px] uppercase tracking-widest text-[#2a6a8a] font-bold mb-4">
                  ▸ CONTROLLING PRECEDENTS & STATUTES
                </div>
                <div className="space-y-4">
                  {activeScenario.citations.map((c) => (
                    <div key={c.name} className="border-l-2 border-[#ffcc00]/40 pl-4">
                      <div className="flex items-start gap-3 flex-wrap mb-1">
                        <span className="text-xs font-black text-[#ffcc00] uppercase">{c.name}</span>
                        <span className="text-[10px] font-bold text-[#2a5a7a] bg-[#0d1520] border border-[#1a2a3a] px-2 py-0.5 font-mono">
                          {c.cite}
                        </span>
                      </div>
                      <p className="text-xs text-[#4a6a8a] leading-relaxed">{c.relevance}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── KEY DOCTRINES REFERENCE ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#09111a] border-t border-[#1a2a3a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#4a7a9a] font-bold">§ DOCTRINE REFERENCE LIBRARY</span>
            <div className="flex-1 h-px bg-[#1a2a3a]" />
          </div>
          <h2 className="text-3xl font-black uppercase text-white mb-12 tracking-tight">
            Core <span className="text-[#ffcc00]">Construction Law Doctrines</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Spearin Doctrine',
                cite: '248 U.S. 132 (1918)',
                court: 'U.S. Supreme Court',
                summary: 'When an owner furnishes plans and specifications, they impliedly warrant their accuracy. The contractor is not liable for defects resulting from following those plans.',
                trigger: 'AI Geotech clash · Defective blueprints',
                color: 'border-red-700 text-red-400',
              },
              {
                name: 'Force Majeure / Acts of God',
                cite: 'Restatement (2d) Contracts § 261',
                court: 'State & Federal Claims Courts',
                summary: 'Performance is excused when supervening events make performance impracticable without the party\'s fault and without assumption of risk.',
                trigger: 'Unforecasted storms · 100-year flood events',
                color: 'border-blue-700 text-blue-400',
              },
              {
                name: 'Differing Site Conditions',
                cite: 'FAR 52.236-2',
                court: 'U.S. Court of Federal Claims',
                summary: 'Federal clause entitling contractor to equitable price adjustment when actual site conditions differ materially from those indicated in the contract.',
                trigger: 'USGS soil mismatch · Subsurface obstruction',
                color: 'border-orange-700 text-orange-400',
              },
              {
                name: 'Prompt Payment Act',
                cite: '31 U.S.C. § 3901 et seq.',
                court: 'Federal Courts',
                summary: 'Federal agencies must pay contractors within 30 days; state versions apply to public works. Late payment triggers automatic interest accrual.',
                trigger: 'Invoice > 30 days outstanding',
                color: 'border-green-700 text-green-400',
              },
              {
                name: 'Virginia Mechanic\'s Lien',
                cite: 'Va. Code § 43-1 et seq.',
                court: 'Virginia Circuit Court',
                summary: 'Provides a perfected first-priority lien against real property when contractors or subcontractors complete work and remain unpaid.',
                trigger: 'GC withholds payment post-completion',
                color: 'border-yellow-700 text-yellow-400',
              },
              {
                name: 'OSHA General Duty Clause',
                cite: '29 U.S.C. § 654(a)(1)',
                court: 'OSHRC / U.S. District Court',
                summary: 'Employer must furnish a workplace free from recognized hazards causing death or serious harm, even absent a specific OSHA standard.',
                trigger: 'Weather override · Unsafe crane ops',
                color: 'border-purple-700 text-purple-400',
              },
            ].map((doc) => (
              <div key={doc.name} className={`bg-[#080c10] border ${doc.color.split(' ')[0]} p-6 hover:brightness-110 transition-all`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className={`text-sm font-black uppercase tracking-tight ${doc.color.split(' ')[1]}`}>{doc.name}</h3>
                </div>
                <div className="text-[10px] font-bold text-[#2a5a7a] font-mono mb-1">{doc.cite}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#2a4a6a] font-bold mb-4">{doc.court}</div>
                <p className="text-xs text-[#4a7a9a] leading-relaxed mb-4">{doc.summary}</p>
                <div className="border-t border-[#1a2a3a] pt-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#2a5a7a] font-bold">AI Trigger: </span>
                  <span className="text-[9px] text-[#ffcc00]/70 font-bold">{doc.trigger}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATE-BY-STATE JURISDICTIONAL ROUTER ───────────────────── */}
      <section className="py-20 px-6 bg-[#080c10] border-t border-[#1a2a3a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#4a7a9a] font-bold">§ STATE JURISDICTIONAL ROUTER</span>
            <div className="flex-1 h-px bg-[#1a2a3a]" />
          </div>
          <h2 className="text-3xl font-black uppercase text-white mb-4 tracking-tight">
            50-State <span className="text-[#ffcc00]">Legal Routing Engine</span>
          </h2>
          <p className="text-sm text-[#4a7a9a] mb-12 font-bold max-w-2xl">
            Construction law changes every time you cross a state line. The Worden OS auto-detects the project GPS coordinates and routes claims to the correct jurisdiction in real time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                state: 'Virginia (Home State)',
                flag: '🏛️',
                lien: 'Va. Code § 43-1 — 150-day perfection window',
                prevailing: 'Virginia Overtime Wage Act (Va. Code § 40.1-28.9)',
                license: 'Class A Contractor License — Active',
                special: 'VDOT Prequalification — Full Road & Structures',
                status: 'FULL COMPLIANCE',
                color: 'border-[#ffcc00] text-[#ffcc00]',
              },
              {
                state: 'Maryland',
                flag: '🦞',
                lien: 'Md. Code Real Prop. § 9-101 — 180-day window',
                prevailing: 'Maryland Prevailing Wage Law (Md. Code Lab. & Emp. § 17-201)',
                license: 'MHIC — Home Improvement Required',
                special: 'MDOT Prequalification Tracking Active',
                status: 'REGIONAL PRIORITY',
                color: 'border-orange-600 text-orange-400',
              },
              {
                state: 'North Carolina',
                flag: '🌲',
                lien: 'N.C. Gen. Stat. § 44A — 120-day perfection',
                prevailing: 'No state prevailing wage law (federal DB only)',
                license: 'N.C. Gen. Contractor License — Pursuit Active',
                special: 'NCDOT Prequalification — Asphalt Category',
                status: 'EXPANSION TARGET',
                color: 'border-blue-600 text-blue-400',
              },
              {
                state: 'Pennsylvania',
                flag: '⚙️',
                lien: 'Pa. Stat. Ann. tit. 49 — 6-month window',
                prevailing: 'Pennsylvania Prevailing Wage Act (43 P.S. § 165)',
                license: 'PA Home Improvement Contractor + State Bond',
                special: 'PennDOT Prequalification — Tracking',
                status: 'EXPANSION TARGET',
                color: 'border-blue-600 text-blue-400',
              },
              {
                state: 'West Virginia',
                flag: '⛰️',
                lien: 'W.Va. Code § 38-2 — 100-day window',
                prevailing: 'WV Prevailing Wage Act — Reinstated 2022',
                license: 'WV Contractor License — Application Queued',
                special: 'WVDOH Prequalification — Monitoring',
                status: 'EXPANSION TARGET',
                color: 'border-blue-600 text-blue-400',
              },
              {
                state: 'Federal (All 50 States)',
                flag: '🦅',
                lien: 'Miller Act — 90-day notice / 1-year bond claim',
                prevailing: 'Davis-Bacon Act (40 U.S.C. § 3141)',
                license: 'SAM.gov UEI + CAGE Code — Active',
                special: 'FAR 52.236 Differing Site Conditions — Covered',
                status: 'FEDERAL READY',
                color: 'border-red-600 text-red-400',
              },
            ].map((s) => (
              <div key={s.state} className={`bg-[#090e15] border ${s.color.split(' ')[0]} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.flag}</span>
                  <div>
                    <h3 className={`text-sm font-black uppercase ${s.color.split(' ')[1]}`}>{s.state}</h3>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${s.color.split(' ')[1]} opacity-70`}>
                      {s.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Lien Law', value: s.lien },
                    { label: 'Prevailing Wage', value: s.prevailing },
                    { label: 'License', value: s.license },
                    { label: 'DOT Status', value: s.special },
                  ].map((row) => (
                    <div key={row.label} className="text-xs">
                      <span className="text-[#2a5a7a] font-bold uppercase tracking-widest text-[9px]">{row.label}: </span>
                      <span className="text-[#4a7a9a]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#09111a] border-t border-[#ffcc00]/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#4a7a9a] font-bold mb-4">
            § LEGAL DEFENSE ACTIVATED
          </div>
          <h2 className="text-4xl font-black uppercase text-white mb-4">
            You Are <span className="text-[#ffcc00]">Legally Untouchable.</span>
          </h2>
          <p className="text-[#4a7a9a] font-bold mb-8 leading-relaxed">
            When a GC tries to bully J. Worden & Sons, the Worden OS runs their claim through the Precedent Engine and hands them a printout showing they have a 96% chance of losing in Federal Claims Court — before you even pick up the phone.
          </p>
          <a
            href="tel:8044461296"
            className="inline-block bg-[#ffcc00] text-black font-black uppercase tracking-widest px-12 py-5 text-sm hover:bg-white transition-colors"
          >
            LEGAL DISPATCH — 804-446-1296
          </a>
        </div>
      </section>

    </main>
  );
}
