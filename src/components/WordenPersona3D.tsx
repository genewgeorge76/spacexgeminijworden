/**
 * WordenPersona3D — Real React Three Fiber persona statue renderer.
 *
 * Renders a high-fidelity sculptural bust of a Worden founder on a lit
 * industrial plinth. The geometry is hard-bound into a single group so the
 * facial features (eyes, brows, nose, mouth, ears) stay in perfect alignment
 * with the head as it rotates. Two exported presets render the Sovereign
 * Patriarch (John) and Visionary Companion (Betty).
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface WordenPersonaConfig {
  name: string;
  role: string;
  year: string;
  accent: string;
  skinTone: string;
  skinShadow: string;
  hairTone: string;
  browTone: string;
  eyeTone: string;
  lipTone: string;
  attireTone: string;
  accessoryTone: string;
  kind: 'patriarch' | 'matriarch';
}

const JOHN_CONFIG: WordenPersonaConfig = {
  name: 'MR. JOHN WORDEN',
  role: 'SOVEREIGN PATRIARCH · FOUNDER 1984',
  year: 'EST. 1984',
  accent: '#F6D97A',
  skinTone: '#D2A47F',
  skinShadow: '#8a5f42',
  hairTone: '#3a3430',
  browTone: '#2b2522',
  eyeTone: '#2a2018',
  lipTone: '#a26856',
  attireTone: '#0d0d0d',
  accessoryTone: '#d4af37',
  kind: 'patriarch',
};

const BETTY_CONFIG: WordenPersonaConfig = {
  name: 'MRS. BETTY WORDEN',
  role: 'VISIONARY COMPANION · CO-FOUNDER 1984',
  year: 'EST. 1984',
  accent: '#E8B4A0',
  skinTone: '#E2BFA2',
  skinShadow: '#9c7456',
  hairTone: '#6a4a36',
  browTone: '#4a3225',
  eyeTone: '#3a2a1e',
  lipTone: '#c07a6a',
  attireTone: '#1c1614',
  accessoryTone: '#F5E6D3',
  kind: 'matriarch',
};

function FacialFeatures({ config }: { config: WordenPersonaConfig }) {
  const browMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: config.browTone,
        roughness: 0.85,
        metalness: 0,
      }),
    [config.browTone],
  );

  const eyeWhiteMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f8f4ec',
        roughness: 0.12,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
      }),
    [],
  );

  const irisMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: config.kind === 'patriarch' ? '#2a5a6e' : '#4a6b5a',
        roughness: 0.3,
        metalness: 0.1,
      }),
    [config.kind],
  );

  const pupilMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: config.eyeTone,
      }),
    [config.eyeTone],
  );

  const noseMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: config.skinTone,
        roughness: 0.5,
        clearcoat: 0.25,
        clearcoatRoughness: 0.6,
      }),
    [config.skinTone],
  );

  const lipMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: config.lipTone,
        roughness: 0.45,
        clearcoat: 0.35,
        clearcoatRoughness: 0.35,
      }),
    [config.lipTone],
  );

  const cheekMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: config.skinShadow,
        roughness: 0.7,
        transparent: true,
        opacity: 0.28,
      }),
    [config.skinShadow],
  );

  const eyeOffsetX = 0.155;
  const eyeY = 1.36;
  const eyeZ = 0.405;

  return (
    <group>
      {/* ─── BROWS ─── */}
      <mesh
        position={[eyeOffsetX, eyeY + 0.115, eyeZ - 0.01]}
        rotation={[0, 0, config.kind === 'patriarch' ? -0.08 : -0.05]}
        material={browMat}
      >
        <boxGeometry
          args={[
            config.kind === 'patriarch' ? 0.135 : 0.115,
            config.kind === 'patriarch' ? 0.028 : 0.018,
            0.032,
          ]}
        />
      </mesh>
      <mesh
        position={[-eyeOffsetX, eyeY + 0.115, eyeZ - 0.01]}
        rotation={[0, 0, config.kind === 'patriarch' ? 0.08 : 0.05]}
        material={browMat}
      >
        <boxGeometry
          args={[
            config.kind === 'patriarch' ? 0.135 : 0.115,
            config.kind === 'patriarch' ? 0.028 : 0.018,
            0.032,
          ]}
        />
      </mesh>

      {/* ─── EYE WHITES (set into socket) ─── */}
      <mesh position={[eyeOffsetX, eyeY, eyeZ - 0.02]} material={eyeWhiteMat}>
        <sphereGeometry args={[0.058, 24, 24]} />
      </mesh>
      <mesh position={[-eyeOffsetX, eyeY, eyeZ - 0.02]} material={eyeWhiteMat}>
        <sphereGeometry args={[0.058, 24, 24]} />
      </mesh>

      {/* ─── IRIS ─── */}
      <mesh position={[eyeOffsetX, eyeY, eyeZ + 0.028]} material={irisMat}>
        <sphereGeometry args={[0.032, 20, 20]} />
      </mesh>
      <mesh position={[-eyeOffsetX, eyeY, eyeZ + 0.028]} material={irisMat}>
        <sphereGeometry args={[0.032, 20, 20]} />
      </mesh>

      {/* ─── PUPIL ─── */}
      <mesh position={[eyeOffsetX, eyeY, eyeZ + 0.045]} material={pupilMat}>
        <sphereGeometry args={[0.015, 16, 16]} />
      </mesh>
      <mesh position={[-eyeOffsetX, eyeY, eyeZ + 0.045]} material={pupilMat}>
        <sphereGeometry args={[0.015, 16, 16]} />
      </mesh>

      {/* ─── EYE-LID UPPER (hooded for realism) ─── */}
      <mesh
        position={[eyeOffsetX, eyeY + 0.04, eyeZ + 0.012]}
        rotation={[-0.25, 0, 0]}
        material={noseMat}
      >
        <sphereGeometry args={[0.062, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
      </mesh>
      <mesh
        position={[-eyeOffsetX, eyeY + 0.04, eyeZ + 0.012]}
        rotation={[-0.25, 0, 0]}
        material={noseMat}
      >
        <sphereGeometry args={[0.062, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
      </mesh>

      {/* ─── NOSE BRIDGE + TIP ─── */}
      <mesh position={[0, 1.26, 0.44]} rotation={[0.1, 0, 0]} material={noseMat}>
        <boxGeometry args={[0.055, 0.22, 0.07]} />
      </mesh>
      <mesh position={[0, 1.16, 0.465]} material={noseMat}>
        <sphereGeometry args={[0.048, 24, 24]} />
      </mesh>
      {/* Nostrils (slight indents under nose tip) */}
      <mesh position={[0.025, 1.135, 0.465]} material={browMat}>
        <sphereGeometry args={[0.009, 10, 10]} />
      </mesh>
      <mesh position={[-0.025, 1.135, 0.465]} material={browMat}>
        <sphereGeometry args={[0.009, 10, 10]} />
      </mesh>

      {/* ─── MOUTH — upper & lower lip ─── */}
      <mesh position={[0, 1.055, 0.425]} rotation={[0.1, 0, 0]} material={lipMat}>
        <boxGeometry
          args={[
            config.kind === 'patriarch' ? 0.17 : 0.15,
            0.022,
            0.035,
          ]}
        />
      </mesh>
      <mesh position={[0, 1.03, 0.425]} rotation={[0.15, 0, 0]} material={lipMat}>
        <boxGeometry
          args={[
            config.kind === 'patriarch' ? 0.165 : 0.15,
            0.028,
            0.04,
          ]}
        />
      </mesh>

      {/* Philtrum hint */}
      <mesh position={[0, 1.085, 0.455]} material={cheekMat}>
        <boxGeometry args={[0.008, 0.04, 0.018]} />
      </mesh>

      {/* ─── CHIN definition ─── */}
      <mesh position={[0, 0.94, 0.39]} material={noseMat}>
        <sphereGeometry args={[0.13, 24, 24]} />
      </mesh>

      {/* ─── CHEEKBONE BLUSH (matriarch) or stubble shade (patriarch) ─── */}
      <mesh position={[0.24, 1.2, 0.32]} material={cheekMat}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      <mesh position={[-0.24, 1.2, 0.32]} material={cheekMat}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* ─── PATRIARCH: Moustache hint ─── */}
      {config.kind === 'patriarch' && (
        <mesh position={[0, 1.09, 0.445]} material={browMat}>
          <boxGeometry args={[0.18, 0.022, 0.03]} />
        </mesh>
      )}
    </group>
  );
}

function PersonaBust({ config }: { config: WordenPersonaConfig }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      // Slow, dignified rotation — face visible most of the time
      group.current.rotation.y += delta * 0.12;
    }
  });

  const skinMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: config.skinTone,
        roughness: 0.5,
        metalness: 0.02,
        clearcoat: 0.25,
        clearcoatRoughness: 0.55,
        sheen: 0.15,
      }),
    [config.skinTone],
  );

  const hairMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: config.hairTone,
        roughness: 0.78,
        metalness: 0.08,
      }),
    [config.hairTone],
  );

  const attireMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: config.attireTone,
        roughness: 0.35,
        metalness: 0.22,
        clearcoat: 0.45,
      }),
    [config.attireTone],
  );

  const shirtMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: config.kind === 'patriarch' ? '#e8e3d8' : '#f2e4d5',
        roughness: 0.6,
        metalness: 0.02,
      }),
    [config.kind],
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: config.accessoryTone,
        roughness: 0.2,
        metalness: 0.9,
        emissive: config.accessoryTone,
        emissiveIntensity: 0.12,
      }),
    [config.accessoryTone],
  );

  return (
    <group ref={group} position={[0, -0.45, 0]}>
      {/* ─── SHOULDERS / JACKET ─── */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={attireMat}>
        <cylinderGeometry args={[1.0, 1.35, 0.85, 48]} />
      </mesh>

      {/* Jacket lapels (V) */}
      <mesh position={[0.18, 0.62, 0.58]} rotation={[0.1, 0, -0.35]} material={attireMat}>
        <boxGeometry args={[0.25, 0.42, 0.05]} />
      </mesh>
      <mesh position={[-0.18, 0.62, 0.58]} rotation={[0.1, 0, 0.35]} material={attireMat}>
        <boxGeometry args={[0.25, 0.42, 0.05]} />
      </mesh>

      {/* Shirt triangle under collar */}
      <mesh position={[0, 0.55, 0.6]} material={shirtMat}>
        <boxGeometry args={[0.2, 0.35, 0.04]} />
      </mesh>

      {/* Collar rim / chain accent */}
      <mesh position={[0, 0.78, 0]} castShadow material={accentMat}>
        <torusGeometry args={[0.5, 0.035, 16, 48]} />
      </mesh>

      {/* ─── NECK ─── */}
      <mesh position={[0, 0.96, 0]} castShadow material={skinMat}>
        <cylinderGeometry args={[0.21, 0.27, 0.4, 32]} />
      </mesh>

      {/* ─── HEAD (hard-bound — faces always attached to this sphere) ─── */}
      <mesh position={[0, 1.32, 0]} castShadow material={skinMat}>
        <sphereGeometry args={[0.47, 64, 64]} />
      </mesh>

      {/* Jaw extension — gives square jawline for patriarch, softer for matriarch */}
      <mesh
        position={[0, 1.08, 0.02]}
        scale={
          config.kind === 'patriarch'
            ? [0.92, 0.62, 0.88]
            : [0.82, 0.56, 0.8]
        }
        material={skinMat}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
      </mesh>

      {/* ─── FACIAL FEATURES ─── */}
      <FacialFeatures config={config} />

      {/* ─── HAIR ─── */}
      {config.kind === 'patriarch' ? (
        <>
          {/* Short, combed-back patriarch hair */}
          <mesh
            position={[0, 1.52, -0.02]}
            scale={[0.54, 0.32, 0.56]}
            rotation={[-0.1, 0, 0]}
            castShadow
            material={hairMat}
          >
            <sphereGeometry args={[1, 32, 32]} />
          </mesh>
          {/* Side fade */}
          <mesh position={[0.42, 1.34, -0.05]} scale={[0.18, 0.24, 0.3]} material={hairMat}>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
          <mesh position={[-0.42, 1.34, -0.05]} scale={[0.18, 0.24, 0.3]} material={hairMat}>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
        </>
      ) : (
        <>
          {/* Crown — matriarch hair, fuller */}
          <mesh
            position={[0, 1.5, -0.02]}
            scale={[0.62, 0.5, 0.62]}
            castShadow
            material={hairMat}
          >
            <sphereGeometry args={[1, 32, 32]} />
          </mesh>
          {/* Hair falls to shoulders */}
          <mesh
            position={[0.28, 1.1, -0.1]}
            scale={[0.28, 0.42, 0.24]}
            rotation={[0.1, 0, 0.3]}
            material={hairMat}
          >
            <sphereGeometry args={[1, 24, 24]} />
          </mesh>
          <mesh
            position={[-0.28, 1.1, -0.1]}
            scale={[0.28, 0.42, 0.24]}
            rotation={[0.1, 0, -0.3]}
            material={hairMat}
          >
            <sphereGeometry args={[1, 24, 24]} />
          </mesh>
          <mesh
            position={[0, 1.0, -0.22]}
            scale={[0.5, 0.35, 0.22]}
            material={hairMat}
          >
            <sphereGeometry args={[1, 24, 24]} />
          </mesh>
        </>
      )}

      {/* ─── EARS ─── */}
      <mesh position={[0.45, 1.3, 0.02]} rotation={[0, 0.2, 0]} material={skinMat}>
        <sphereGeometry args={[0.075, 16, 16]} />
      </mesh>
      <mesh position={[-0.45, 1.3, 0.02]} rotation={[0, -0.2, 0]} material={skinMat}>
        <sphereGeometry args={[0.075, 16, 16]} />
      </mesh>

      {/* Earrings (matriarch) */}
      {config.kind === 'matriarch' && (
        <>
          <mesh position={[0.5, 1.22, 0.08]} material={accentMat}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
          <mesh position={[-0.5, 1.22, 0.08]} material={accentMat}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
        </>
      )}

      {/* ─── LAPEL ACCENT (tie bar / brooch) ─── */}
      <mesh position={[0, 0.48, 0.72]} material={accentMat}>
        {config.kind === 'patriarch' ? (
          <boxGeometry args={[0.08, 0.3, 0.04]} />
        ) : (
          <torusGeometry args={[0.11, 0.035, 12, 24]} />
        )}
      </mesh>
    </group>
  );
}

