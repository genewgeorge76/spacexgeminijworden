import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei';
import type { Group } from 'three';

export default function WordenAvatar({ tier }: { tier: string }) {
  const group = useRef<Group>(null);
  const { nodes, animations } = useGLTF('/worden_avatar.glb') as unknown as {
    nodes: Record<string, any>;
    animations: any[];
  };
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const anim = tier === 'Municipal Spec' ? 'Handshake' : 'Idle';
    if (actions[anim]) {
      actions[anim]?.reset().fadeIn(0.5).play();
    }
    return () => {
      actions[anim]?.fadeOut(0.5);
    };
  }, [tier, actions]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <Environment preset="city" />
        <primitive ref={group} object={nodes.Scene} scale={1.8} position={[0, -1, 0]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
