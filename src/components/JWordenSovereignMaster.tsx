import { useState, useEffect, useRef, type CSSProperties } from 'react';

type Module = 'DASHBOARD' | 'EVIDENCE' | 'INSTITUTE' | 'LEGAL';
type Role = 'jarvis' | 'user';
interface Message {
  role: Role;
  content: string;
}
interface KbpOperation {
  state: string;
  units: number;
  year: string;
  tech: string;
}

const CONTINUITY: ReadonlyArray<string> = [
  '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026',
];

const KBP_OPERATIONS: ReadonlyArray<KbpOperation> = [
  { state: 'Michigan', units: 14, year: '2024', tech: 'Thermal Stability' },
  { state: 'Texas', units: 42, year: '2025', tech: 'Heat-Shield Mix' },
  { state: 'Louisiana', units: 18, year: '2025', tech: 'Moisture-Seal' },
];

const THEME = {
  bg: '#000',
  gold: '#D4AF37',
  text: '#FFF',
  muted: '#888',
} as const;

const JWordenSovereignMaster = () => {
  const [activeModule, setActiveModule] = useState<Module>('DASHBOARD');
  const [jarvisOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sqFt, setSqFt] = useState(10000);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const jarvisSpeak = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'jarvis', content: text }]);
      setIsTyping(false);
    }, 800);
  };

  useEffect(() => {
    const greeting = setTimeout(() => {
      jarvisSpeak(
        'Good day. I am Jarvis, the Worden Digital Foreman. Mr. George is currently at the Chester HQ, but I am authorized to walk you through our Sovereign protocols. From our 1984 foundation to our national KBP sprints of 2024-2025, we remain the only Gold Standard in the US. Are we discussing your property\u2019s 30-year legacy today?',
      );
    }, 1000);
    return () => clearTimeout(greeting);
  }, []);

  const handleInput = (val: string) => {
    const userText = val.trim();
    if (!userText) return;
    const query = userText.toLowerCase();
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setInputValue('');

    if (query.includes('proof') || query.includes('kbp') || query.includes('dropbox')) {
      jarvisSpeak(
        "The evidence is in the vault. Our 2024-2025 operations for KBP Foods covered over 100 units across MI, TX, and LA. Every job is backed by photocopies and Dropbox field logs. I'm opening the Evidence Locker for you now.",
      );
      setActiveModule('EVIDENCE');
    } else if (query.includes('future') || query.includes('housing') || query.includes('institute')) {
      jarvisSpeak(
        "The Worden Institute is architecting the next 30 years. We are researching Life Housing synergy and self-evolving engineering to develop tomorrow's reality. I'm taking you to the Research Wing.",
      );
      setActiveModule('INSTITUTE');
    } else if (query.includes('grandfather') || query.includes('story')) {
      jarvisSpeak(
        "Our grandfather's way is our law: hand-tamped edges, zero roller marks, and a site left cleaner than we found it. We pave for the next generation, not just the next check.",
      );
    } else if (query.includes('legal') || query.includes('law')) {
      jarvisSpeak(
        'We monitor the legal symptoms of all 50 states. Our research ensures every sprint is court-proof and compliant with local statutory shifts.',
      );
      setActiveModule('LEGAL');
    } else {
      jarvisSpeak(
        "I am ready to engineer your solution. Shall we analyze your project's ROI or review our 50-state research files?",
      );
    }
  };

  const styles: Record<string, CSSProperties> = {
    master: {
      backgroundColor: '#000',
      color: '#FFF',
      fontFamily: '"Inter", sans-serif',
      minHeight: '100vh',
      padding: '40px 20px',
    },
    header: {
      textAlign: 'center',
      borderBottom: `1px solid ${THEME.gold}`,
      paddingBottom: '40px',
      marginBottom: '40px',
    },
    gold: { color: THEME.gold },
    card: {
      background: '#080808',
      border: '1px solid #222',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '30px',
    },
    jarvis: {
      position: 'fixed',
      bottom: '25px',
      left: '25px',
      width: '380px',
      height: '550px',
      background: 'rgba(10,10,10,0.98)',
      border: `1px solid ${THEME.gold}`,
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      boxShadow: '0 0 50px rgba(0,0,0,1)',
    },
    input: {
      background: '#000',
      border: '1px solid #333',
      color: '#FFF',
      padding: '12px',
      borderRadius: '10px',
      flex: 1,
    },
    badge: {
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      border: `1px solid ${THEME.gold}`,
      padding: '4px 10px',
      borderRadius: '50px',
      color: THEME.gold,
      display: 'inline-block',
    },
    backButton: {
      marginTop: '30px',
      background: 'none',
      border: `1px solid ${THEME.gold}`,
      color: THEME.gold,
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '8px',
      letterSpacing: '1px',
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.master}>
      <header style={styles.header}>
        <div style={styles.badge}>Sovereign Infrastructure Governor</div>
        <h1 style={{ fontSize: '56px', fontWeight: 900, margin: '20px 0' }}>
          J. WORDEN <span style={styles.gold}>&amp; SONS</span>
        </h1>
        <p style={{ color: THEME.muted }}>
          CHESTER HQ: 1601 WARE BOTTOM SPRINGS RD, SUITE 214, CHESTER, VA 23836
        </p>
        <div style={{ marginTop: '20px', color: '#555' }}>
          CONTINUITY SPRINT: {CONTINUITY.join(' \u2022 ')}
        </div>
      </header>

      <main style={styles.card}>
        {activeModule === 'DASHBOARD' && (
          <div>
            <h2 style={styles.gold}>THE COMMAND CENTER</h2>
            <p>
              Analyzing ROI for {sqFt.toLocaleString()} Sq Ft of Asset Modernization.
            </p>
            <input
              type="range"
              min={5000}
              max={100000}
              step={500}
              value={sqFt}
              onChange={(e) => setSqFt(Number(e.target.value))}
              style={{ width: '100%', accentColor: THEME.gold }}
              aria-label="Project size in square feet"
            />
            <div style={styles.grid}>
              <div style={{ padding: '20px', background: '#111', borderRadius: '15px' }}>
                <div style={styles.gold}>Annual Maintenance Savings</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  ${Math.round(sqFt * 0.45).toLocaleString()}/year
                </div>
              </div>
              <div style={{ padding: '20px', background: '#111', borderRadius: '15px' }}>
                <div style={styles.gold}>Life Expectancy</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>17-25 Years</div>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'EVIDENCE' && (
          <div>
            <h2 style={styles.gold}>EVIDENCE LOCKER: KBP FOODS (2024-2025)</h2>
            <div style={styles.grid}>
              {KBP_OPERATIONS.map((o) => (
                <div
                  key={o.state}
                  style={{
                    padding: '20px',
                    borderLeft: `2px solid ${THEME.gold}`,
                    background: '#0F0F0F',
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    {o.state} Sprint
                  </div>
                  <div style={{ color: THEME.muted }}>
                    {o.units} Units Modernized &middot; {o.tech}
                  </div>
                  <div style={{ color: '#555', fontSize: '12px', marginTop: '4px' }}>
                    {o.year}
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.backButton} onClick={() => setActiveModule('DASHBOARD')}>
              BACK TO COMMAND
            </button>
          </div>
        )}

        {activeModule === 'INSTITUTE' && (
          <div>
            <h2 style={styles.gold}>THE WORDEN SOVEREIGN INSTITUTE</h2>
            <p style={{ color: THEME.muted }}>
              Researching the next 30 years of Human-AI Infrastructure Synergy.
            </p>
            <div style={styles.grid}>
              <div style={{ padding: '20px', background: '#111', border: '1px solid #222' }}>
                <h4 style={styles.gold}>Life Housing</h4>
                <p style={{ fontSize: '14px' }}>
                  Designing thermal-harvesting foundations for tomorrow&rsquo;s reality
                  (2036-2056).
                </p>
              </div>
              <div style={{ padding: '20px', background: '#111', border: '1px solid #222' }}>
                <h4 style={styles.gold}>Advanced Engineering</h4>
                <p style={{ fontSize: '14px' }}>
                  Researching self-healing bio-polymers that adapt to planetary entropy.
                </p>
              </div>
            </div>
            <button style={styles.backButton} onClick={() => setActiveModule('DASHBOARD')}>
              BACK TO COMMAND
            </button>
          </div>
        )}

        {activeModule === 'LEGAL' && (
          <div>
            <h2 style={styles.gold}>50-STATE JURIS-INTELLIGENCE</h2>
            <p style={{ color: THEME.muted }}>
              Monitoring court symptoms &amp; statutory compliance across the US.
            </p>
            <div style={{ padding: '20px', background: '#111', marginTop: '20px' }}>
              <div style={{ color: '#00FF00', marginBottom: '10px' }}>
                &#9679; SYSTEM STATUS: ALL 50 STATES RESEARCHED FOR 2026 SPRINT
              </div>
              <p style={{ fontSize: '14px' }}>
                Jarvis is currently verifying contract law updates for upcoming Texas and
                Michigan projects.
              </p>
            </div>
            <button style={styles.backButton} onClick={() => setActiveModule('DASHBOARD')}>
              BACK TO COMMAND
            </button>
          </div>
        )}
      </main>

      {jarvisOpen && (
        <div style={styles.jarvis} role="dialog" aria-label="Jarvis Foreman">
          <div
            style={{
              padding: '15px',
              background: THEME.gold,
              color: '#000',
              fontWeight: 900,
              borderRadius: '20px 20px 0 0',
            }}
          >
            JARVIS FOREMAN | WORDEN AI
          </div>
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'jarvis' ? 'flex-start' : 'flex-end',
                  background: m.role === 'jarvis' ? '#222' : THEME.gold,
                  color: m.role === 'jarvis' ? '#FFF' : '#000',
                  padding: '12px',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  fontSize: '14px',
                }}
              >
                {m.content}
              </div>
            ))}
            {isTyping && (
              <div style={{ fontSize: '12px', color: THEME.gold }}>
                Foreman is calculating legacy data...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div
            style={{
              padding: '15px',
              borderTop: '1px solid #333',
              display: 'flex',
              gap: '10px',
            }}
          >
            <input
              style={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleInput(inputValue);
              }}
              placeholder="Speak with the Foreman..."
              aria-label="Message the Foreman"
            />
            <button
              style={{
                background: THEME.gold,
                border: 'none',
                padding: '0 15px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => handleInput(inputValue)}
            >
              SEND
            </button>
          </div>
        </div>
      )}

      <footer style={{ marginTop: '80px', textAlign: 'center', opacity: 0.6 }}>
        <p style={{ letterSpacing: '3px', fontWeight: 'bold' }}>
          HAND-TAMPED EDGES &middot; NO ROLLER MARKS &middot; PROFESSIONAL CLEANUP
        </p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          ESTABLISHED 1984 | SOVEREIGN INFRASTRUCTURE &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default JWordenSovereignMaster;
