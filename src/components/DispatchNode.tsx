import { useState, useEffect } from 'react';
import { Truck, Thermometer, AlertTriangle, CheckCircle, MapPin, Clock, Radio, Navigation, Shield } from 'lucide-react';

interface TruckStatus {
  id: number;
  label: string;
  tempF: number;
  etaMinutes: number;
  status: 'ON_ROUTE' | 'STAGING' | 'UNLOADING' | 'TEMP_WARNING';
  payload: string;
  driver: string;
  lastPing: string;
}

interface RouteWarning {
  id: number;
  type: 'WEIGHT_LIMIT' | 'LOW_BRIDGE' | 'ROAD_CLOSURE' | 'DOT_ZONE';
  road: string;
  detail: string;
  resolved: boolean;
}

const INITIAL_TRUCKS: TruckStatus[] = [
  {
    id: 1,
    label: 'Truck 01 — M415',
    tempF: 310,
    etaMinutes: 14,
    status: 'ON_ROUTE',
    payload: '18 ton SM-9.5A Surface Mix',
    driver: 'R. Worden',
    lastPing: '0:42 ago',
  },
  {
    id: 2,
    label: 'Truck 02 — M416',
    tempF: 295,
    etaMinutes: 22,
    status: 'ON_ROUTE',
    payload: '18 ton SM-9.5A Surface Mix',
    driver: 'T. Hayes',
    lastPing: '1:08 ago',
  },
  {
    id: 3,
    label: 'Truck 03 — T101',
    tempF: 260,
    etaMinutes: 37,
    status: 'TEMP_WARNING',
    payload: 'Tar Tank — SS-1H Tack Coat',
    driver: 'M. Cortez',
    lastPing: '2:14 ago',
  },
  {
    id: 4,
    label: 'Truck 04 — M418',
    tempF: 325,
    etaMinutes: 8,
    status: 'STAGING',
    payload: '18 ton BM-25 Base Mix',
    driver: 'J. Worden III',
    lastPing: '0:15 ago',
  },
];

const ROUTE_WARNINGS: RouteWarning[] = [
  {
    id: 1,
    type: 'WEIGHT_LIMIT',
    road: 'Main St. Bridge — Oak & 3rd',
    detail: 'Route optimized: Avoiding 10-Ton weight restriction. Diverted via I-290 Express.',
    resolved: true,
  },
  {
    id: 2,
    type: 'LOW_BRIDGE',
    road: 'Clearance 12\'4\" — Industrial Blvd underpass',
    detail: 'Route optimized: Dump bed clearance 14\'2\". Diverted via Route 41 North.',
    resolved: true,
  },
  {
    id: 3,
    type: 'DOT_ZONE',
    road: 'DOT Enforcement Zone — Weigh Station Mile 47',
    detail: 'Commercial weigh station active. Trucks 01 & 02 compliant — weight tickets on board.',
    resolved: true,
  },
  {
    id: 4,
    type: 'ROAD_CLOSURE',
    road: 'Construction Closure — W. Madison at Racine',
    detail: 'Partial lane closure reported. Estimated 6-min delay. Trucks rerouted via Ogden Ave.',
    resolved: false,
  },
];

const TEMP_FLOOR = 275;   // ≥275°F: compaction-ready per ASTM D3515 / VDOT Section 315
const TEMP_CRITICAL = 250; // <250°F: mix cannot be compacted — load must be rejected (ASTM D3515)

/** Returns true when a truck requires an alert (TEMP_WARNING status or temperature below laydown floor). */
function hasTemperatureAlert(truck: TruckStatus): boolean {
  return truck.status === 'TEMP_WARNING' || truck.tempF < TEMP_FLOOR;
}

/**
 * Calculates the next temperature tick for a truck based on its status.
 * TEMP_WARNING trucks cool at 1°F/tick; STAGING trucks hold temperature;
 * EN_ROUTE trucks cool gently at 0.3°F/tick (aggregate cab heat retention).
 * Minimum floor is TEMP_CRITICAL - 10 to represent a fully cold load.
 */
function calculateNextTemperature(truck: TruckStatus): number {
  if (truck.status === 'TEMP_WARNING') {
    return Math.max(truck.tempF - 1, TEMP_CRITICAL - 10);
  }
  if (truck.status === 'STAGING') {
    return truck.tempF; // Staging — insulated hold, minimal heat loss
  }
  return Math.max(truck.tempF - 0.3, TEMP_CRITICAL - 10);
}

