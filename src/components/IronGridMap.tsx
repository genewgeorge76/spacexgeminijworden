import { useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface JobNode {
  id: string;
  state: string;
  x: number;
  y: number;
  type: 'gold' | 'amber' | 'red';
  label: string;
  cfoCfoMath?: {
    client: string;
    sqFt: number;
    tons: number;
    margin: string;
    profit: string;
  };
}

// ── US State Dot Positions (SVG 800×480 viewport) ────────────────────────────
const STATE_DOTS: { abbr: string; x: number; y: number }[] = [
  { abbr: 'WA', x: 78, y: 60 },
  { abbr: 'OR', x: 74, y: 100 },
  { abbr: 'CA', x: 68, y: 170 },
  { abbr: 'NV', x: 95, y: 145 },
  { abbr: 'ID', x: 115, y: 90 },
  { abbr: 'MT', x: 148, y: 65 },
  { abbr: 'WY', x: 168, y: 105 },
  { abbr: 'UT', x: 132, y: 145 },
  { abbr: 'AZ', x: 130, y: 195 },
  { abbr: 'CO', x: 178, y: 155 },
  { abbr: 'NM', x: 170, y: 200 },
  { abbr: 'ND', x: 230, y: 62 },
  { abbr: 'SD', x: 235, y: 90 },
  { abbr: 'NE', x: 238, y: 118 },
  { abbr: 'KS', x: 248, y: 148 },
  { abbr: 'OK', x: 260, y: 178 },
  { abbr: 'TX', x: 255, y: 228 },
  { abbr: 'MN', x: 295, y: 68 },
  { abbr: 'IA', x: 305, y: 112 },
  { abbr: 'MO', x: 315, y: 148 },
  { abbr: 'AR', x: 318, y: 182 },
  { abbr: 'LA', x: 325, y: 222 },
  { abbr: 'WI', x: 338, y: 82 },
  { abbr: 'IL', x: 342, y: 128 },
  { abbr: 'MS', x: 348, y: 205 },
  { abbr: 'MI', x: 370, y: 85 },
  { abbr: 'IN', x: 368, y: 128 },
  { abbr: 'TN', x: 380, y: 178 },
  { abbr: 'AL', x: 378, y: 208 },
  { abbr: 'OH', x: 400, y: 118 },
  { abbr: 'KY', x: 398, y: 158 },
  { abbr: 'GA', x: 408, y: 210 },
  { abbr: 'FL', x: 415, y: 260 },
  { abbr: 'WV', x: 428, y: 142 },
  { abbr: 'VA', x: 448, y: 155 },
  { abbr: 'NC', x: 452, y: 178 },
  { abbr: 'SC', x: 448, y: 200 },
  { abbr: 'PA', x: 450, y: 115 },
  { abbr: 'NY', x: 468, y: 92 },
  { abbr: 'MD', x: 468, y: 138 },
  { abbr: 'DE', x: 478, y: 128 },
  { abbr: 'NJ', x: 482, y: 115 },
  { abbr: 'CT', x: 494, y: 100 },
  { abbr: 'RI', x: 502, y: 100 },
  { abbr: 'MA', x: 498, y: 88 },
  { abbr: 'VT', x: 492, y: 75 },
  { abbr: 'NH', x: 502, y: 75 },
  { abbr: 'ME', x: 514, y: 65 },
];

// ── War Room Job Nodes ────────────────────────────────────────────────────────
const JOB_NODES: JobNode[] = [
  {
    id: 'va-1',
    state: 'VA',
    x: 448,
    y: 155,
    type: 'gold',
    label: 'Richmond Corridor',
    cfoCfoMath: {
      client: 'K-VA-T Food Stores — VA',
      sqFt: 38000,
      tons: 370,
      margin: '35%',
      profit: '$12,800',
    },
  },
  {
    id: 'nc-1',
    state: 'NC',
    x: 452,
    y: 178,
    type: 'gold',
    label: 'Charlotte Metro',
    cfoCfoMath: {
      client: 'Plaza Street Partners — NC',
      sqFt: 28500,
      tons: 278,
      margin: '35%',
      profit: '$9,650',
    },
  },
  {
    id: 'tx-1',
    state: 'TX',
    x: 255,
    y: 228,
    type: 'gold',
    label: 'Dallas Expansion',
    cfoCfoMath: {
      client: 'Plaza Street Partners — TX',
      sqFt: 42000,
      tons: 410,
      margin: '35%',
      profit: '$14,500',
    },
  },
  // Amber plant pulse nodes near active job zones
  {
    id: 'va-plant',
    state: 'VA',
    x: 438,
    y: 148,
    type: 'amber',
    label: 'Mauldin Plant — Richmond',
  },
  {
    id: 'nc-plant',
    state: 'NC',
    x: 462,
    y: 185,
    type: 'amber',
    label: 'Vulcan Plant — Charlotte',
  },
  {
    id: 'tx-plant',
    state: 'TX',
    x: 245,
    y: 235,
    type: 'amber',
    label: 'Martin Marietta — Dallas',
  },
  // Red Ghost Protocol bid nodes
  {
    id: 'fl-ghost',
    state: 'FL',
    x: 415,
    y: 260,
    type: 'red',
    label: 'Ghost Protocol Active — FL',
  },
  {
    id: 'oh-ghost',
    state: 'OH',
    x: 400,
    y: 118,
    type: 'red',
    label: 'Ghost Protocol Active — OH',
  },
  {
    id: 'ga-ghost',
    state: 'GA',
    x: 408,
    y: 210,
    type: 'red',
    label: 'Ghost Protocol Dispatch — GA',
  },
];

// ── Animated Laser Lines between Ghost nodes and HQ ──────────────────────────
const HQ = { x: 448, y: 155 }; // VA HQ
const GHOST_LINES = [
  { id: 'fl-line', x1: HQ.x, y1: HQ.y, x2: 415, y2: 260 },
  { id: 'oh-line', x1: HQ.x, y1: HQ.y, x2: 400, y2: 118 },
  { id: 'ga-line', x1: HQ.x, y1: HQ.y, x2: 408, y2: 210 },
];

// ── Popover Component ─────────────────────────────────────────────────────────
function JobPopover({ node, onClose }: { node: JobNode; onClose: () => void }) {
  const math = node.cfoCfoMath;
  if (!math) return null;

  // Position popover intelligently — shift left if near right edge
  const popLeft = node.x > 380 ? node.x - 220 : node.x + 18;
  const popTop = node.y - 50;

  return (
    <g>
      {/* Backdrop */}
      <rect
        x={popLeft}
        y={popTop}
        width={210}
        height={130}
        rx={6}
        fill="rgba(9,9,11,0.96)"
        stroke="#ffcc00"
        strokeWidth={1}
        filter="url(#glow-gold)"
      />
      {/* Header bar */}
      <rect x={popLeft} y={popTop} width={210} height={22} rx={6} fill="#ffcc00" />
      <text x={popLeft + 8} y={popTop + 14} fill="black" fontSize={8} fontWeight="900" textAnchor="start" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        {node.label.toUpperCase()} · ACTIVE JOB
      </text>
      {/* Close button */}
      <text
        x={popLeft + 196}
        y={popTop + 14}
        fill="black"
        fontSize={9}
        fontWeight="900"
        style={{ cursor: 'pointer' }}
        onClick={onClose}
      >
        ✕
      </text>
      {/* Body content */}
      <text x={popLeft + 8} y={popTop + 38} fill="#aaa" fontSize={7} fontWeight="bold">CLIENT</text>
      <text x={popLeft + 8} y={popTop + 48} fill="white" fontSize={8} fontWeight="900">{math.client}</text>

      <text x={popLeft + 8} y={popTop + 63} fill="#aaa" fontSize={7} fontWeight="bold">SQ FT</text>
      <text x={popLeft + 55} y={popTop + 63} fill="#aaa" fontSize={7} fontWeight="bold">TONS</text>
      <text x={popLeft + 105} y={popTop + 63} fill="#aaa" fontSize={7} fontWeight="bold">MARGIN</text>
      <text x={popLeft + 158} y={popTop + 63} fill="#aaa" fontSize={7} fontWeight="bold">PROFIT</text>

      <text x={popLeft + 8} y={popTop + 75} fill="#ffcc00" fontSize={9} fontWeight="900">{math.sqFt.toLocaleString()}</text>
      <text x={popLeft + 55} y={popTop + 75} fill="#ffcc00" fontSize={9} fontWeight="900">{math.tons}</text>
      <text x={popLeft + 105} y={popTop + 75} fill="#22c55e" fontSize={9} fontWeight="900">{math.margin}</text>
      <text x={popLeft + 158} y={popTop + 75} fill="#22c55e" fontSize={9} fontWeight="900">{math.profit}</text>

      <rect x={popLeft + 8} y={popTop + 86} width={194} height={1} fill="#333" />

      <text x={popLeft + 8} y={popTop + 98} fill="#555" fontSize={6.5} fontWeight="bold">96% MARSHALL · VDOT SEC 315 · $9/TON SHIELD</text>
      <text x={popLeft + 8} y={popTop + 110} fill="#ffcc00" fontSize={6.5} fontWeight="bold">J. WORDEN &amp; SONS · 4TH GEN · EST. 1984</text>
      <text x={popLeft + 8} y={popTop + 122} fill="#22c55e" fontSize={6.5} fontWeight="bold">STATUS: CREW DEPLOYED · VDOT COMPLIANT</text>
    </g>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function IronGridMap() {
  const [activeNode, setActiveNode] = useState<JobNode | null>(null);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden relative"
      style={{ boxShadow: '0 0 40px rgba(255,204,0,0.08), inset 0 0 60px rgba(0,0,0,0.6)' }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/60 bg-black/60">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]">
            THE IRON GRID — 50-STATE WAR ROOM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#ffcc00]/70">3 Active Crews</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" style={{ boxShadow: '0 0 6px #f59e0b' }} />
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-400/70">3 Plant Links</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-red-400/70">3 Ghost Bids Active</span>
          </div>
        </div>
      </div>

      {/* SVG Map */}
      <div className="relative w-full" style={{ paddingBottom: '60%' }}>
        <svg
          viewBox="0 0 545 328"
          className="absolute inset-0 w-full h-full"
          style={{ background: 'transparent' }}
          aria-label="Iron Grid 50-State War Room Map"
        >
          <defs>
            {/* Gold glow filter */}
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Amber glow filter */}
            <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Red glow filter */}
            <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Red dashed line animation */}
            <style>{`
              @keyframes dashMove {
                from { stroke-dashoffset: 24; }
                to   { stroke-dashoffset: 0; }
              }
              @keyframes goldPulse {
                0%, 100% { r: 5; opacity: 1; }
                50% { r: 9; opacity: 0.3; }
              }
              @keyframes amberGlow {
                0%, 100% { opacity: 0.9; }
                50% { opacity: 0.4; }
              }
              @keyframes redFlash {
                0%, 100% { r: 4; opacity: 1; }
                50% { r: 7; opacity: 0.25; }
              }
              .gold-pulse-outer { animation: goldPulse 1.8s ease-in-out infinite; }
              .amber-glow { animation: amberGlow 2.2s ease-in-out infinite; }
              .red-flash { animation: redFlash 1.2s ease-in-out infinite; }
              .laser-line { animation: dashMove 0.6s linear infinite; }
            `}</style>
          </defs>

          {/* ── Dark map background ── */}
          <rect width="545" height="328" fill="#09090b" />

          {/* Grid lines */}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0} y1={i * 32} x2={545} y2={i * 32}
              stroke="rgba(255,204,0,0.04)"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 32} y1={0} x2={i * 32} y2={328}
              stroke="rgba(255,204,0,0.04)"
              strokeWidth={0.5}
            />
          ))}

          {/* Subtle diagonal scan line */}
          <line x1={0} y1={0} x2={545} y2={328} stroke="rgba(255,204,0,0.02)" strokeWidth={60} />

          {/* ── All state dots (background grid nodes) ── */}
          {STATE_DOTS.map((s) => {
            const isActiveNode = JOB_NODES.some((n) => n.state === s.abbr && n.type !== 'amber');
            if (isActiveNode) return null; // rendered separately
            return (
              <g key={s.abbr}>
                <circle cx={s.x} cy={s.y} r={2.5} fill="rgba(255,255,255,0.08)" />
                <text
                  x={s.x}
                  y={s.y + 8}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.18)"
                  fontSize={5}
                  fontWeight="bold"
                >
                  {s.abbr}
                </text>
              </g>
            );
          })}

          {/* ── Ghost Protocol laser lines (red animated dashes) ── */}
          {GHOST_LINES.map((line) => (
            <line
              key={line.id}
              className="laser-line"
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(239,68,68,0.7)"
              strokeWidth={1}
              strokeDasharray="6 6"
              filter="url(#glow-red)"
            />
          ))}

          {/* ── Amber Plant Pulse Nodes ── */}
          {JOB_NODES.filter((n) => n.type === 'amber').map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill="rgba(245,158,11,0.15)"
                stroke="#f59e0b"
                strokeWidth={1}
                className="amber-glow"
              />
              <circle cx={node.x} cy={node.y} r={2.5} fill="#f59e0b" filter="url(#glow-amber)" />
              <text
                x={node.x}
                y={node.y - 10}
                textAnchor="middle"
                fill="rgba(245,158,11,0.8)"
                fontSize={5}
                fontWeight="bold"
              >
                ⬡ PLANT
              </text>
            </g>
          ))}

          {/* ── Red Ghost Protocol Bid Nodes ── */}
          {JOB_NODES.filter((n) => n.type === 'red').map((node) => (
            <g key={node.id}>
              {/* Outer pulse ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r={8}
                fill="rgba(239,68,68,0.1)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth={1}
                className="red-flash"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={4}
                fill="rgba(239,68,68,0.8)"
                filter="url(#glow-red)"
              />
              <text
                x={node.x}
                y={node.y - 12}
                textAnchor="middle"
                fill="rgba(239,68,68,0.9)"
                fontSize={5.5}
                fontWeight="900"
                letterSpacing={0.5}
              >
                ◉ GHOST
              </text>
            </g>
          ))}

          {/* ── Gold Active Job Nodes (clickable) ── */}
          {JOB_NODES.filter((n) => n.type === 'gold').map((node) => {
            const isActive = activeNode?.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(isActive ? null : node)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer pulse ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={12}
                  fill="rgba(255,204,0,0.08)"
                  stroke="rgba(255,204,0,0.3)"
                  strokeWidth={1}
                  className="gold-pulse-outer"
                />
                {/* Inner glow */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={5}
                  fill={isActive ? '#fff' : '#ffcc00'}
                  filter="url(#glow-gold)"
                />
                {/* State label */}
                <text
                  x={node.x}
                  y={node.y - 16}
                  textAnchor="middle"
                  fill="#ffcc00"
                  fontSize={6.5}
                  fontWeight="900"
                >
                  ★ {node.state}
                </text>
                <text
                  x={node.x}
                  y={node.y + 20}
                  textAnchor="middle"
                  fill="rgba(255,204,0,0.6)"
                  fontSize={5}
                  fontWeight="bold"
                >
                  {node.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* ── Active Popover ── */}
          {activeNode?.type === 'gold' && (
            <JobPopover node={activeNode} onClose={() => setActiveNode(null)} />
          )}

          {/* ── HQ Marker (Richmond, VA) ── */}
          <g>
            <rect x={HQ.x - 18} y={HQ.y + 8} width={36} height={9} rx={2} fill="rgba(255,204,0,0.15)" stroke="rgba(255,204,0,0.3)" strokeWidth={0.5} />
            <text x={HQ.x} y={HQ.y + 15} textAnchor="middle" fill="#ffcc00" fontSize={5.5} fontWeight="900">HQ · RVA</text>
          </g>

          {/* ── Legend ── */}
          <g transform="translate(8, 280)">
            <rect width={210} height={40} rx={4} fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
            <circle cx={12} cy={11} r={4} fill="#ffcc00" filter="url(#glow-gold)" />
            <text x={20} y={14} fill="#ffcc00" fontSize={6} fontWeight="900">ACTIVE CREW</text>
            <circle cx={82} cy={11} r={3} fill="#f59e0b" filter="url(#glow-amber)" />
            <text x={90} y={14} fill="#f59e0b" fontSize={6} fontWeight="900">PLANT LINK</text>
            <circle cx={148} cy={11} r={3} fill="#ef4444" filter="url(#glow-red)" />
            <text x={156} y={14} fill="#ef4444" fontSize={6} fontWeight="900">GHOST BID</text>
            <text x={8} y={30} fill="rgba(255,204,0,0.4)" fontSize={5.5} fontWeight="bold">TAP GOLD NODE FOR CFO MATH · J. WORDEN &amp; SONS · EST. 1984</text>
          </g>

          {/* ── Scan sweep effect ── */}
          <g opacity={0.04}>
            <circle cx={HQ.x} cy={HQ.y} r={200} fill="none" stroke="#ffcc00" strokeWidth={0.5} />
            <circle cx={HQ.x} cy={HQ.y} r={150} fill="none" stroke="#ffcc00" strokeWidth={0.5} />
            <circle cx={HQ.x} cy={HQ.y} r={100} fill="none" stroke="#ffcc00" strokeWidth={0.5} />
            <circle cx={HQ.x} cy={HQ.y} r={50} fill="none" stroke="#ffcc00" strokeWidth={0.5} />
          </g>
        </svg>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-5 py-2 border-t border-zinc-800/60 bg-black/40">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">JWORDENAI v4</span>
          <span className="text-[9px] font-bold text-zinc-700">VDOT SEC 315 · AASHTO T245 · $9/TON SHIELD</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#ffcc00]/40">
          50-STATE COVERAGE INITIATED
        </span>
      </div>
    </div>
  );
}
