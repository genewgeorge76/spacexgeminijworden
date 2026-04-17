import { useState, useEffect, useRef, type CSSProperties } from 'react';

type Role = 'jarvis' | 'user';

interface Message {
  role: Role;
  content: string;
}

const JarvisForeman = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendJarvisMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'jarvis', content: text }]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      sendJarvisMessage(
        'Good day. I am Jarvis, the Worden Digital Foreman. Mr. Worden is currently managing our premium fleet at the Chester headquarters, but he has authorized me to walk you through our Gold Standard protocols. Are we discussing a commercial asset or a private estate today?',
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUserAction = (input: string) => {
    const userText = input.trim();
    if (!userText) return;
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setInputValue('');
    const query = userText.toLowerCase();

    if (query.includes('commercial') || query.includes('reit')) {
      sendJarvisMessage(
        'Understood, sir. For our commercial partners, we deploy the Sunday Protocol™. This ensures zero downtime while we engineer a high-traffic foundation. Shall I show you the 3D integrity of our base-layer compaction?',
      );
    } else if (query.includes('driveway') || query.includes('residential')) {
      sendJarvisMessage(
        'Excellent choice. A private estate deserves the Worden Console-Edged finish. Shall we open the gallery of our signature masonry-edged driveways?',
      );
    } else {
      sendJarvisMessage(
        'I want to ensure I provide the exact engineering your property requires. Are we looking at a commercial modernization or a premium residential enhancement?',
      );
    }
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
      maxHeight: '550px',
      backgroundColor: '#0D0D0D',
      border: '1px solid #D4AF37',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
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
      backgroundColor: '#D4AF37',
      color: '#000',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 800,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontSize: '12px',
    },
    status: {
      width: '8px',
      height: '8px',
      backgroundColor: '#00FF00',
      borderRadius: '50%',
      marginRight: '12px',
      boxShadow: '0 0 8px #00FF00',
    },
    body: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      minHeight: '300px',
    },
    bubble: (role) => ({
      maxWidth: '85%',
      padding: '12px 16px',
      borderRadius: role === 'jarvis' ? '0 15px 15px 15px' : '15px 15px 0 15px',
      fontSize: '14px',
      lineHeight: 1.5,
      backgroundColor: role === 'jarvis' ? '#1A1A1A' : '#D4AF37',
      color: role === 'jarvis' ? '#FFFFFF' : '#000000',
      alignSelf: role === 'jarvis' ? 'flex-start' : 'flex-end',
      border: role === 'jarvis' ? '1px solid #333' : 'none',
    }),
    footer: {
      padding: '15px',
      borderTop: '1px solid #222',
      display: 'flex',
      gap: '10px',
      backgroundColor: '#111',
    },
    input: {
      flex: 1,
      backgroundColor: '#000',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '10px 15px',
      color: '#FFF',
      fontSize: '14px',
      outline: 'none',
    },
    button: {
      backgroundColor: '#D4AF37',
      border: 'none',
      borderRadius: '8px',
      padding: '0 20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#000',
    },
  };

  return (
    <div style={styles.container} role="dialog" aria-label="Jarvis Worden Digital Foreman">
      <div style={styles.header}>
        <div style={styles.status} aria-hidden="true"></div>
        JARVIS | Worden Digital Foreman
      </div>
      <div style={styles.body}>
        {messages.map((m, i) => (
          <div key={i} style={styles.bubble(m.role)}>
            {m.content}
          </div>
        ))}
        {isTyping && <div style={{ color: '#555', fontSize: '12px' }}>Jarvis is calculating...</div>}
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
          placeholder="Speak with the Foreman..."
          aria-label="Message Jarvis"
        />
        <button style={styles.button} onClick={() => handleUserAction(inputValue)}>
          SEND
        </button>
      </div>
    </div>
  );
};

export default JarvisForeman;
