/**
 * SovereignEstimator3D — The 4D Operational estimator.
 *
 * An interactive 3D slider panel that lets visitors dial in driveway size
 * and load class (Standard vs Heavy Duty). The aggregate-base slab expands
 * both laterally (area) and vertically (compaction depth) as the inputs
 * change, visually dramatizing the J. Worden six-inch stone mandate.
 *
 * Emits a stable `EstimatorSpec` whenever the inputs settle so callers
 * (contact form, chatbot dispatcher) can pipe the spec downstream.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TactileButton from './TactileButton';
import { getMandate, useMandateConfig } from '@/lib/sovereignMandate';

export type LoadClass = 'standard' | 'heavy';

export interface EstimatorSpec {
  sqft: number;
  loadClass: LoadClass;
  baseInches: number;
  asphaltInches: number;
  asphaltTons: number;
  stoneTons: number;
  estimateLow: number;
  estimateHigh: number;
}

interface SovereignEstimator3DProps {
  initialSqft?: number;
  initialLoad?: LoadClass;
  onSpecChange?: (spec: EstimatorSpec) => void;
  onDispatch?: (spec: EstimatorSpec) => void;
  dispatchLabel?: string;
  /** Compact chrome — omits hero copy for embedding in the chat dispatcher. */
  compact?: boolean;
}

const PVD_GOLD = '#F6D97A';
const PVD_GOLD_CORE = '#D4A844';
const IVORY = '#f6f6f4';
const STEEL_MID = '#8a8a8a';

/** Compute materials + money from user inputs. Kept pure so tests/chat reuse it. */
export function computeEstimatorSpec(sqft: number, loadClass: LoadClass): EstimatorSpec {
  const mandate = getMandate();
  const baseInches = loadClass === 'heavy' ? mandate.baseInchesHeavy : mandate.baseInchesStandard;
  const asphaltInches = loadClass === 'heavy' ? 4 : 2.5;

  // Conversions using industry-standard densities.
  // Hot-mix asphalt ≈ 110 lb / sq ft / inch · 2 = 2000 lb per ton.
  const asphaltTons = (sqft * asphaltInches * 110) / 2000;
  // #57 stone base ≈ 100 lb / sq ft / inch.
  const stoneTons = (sqft * baseInches * 100) / 2000;

  const materialBase = asphaltTons * 110 + stoneTons * 38;
  const baseLaborMultiplier = 1.9;
  const loadSurcharge = loadClass === 'heavy' ? mandate.heavyDutySurcharge : 1.0;
  const laborMultiplier = baseLaborMultiplier * loadSurcharge * (1 + mandate.marginDial);
  const estimateLow = Math.round(
    (materialBase * laborMultiplier * mandate.priceMultiplier) / 100,
  ) * 100;
  const estimateHigh = Math.round(
    (materialBase * (laborMultiplier + 0.7) * mandate.priceMultiplier) / 100,
  ) * 100;

  return {
    sqft,
    loadClass,
    baseInches,
    asphaltInches,
    asphaltTons: Number(asphaltTons.toFixed(1)),
    stoneTons: Number(stoneTons.toFixed(1)),
    estimateLow,
    estimateHigh,
  };
}

