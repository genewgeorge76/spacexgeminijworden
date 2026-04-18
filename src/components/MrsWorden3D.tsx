import { useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react';

const ROSE_GOLD = '#E8B4A0';
const IVORY = '#F5E6D3';

const floatingContainer: CSSProperties = {
  perspective: '1000px',
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  zIndex: 1000,
};

const inlineContainer: CSSProperties = {
  perspective: '1000px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
  minHeight: '300px',
  zIndex: 50,
  isolation: 'isolate',
};

const styles = {
  wordenCard: {
    width: '320px',
    maxWidth: '100%',
    background: 'rgba(22, 18, 18, 0.92)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: `1px solid ${ROSE_GOLD}4D`,
    borderRadius: '24px',
    padding: '20px',
    transition: 'transform 0.1s ease-out',
    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px ${ROSE_GOLD}22`,
    willChange: 'transform',
    fontFamily: '"Inter", sans-serif',
    position: 'relative',
    zIndex: 51,
  } satisfies CSSProperties,
  roseGlow: {
    color: ROSE_GOLD,
    textShadow: `0 0 10px ${ROSE_GOLD}66`,
    fontWeight: 900,
    letterSpacing: '1px',
    margin: 0,
  } as CSSProperties,
} as const;

interface MrsWorden3DProps {
  inline?: boolean;
}

const MrsWorden3D = ({ inline = false }: MrsWorden3DProps = {}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const tiltFromPoint = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -20);
    setRotateY((x - 0.5) * 20);
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    tiltFromPoint(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    tiltFromPoint(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
  };

  const reset = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const cardStyle: CSSProperties = {
    ...styles.wordenCard,
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };

  return (
    <div
      style={inline ? inlineContainer : floatingContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onTouchMove={handleTouchMove}
      onTouchEnd={reset}
      onTouchCancel={reset}
      aria-label="Mrs. Betty Worden visionary companion card"
    >
      <div style={cardStyle}>
        <div style={{ fontSize: '10px', color: '#B89A8A', marginBottom: '5px', letterSpacing: '2px' }}>
          VISIONARY COMPANION &bull; EST. 1984
        </div>
        <h2 style={styles.roseGlow}>MRS. BETTY WORDEN</h2>
        <div style={{ fontSize: '14px', lineHeight: 1.4, marginTop: '10px', color: IVORY }}>
          &ldquo;John laid the stone; I made sure the house was worth coming home to.
          Four decades of Sunday dinners, finished details, and families we still greet by name.
          The curb is his — the couch is mine.&rdquo;
        </div>
        <div
          style={{
            marginTop: '20px',
            borderTop: '1px solid #3a2d2d',
            paddingTop: '10px',
            fontSize: '12px',
            color: '#D8C5B5',
          }}
        >
          <span style={{ color: ROSE_GOLD }}>&bull;</span> LEGACY OF HOSPITALITY &middot; 1984 &ndash; TODAY
        </div>
      </div>
    </div>
  );
};

export default MrsWorden3D;
