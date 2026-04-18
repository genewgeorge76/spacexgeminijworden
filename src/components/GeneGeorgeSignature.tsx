import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Gene W. George — scroll-driven signed-in-gold-ink signature.
 *
 * Renders the name and a flourish as SVG paths. As the element scrolls into
 * view — specifically as the user reaches the six-inch mandate section — a
 * gold nib travels along the strokes, and the stroke-dashoffset unwinds so
 * the signature appears to be signed live on the page.
 */
export default function GeneGeorgeSignature({ style }: { style?: CSSProperties } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const calc = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Start drawing when top of signature hits 85% of viewport, done at 35%.
      const start = vh * 0.85;
      const end = vh * 0.35;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        calc();
      });
    };
    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Calligraphic path for "Gene W. George" — hand-authored in a 900x220 box.
  const namePath =
    'M 30 140 C 45 95, 90 80, 110 110 C 125 135, 95 170, 70 165 C 45 160, 45 120, 70 110 ' +
    'M 140 150 C 160 105, 200 105, 210 140 C 200 165, 160 160, 150 150 L 215 150 ' +
    'M 240 150 C 260 105, 300 105, 310 140 C 300 165, 260 160, 250 150 L 310 150 ' +
    'M 330 110 L 340 170 C 340 180, 335 195, 345 192 ' +
    'M 360 160 L 390 85 L 420 160 L 450 85 L 480 160 ' +
    'M 505 140 C 520 100, 560 100, 565 140 C 560 175, 520 175, 500 150 ' +
    'C 505 185, 555 200, 580 170 ' +
    'M 600 150 C 620 105, 660 105, 670 140 C 660 165, 620 160, 610 150 L 670 150 ' +
    'M 695 85 C 705 85, 715 85, 720 115 L 730 175 L 740 115 L 755 180 L 770 115 L 780 175 ' +
    'M 810 150 C 830 105, 870 105, 880 140 C 870 170, 830 168, 820 155';

  // Under-flourish path
  const flourishPath =
    'M 20 196 C 80 210, 220 180, 340 200 C 480 224, 640 178, 820 202 C 855 206, 880 200, 890 190';

  // Signature nib position, tracing the approximate centerline of the name.
  // Five control points give a smooth x/y along the signature.
  const nibTrack = [
    { x: 60, y: 135 },
    { x: 175, y: 130 },
    { x: 270, y: 130 },
    { x: 345, y: 150 },
    { x: 420, y: 120 },
    { x: 530, y: 140 },
    { x: 630, y: 135 },
    { x: 745, y: 140 },
    { x: 850, y: 135 },
    { x: 890, y: 195 },
  ];
  const tIdx = Math.min(progress * (nibTrack.length - 1), nibTrack.length - 1.0001);
  const i = Math.floor(tIdx);
  const frac = tIdx - i;
  const from = nibTrack[i]!;
  const to = nibTrack[i + 1] ?? from;
  const nibX = from.x + (to.x - from.x) * frac;
  const nibY = from.y + (to.y - from.y) * frac;

  return (
    <div
      ref={ref}
      className="gw-signature"
      style={{
        width: '100%',
        ['--sig-progress' as string]: progress.toFixed(3),
        ...style,
      }}
      aria-label="Gene W. George — signed guarantee"
    >
      <svg viewBox="0 0 900 230" width="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="gw-ink-gradient" x1="0%" y1="0%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#f6d97a" />
            <stop offset="45%" stopColor="#d4a844" />
            <stop offset="100%" stopColor="#8c6a1f" />
          </linearGradient>
          <radialGradient id="gw-nib-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff4c2" />
            <stop offset="60%" stopColor="#f6d97a" />
            <stop offset="100%" stopColor="#8c6a1f" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <path
          d={namePath}
          className="ink"
          style={{ ['--sig-length' as string]: '2600' } as CSSProperties}
        />
        <path
          d={flourishPath}
          className="sig-flourish"
          style={{ ['--flourish-length' as string]: '1100' } as CSSProperties}
        />

        {/* Travelling gold nib */}
        <g className="sig-nib" transform={`translate(${nibX} ${nibY})`}>
          <circle r="9" fill="url(#gw-nib-gradient)" />
          <circle r="3.5" fill="#fff8dc" />
        </g>
      </svg>
    </div>
  );
}
