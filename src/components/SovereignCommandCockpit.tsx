/**
 * SovereignCommandCockpit — mobile-first master remote for J. Worden & Sons.
 *
 * Single-column, thumb-reachable layout. Fat-finger-friendly switches for the
 * 41-city lead valves and large sliders for the pricing dials. Every control
 * writes through the sovereign mandate store, which the JWordenAI estimator
 * and the dynamic mandate copy read from live.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ChangeEvent,
} from 'react';
import { SERVICE_AREAS_41 } from '@/constants/serviceAreas';
import {
  DEFAULT_MANDATE,
  setMandate,
  useMandateConfig,
  type MandateConfig,
} from '@/lib/sovereignMandate';
import { computeEstimatorSpec } from '@/components/SovereignEstimator3D';

const PVD_GOLD = '#F6D97A';
const PVD_GOLD_CORE = '#D4A844';
const PVD_GOLD_DEEP = '#8C6A1F';
const IVORY = '#f6f6f4';
const STEEL_MID = '#8a8a8a';

interface Props {
  onLock: () => void;
}

function haptic(ms: number) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { navigator.vibrate(ms); } catch { /* ignore */ }
  }
}

export default function SovereignCommandCockpit({ onLock }: Props) {
  const config = useMandateConfig();
  const [filter, setFilter] = useState('');

  // Live preview estimate to demonstrate pricing-dial impact.
  const previewSpec = useMemo(
    () => computeEstimatorSpec(1400, 'standard'),
    // Recompute whenever the master remote commits a change.
    [config.updatedAt],
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevBg = document.body.style.backgroundColor;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.backgroundColor = '#05060a';
    document.body.style.overscrollBehavior = 'contain';
    return () => {
      document.body.style.backgroundColor = prevBg;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  const toggleCity = useCallback(
    (city: string) => {
      haptic(14);
      const active = config.activeCities.includes(city);
      const next = active
        ? config.activeCities.filter((c) => c !== city)
        : [...config.activeCities, city];
      setMandate({ activeCities: next });
    },
    [config.activeCities],
  );

  const openAll = useCallback(() => {
    haptic([12, 20, 12]);
    setMandate({ activeCities: [...SERVICE_AREAS_41] });
  }, []);

  const closeAll = useCallback(() => {
    haptic([24, 30, 24]);
    setMandate({ activeCities: [] });
  }, []);

  const resetDefaults = useCallback(() => {
    haptic([12, 20, 12]);
    setMandate({ ...DEFAULT_MANDATE, updatedAt: Date.now() });
  }, []);

  const onNum = <K extends keyof MandateConfig,>(key: K) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (!Number.isNaN(val)) setMandate({ [key]: val } as Partial<MandateConfig>);
    };

  const active = config.activeCities;
  const filtered = filter
    ? SERVICE_AREAS_41.filter((c) =>
        c.toLowerCase().includes(filter.trim().toLowerCase()),
      )
    : SERVICE_AREAS_41;

  return (
    <div style={styles.shell}>
      <div style={styles.grid} aria-hidden="true" />

      <header style={styles.header}>
        <div style={styles.topRail} />
        <div style={styles.headerInner}>
          <div style={styles.headerMeta}>
            <span style={styles.onlineDot} />
            <span style={styles.headerEyebrow}>SOVEREIGN COMMAND · LIVE</span>
          </div>
          <h1 style={styles.title} className="pvd-gold-text">
            MASTER REMOTE
          </h1>
          <div style={styles.headerStatus}>
            <span>{active.length}/{SERVICE_AREAS_41.length} VALVES OPEN</span>
            <span style={styles.statusSep}>·</span>
            <span>PRICE ×{config.priceMultiplier.toFixed(2)}</span>
            <span style={styles.statusSep}>·</span>
            <span>{config.baseInchesStandard}&quot; MIN BASE</span>
          </div>
          <button type="button" onClick={onLock} style={styles.lockBtn} aria-label="Re-lock command">
            🔒 RELOCK
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* ═══════════════════════════════ DYNAMIC MANDATE PREVIEW */}
        <section style={styles.card}>
          <div style={styles.cardTopRail} />
          <div style={styles.cardTag}>● DYNAMIC MANDATE · LIVE COPY</div>
          <p style={styles.mandateLine}>
            Every Worden driveway built on a{' '}
            <strong className="pvd-gold-text" style={styles.mandateBig}>
              {config.baseInchesStandard}-INCH
            </strong>{' '}
            compacted stone base. Heavy-duty lots step up to{' '}
            <strong className="pvd-gold-text" style={styles.mandateBig}>
              {config.baseInchesHeavy}&quot;
            </strong>.
          </p>
          <div style={styles.previewRow}>
            <MiniMetric label="STONE TONS" value={previewSpec.stoneTons.toFixed(1)} />
            <MiniMetric label="ASPHALT TONS" value={previewSpec.asphaltTons.toFixed(1)} />
            <MiniMetric
              label="1,400 SF EST."
              value={`$${Math.round(previewSpec.estimateLow / 1000)}–${Math.round(previewSpec.estimateHigh / 1000)}k`}
            />
          </div>
        </section>

        {/* ═══════════════════════════════ PRICING DIALS */}
        <section style={styles.card}>
          <div style={styles.cardTopRail} />
          <div style={styles.cardTag}>● PRICING DIALS · 4 CHANNELS</div>
          <h2 style={styles.cardTitle}>Slide to commit the book rate.</h2>

          <Dial
            label="Global Price Multiplier"
            meta="1.00 = book rate · push right to raise every estimate"
            value={config.priceMultiplier}
            min={0.7}
            max={1.8}
            step={0.01}
            suffix={`×${config.priceMultiplier.toFixed(2)}`}
            onChange={onNum('priceMultiplier')}
          />
          <Dial
            label="Margin Dial (on labor)"
            meta="Additive margin on labor subtotal"
            value={config.marginDial}
            min={0}
            max={0.6}
            step={0.01}
            suffix={`${Math.round(config.marginDial * 100)}%`}
            onChange={onNum('marginDial')}
          />
          <Dial
            label="Heavy-Duty Surcharge"
            meta="Multiplier vs. Standard lane"
            value={config.heavyDutySurcharge}
            min={1.0}
            max={2.2}
            step={0.05}
            suffix={`×${config.heavyDutySurcharge.toFixed(2)}`}
            onChange={onNum('heavyDutySurcharge')}
          />
          <Dial
            label="Standard Stone Base"
            meta="The J. Worden Minimum — inches compacted"
            value={config.baseInchesStandard}
            min={4}
            max={10}
            step={0.5}
            suffix={`${config.baseInchesStandard.toFixed(1)}″`}
            onChange={onNum('baseInchesStandard')}
            gold
          />
          <Dial
            label="Heavy-Duty Stone Base"
            meta="Industrial / municipal floor"
            value={config.baseInchesHeavy}
            min={6}
            max={14}
            step={0.5}
            suffix={`${config.baseInchesHeavy.toFixed(1)}″`}
            onChange={onNum('baseInchesHeavy')}
            gold
          />

          <button
            type="button"
            onClick={resetDefaults}
            style={styles.resetBtn}
            aria-label="Reset dials to factory defaults"
          >
            ⟲ RESET TO J. WORDEN STANDARD
          </button>
        </section>

        {/* ═══════════════════════════════ 41-CITY LEAD VALVES */}
        <section style={styles.card}>
          <div style={styles.cardTopRail} />
          <div style={styles.cardTag}>
            ● 41-CITY LEAD VALVES · {active.length}/{SERVICE_AREAS_41.length} OPEN
          </div>
          <h2 style={styles.cardTitle}>Toggle any hub on or off the grid.</h2>

          <div style={styles.valveControlRow}>
            <button type="button" onClick={openAll} style={styles.bulkBtnGold}>
              ●● OPEN ALL
            </button>
            <button type="button" onClick={closeAll} style={styles.bulkBtnSteel}>
              ○○ CLOSE ALL
            </button>
          </div>

          <input
            type="search"
            inputMode="search"
            placeholder="Filter hubs (e.g. Richmond)"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.filter}
            aria-label="Filter the 41 city grid"
          />

          <ul style={styles.valveList}>
            {filtered.map((city) => (
              <LeadValve
                key={city}
                city={city}
                active={active.includes(city)}
                onToggle={() => toggleCity(city)}
              />
            ))}
          </ul>

          {filtered.length === 0 && (
            <div style={styles.empty}>
              No hub matches “{filter}”. Check the Chester HQ register or clear the filter.
            </div>
          )}
        </section>

        <section style={styles.footerCard}>
          <div style={styles.footerLine}>
            LAST COMMIT:{' '}
            {config.updatedAt
              ? new Date(config.updatedAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })
              : '—'}
          </div>
          <div style={styles.footerLine}>
            ● CHESTER COMMAND · 1601 WARE BOTTOM SPRINGS RD · EST. 1984
          </div>
        </section>
      </main>
    </div>
  );
}

