import { useEffect, useState } from 'react';

/**
 * Initial page-load curtain.
 * Holds the entire viewport pure black for a beat after first paint, then
 * fades out over 1.6s — so the very first section appears to dawn from black
 * the moment the user lands. Subsequent sections take over with their own
 * SectionBackdrop fade as the user scrolls.
 */
const HOLD_MS = 1000;
const FADE_MS = 1600;

export function PageLoadCurtain() {
  const [opacity, setOpacity] = useState(1);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t1 = window.setTimeout(() => setOpacity(0), HOLD_MS);
    const t2 = window.setTimeout(() => setMounted(false), HOLD_MS + FADE_MS + 50);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] bg-[#050507]"
      style={{
        opacity,
        transition: `opacity ${FADE_MS}ms cubic-bezier(.22,1,.36,1)`,
        willChange: 'opacity',
      }}
    />
  );
}

export default PageLoadCurtain;
