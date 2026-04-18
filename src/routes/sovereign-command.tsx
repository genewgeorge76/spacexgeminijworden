import { useCallback, useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import PinPadlock from '@/components/PinPadlock';
import SovereignCommandCockpit from '@/components/SovereignCommandCockpit';

export const Route = createFileRoute('/sovereign-command')({
  component: SovereignCommandRoute,
});

const SESSION_KEY = 'jworden.sovereignUnlock.v1';
// Client-side UX gate only. No secrets live behind this code. 1984 = founding year.
const MASTER_PIN = '1984';

function SovereignCommandRoute() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === 'yes') {
        setUnlocked(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(SESSION_KEY, 'yes');
      } catch {
        /* ignore */
      }
    }
  }, []);

  const lock = useCallback(() => {
    setUnlocked(false);
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.removeItem(SESSION_KEY);
      } catch {
        /* ignore */
      }
    }
  }, []);

  if (!unlocked) {
    return <PinPadlock masterCode={MASTER_PIN} onUnlock={unlock} />;
  }

  return <SovereignCommandCockpit onLock={lock} />;
}
