import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  PresentationControls,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { SovereignEngine } from '@/utils/SovereignEngine';

interface BidData {
  tonnage: string;
  tiers: {
    maintenance: number;
    wordenStandard: number;
    sovereignMunicipal: number;
  };
}

interface WeatherData {
  temp: number;
  wind: number;
}

interface SovereignInterfaceProps {
  bidData?: BidData;
  weatherData: WeatherData;
}

export default function SovereignInterface({
  bidData,
  weatherData,
}: SovereignInterfaceProps) {
  const window = SovereignEngine.getCompactionWindow(
    weatherData.temp,
    weatherData.wind
  );

  return (
    <div className="sovereign-container">
      <div className="pulse-indicator">
        <h3>LIVE COMPACTION PULSE</h3>
        <p>
          Estimated Window: <strong>{window} Minutes</strong> to hit 96% Density
        </p>
        {bidData && (
          <p>
            Tonnage: <strong>{bidData.tonnage}</strong> | Worden Standard:
            <strong> ${bidData.tiers.wordenStandard.toFixed(2)}</strong>
          </p>
        )}
      </div>

      <div style={{ height: '500px' }}>
        <Canvas shadows camera={{ position: [0, 0, 4] }}>
          <Suspense fallback={null}>
            <PresentationControls global config={{ mass: 2, tension: 500 }}>
              <Model />
            </PresentationControls>
            <Environment preset="city" />
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

function Model() {
  const { scene } = useGLTF('/mr_mrs_worden_sovereign.glb');
  return <primitive object={scene} scale={1.6} position={[0, -1.2, 0]} />;
}