/* ──────────────────────── subcomponents ──────────────────────── */

function Dial({
  label,
  meta,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
  gold = false,
}: {
  label: string;
  meta: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gold?: boolean;
}) {
  const norm = (value - min) / (max - min);
  return (
    <div style={styles.dial}>
      <div style={styles.dialRow}>
        <label style={styles.dialLabel}>{label}</label>
        <span style={{ ...styles.dialValue, color: gold ? PVD_GOLD : IVORY }}>{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          haptic(8);
          onChange(e);
        }}
        aria-label={label}
        className="jw-slider"
        style={{
          // Paint the active portion of the track in gold.
          backgroundImage: `linear-gradient(90deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} ${norm * 100}%, rgba(246,217,122,0.18) ${norm * 100}%, rgba(246,217,122,0.18) 100%)`,
        } as CSSProperties}
      />
      <div style={styles.dialMeta}>{meta}</div>
    </div>
  );
}

function LeadValve({
  city,
  active,
  onToggle,
}: {
  city: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <li style={styles.valveItem}>
      <div style={styles.valveCopy}>
        <span style={{ ...styles.valveCity, color: active ? IVORY : STEEL_MID }}>{city}</span>
        <span style={{ ...styles.valveState, color: active ? PVD_GOLD : STEEL_MID }}>
          {active ? '● OPEN · DISPATCHING' : '○ CLOSED · NO LEADS'}
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={`Lead valve for ${city}`}
        onClick={onToggle}
        style={{
          ...styles.switch,
          background: active
            ? `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 55%, ${PVD_GOLD_DEEP} 100%)`
            : 'linear-gradient(160deg, #1a1c22 0%, #0a0b0e 100%)',
          borderColor: active ? PVD_GOLD : 'rgba(246,217,122,0.2)',
          boxShadow: active
            ? '0 0 0 1px rgba(246,217,122,0.55), 0 10px 22px -8px rgba(212,168,68,0.55)'
            : 'inset 0 2px 6px rgba(0,0,0,0.65)',
        }}
      >
        <span
          style={{
            ...styles.switchKnob,
            transform: active ? 'translateX(32px)' : 'translateX(2px)',
            background: active
              ? 'linear-gradient(180deg, #fff 0%, #f0e0a7 100%)'
              : 'linear-gradient(180deg, #2c2f36 0%, #14161a 100%)',
          }}
        />
      </button>
    </li>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.miniMetric}>
      <div style={styles.miniMetricValue} className="pvd-gold-text">
        {value}
      </div>
      <div style={styles.miniMetricLabel}>{label}</div>
    </div>
  );
}

