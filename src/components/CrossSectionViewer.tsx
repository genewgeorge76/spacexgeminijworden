/**
 * CrossSectionViewer — SVG-based 3D cross-section of the Worden Standard pavement structure.
 * Shows: Subgrade → 6" VDOT Stone Base → BM-25.0 Binder → SM-9.5A Surface
 * Annotated with spec references per GEMINI.md requirements.
 */

interface CrossSectionViewerProps {
  surfaceDepthIn: number;
  includeBase: boolean;
  includeSeal: boolean;
}

interface Layer {
  label: string;
  spec: string;
  depth: string;
  color: string;
  pattern?: string;
}

export default function CrossSectionViewer({
  surfaceDepthIn,
  includeBase,
  includeSeal,
}: CrossSectionViewerProps) {
  const layers: Layer[] = [];

  if (includeSeal) {
    layers.push({
      label: 'Sealcoat (Double Coat)',
      spec: 'ASTM D2939 · Neyra Emulsion',
      depth: '⅛"',
      color: '#1a1a2e',
    });
  }

  layers.push({
    label: `SM-9.5A Surface Course`,
    spec: 'VDOT Section 315 · 96% Marshall',
    depth: `${surfaceDepthIn}"`,
    color: '#2d2d2d',
  });

  layers.push({
    label: 'BM-25.0 Intermediate Lift',
    spec: 'VDOT Section 315',
    depth: '3"',
    color: '#3a3a3a',
  });

  if (includeBase) {
    layers.push({
      label: '21A Crusher Run Stone Base',
      spec: 'VDOT Section 303 · Sovereign Standard',
      depth: '6"',
      color: '#5a5a5a',
      pattern: 'stone',
    });
  }

  layers.push({
    label: 'Compacted Subgrade',
    spec: 'AASHTO T99/T180 · 96% Proctor Min.',
    depth: 'Native',
    color: '#6b5b3e',
    pattern: 'earth',
  });

  const layerHeight = 60;
  const totalHeight = layers.length * layerHeight + 40;
  const svgWidth = 600;
  const crossSectionWidth = 420;
  const startX = 30;

  return (
    <div className="bg-zinc-900 border border-zinc-700 overflow-hidden">
      <div className="bg-[#ffcc00] text-black px-4 py-2">
        <h4 className="font-black uppercase text-xs tracking-widest">
          Pavement Cross-Section — Worden Standard
        </h4>
      </div>

      <div className="p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${totalHeight}`}
          className="w-full max-w-[600px] mx-auto"
          role="img"
          aria-label="Worden Standard pavement cross-section diagram"
        >
          <defs>
            {/* Stone pattern */}
            <pattern id="stonePattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#5a5a5a" />
              <circle cx="5" cy="5" r="3" fill="#7a7a7a" opacity="0.5" />
              <circle cx="15" cy="12" r="4" fill="#6a6a6a" opacity="0.4" />
              <circle cx="10" cy="18" r="2" fill="#8a8a8a" opacity="0.3" />
            </pattern>
            {/* Earth pattern */}
            <pattern id="earthPattern" patternUnits="userSpaceOnUse" width="30" height="15">
              <rect width="30" height="15" fill="#6b5b3e" />
              <line x1="0" y1="5" x2="10" y2="5" stroke="#7d6b4e" strokeWidth="1" opacity="0.4" />
              <line x1="15" y1="10" x2="28" y2="10" stroke="#7d6b4e" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>

          {/* Title */}
          <text x={svgWidth / 2} y="20" textAnchor="middle" fill="#ffcc00" fontSize="11" fontWeight="bold" fontFamily="monospace">
            ▼ WORDEN STANDARD CROSS-SECTION ▼
          </text>

          {/* Layers */}
          {layers.map((layer, i) => {
            const y = 30 + i * layerHeight;
            const fill = layer.pattern === 'stone'
              ? 'url(#stonePattern)'
              : layer.pattern === 'earth'
                ? 'url(#earthPattern)'
                : layer.color;

            return (
              <g key={i}>
                {/* Layer shape — trapezoidal for 3D effect */}
                <polygon
                  points={`
                    ${startX + i * 3},${y}
                    ${startX + crossSectionWidth - i * 3},${y}
                    ${startX + crossSectionWidth - (i + 1) * 3},${y + layerHeight}
                    ${startX + (i + 1) * 3},${y + layerHeight}
                  `}
                  fill={fill}
                  stroke="#ffcc00"
                  strokeWidth="0.5"
                  opacity="0.9"
                />

                {/* Layer label */}
                <text
                  x={startX + crossSectionWidth / 2}
                  y={y + 24}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {layer.label}
                </text>

                {/* Spec reference */}
                <text
                  x={startX + crossSectionWidth / 2}
                  y={y + 38}
                  textAnchor="middle"
                  fill="#aaa"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {layer.spec}
                </text>

                {/* Depth label on the right */}
                <text
                  x={startX + crossSectionWidth + 20}
                  y={y + layerHeight / 2 + 4}
                  fill="#ffcc00"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {layer.depth}
                </text>

                {/* Depth dimension line */}
                <line
                  x1={startX + crossSectionWidth + 10}
                  y1={y + 4}
                  x2={startX + crossSectionWidth + 10}
                  y2={y + layerHeight - 4}
                  stroke="#ffcc00"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1={startX + crossSectionWidth + 7}
                  y1={y + 4}
                  x2={startX + crossSectionWidth + 13}
                  y2={y + 4}
                  stroke="#ffcc00"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1={startX + crossSectionWidth + 7}
                  y1={y + layerHeight - 4}
                  x2={startX + crossSectionWidth + 13}
                  y2={y + layerHeight - 4}
                  stroke="#ffcc00"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="px-4 pb-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#2d2d2d] border border-zinc-600 inline-block" />
          <span className="text-zinc-500 uppercase font-bold tracking-wider">Surface</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#3a3a3a] border border-zinc-600 inline-block" />
          <span className="text-zinc-500 uppercase font-bold tracking-wider">Binder</span>
        </div>
        {includeBase && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#5a5a5a] border border-zinc-600 inline-block" />
            <span className="text-zinc-500 uppercase font-bold tracking-wider">Stone Base</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#6b5b3e] border border-zinc-600 inline-block" />
          <span className="text-zinc-500 uppercase font-bold tracking-wider">Subgrade</span>
        </div>
      </div>
    </div>
  );
}
