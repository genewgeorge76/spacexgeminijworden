import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';

interface FounderGateProps {
  children: ReactNode;
}

const GOLD = '#D4AF37';

const styles = {
  shell: {
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: GOLD,
    fontFamily: '"Inter", sans-serif',
    padding: '20px',
  } as CSSProperties,
  card: {
    textAlign: 'center',
    border: `1px solid ${GOLD}`,
    padding: '50px',
    borderRadius: '20px',
    background: '#0A0A0A',
    boxShadow: '0 0 60px rgba(212, 175, 55, 0.08)',
    maxWidth: '420px',
    width: '100%',
  } as CSSProperties,
  title: {
    margin: 0,
    letterSpacing: '3px',
    fontSize: '20px',
    fontWeight: 900,
    textTransform: 'uppercase',
  } as CSSProperties,
  subtitle: {
    marginTop: '10px',
    marginBottom: '30px',
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#888',
    textTransform: 'uppercase',
  } as CSSProperties,
  inputRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  } as CSSProperties,
  input: {
    background: '#111',
    border: `1px solid ${GOLD}`,
    color: '#FFF',
    padding: '10px',
    width: '250px',
    borderRadius: '6px',
    outline: 'none',
    fontFamily: 'inherit',
  } as CSSProperties,
  button: {
    background: GOLD,
    color: '#000',
    border: 'none',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '6px',
    cursor: 'pointer',
    letterSpacing: '2px',
    fontFamily: 'inherit',
  } as CSSProperties,
  error: {
    marginTop: '20px',
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#FF6B6B',
    textTransform: 'uppercase',
  } as CSSProperties,
  footnote: {
    marginTop: '30px',
    fontSize: '9px',
    letterSpacing: '3px',
    color: '#555',
    textTransform: 'uppercase',
  } as CSSProperties,
} as const;

function FounderGate({ children }: FounderGateProps) {
  const [passphrase, setPassphrase] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    const masterKey = import.meta.env.VITE_FOUNDER_KEY as string | undefined;

    if (!masterKey) {
      setError('Founder key not configured. Contact system administrator.');
      return;
    }

    if (passphrase === masterKey) {
      setError('');
      setIsAuthorized(true);
    } else {
      setError('Access Denied \u2014 Integrity check failed.');
      setPassphrase('');
    }
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div style={styles.shell}>
      <form style={styles.card} onSubmit={handleUnlock} aria-label="Founder&#x2019;s Vault access">
        <h2 style={styles.title}>Worden Alliance: Founder&rsquo;s Vault</h2>
        <p style={styles.subtitle}>Enter the 1984 Legacy Key</p>
        <div style={styles.inputRow}>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            style={styles.input}
            autoComplete="current-password"
            aria-label="Legacy key"
            required
          />
          <button type="submit" style={styles.button}>
            UNLOCK
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.footnote}>Sovereign Access Only &middot; Est. 1984</p>
      </form>
    </div>
  );
}

export default FounderGate;