function getTempColor(tempF: number): string {
  if (tempF >= TEMP_FLOOR) return 'text-emerald-400';
  if (tempF >= TEMP_CRITICAL) return 'text-amber-400';
  return 'text-red-500';
}

function getTempBg(tempF: number): string {
  if (tempF >= TEMP_FLOOR) return 'bg-emerald-400/10 border-emerald-400/30';
  if (tempF >= TEMP_CRITICAL) return 'bg-amber-400/10 border-amber-400/30';
  return 'bg-red-500/10 border-red-500/40';
}

function getStatusBadge(status: TruckStatus['status']): { label: string; className: string } {
  switch (status) {
    case 'ON_ROUTE':
      return { label: 'EN ROUTE', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    case 'STAGING':
      return { label: 'STAGING', className: 'bg-amber-400/20 text-amber-400 border-amber-400/30' };
    case 'UNLOADING':
      return { label: 'UNLOADING', className: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30' };
    case 'TEMP_WARNING':
      return { label: '⚠ TEMP ALERT', className: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' };
  }
}

function getWarningIcon(type: RouteWarning['type']): string {
  switch (type) {
    case 'WEIGHT_LIMIT': return '⚖️';
    case 'LOW_BRIDGE': return '🌉';
    case 'DOT_ZONE': return '🚔';
    case 'ROAD_CLOSURE': return '🚧';
  }
}

export default function DispatchNode() {
  const [trucks, setTrucks] = useState<TruckStatus[]>(INITIAL_TRUCKS);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pulseActive, setPulseActive] = useState(true);

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    const etaTimer = setInterval(() => {
      setTrucks(prev =>
        prev.map(truck => ({
          ...truck,
          etaMinutes: Math.max(0, truck.etaMinutes - 1),
          tempF: calculateNextTemperature(truck),
        }))
      );
    }, 10000);
    return () => clearInterval(etaTimer);
  }, []);

  useEffect(() => {
    const pulseTimer = setInterval(() => setPulseActive(p => !p), 1500);
    return () => clearInterval(pulseTimer);
  }, []);

  const activeAlerts = trucks.filter(hasTemperatureAlert).length;

  return (
    <div className="min-h-screen bg-[#050a0f] text-white font-mono selection:bg-[#ffcc00] selection:text-black">

      {/* HEADER BAR */}
      <div className="border-b border-[#ffcc00]/20 bg-[#050a0f]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className={`w-2.5 h-2.5 rounded-full ${pulseActive ? 'bg-emerald-400' : 'bg-emerald-600'} shadow-[0_0_8px_rgba(52,211,153,0.8)]`} />
            <span className="text-[#ffcc00] font-black uppercase tracking-[0.3em] text-xs">
              Worden Logistics &amp; Dispatch Node
            </span>
            <span className="hidden sm:inline text-zinc-500 text-[10px] uppercase tracking-wider border border-zinc-700 px-2 py-0.5">
              Enterprise — v2.1
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <div className="flex items-center gap-2 text-zinc-400">
              <Radio size={12} className="text-emerald-400" />
              <span>LIVE FEED</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock size={12} />
              <span className="font-mono tabular-nums">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })} CDT
              </span>
            </div>
            {activeAlerts > 0 && (
              <div className="flex items-center gap-2 text-red-400 animate-pulse font-bold">
                <AlertTriangle size={12} />
                <span>{activeAlerts} ALERT{activeAlerts > 1 ? 'S' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">

        {/* ACTIVE JOB SITE */}
        <section>
          <div className="bg-[#0a1520] border border-[#ffcc00]/30 rounded-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={16} className="text-[#ffcc00]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold">Active Job Site</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight leading-none">
                  KFC Big Chicken
                </h1>
                <p className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm mt-1">
                  2000 W. Roosevelt Rd — Chicago, IL 60608
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Phase', value: 'Surface Lift' },
                  { label: 'Spec', value: 'SM-9.5A / 2"' },
                  { label: 'Base', value: 'VDOT Sec 315' },
                  { label: 'Compaction', value: '96% Marshall' },
                ].map(item => (
                  <div key={item.label} className="bg-[#0d1c2e] border border-zinc-700/50 px-4 py-3 text-center">
                    <div className="text-[#ffcc00] font-black text-sm">{item.value}</div>
                    <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase progress bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                <span>Paving Progress — Phase 1 of 3</span>
                <span>62% Complete</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-[#ffcc00] h-2 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* FLEET STATUS */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Truck size={16} className="text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300">Incoming Fleet Status</h2>
            <span className="text-[10px] bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-zinc-400">
              {trucks.length} UNITS TRACKED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {trucks.map(truck => {
              const badge = getStatusBadge(truck.status);
              return (
                <div
                  key={truck.id}
                  className={`bg-[#0a1520] border rounded-sm p-5 flex flex-col gap-4 ${getTempBg(truck.tempF)}`}
                >
                  {/* Truck Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white font-black text-sm uppercase tracking-wide">{truck.label}</div>
                      <div className="text-zinc-500 text-[10px] mt-0.5">{truck.driver}</div>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 border rounded-sm ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Temperature */}
                  <div className="flex items-center gap-3">
                    <Thermometer size={18} className={getTempColor(truck.tempF)} />
                    <div>
                      <div className={`text-2xl font-black tabular-nums ${getTempColor(truck.tempF)}`}>
                        {Math.round(truck.tempF)}°F
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {truck.tempF >= TEMP_FLOOR ? 'Laydown Ready' : truck.tempF >= TEMP_CRITICAL ? 'Monitor' : '⚠ REJECT LOAD'}
                      </div>
                    </div>
                  </div>

                  {/* ETA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Navigation size={12} className="text-blue-400" />
                      <span className="text-[11px] text-zinc-400 uppercase tracking-wider">ETA</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-black text-lg tabular-nums">
                        {truck.etaMinutes}
                      </span>
                      <span className="text-zinc-400 text-xs ml-1">min</span>
                    </div>
                  </div>

                  {/* Payload */}
                  <div className="pt-3 border-t border-zinc-700/40">
                    <div className="text-zinc-400 text-[10px] uppercase tracking-wider mb-1">Payload</div>
                    <div className="text-zinc-200 text-[11px] font-bold">{truck.payload}</div>
                    <div className="text-zinc-600 text-[9px] mt-1">Last ping: {truck.lastPing}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Temperature Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> ≥275°F — Laydown Ready</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> 250–274°F — Monitor</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> &lt;250°F — Reject Load (ASTM D3515)</span>
          </div>
        </section>

        {/* ROUTING MODULE */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={16} className="text-[#ffcc00]" />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300">Commercial Routing — Override Log</h2>
          </div>

          <div className="bg-[#0a1520] border border-zinc-700/40 rounded-sm divide-y divide-zinc-800">
            {ROUTE_WARNINGS.map(warning => (
              <div key={warning.id} className="flex items-start gap-4 p-5">
                <span className="text-2xl mt-0.5 select-none">{getWarningIcon(warning.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-white font-bold text-sm">{warning.road}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border rounded-sm ${
                      warning.resolved
                        ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30'
                        : 'bg-amber-400/10 text-amber-400 border-amber-400/30 animate-pulse'
                    }`}>
                      {warning.resolved ? '✓ RESOLVED' : '⚠ ACTIVE'}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">{warning.detail}</p>
                </div>
                {warning.resolved
                  ? <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  : <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                }
              </div>
            ))}
          </div>
        </section>

        {/* SAAS TIER CALLOUT */}
        <section className="border border-[#ffcc00]/20 bg-[#ffcc00]/5 rounded-sm p-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
              Worden Enterprise Tier — SaaS Module
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">
              Worden Logistics &amp; Dispatch Node
            </h3>
            <p className="text-zinc-400 text-xs max-w-lg leading-relaxed">
              Real-time asphalt fleet management for commercial paving operations. Includes commercial-grade routing
              (weight limits, low bridges, DOT compliance), live asphalt temperature monitoring, and site-arrival
              geofence alerts. Prevents costly rejected loads and downtime.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="text-center">
              <div className="text-3xl font-black text-[#ffcc00]">$999</div>
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider">/ month · Enterprise</div>
            </div>
            <a
              href="/contact"
              className="inline-block bg-[#ffcc00] text-black font-black uppercase tracking-widest text-xs px-6 py-3 hover:bg-white transition-colors"
            >
              License This Module
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
