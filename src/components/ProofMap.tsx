import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon broken by bundlers
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface ProofPin {
  lat: number;
  lng: number;
  title: string;
  date: string;
  type: string;
  description: string;
}

function isValidPin(pin: unknown): pin is ProofPin {
  if (!pin || typeof pin !== 'object') return false;
  const p = pin as Record<string, unknown>;
  return (
    typeof p.lat === 'number' &&
    typeof p.lng === 'number' &&
    !isNaN(p.lat) &&
    !isNaN(p.lng) &&
    p.lat >= -90 &&
    p.lat <= 90 &&
    p.lng >= -180 &&
    p.lng <= 180
  );
}

export default function ProofMap() {
  const [pins, setPins] = useState<ProofPin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@/data/verified-pins.json')
      .then((mod) => {
        const raw: unknown = mod.default ?? mod;
        if (!Array.isArray(raw)) {
          setError('verified-pins.json must be an array.');
          return;
        }
        const valid = raw.filter(isValidPin);
        if (valid.length === 0 && raw.length > 0) {
          setError('No valid pins found in verified-pins.json. Check lat/lng values.');
        }
        setPins(valid);
      })
      .catch(() => {
        setError('Could not load verified-pins.json. Replace the placeholder file with your harvested data.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-[#1a1a1a] text-gray-400 text-lg font-bold">
        Loading map…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-[#1a1a1a] border border-red-700 text-red-400 text-base font-bold px-6 text-center">
        ⚠️ {error}
      </div>
    );
  }

  const center: [number, number] =
    pins.length > 0 ? [pins[0].lat, pins[0].lng] : [38.5, -96];

  return (
    <MapContainer
      center={center}
      zoom={pins.length === 1 ? 10 : 5}
      style={{ height: '500px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin) => (
        <Marker key={`${pin.lat}-${pin.lng}-${pin.date}`} position={[pin.lat, pin.lng]} icon={defaultIcon}>
          <Popup>
            <strong className="block text-sm">{pin.title}</strong>
            <span className="block text-xs text-gray-600">{pin.type}</span>
            {pin.date && (
              <span className="block text-xs text-gray-500">
                {new Date(pin.date).toLocaleDateString()}
              </span>
            )}
            {pin.description && (
              <p className="mt-1 text-xs text-gray-700">{pin.description}</p>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
