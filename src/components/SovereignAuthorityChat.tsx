import { useState, useEffect, useRef, type CSSProperties } from 'react';
import {
  dispatchPreliminaryReport,
  matchAddressToGrid,
  type DispatchMatch,
} from '@/lib/sovereignDispatcher';

type Role = 'authority' | 'user' | 'system';

interface Message {
  role: Role;
  content: string;
}

// Heuristic to sniff an address out of a user message. Looks for a street
// number followed by words, optionally a comma, and a recognized city name
// or a two-letter state / ZIP. The full dispatcher then confirms the city.
const ADDRESS_RE = /\b\d{1,6}\s+[A-Za-z][A-Za-z0-9\s.'-]{2,},?\s*[A-Za-z][A-Za-z\s]*(?:,\s*[A-Z]{2})?(?:\s+\d{5})?/;

const SovereignAuthorityChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dispatching, setDispatching] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendAuthorityMessage = (text: string, delay = 900) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'authority', content: text }]);
      setIsTyping(false);
    }, delay);
  };

  const pushSystemMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'system', content: text }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      sendAuthorityMessage(
        'Good day. I am J. Worden, the Sovereign Authority. I am personally overseeing operations from the Chester headquarters and will walk you through our Gold Standard protocols. Share your project address and I will instantly dispatch a branded Preliminary Site Report if you sit inside our 41-city Sovereign Grid.',
        1200,
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const triggerDispatch = async (address: string, match: DispatchMatch) => {
    setDispatching(true);
    try {
      await dispatchPreliminaryReport({ address });
      pushSystemMessage(
        `📎 Preliminary Site Report dispatched — ${match.matchedCity} hub. Check your downloads.`,
      );
      sendAuthorityMessage(
        `Done. Your Preliminary Site Report for ${match.matchedCity} just downloaded to this device. It carries the six-inch mandate, the tonnage baseline, and an investment range — field-walked by a Sovereign Foreman inside 24 hours. When you are ready for the binding proposal, dial 804-446-1296.`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Report generation failed.';
      pushSystemMessage(`⚠️ Dispatcher error — ${msg}`);
      sendAuthorityMessage(
        'The dispatcher hit a snag generating your report. Dial 804-446-1296 and a Sovereign Foreman will deliver it by hand within the hour.',
      );
    } finally {
      setDispatching(false);
    }
  };

  const handleUserAction = (input: string) => {
    const userText = input.trim();
    if (!userText || dispatching) return;
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setInputValue('');
    const query = userText.toLowerCase();

    // ── Sovereign Dispatcher: address detection in the user's message ──
    const addrMatch = userText.match(ADDRESS_RE);
    if (addrMatch) {
      const address = addrMatch[0].trim();
      const grid = matchAddressToGrid(address);
      if (grid.inGrid) {
        sendAuthorityMessage(
          `Confirmed — ${grid.matchedCity} sits inside the Sovereign Grid. Generating your branded J. Worden Preliminary Site Report now…`,
          700,
        );
        setTimeout(() => void triggerDispatch(address, grid), 1600);
        return;
      }
      sendAuthorityMessage(
        `That address sits outside our core 41-city grid, but our coastal track covers VA · MD · NC · SC · GA. Give me a primary city (e.g., Richmond, Chesterfield, Fredericksburg) and I will still dispatch a preliminary report by hand.`,
      );
      return;
    }

    if (query.includes('report') || query.includes('pdf') || query.includes('dispatch')) {
      sendAuthorityMessage(
        'Understood. Paste your street address and primary city — e.g., “1601 Ware Bottom Springs Rd, Chester VA 23836” — and I will generate the Preliminary Site Report on the spot.',
      );
      return;
    }

    if (query.includes('commercial') || query.includes('reit')) {
      sendAuthorityMessage(
        'Understood. For our commercial partners, we deploy the Sunday Protocol™ — zero downtime while we engineer a high-traffic foundation. Share the site address and I will dispatch a branded Preliminary Site Report from our 41-city grid.',
      );
      return;
    }

    if (query.includes('driveway') || query.includes('residential')) {
      sendAuthorityMessage(
        'Excellent choice. A private estate deserves the Worden Console-Edged finish on a true six-inch base. Give me the property address and I will auto-generate your Preliminary Site Report.',
      );
      return;
    }

    sendAuthorityMessage(
      'I want to ensure I specify the exact engineering your property requires. Share the site address — commercial or residential — and I will dispatch a Preliminary Site Report on the spot.',
    );
  };

  const styles: {
    container: CSSProperties;
    header: CSSProperties;
    status: CSSProperties;
    body: CSSProperties;
    bubble: (role: Role) => CSSProperties;
    footer: CSSProperties;
    input: CSSProperties;
    button: CSSProperties;
  } = {
    container: {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '380px',
      maxHeight: '580px',
      backgroundColor: 'rgba(13,13,13,0.9)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid #F6D97A',
      borderRadius: '16px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(246,217,122,0.22)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Inter", sans-serif',
      zIndex: 10000,
      overflow: 'hidden',
      transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
      pointerEvents: isOpen ? 'auto' : 'none',
    },
    header: {
      padding: '18px',
      background: 'linear-gradient(135deg, #F6D97A 0%, #D4A844 45%, #8C6A1F 100%)',
      color: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 800,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      fontSize: '12px',
    },
    status: {
      width: '8px',
      height: '8px',
      backgroundColor: '#00FF66',
      borderRadius: '50%',
      marginRight: '12px',
      boxShadow: '0 0 8px #00FF66',
    },
    body: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minHeight: '300px',
    },
    bubble: (role) => {
      if (role === 'system') {
        return {
          alignSelf: 'center',
          maxWidth: '92%',
          padding: '8px 14px',
          borderRadius: '8px',
          fontSize: '11px',
          lineHeight: 1.5,
          backgroundColor: 'rgba(246,217,122,0.12)',
          color: '#F6D97A',
          border: '1px solid rgba(246,217,122,0.35)',
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          fontWeight: 700,
        };
      }
      return {
        maxWidth: '85%',
        padding: '12px 16px',
        borderRadius: role === 'authority' ? '0 15px 15px 15px' : '15px 15px 0 15px',
        fontSize: '14px',
        lineHeight: 1.5,
        backgroundColor: role === 'authority' ? 'rgba(26,26,26,0.9)' : '#F6D97A',
        color: role === 'authority' ? '#FFFFFF' : '#0a0a0a',
        alignSelf: role === 'authority' ? 'flex-start' : 'flex-end',
        border: role === 'authority' ? '1px solid rgba(246,217,122,0.25)' : 'none',
        backdropFilter: role === 'authority' ? 'blur(6px)' : undefined,
      };
    },
    footer: {
      padding: '15px',
      borderTop: '1px solid rgba(246,217,122,0.25)',
      display: 'flex',
      gap: '10px',
      background: 'rgba(17,17,17,0.85)',
    },
    input: {
      flex: 1,
      backgroundColor: '#000',
      border: '1px solid rgba(246,217,122,0.35)',
      borderRadius: '8px',
      padding: '10px 15px',
      color: '#FFF',
      fontSize: '14px',
      outline: 'none',
    },
    button: {
      background: 'linear-gradient(135deg, #F6D97A 0%, #D4A844 45%, #8C6A1F 100%)',
      border: 'none',
      borderRadius: '8px',
      padding: '0 20px',
      fontWeight: 900,
      letterSpacing: '1.5px',
      cursor: dispatching ? 'not-allowed' : 'pointer',
      color: '#0a0a0a',
      fontSize: '12px',
      opacity: dispatching ? 0.6 : 1,
    },
  };

  return (
    <div style={styles.container} role="dialog" aria-label="J. Worden Sovereign Authority">
      <div style={styles.header}>
        <div style={styles.status} aria-hidden="true"></div>
        J. Worden | Sovereign Authority
      </div>
      <div style={styles.body}>
        {messages.map((m, i) => (
          <div key={i} style={styles.bubble(m.role)}>
            {m.content}
          </div>
        ))}
        {isTyping && <div style={{ color: '#888', fontSize: '12px' }}>J. Worden is calculating…</div>}
        {dispatching && (
          <div style={{ color: '#F6D97A', fontSize: '12px', letterSpacing: 1, fontWeight: 700 }}>
            📎 Dispatcher rendering Preliminary Site Report…
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.footer}>
        <input
          style={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUserAction(inputValue);
          }}
          placeholder="Share site address to auto-dispatch…"
          aria-label="Message J. Worden"
          disabled={dispatching}
        />
        <button
          style={styles.button}
          onClick={() => handleUserAction(inputValue)}
          disabled={dispatching}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default SovereignAuthorityChat;
