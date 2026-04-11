import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import RealityEngineNode from '@/components/RealityEngineNode';
import { seasonalityEngine } from '@/utils/seasonalityEngine';
import { Activity, BarChart3, CloudLightning, Cpu, Globe2, Layers, Radio, ShieldAlert, Zap } from 'lucide-react';

export const Route = createFileRoute('/pre-con-dashboard')({
  component: PreConDashboard,
});

const statCards = [
  { label: 'Active Projects', value: '7', sub: 'Virginia + Mid-Atlantic', icon: <Activity className="w-5 h-5 text-[#ffcc00]" /> },
  { label: 'LD Exposure Today', value: '$21,500', sub: 'Across all active sites', icon: <ShieldAlert className="w-5 h-5 text-red-400" /> },
  { label: 'Weather Risk Days', value: '12', sub: 'Next 90-day window', icon: <CloudLightning className="w-5 h-5 text-cyan-400" /> },
  { label: 'Profit Margin', value: '34.2%', sub: 'Current project avg.', icon: <BarChart3 className="w-5 h-5 text-green-400" /> },
];

const phaseNodes = [
  { id: '01', label: 'Visual Recon', desc: 'Satellite imagery · SqFt measurement · Overhead obstruction detection', status: 'LIVE', color: 'border-green-600' },
  { id: '02', label: 'Geotechnical Autopilot', desc: 'USGS soil DB · Expansive clay detection · Base-rock spec upgrade', status: 'LIVE', color: 'border-green-600' },
  { id: '03', label: 'Heavy Civil Intelligence', desc: 'Cut/Fill · Stormwater pitch · Utility clash · MOT flaggers', status: 'LIVE', color: 'border-green-600' },
  { id: '04', label: '90-Day Seasonal Grid', desc: '3-month weather heatmap · Ground temp · Wind shear · Domino-delay engine', status: 'LIVE', color: 'border-green-600' },
  { id: '05', label: '⚡ Reality Engine', desc: 'LD vs. Risk arbitration · Physics-Cheating countermeasures · Schedule crash', status: 'ACTIVE', color: 'border-[#ffcc00]', highlight: true },
  { id: '06', label: 'Legal Interceptor', desc: 'OSHA override blocks · State-specific lien law · Black Box audit log', status: 'LIVE', color: 'border-purple-600' },
];

