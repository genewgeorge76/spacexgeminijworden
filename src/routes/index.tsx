import React, { useState } from 'react';

// ====================================================================
// JWORDEN-AI SOVEREIGN LOGIC - TONNAGE & BIDDING ENGINE
// ====================================================================
const calculateTonnage = (lengthFeet: number, widthFeet: number, depthInches: number): number => {
  const squareFootage = lengthFeet * widthFeet;
  const depthFeet = depthInches / 12;
  const cubicFeet = squareFootage * depthFeet;
  const baseTons = (cubicFeet * 145) / 2000; // 145 lbs/cu ft standard density
  
  // The 12% Sovereign Waste Buffer - Profit Protection
  const sovereignBufferMultiplier = 1.12; 
  return Math.ceil(baseTons * sovereignBufferMultiplier);
};

// ====================================================================
// J. WORDEN & SONS - MASTER HOMEPAGE & COMMAND CENTER
// ====================================================================
export default function SupermaxMasterIndex() {
  // --- STATE FOR JARVIS COMMAND BOT & CALCULATOR ---
  const [chatOpen, setChatOpen] = useState(false);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [estimatedTons, setEstimatedTons] = useState(0);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setEstimatedTons(calculateTonnage(length, width, depth));
  };

  // --- 41-CITY EXPANSION GRID (SEO DOMINANCE) ---
  const pavingGrid = [
    "Richmond", "Midlothian", "Tuckahoe", "Short Pump", "Glen Allen", 
    "Mechanicsville", "Bon Air", "Lakeside", "Chester", "Chesterfield", 
    "Petersburg", "Hopewell", "Colonial Heights", "Moseley", "Dinwiddie", 
    "Prince George", "Virginia Beach", "Norfolk", "Chesapeake", "Newport News", 
    "Hampton", "Suffolk", "Portsmouth", "Williamsburg", "New Kent", "Powhatan", 
    "Goochland", "Hanover", "Henrico", "Amelia", "Ashland", "Charles City"
  ];

  return (
    <main className="worden-supermax-container" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. HEADQUARTERS & SEO AUTHORITY */}
      <header style={{ borderBottom: '4px solid #f39c12', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', margin: '0' }}>J. Worden & Sons Asphalt Paving</h1>
        <h2 style={{ color: '#555', marginTop: '0.5rem' }}>4th Generation Premium Commercial Paving</h2>
        <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem 0' }}><strong>National Headquarters:</strong> 1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836</p>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#f39c12' }}><strong>911 Dispatch:</strong> 804-446-1296</p>
          <p style={{ margin: '0', fontSize: '0.9rem' }}><em>100% Google Best Practices Certified | 2026 Houzz Authority | Class A Licensed</em></p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* 2. 3D MR. WORDEN ASSET ZONE */}
        <section style={{ padding: '2rem', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ textTransform: 'uppercase', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>The Digital Foreman</h3>
          {/* Netlify heavily caches this .glb file via netlify.toml for 0-lag loading */}
          <div id="mr-worden-canvas-container" style={{ height: '350px', backgroundColor: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
             <p style={{ color: '#666', fontWeight: 'bold' }}>[ @react-three/fiber Engine Active ]<br/>Rendering /public/mr-worden.glb</p>
          </div>
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            style={{ width: '100%', padding: '15px', backgroundColor: '#1a1a1a', color: '#00ff00', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '4px' }}>
            {chatOpen ? "CLOSE SECURE TERMINAL" : "INITIALIZE JARVIS COMMAND BOT"}
          </button>
        </section>

        {/* 3. JWORDEN-AI AUTONOMOUS BIDDING TERMINAL */}
        <section style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '8px', border: '2px solid #f39c12' }}>
          <h3 style={{ color: '#f39c12', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>JWordenAI | Live Estimator</h3>
          
          {chatOpen && (
            <div style={{ backgroundColor: '#000', padding: '1rem', border: '1px solid #00ff00', marginBottom: '1.5rem', fontFamily: 'monospace', color: '#00ff00' }}>
              <p>JARVIS: "Good day. Mr. Worden is managing the fleet in Chester. I am authorized to calculate your commercial asset requirements. Please input your site dimensions below."</p>
            </div>
          )}

          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Length (Feet)</label>
              <input type="number" required onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Width (Feet)</label>
              <input type="number" required onChange={(e) => setWidth(Number(e.target.value))} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Depth (Inches - Standard Commercial is 2-4")</label>
              <input type="number" required onChange={(e) => setDepth(Number(e.target.value))} style={{ width: '100%', padding: '10px' }} />
            </div>
            <button type="submit" style={{ padding: '15px', backgroundColor: '#f39c12', color: '#1a1a1a', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
              RUN SOVEREIGN LOGIC CALCULATION
            </button>
          </form>

          {estimatedTons > 0 && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#222', borderLeft: '5px solid #00ff00' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#00ff00' }}>APPROVED TONNAGE REQUIRED:</h4>
              <p style={{ fontSize: '2rem', margin: '0', fontWeight: 'bold' }}>{estimatedTons} TONS</p>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>*Includes mandatory 12% Sovereign Waste Buffer to ensure zero-delay project completion.</p>
            </div>
          )}
        </section>
      </div>

      {/* 4. DYNAMIC ROUTING GRID (THE 41 CITIES) */}
      <section style={{ marginTop: '4rem', borderTop: '2px solid #ddd', paddingTop: '2rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Virginia's Premier Paving Network</h3>
        <p style={{ color: '#555', marginBottom: '2rem' }}>Our digital routing engine deploys premium infrastructure services from our Chester hub to the following secure zones.</p>
        
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', listStyle: 'none', padding: 0 }}>
          {pavingGrid.map(city => {
            const citySlug = city.toLowerCase().replace(/\s+/g, '-');
            return (
              <li key={city} style={{ backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '4px', textAlign: 'center', transition: 'background 0.3s' }}>
                <a href={`/locations/${citySlug}`} style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold', display: 'block' }}>
                  Commercial Paving in {city}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 5. SUPERMAX FOOTER */}
      <footer style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', textAlign: 'center', borderRadius: '8px' }}>
        <p style={{ margin: '0' }}>&copy; 2026 J. Worden & Sons Asphalt Paving LLC. All Rights Reserved.</p>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '1rem' }}>Sovereign AI Infrastructure | Built to Google Top-Tier Standards</p>
      </footer>

    </main>
  );
}