function Plinth({ config }: { config: WordenPersonaConfig }) {
  return (
    <group position={[0, -1.25, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.5, 1.4]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.5}
          metalness={0.6}
          clearcoat={0.35}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Top rule — glowing accent band */}
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[2.2, 0.02, 1.4]} />
        <meshStandardMaterial color={config.accent} emissive={config.accent} emissiveIntensity={0.45} />
      </mesh>

      {/* Floor disc beneath plinth */}
      <mesh position={[0, -0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.55, 48]} />
        <meshStandardMaterial
          color={config.accent}
          emissive={config.accent}
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Scene({ config }: { config: WordenPersonaConfig }) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 12]} />

      <ambientLight intensity={0.35} />
      {/* Key light (accent-tinted) */}
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.1}
        color={config.accent}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Fill light (cool) */}
      <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#8cb7ff" />
      {/* Rim light — neutral white, pushes the face forward */}
      <spotLight
        position={[0, 3.5, 4.5]}
        angle={0.5}
        penumbra={0.6}
        intensity={2.0}
        color="#ffffff"
        castShadow
      />
      {/* Eye-line bounce light — makes the eyes catch */}
      <pointLight position={[0, 1.4, 2.2]} intensity={0.35} color="#fff2d6" />

      <PersonaBust config={config} />
      <Plinth config={config} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.6}
        scale={8}
        blur={2.4}
        far={4}
        color="#000"
      />

      <Environment preset="warehouse" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.05}
        rotateSpeed={0.6}
      />
    </>
  );
}