export default function SovereignEstimator3D({
  initialSqft = 900,
  initialLoad = 'standard',
  onSpecChange,
  onDispatch,
  dispatchLabel = 'DISPATCH SOVEREIGN SPEC →',
  compact = false,
}: SovereignEstimator3DProps) {
  const [sqft, setSqft] = useState<number>(initialSqft);
  const [loadClass, setLoadClass] = useState<LoadClass>(initialLoad);
  // Subscribe to Sovereign Command mandate changes so the estimator re-computes
  // whenever the master remote commits new pricing/base-inch dials.
  const mandate = useMandateConfig();

  const spec = useMemo(
    () => computeEstimatorSpec(sqft, loadClass),
    // mandate.updatedAt gates re-computation on Sovereign Command commits.
    [sqft, loadClass, mandate.updatedAt],
  );

  useEffect(() => {
    onSpecChange?.(spec);
  }, [spec, onSpecChange]);

  // Map sqft (200–10,000) to a world-unit width / depth for the 3D slab.
  const normalized = Math.min(1, Math.max(0, (sqft - 200) / (10_000 - 200)));
  const slabWidth = 2.4 + normalized * 4.2;
  const slabDepth = 1.6 + normalized * 2.8;

  return (
    <section
      aria-label="Sovereign 3D Estimator"
      style={{
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        background:
          'linear-gradient(155deg, rgba(40,40,46,0.65) 0%, rgba(18,18,22,0.65) 55%, rgba(6,6,10,0.8) 100%)',
        backdropFilter: 'blur(22px) saturate(130%)',
        WebkitBackdropFilter: 'blur(22px) saturate(130%)',
        border: '1px solid rgba(246,217,122,0.28)',
        boxShadow:
          '0 40px 90px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(246,217,122,0.12)',
        color: IVORY,
      }}
    >
      {/* Top rail */}
      <div
        aria-hidden="true"
        style={{
          height: 3,
          background: `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 45%, #8C6A1F 100%)`,
          opacity: 0.9,
        }}
      />

      {!compact && (
        <header style={{ padding: '28px 28px 8px' }}>
          <span
            style={{
              color: PVD_GOLD,
              fontSize: 10,
              letterSpacing: '3px',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            ● 3D ESTIMATOR · LIVE · 4D OPERATIONAL
          </span>
          <h2
            className="pvd-gold-text"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              margin: '10px 0 10px',
              lineHeight: 1.05,
            }}
          >
            DIAL IN THE SIX-INCH MANDATE.
          </h2>
          <p style={{ color: '#c7c7c7', fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>
            Adjust the driveway size and the load class. The aggregate base swells laterally
            with the lot and vertically with the load requirement — a live preview of the
            J. Worden Standard.
          </p>
        </header>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.1fr) minmax(260px, 1fr)',
          gap: 24,
          padding: 24,
          alignItems: 'stretch',
        }}
      >
        {/* 3D CANVAS */}
        <div
          style={{
            position: 'relative',
            minHeight: compact ? 280 : 380,
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(246,217,122,0.14) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg, #0a0b0e 0%, #05060a 100%)',
            border: '1px solid rgba(246,217,122,0.18)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Canvas
            camera={{ position: [6.4, 4.2, 7.0], fov: 38 }}
            dpr={[1, 2]}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[6, 10, 4]} intensity={1.15} castShadow />
              <directionalLight position={[-4, 6, -3]} intensity={0.45} color={PVD_GOLD} />
              <Environment preset="warehouse" />

              <PavementStack
                width={slabWidth}
                depth={slabDepth}
                baseInches={spec.baseInches}
                asphaltInches={spec.asphaltInches}
                loadClass={loadClass}
              />

              <ContactShadows
                position={[0, -0.01, 0]}
                opacity={0.5}
                scale={14}
                blur={2.4}
                far={4}
              />

              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.55}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2.1}
              />
            </Suspense>
          </Canvas>

          {/* Canvas HUD overlay */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 12,
              fontSize: 9,
              letterSpacing: 2.5,
              fontWeight: 800,
              color: PVD_GOLD,
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}
          >
            ● LIVE 3D · WEBGL · 4D OPS
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              right: 12,
              fontSize: 9,
              letterSpacing: 2.2,
              fontWeight: 700,
              color: IVORY,
              textTransform: 'uppercase',
              pointerEvents: 'none',
              background: 'rgba(10,10,12,0.55)',
              padding: '4px 8px',
              borderRadius: 3,
              border: '1px solid rgba(246,217,122,0.25)',
            }}
          >
            {spec.baseInches}&quot; STONE · {spec.asphaltInches}&quot; ASPHALT
          </div>
        </div>

        {/* CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Size slider */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 8,
              }}
            >
              <label
                htmlFor="drive-sqft"
                style={{
                  color: PVD_GOLD,
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}
              >
                Driveway Size
              </label>
              <span
                className="pvd-gold-text"
                style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px' }}
              >
                {sqft.toLocaleString()} sq ft
              </span>
            </div>
            <input
              id="drive-sqft"
              type="range"
              min={200}
              max={10_000}
              step={50}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              aria-label="Driveway size in square feet"
              style={{
                width: '100%',
                accentColor: PVD_GOLD_CORE,
                cursor: 'ew-resize',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 6,
                color: STEEL_MID,
                fontSize: 10,
                letterSpacing: 2,
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              <span>200 SF · Apron</span>
              <span>10,000 SF · Lot</span>
            </div>
          </div>

          {/* Load toggle */}
          <div>
            <div
              style={{
                color: PVD_GOLD,
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Load Requirement
            </div>
            <div
              role="radiogroup"
              aria-label="Load class"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
            >
              <LoadPill
                active={loadClass === 'standard'}
                onClick={() => setLoadClass('standard')}
                label="Standard"
                meta={`${mandate.baseInchesStandard}" Stone · 2.5" HMA`}
              />
              <LoadPill
                active={loadClass === 'heavy'}
                onClick={() => setLoadClass('heavy')}
                label="Heavy Duty"
                meta={`${mandate.baseInchesHeavy}" Stone · 4" HMA`}
              />
            </div>
          </div>

          {/* Spec readouts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 6,
              background: 'rgba(0,0,0,0.35)',
              padding: 6,
              borderRadius: 8,
              border: '1px solid rgba(246,217,122,0.18)',
            }}
          >
            <Metric value={`${spec.stoneTons.toFixed(1)}t`} label="Stone Base" />
            <Metric value={`${spec.asphaltTons.toFixed(1)}t`} label="HMA Tons" />
            <Metric
              value={`$${Math.round(spec.estimateLow / 1000)}–${Math.round(spec.estimateHigh / 1000)}k`}
              label="Est. Range"
            />
          </div>

          {onDispatch && (
            <TactileButton
              onClick={() => onDispatch(spec)}
              aria-label="Dispatch the sovereign spec"
            >
              {dispatchLabel}
            </TactileButton>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── 3D geometry ─────────────────────────── */

function PavementStack({
  width,
  depth,
  baseInches,
  asphaltInches,
  loadClass,
}: {
  width: number;
  depth: number;
  baseInches: number;
  asphaltInches: number;
  loadClass: LoadClass;
}) {
  const group = useRef<THREE.Group>(null);

  // Map physical inches to world units so any commanded depth (4"–12")
  // expands the stack proportionally.
  const baseHeightTarget = (baseInches / 6) * 0.55;
  const asphaltHeightTarget = (asphaltInches / 2.5) * 0.16;

  const [baseH, setBaseH] = useState(baseHeightTarget);
  const [asphaltH, setAsphaltH] = useState(asphaltHeightTarget);
  const [w, setW] = useState(width);
  const [d, setD] = useState(depth);

  useFrame((_, delta) => {
    const lerp = Math.min(1, delta * 6);
    setBaseH((v) => v + (baseHeightTarget - v) * lerp);
    setAsphaltH((v) => v + (asphaltHeightTarget - v) * lerp);
    setW((v) => v + (width - v) * lerp);
    setD((v) => v + (depth - v) * lerp);
  });

  const subgradeY = -0.09;
  const baseY = subgradeY + 0.05 + baseH / 2;
  const asphaltY = baseY + baseH / 2 + asphaltH / 2;

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Subgrade / ground */}
      <mesh position={[0, subgradeY, 0]} receiveShadow>
        <boxGeometry args={[w + 2, 0.1, d + 2]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.92} metalness={0.05} />
      </mesh>

      {/* Six-inch compacted aggregate base */}
      <mesh position={[0, baseY, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, Math.max(baseH, 0.02), d]} />
        <meshStandardMaterial
          color={loadClass === 'heavy' ? '#c9b278' : '#b0a27a'}
          roughness={0.95}
          metalness={0.08}
          emissive={loadClass === 'heavy' ? '#3a2c0c' : '#1e1803'}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Aggregate fleck pattern — tiny inset meshes suggest #57 stone */}
      <StoneFlecks width={w} depth={d} y={baseY + baseH / 2 + 0.001} />

      {/* Asphalt surface course */}
      <mesh position={[0, asphaltY, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, Math.max(asphaltH, 0.01), d]} />
        <meshPhysicalMaterial
          color="#111114"
          roughness={0.5}
          metalness={0.12}
          clearcoat={0.3}
          clearcoatRoughness={0.55}
        />
      </mesh>

      {/* Gold rim light around the slab to read the mandate edge */}
      <mesh position={[0, baseY + baseH / 2 + asphaltH + 0.002, 0]}>
        <torusGeometry args={[Math.max(w, d) * 0.55, 0.008, 12, 64]} />
        <meshBasicMaterial color={PVD_GOLD} toneMapped={false} />
      </mesh>

      {/* Depth label — gold tick on the left edge */}
      <mesh position={[-w / 2 - 0.25, baseY, 0]}>
        <boxGeometry args={[0.04, baseH, 0.04]} />
        <meshBasicMaterial color={PVD_GOLD} toneMapped={false} />
      </mesh>
    </group>
  );
}

function StoneFlecks({ width, depth, y }: { width: number; depth: number; y: number }) {
  // Deterministic pseudo-random fleck positions so re-renders are stable.
  const flecks = useMemo(() => {
    const out: Array<[number, number, number]> = [];
    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const count = 42;
    for (let i = 0; i < count; i++) {
      const fx = (rand() - 0.5) * (width - 0.2);
      const fz = (rand() - 0.5) * (depth - 0.2);
      const fs = 0.03 + rand() * 0.04;
      out.push([fx, fz, fs]);
    }
    return out;
  }, [width, depth]);

  return (
    <group>
      {flecks.map(([fx, fz, fs], i) => (
        <mesh key={i} position={[fx, y, fz]}>
          <sphereGeometry args={[fs, 6, 6]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#d8c78a' : '#9a8c66'} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────── ui pills ─────────────────────────── */

function LoadPill({
  active,
  onClick,
  label,
  meta,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  meta: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      style={{
        padding: '14px 14px',
        borderRadius: 8,
        border: `1px solid ${active ? PVD_GOLD : 'rgba(246,217,122,0.2)'}`,
        background: active
          ? 'linear-gradient(160deg, rgba(246,217,122,0.18) 0%, rgba(10,10,12,0.8) 100%)'
          : 'rgba(10,10,12,0.55)',
        color: IVORY,
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        transition: 'border-color 180ms ease, transform 120ms ease',
        transform: active ? 'translateY(-1px)' : 'none',
        boxShadow: active
          ? '0 0 0 1px rgba(246,217,122,0.55), 0 10px 22px -8px rgba(212,168,68,0.45)'
          : 'none',
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: '-0.3px',
          color: active ? PVD_GOLD : IVORY,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          letterSpacing: 1.8,
          fontWeight: 700,
          color: STEEL_MID,
          textTransform: 'uppercase',
        }}
      >
        {meta}
      </span>
    </button>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        padding: '14px 8px',
        textAlign: 'center',
        background: 'rgba(10,10,12,0.55)',
        borderRadius: 6,
      }}
    >
      <div
        className="pvd-gold-text"
        style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        style={{
          color: STEEL_MID,
          fontSize: 9,
          letterSpacing: 2,
          fontWeight: 700,
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}
