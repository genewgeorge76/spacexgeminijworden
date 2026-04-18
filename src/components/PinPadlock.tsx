/**
 * PinPadlock — tactile, dark-themed numerical PIN pad.
 *
 * Gates the /sovereign-command master remote. Four-digit code, haptic
 * feedback on supported devices, mobile-first single-column layout.
 *
 * The PIN is intentionally a client-side UX gate against casual access to
 * the command surface. It is not a secret and must not guard sensitive data.
 * Server-side authorization still applies to any endpoints the cockpit calls.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';

const PVD_GOLD = '#F6D97A';
const PVD_GOLD_CORE = '#D4A844';
const PVD_GOLD_DEEP = '#8C6A1F';
const IVORY = '#f6f6f4';
const STEEL_MID = '#8a8a8a';

export interface PinPadlockProps {
  /** Four-digit master code. Defaults to the 1984 founding year. */
  masterCode?: string;
  onUnlock: () => void;
}

function haptic(ms: number) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { navigator.vibrate(ms); } catch { /* ignore */ }
  }
}

export default function PinPadlock({ masterCode = '1984', onUnlock }: PinPadlockProps) {
  const [pin, setPin] = useState<string>('');
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const length = masterCode.length;

  const submit = useCallback(
    (candidate: string) => {
      if (candidate === masterCode) {
        haptic([18, 40, 18]);
        onUnlock();
      } else {
        haptic([60, 40, 60]);
        setShake(true);
        setAttempts((a) => a + 1);
        setTimeout(() => {
          setShake(false);
          setPin('');
        }, 420);
      }
    },
    [masterCode, onUnlock],
  );

  const press = useCallback(
    (digit: string) => {
      haptic(14);
      setPin((prev) => {
        if (prev.length >= length) return prev;
        const next = prev + digit;
        if (next.length === length) {
          // Defer so the last digit paints before validation runs.
          setTimeout(() => submit(next), 140);
        }
        return next;
      });
    },
    [length, submit],
  );

  const clear = useCallback(() => {
    haptic(22);
    setPin('');
  }, []);

  const backspace = useCallback(() => {
    haptic(14);
    setPin((p) => p.slice(0, -1));
  }, []);

  // Keyboard support for desktop / BT keyboard pairing scenarios.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') backspace();
      else if (e.key === 'Escape') clear();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [press, backspace, clear]);

  const dots: CSSProperties[] = Array.from({ length }, (_, i) => ({
    width: 22,
    height: 22,
    borderRadius: '50%',
    border: `1.5px solid ${i < pin.length ? PVD_GOLD : 'rgba(246,217,122,0.25)'}`,
    background: i < pin.length ? PVD_GOLD : 'transparent',
    boxShadow: i < pin.length ? '0 0 14px rgba(246,217,122,0.65)' : 'none',
    transition: 'background 160ms ease, box-shadow 180ms ease, border-color 180ms ease',
  }));

  return (
    <div style={styles.shell}>
      <div style={styles.grid} aria-hidden="true" />

      <div style={styles.inner}>
        <div style={styles.eyebrow}>● SOVEREIGN ACCESS · RESTRICTED</div>
        <h1 style={styles.title} className="pvd-gold-text">
          MASTER REMOTE LOCK
        </h1>
        <p style={styles.lede}>
          Authorized personnel only. Enter the {length}-digit Sovereign Authority code to
          unlock the command cockpit.
        </p>

        <div
          style={{
            ...styles.dotRow,
            transform: shake ? 'translateX(0)' : 'none',
            animation: shake ? 'jw-pinshake 380ms cubic-bezier(.36,.07,.19,.97)' : 'none',
          }}
        >
          {dots.map((s, i) => (
            <span key={i} style={s} />
          ))}
        </div>

        {attempts > 0 && !shake && (
          <div style={styles.attempts}>
            ● {attempts} incorrect attempt{attempts === 1 ? '' : 's'} — recheck the code
          </div>
        )}

        <div style={styles.pad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <PadKey key={n} label={String(n)} onPress={() => press(String(n))} />
          ))}
          <PadKey label="CLR" onPress={clear} mono />
          <PadKey label="0" onPress={() => press('0')} />
          <PadKey label="⌫" onPress={backspace} mono />
        </div>

        <div style={styles.footnote}>
          ● 4-GEN LEGACY · EST. 1984 · CHESTER COMMAND
        </div>
      </div>

      <style>{`
        @keyframes jw-pinshake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

function PadKey({
  label,
  onPress,
  mono = false,
}: {
  label: string;
  onPress: () => void;
  mono?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onClick={onPress}
      aria-label={label === '⌫' ? 'Backspace' : label === 'CLR' ? 'Clear entry' : `Digit ${label}`}
      style={{
        WebkitTapHighlightColor: 'transparent',
        minHeight: 74,
        padding: '18px 12px',
        borderRadius: 18,
        border: '1px solid rgba(246,217,122,0.22)',
        background: pressed
          ? 'linear-gradient(160deg, rgba(246,217,122,0.22) 0%, rgba(12,12,14,0.9) 100%)'
          : 'linear-gradient(160deg, rgba(46,46,52,0.7) 0%, rgba(14,14,18,0.85) 55%, rgba(6,6,10,0.9) 100%)',
        color: mono ? STEEL_MID : IVORY,
        fontSize: mono ? 14 : 30,
        fontWeight: mono ? 800 : 600,
        letterSpacing: mono ? '2px' : '-0.5px',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: pressed
          ? 'inset 0 2px 6px rgba(0,0,0,0.7), 0 0 0 1px rgba(246,217,122,0.4)'
          : '0 6px 16px -6px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08)',
        transform: pressed ? 'translateY(1px) scale(0.98)' : 'none',
        transition: 'transform 90ms ease, background 140ms ease, box-shadow 140ms ease',
        userSelect: 'none',
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      }}
    >
      {label}
    </button>
  );
}

const styles: Record<string, CSSProperties> = {
  shell: {
    position: 'fixed',
    inset: 0,
    background:
      'radial-gradient(ellipse at 50% 0%, rgba(246,217,122,0.08) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #0a0b0e 0%, #05060a 80%, #000 100%)',
    color: IVORY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 18px',
    zIndex: 1000,
    overflowY: 'auto',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(246,217,122,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(246,217,122,0.06) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
    pointerEvents: 'none',
  },
  inner: {
    width: '100%',
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
    position: 'relative',
  },
  eyebrow: {
    color: PVD_GOLD,
    fontSize: 10,
    letterSpacing: '3.5px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(26px, 7.5vw, 38px)',
    fontWeight: 900,
    letterSpacing: '-1px',
    margin: 0,
    textAlign: 'center',
    lineHeight: 1.08,
    background: `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 45%, ${PVD_GOLD_DEEP} 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  lede: {
    fontSize: 13,
    color: STEEL_MID,
    letterSpacing: 0.3,
    lineHeight: 1.5,
    textAlign: 'center',
    margin: 0,
    maxWidth: 320,
  },
  dotRow: {
    display: 'flex',
    gap: 16,
    padding: '22px 0 10px',
  },
  attempts: {
    color: '#ffb0b0',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  pad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    width: '100%',
    marginTop: 12,
  },
  footnote: {
    color: STEEL_MID,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginTop: 14,
    textAlign: 'center',
  },
};
