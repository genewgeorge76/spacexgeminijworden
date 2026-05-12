import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

// ====================================================================
// JWORDEN-AI: THE SOVEREIGN ASPHALT & INFRASTRUCTURE ENGINE
// ====================================================================
// VERSION: 2026.4.17 - BREADWINNER EDITION
// FOCUS: PAVING DOMINANCE + FULL-SERVICE GC EXPANSION
// PERSONALITY: MR. WORDEN (PAVING KING) & MRS. WORDEN (DESIGN QUEEN)
// ====================================================================

export const Route = createFileRoute('/')({
  component: SovereignPowerhouse,
});

function SovereignPowerhouse() {
  const [sector, setSector] = useState<'initial' | 'paving' | 'construction'>('initial');
  const [stage, setStage] = useState<'intro' | 'structural' | 'finish'>('intro');
  const [sqft, setSqft] = useState(0);

  return (
    <main style={styles.container}>
      
      {/* 1. THE SOVEREIGN HEADER: THE PAVING POWERHOUSE */}
      <header style={styles.header}>
        <div style={styles.headerOverlay}>
          <h1 style={styles.mainTitle}>J. WORDEN & SONS</h1>
          <h2 style={styles.subTitle}>AWARD-WINNING ASPHALT PAVING | SOVEREIGN INFRASTRUCTURE | FULL GC</h2>
          <div style={styles.hqStrip}>
            <strong>CHEATER HEADQUARTERS:</strong> 1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836 | <strong>DIRECT:</strong> 804-446-1296
          </div>
          <div style={styles.trackPill}>DOMINATING THE VA-MD-NC-SC-GA COASTAL TRACK & NATIONWIDE</div>
        </div>
      </header>

      <div style={styles.content}>

        {/* 2. THE DUAL-PERSONA INTERFACE */}
        <section style={styles.engineCard}>
          
          {/* SECTOR FORK: LEAD WITH THE REVENUE ENGINE (PAVING) */}
          {sector === 'initial' && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
              <h2 style={styles.greeting}>"Securing Your Infrastructure Since 1984."</h2>
              <div style={styles.grid}>
                <button onClick={() => setSector('paving')} style={styles.heroBtn('#f39c12')}>
                  <h3>ASPHALT & INFRASTRUCTURE</h3>
                  <p>Commercial Lots | Estate Paving | 6-Inch Stone Mandate</p>
                </button>
                <button onClick={() => setSector('construction')} style={styles.heroBtn('#d4af37')}>
                  <h3>CUSTOM CONSTRUCTION & REMODEL</h3>
                  <p>Historic Restorations | New Builds | Luxury Design</p>
                </button>
              </div>
              <p style={{ marginTop: '2rem', color: '#666' }}>Award-Winning Excellence Across 4 Generations.</p>
            </div>
          )}

          {/* MR. WORDEN: THE PAVING KING (COMMERCIAL SALESMAN LOGIC) */}
          {sector !== 'initial' && stage === 'intro' && (
            <div style={{ animation: 'slideIn 0.7s' }}>
              <span style={styles.badge('#f39c12')}>MR. WORDEN: THE SOVEREIGN AUTHORITY</span>
              <p style={styles.quote}>
                "Paving is the heartbeat of this company. My family didn't become the best by cutting corners. 
                Whether we're handling a 100-site commercial rollout or a Windsor Farms estate, we lead with the 
                **6-Inch Stone Base Mandate**. It’s the Worden Standard—Award-Winning infrastructure built 
                to last 50 years, not 5. If you're looking for the cheapest bid, look elsewhere. 
                If you're looking for a predictable, high-performing asset, let's get to work."
              </p>
              <form onSubmit={() => setStage('structural')} style={styles.form}>
                <button type="submit" style={styles.actionBtn}>INITIALIZE PAVING & SITE ANALYSIS</button>
              </form>
            </div>
          )}

          {/* THE STRUCTURAL CALCULATION (REVENUE PROTECTION) */}
          {stage === 'structural' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 style={{ color: '#f39c12', textTransform: 'uppercase' }}>ASSET CALCULATION ENGINE</h3>
              <p style={{ color: '#888' }}>Applying 12% Sovereign Buffer & 3D Load-Bearing Specs...</p>
              <form onSubmit={(e) => { e.preventDefault(); setStage('finish'); }} style={styles.form}>
                <label style={{ display: 'block', marginBottom: '10px' }}>Total Paving or Construction Sq Ft:</label>
                <input 
                  type="number" 
                  style={styles.input} 
                  placeholder="e.g., 50000" 
                  onChange={(e) => setSqft(Number(e.target.value))}
                  required 
                />
                <button type="submit" style={styles.actionBtn}>VALIDATE ACCOUNTING & PROCEED</button>
              </form>
            </div>
          )}

          {/* MRS. WORDEN: THE DESIGN COMPANION (HOSPITALITY LOGIC) */}
          {stage === 'finish' && (
            <div style={{ animation: 'fadeIn 1s' }}>
              <div style={styles.status}>
                <strong>MR. WORDEN:</strong> "Tonnage secured. 6-inch base verified. Predictability status: 100%. Talk to my wife about the finishing touches."
              </div>
              
              <span style={styles.badge('#00ff00')}>MRS. WORDEN: THE VISIONARY COMPANION</span>
              <p style={styles.wittyQuote}>
                "He's all about the machines and the math, isn't he? But that's why our driveways outlast the houses. 
                Now that the structural grit is handled, let's talk about the **Aesthetic ROI**. 
                From cobblestone aprons to historic brick walkways that match your foyer, I ensure 
                the Worden legacy extends from the curb to the couch."
              </p>

              <div style={styles.grid}>
                <div style={styles.card}>
                  <h4>PREMIUM UPGRADES</h4>
                  <p>Cobblestone, Brick Inlay, & High-End Masonry.</p>
                </div>
                <div style={styles.card}>
                  <h4>THE LEGACY SHIELD</h4>
                  <p>Our Award-Winning maintenance & protection protocol.</p>
                </div>
                <div style={styles.card}>
                  <h4>INTERIOR DESIGN BRIDGE</h4>
                  <p>Coordinating foyer aesthetics with exterior construction.</p>
                </div>
                <div style={styles.card}>
                  <h4>THE SUNDAY RECIPE</h4>
                  <p>A gift for the family while the new surface cures.</p>
                </div>
              </div>
              <button onClick={() => {setSector('initial'); setStage('intro');}} style={styles.reset}>Return to Command Center</button>
            </div>
          )}
        </section>

        {/* 3. THE WALL OF PROOF: ESTABLISHED DOMINANCE */}
        <section style={styles.proofSection}>
          <h3 style={styles.proofTitle}>THE AWARD-WINNING RECORD</h3>
          <div style={styles.proofGrid}>
            <div style={styles.proofCard}>
              <strong>100+ FRANCHISE ASSETS:</strong>
              <p>National Commercial Preferred GC for KFC, Taco Bell, & Arby's.</p>
            </div>
            <div style={styles.proofCard}>
              <strong>HISTORIC DINWIDDIE:</strong>
              <p>Recognized by the Virginia Historical Society for Excellence in Paving.</p>
            </div>
            <div style={styles.proofCard}>
              <strong>ESTABLISHED RICHMOND:</strong>
              <p>Serving Windsor Farms, Tuckahoe, & the Museum District for decades.</p>
            </div>
          </div>
        </section>

      </div>

      {/* 4. SIL: SOVEREIGN INTELLIGENCE LAYER */}
      <footer style={styles.footer}>
        <div style={styles.silPill}>
          JWordenAI INVESTIGATING: [ASPHALT TECH BREAKTHROUGHS] [COASTAL INFRASTRUCTURE] [HISTORIC RICHMOND RECOVERY]
        </div>
        <p style={styles.copy}>&copy; 2026 J. WORDEN & SONS | SOVEREIGN CLASS A GC | THE BREADWINNER OF ASPHALT</p>
      </footer>
    </main>
  );
}