function PreConDashboard() {
  const weatherAlerts = useMemo(() => seasonalityEngine.runEnvironmentalCheck(), []);

  const hubMeta: Record<string, { city: string; state: string }> = {
    '23836': { city: 'Chester', state: 'VA' },
    '23221': { city: 'Richmond', state: 'VA' },
    '29902': { city: 'Beaufort', state: 'SC' },
    '31401': { city: 'Savannah', state: 'GA' },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* ── HERO COMMAND HEADER ── */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-b border-zinc-900 overflow-hidden">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,204,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]/70">
              Worden OS · God-Mode Pre-Con Dashboard · Command Center
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
            <span className="text-[#ffcc00]">GOD-MODE</span>
            <br />
            <span className="text-white italic">PRE-CON DASHBOARD</span>
          </h1>
          <p className="text-xl text-zinc-400 font-bold max-w-4xl leading-relaxed mb-8">
            The Operating System for American Infrastructure. 4-quadrant command center combining satellite recon, geotechnical autopilot, 90-day meteorological risk, and the Worden Reality Engine arbitration node.
          </p>
          {/* Stat Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  {stat.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                </div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NODE MAP ── */}
      <section className="py-16 px-6 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-5 h-5 text-[#ffcc00]" />
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Dashboard Node Architecture
            </h2>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-green-900/40 text-green-400 border border-green-800 rounded">
              6 / 6 Nodes Online
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {phaseNodes.map((node) => (
              <div
                key={node.id}
                className={`border-l-4 ${node.color} ${node.highlight ? 'bg-[#ffcc00]/5 ring-1 ring-[#ffcc00]/20' : 'bg-zinc-900/40'} rounded-r-xl p-4`}
              >
                <div className="text-[10px] font-black text-zinc-600 mb-1">NODE {node.id}</div>
                <div className={`text-xs font-black uppercase tracking-wide mb-2 ${node.highlight ? 'text-[#ffcc00]' : 'text-white'}`}>
                  {node.label}
                </div>
                <p className="text-[10px] text-zinc-500 font-bold leading-relaxed mb-3">{node.desc}</p>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                  node.status === 'ACTIVE'
                    ? 'bg-[#ffcc00]/20 text-[#ffcc00] border border-[#ffcc00]/40'
                    : node.status === 'LIVE'
                    ? 'bg-green-900/40 text-green-400 border border-green-800'
                    : 'bg-zinc-800 text-zinc-500'
                }`}>
                  ● {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK INTEL STRIP ── */}
      <section className="py-10 px-6 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
              <Layers className="w-6 h-6 text-[#ffcc00] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-black uppercase tracking-wide text-white mb-1">Earthwork Intelligence</h3>
                <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                  Site requires <span className="text-[#ffcc00]">1,200 CY structural fill</span>. Swell factor 15%. Stockpile topsoil on-site. Saves $14,000 in hauling.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
              <Globe2 className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-black uppercase tracking-wide text-white mb-1">Stormwater Analysis</h3>
                <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                  Flat terrain detected (<span className="text-[#ffcc00]">0.5% slope</span>). Forcing 1.5% pitch. Adding 3 Type-C catch basins + 400 LF RCP.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
              <CloudLightning className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-black uppercase tracking-wide text-white mb-1">90-Day Seasonal Risk</h3>
                <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                  <span className="text-[#ffcc00]">12 unworkable mud days</span> projected. Schedule extended from 60 → 72 days. Winter escalation clause triggered if delayed past Day 82.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── REALITY ENGINE NODE ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-[#ffcc00]" />
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                NODE 05 — <span className="text-[#ffcc00]">Worden Reality Engine</span>
              </h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                Must-Complete Risk Assessment · LD vs. Quality Arbitration · Physics-Cheating Countermeasures
              </p>
            </div>
          </div>
          <RealityEngineNode />
        </div>
      </section>

      {/* ── LIVE DOPPLER & ENVIRONMENTAL PREDICTIONS ── */}
      <section className="py-16 px-6 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <Radio className="w-6 h-6 text-[#ffcc00] animate-pulse" />
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                LIVE DOPPLER &amp; <span className="text-[#ffcc00]">ENVIRONMENTAL PREDICTIONS</span>
              </h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                NWS &amp; OpenWeather API v3.0 · Chester · Richmond · Beaufort · Savannah
              </p>
            </div>
            <span className="ml-auto text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-[#ffcc00]/20 text-[#ffcc00] border border-[#ffcc00]/40 rounded">
              ● {seasonalityEngine.status}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* ── Radar Visual ── */}
            <div className="relative bg-[#050c10] border border-cyan-900/50 rounded-2xl overflow-hidden min-h-[320px] flex flex-col items-center justify-center">
              {/* Radar rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[160, 120, 80, 40].map((size) => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-cyan-800/30"
                    style={{ width: size * 2, height: size * 2 }}
                  />
                ))}
                {/* Crosshair lines */}
                <div className="absolute w-full h-px bg-cyan-900/20" />
                <div className="absolute h-full w-px bg-cyan-900/20" />
              </div>

              {/* Rotating sweep */}
              <div
                className="absolute w-[320px] h-[320px] rounded-full overflow-hidden"
                style={{ animation: 'radarSpin 3s linear infinite' }}
              >
                <div
                  className="absolute top-1/2 left-1/2 w-[160px] h-[2px] origin-left"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,204,0,0.9) 0%, rgba(255,204,0,0.1) 60%, transparent 100%)',
                    transformOrigin: '0 50%',
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 w-[160px] h-full origin-top-left"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 270deg, rgba(255,204,0,0.08) 360deg)',
                    transformOrigin: '0 50%',
                  }}
                />
              </div>

              {/* Hub blips */}
              {[
                { label: 'Chester VA', top: '30%', left: '35%', color: 'bg-cyan-400' },
                { label: 'Richmond VA', top: '38%', left: '55%', color: 'bg-[#ffcc00]' },
                { label: 'Beaufort SC', top: '65%', left: '62%', color: 'bg-green-400' },
                { label: 'Savannah GA', top: '72%', left: '45%', color: 'bg-orange-400' },
              ].map((blip) => (
                <div
                  key={blip.label}
                  className="absolute flex flex-col items-center gap-1"
                  style={{ top: blip.top, left: blip.left }}
                >
                  <div className={`w-2 h-2 rounded-full ${blip.color} animate-ping`} style={{ animationDuration: '2s' }} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">{blip.label}</span>
                </div>
              ))}

              {/* Label overlay */}
              <div className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-[0.3em] text-cyan-700">
                JWORDENAI · LIVE DOPPLER
              </div>
              <div className="absolute bottom-4 right-4 text-[9px] font-black uppercase tracking-widest text-zinc-700">
                NWS / NOAA COMPOSITE
              </div>
            </div>

            {/* ── Environmental Alerts ── */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Active Environmental Alerts
                </h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                  {seasonalityEngine.hubs.length} Hubs Monitored
                </span>
              </div>

              {/* Hub status row */}
              <div className="grid grid-cols-2 gap-3">
                {seasonalityEngine.hubs.map((zip) => {
                  const meta = hubMeta[zip] ?? { city: zip, state: '' };
                  return (
                    <div key={zip} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      <div>
                        <div className="text-[10px] font-black uppercase text-white">
                          {meta.city} <span className="text-zinc-500">{meta.state}</span>
                        </div>
                        <div className="text-[9px] text-zinc-600 font-bold">ZIP {zip}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Alerts list */}
              <div className="flex-1 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 space-y-3 min-h-[120px]">
                {weatherAlerts.length === 0 ? (
                  <div className="flex items-center gap-3 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      All Hubs Clear — No Active Weather Alerts
                    </span>
                  </div>
                ) : (
                  weatherAlerts.map((alert, i) => {
                    const isRain = alert.toLowerCase().includes('rain') || alert.toLowerCase().includes('sealcoating');
                    return (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${isRain ? 'bg-cyan-900/20 border-cyan-800/40' : 'bg-[#ffcc00]/5 border-[#ffcc00]/20'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${isRain ? 'bg-cyan-400' : 'bg-[#ffcc00]'} animate-pulse`} />
                        <span className={`text-[10px] font-black uppercase tracking-wide leading-relaxed ${isRain ? 'text-cyan-300' : 'text-[#ffcc00]'}`}>
                          {alert}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Engine status bar */}
              <div className="bg-black border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                  JWORDENAI Seasonality Engine
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#ffcc00]">
                    {seasonalityEngine.status}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER BRAND ── */}
      <section className="py-12 px-6 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[#ffcc00] font-black uppercase tracking-[0.3em] text-sm mb-1">
              J. Worden &amp; Sons Paving &amp; General Contracting
            </div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              4th Generation · Est. 1984 · Virginia Class A Contractor · 96% Marshall Std.
            </div>
          </div>
          <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest text-center md:text-right">
            Worden OS — God-Mode Pre-Con Dashboard v3.0
            <br />
            VDOT Section 315 · ASTM C270 · FM Global · ACI 318 · OSHA 1926
          </div>
        </div>
      </section>

    </main>
  );
}