/* ──────────────────────── styles ──────────────────────── */

const styles: Record<string, CSSProperties> = {
  shell: {
    minHeight: '100vh',
    background:
      'radial-gradient(ellipse at 50% -10%, rgba(246,217,122,0.09) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0a0b0e 0%, #05060a 100%)',
    color: IVORY,
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 40px)',
    position: 'relative',
    overflowX: 'hidden',
  },
  grid: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(246,217,122,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(246,217,122,0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    maskImage: 'radial-gradient(ellipse at 50% 20%, black 30%, transparent 90%)',
    WebkitMaskImage: 'radial-gradient(ellipse at 50% 20%, black 30%, transparent 90%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background:
      'linear-gradient(180deg, rgba(8,8,12,0.96) 0%, rgba(8,8,12,0.88) 80%, rgba(8,8,12,0) 100%)',
    backdropFilter: 'blur(14px) saturate(130%)',
    WebkitBackdropFilter: 'blur(14px) saturate(130%)',
    paddingTop: 'calc(env(safe-area-inset-top, 0) + 4px)',
  },
  topRail: {
    height: 3,
    background: `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 45%, ${PVD_GOLD_DEEP} 100%)`,
  },
  headerInner: {
    padding: '14px 18px 16px',
    position: 'relative',
  },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#7ef58d',
    boxShadow: '0 0 10px rgba(126,245,141,0.7)',
  },
  headerEyebrow: {
    color: PVD_GOLD,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  title: {
    margin: '6px 0 8px',
    fontSize: 'clamp(26px, 8vw, 34px)',
    fontWeight: 900,
    letterSpacing: '-1px',
    background: `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 45%, ${PVD_GOLD_DEEP} 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerStatus: {
    fontSize: 11,
    color: STEEL_MID,
    letterSpacing: 1.6,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  statusSep: {
    color: 'rgba(246,217,122,0.5)',
    margin: '0 8px',
  },
  lockBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    padding: '10px 14px',
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: IVORY,
    background: 'rgba(10,10,14,0.75)',
    border: '1px solid rgba(246,217,122,0.32)',
    borderRadius: 10,
    cursor: 'pointer',
  },
  main: {
    position: 'relative',
    zIndex: 1,
    padding: '16px 14px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    maxWidth: 520,
    margin: '0 auto',
  },
  card: {
    position: 'relative',
    padding: '22px 18px',
    borderRadius: 16,
    background:
      'linear-gradient(155deg, rgba(40,40,46,0.55) 0%, rgba(18,18,22,0.6) 55%, rgba(6,6,10,0.8) 100%)',
    backdropFilter: 'blur(14px) saturate(130%)',
    WebkitBackdropFilter: 'blur(14px) saturate(130%)',
    border: '1px solid rgba(246,217,122,0.22)',
    boxShadow:
      '0 22px 60px -22px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  cardTopRail: {
    position: 'absolute',
    top: 0,
    left: 14,
    right: 14,
    height: 2,
    background: `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 45%, ${PVD_GOLD_DEEP} 100%)`,
    borderRadius: 2,
    opacity: 0.9,
  },
  cardTag: {
    color: PVD_GOLD,
    fontSize: 10,
    letterSpacing: 2.8,
    fontWeight: 900,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: '-0.4px',
    margin: '4px 0 14px',
    color: IVORY,
  },
  mandateLine: {
    fontSize: 16,
    lineHeight: 1.55,
    color: '#d5d5d5',
    margin: '4px 0 14px',
  },
  mandateBig: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: '-0.6px',
  },
  previewRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    padding: 8,
    borderRadius: 10,
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(246,217,122,0.18)',
  },
  miniMetric: {
    padding: '10px 6px',
    textAlign: 'center',
    borderRadius: 8,
    background: 'rgba(10,10,12,0.55)',
  },
  miniMetricValue: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: '-0.4px',
    lineHeight: 1,
  },
  miniMetricLabel: {
    marginTop: 4,
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: 700,
    color: STEEL_MID,
    textTransform: 'uppercase',
  },
  dial: {
    marginTop: 16,
  },
  dialRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  dialLabel: {
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 2.4,
    color: PVD_GOLD,
    textTransform: 'uppercase',
  },
  dialValue: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: '-0.5px',
    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  dialMeta: {
    marginTop: 8,
    fontSize: 11,
    color: STEEL_MID,
    letterSpacing: 1.2,
    lineHeight: 1.4,
  },
  filter: {
    width: '100%',
    padding: '14px 14px',
    borderRadius: 12,
    border: '1px solid rgba(246,217,122,0.22)',
    background: 'rgba(0,0,0,0.45)',
    color: IVORY,
    fontSize: 15,
    letterSpacing: 0.3,
    marginTop: 10,
    outline: 'none',
  },
  valveControlRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    marginTop: 8,
  },
  bulkBtnGold: {
    padding: '14px 12px',
    borderRadius: 10,
    border: `1px solid ${PVD_GOLD}`,
    background: `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 55%, ${PVD_GOLD_DEEP} 100%)`,
    color: '#1a130a',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    cursor: 'pointer',
    boxShadow: '0 8px 16px -6px rgba(212,168,68,0.55), inset 0 1px 0 rgba(255,255,255,0.35)',
  },
  bulkBtnSteel: {
    padding: '14px 12px',
    borderRadius: 10,
    border: '1px solid rgba(246,217,122,0.22)',
    background: 'linear-gradient(160deg, #2a2d33 0%, #14161a 100%)',
    color: IVORY,
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  resetBtn: {
    marginTop: 22,
    width: '100%',
    padding: '16px 12px',
    borderRadius: 12,
    border: '1px solid rgba(246,217,122,0.28)',
    background: 'rgba(10,10,12,0.65)',
    color: IVORY,
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  valveList: {
    listStyle: 'none',
    padding: 0,
    margin: '14px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxHeight: 560,
    overflowY: 'auto',
  },
  valveItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '14px 14px',
    borderRadius: 12,
    background: 'rgba(10,10,14,0.55)',
    border: '1px solid rgba(246,217,122,0.12)',
  },
  valveCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  valveCity: {
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  valveState: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  switch: {
    flexShrink: 0,
    width: 64,
    height: 34,
    borderRadius: 999,
    border: '1px solid',
    position: 'relative',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
  },
  switchKnob: {
    position: 'absolute',
    top: 2,
    left: 0,
    width: 28,
    height: 28,
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
    transition: 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), background 180ms ease',
  },
  empty: {
    marginTop: 16,
    padding: 14,
    borderRadius: 10,
    fontSize: 12,
    color: STEEL_MID,
    background: 'rgba(0,0,0,0.35)',
    textAlign: 'center',
  },
  footerCard: {
    marginTop: 8,
    padding: '14px 16px',
    textAlign: 'center',
    color: STEEL_MID,
    fontSize: 10,
    letterSpacing: 2.2,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  footerLine: {
    lineHeight: 1.7,
  },
};