function useParallax(strength: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) return;

    let rafId = 0;
    const handle = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Center-of-viewport progress, clamped -1 to 1
      const centerDelta = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, centerDelta));
      setOffset(clamped * strength);
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        handle();
      });
    };
    handle();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return { ref, offset };
}

function WordenPersona3D({
  config,
  height = 440,
  parallaxStrength = 32,
  parallaxTiltDeg = 2.5,
}: {
  config: WordenPersonaConfig;
  height?: number;
  parallaxStrength?: number;
  parallaxTiltDeg?: number;
}) {
  const { ref, offset } = useParallax(parallaxStrength);
  const tiltX = (offset / parallaxStrength) * parallaxTiltDeg;

  return (
    <div
      ref={ref}
      className="parallax-target"
      style={{
        width: '100%',
        height,
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        background:
          'linear-gradient(160deg, rgba(28,28,32,0.88) 0%, rgba(10,10,14,0.94) 55%, rgba(0,0,0,0.96) 100%)',
        border: `1px solid ${config.accent}40`,
        boxShadow: `0 40px 90px -28px rgba(0,0,0,0.95), 0 0 0 1px ${config.accent}28, inset 0 0 140px rgba(0,0,0,0.65)`,
        backdropFilter: 'blur(22px) saturate(130%)',
        WebkitBackdropFilter: 'blur(22px) saturate(130%)',
        transform: `translate3d(0, ${offset.toFixed(2)}px, 0) rotateX(${tiltX.toFixed(2)}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.45, 3.6], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene config={config} />
        </Suspense>
      </Canvas>

      {/* HUD overlays */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          padding: '6px 12px',
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: '10px',
          letterSpacing: '3px',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: config.accent,
          background: 'rgba(0,0,0,0.55)',
          border: `1px solid ${config.accent}55`,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: '2px',
          pointerEvents: 'none',
        }}
      >
        ● LIVE 3D · WEBGL
      </div>
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          padding: '6px 12px',
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: '10px',
          letterSpacing: '3px',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#fff',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: '2px',
          pointerEvents: 'none',
        }}
      >
        {config.year}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 18,
          right: 18,
          padding: '12px 16px',
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          color: '#fff',
          background: 'rgba(0,0,0,0.55)',
          border: `1px solid ${config.accent}44`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '2px',
              fontWeight: 900,
              color: config.accent,
              textTransform: 'uppercase',
            }}
          >
            {config.name}
          </div>
          <div
            style={{
              fontSize: '9px',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            {config.role}
          </div>
        </div>
        <div
          style={{
            fontSize: '9px',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          drag to rotate
        </div>
      </div>
    </div>
  );
}

export function MrWordenPersona3D({
  height,
  parallaxStrength,
}: { height?: number; parallaxStrength?: number } = {}) {
  return <WordenPersona3D config={JOHN_CONFIG} height={height} parallaxStrength={parallaxStrength} />;
}

export function MrsWordenPersona3D({
  height,
  parallaxStrength,
}: { height?: number; parallaxStrength?: number } = {}) {
  return <WordenPersona3D config={BETTY_CONFIG} height={height} parallaxStrength={parallaxStrength} />;
}

export default WordenPersona3D;
