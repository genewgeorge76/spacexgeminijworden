/**
 * Sovereign Mandate Store
 *
 * Single source of truth for the live, remotely-controllable pricing dials and
 * the 41-city lead valves. The /sovereign-command mobile cockpit writes here;
 * the JWordenAI estimator and the homepage mandate copy read from here.
 *
 * Persistence: localStorage so the Sovereign Authority's dials survive reloads
 * on the same device (the command phone). No secrets, no PII.
 */

import { useEffect, useState } from 'react';
import { SERVICE_AREAS_41 } from '@/constants/serviceAreas';

const STORAGE_KEY = 'jworden.sovereignMandate.v1';

export interface MandateConfig {
  /** Compacted stone base inches for Standard load (6 is the Worden minimum). */
  baseInchesStandard: number;
  /** Compacted stone base inches for Heavy Duty load. */
  baseInchesHeavy: number;
  /** Global price multiplier applied to every estimate. 1.0 = book rate. */
  priceMultiplier: number;
  /** Additive margin on top of labor (0.0 – 1.0). 0.25 = 25% upcharge on labor. */
  marginDial: number;
  /** Heavy-duty surcharge multiplier vs. Standard. 1.0 = parity, 1.5 = +50%. */
  heavyDutySurcharge: number;
  /** Active cities in the 41-city grid (lead valves). Excluded cities are closed. */
  activeCities: string[];
  /** Timestamp of the last Sovereign Authority commit. */
  updatedAt: number;
}

export const DEFAULT_MANDATE: MandateConfig = {
  baseInchesStandard: 6,
  baseInchesHeavy: 8,
  priceMultiplier: 1.0,
  marginDial: 0.18,
  heavyDutySurcharge: 1.35,
  activeCities: [...SERVICE_AREAS_41],
  updatedAt: 0,
};

type Listener = (config: MandateConfig) => void;

let current: MandateConfig = { ...DEFAULT_MANDATE };
const listeners = new Set<Listener>();

if (typeof window !== 'undefined') {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<MandateConfig>;
      current = {
        ...DEFAULT_MANDATE,
        ...parsed,
        activeCities:
          Array.isArray(parsed.activeCities) && parsed.activeCities.length > 0
            ? parsed.activeCities.filter((c): c is string => typeof c === 'string')
            : DEFAULT_MANDATE.activeCities,
      };
    }
  } catch {
    current = { ...DEFAULT_MANDATE };
  }
}

export function getMandate(): MandateConfig {
  return current;
}

export function setMandate(patch: Partial<MandateConfig>): MandateConfig {
  current = {
    ...current,
    ...patch,
    updatedAt: Date.now(),
  };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // storage quota / privacy-mode — non-fatal
    }
  }
  for (const fn of listeners) fn(current);
  return current;
}

export function subscribeMandate(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useMandateConfig(): MandateConfig {
  const [config, setConfig] = useState<MandateConfig>(current);
  useEffect(() => subscribeMandate(setConfig), []);
  return config;
}

export function isCityActive(city: string): boolean {
  return current.activeCities.includes(city);
}