// ====================================================================
// THE POWERHOUSE STYLE SYSTEM
// ====================================================================

const styles = {
  container: { backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'Garamond, serif' },
  header: { padding: '5rem 1rem', textAlign: 'center' as const, borderBottom: '5px solid #d4af37', background: '#111' },
  headerOverlay: { maxWidth: '1100px', margin: '0 auto' },
  mainTitle: { fontSize: '4.5rem', margin: 0, letterSpacing: '8px', fontWeight: '900' },
  subTitle: { color: '#d4af37', fontSize: '1.3rem', textTransform: 'uppercase' as const, letterSpacing: '4px', marginTop: '10px' },
  hqStrip: { marginTop: '20px', fontSize: '0.9rem', color: '#888' },
  trackPill: { marginTop: '20px', display: 'inline-block', padding: '10px 20px', background: '#222', borderRadius: '30px', fontSize: '0.8rem', color: '#d4af37', fontWeight: 'bold' as const },
  content: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' },
  engineCard: { background: '#111', borderRadius: '15px', padding: '4rem', border: '1px solid #222', boxShadow: '0 40px 100px rgba(0,0,0,1)' },
  greeting: { fontSize: '2.5rem', fontWeight: '300', marginBottom: '3.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  heroBtn: (color: string) => ({ background: '#0a0a0a', border: `2px solid ${color}`, color, padding: '4rem 1.5rem', cursor: 'pointer', borderRadius: '4px', transition: '0.3s' }),
  badge: (color: string) => ({ display: 'inline-block', padding: '5px 15px', border: `1px solid ${color}`, color, borderRadius: '20px', fontSize: '0.7rem', textTransform: 'uppercase' as const, marginBottom: '20px' }),
  quote: { fontSize: '1.6rem', fontStyle: 'italic', lineHeight: '1.8', borderLeft: '6px solid #f39c12', paddingLeft: '35px', color: '#eee' },
  wittyQuote: { fontSize: '1.6rem', fontStyle: 'italic', lineHeight: '1.8', borderLeft: '6px solid #00ff00', paddingLeft: '35px', color: '#eee' },
  form: { marginTop: '3rem', background: '#1a1a1a', padding: '3.5rem', borderRadius: '8px' },
  input: { width: '100%', padding: '20px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '1.5rem', marginBottom: '20px' },
  actionBtn: { width: '100%', padding: '22px', background: '#f39c12', color: '#000', fontWeight: 'bold' as const, border: 'none', cursor: 'pointer', fontSize: '1.3rem', letterSpacing: '1px' },
  status: { background: '#222', padding: '25px', borderLeft: '6px solid #d4af37', marginBottom: '45px', fontSize: '1.1rem' },
  card: { background: '#1a1a1a', padding: '2.5rem', border: '1px solid #222', textAlign: 'center' as const },
  reset: { marginTop: '40px', background: 'none', border: 'none', color: '#444', cursor: 'pointer', textDecoration: 'underline' },
  proofSection: { marginTop: '7rem', borderTop: '2px solid #222', paddingTop: '5rem' },
  proofTitle: { textAlign: 'center' as const, color: '#444', letterSpacing: '6px', fontSize: '1.2rem' },
  proofGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '4rem' },
  proofCard: { background: '#0a0a0a', padding: '3rem', border: '1px solid #111' },
  footer: { padding: '7rem', background: '#000', textAlign: 'center' as const, borderTop: '3px solid #111' },
  silPill: { display: 'inline-block', padding: '12px 30px', border: '1px solid #d4af37', borderRadius: '40px', color: '#d4af37', fontSize: '0.85rem' },
  copy: { marginTop: '4rem', color: '#222', fontSize: '0.75rem' }
};
