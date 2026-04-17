import React, { useState, useEffect } from 'react';

// ====================================================================
// JWORDEN-AI: SOVEREIGN CONSTRUCTION & INFRASTRUCTURE OPERATING SYSTEM
// ====================================================================
// VERSION: 2026.4.17 - SOUTHERN GENTLEMAN & GENTLEWOMAN EDITION
// FOCUS: VA-MD-NC-SC-GA COASTAL TRACK & 50-STATE DOMINANCE
// ====================================================================

export default function JWordenSovereignEngine() {
  const [sector, setSector] = useState<'initial' | 'commercial' | 'residential'>('initial');
  const [flow, setFlow] = useState<'intro' | 'structural' | 'aesthetic' | 'final'>('intro');
  const [sqft, setSqft] = useState(0);

  // --- THE SOVEREIGN CALCULATION ENGINE ---
  const handleStructuralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlow('aesthetic');
  };

  return (
    <main style={masterContainer}>
      
      {/* 1. NATIONAL AUTHORITY HEADER: THE COASTAL TRACK */}
      <header style={sovereignHeader}>
        <div style={headerOverlay}>
          <h1 style={brandTitle}>J. WORDEN & SONS</h1>
          <h2 style={brandSubtitle}>FULL-SERVICE GC | HISTORIC RESTORATION | COASTAL INFRASTRUCTURE</h2>
          <div style={hqBadge}>
            <strong>HQ:</strong> 1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836 | <strong>911 DISPATCH:</strong> 804-446-1296
          </div>
          <div style={regionStrip}>SERVING THE VA-MD-NC-SC-GA COASTAL CORRIDOR & NATIONWIDE</div>
        </div>
      </header>

      <div style={contentWrapper}>

        {/* 2. THE DUAL-PERSONA INTERFACE: MR. & MRS. WORDEN */}
        <section style={engineCard}>
          
          {/* STAGE 1: THE SECTOR FORK */}
          {sector === 'initial' && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
              <h2 style={sectionTitle}>"A Legacy of Integrity. A Future of Precision."</h2>
              <div style={gridTwo}>
                <button onClick={() => setSector('commercial')} style={heroBtn('#f39c12')}>
                  <h3>COMMERCIAL GC</h3>
                  <p>National Franchise Assets | 3D Site Predictability | Big Tonnage Precision</p>
                </button>
                <button onClick={() => setSector('residential')} style={heroBtn('#d4af37')}>
                  <h3>PREMIUM RESIDENTIAL</h3>
                  <p>Historic Restorations | Estate Design | The Worden Legacy Shield</p>
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: MR. WORDEN (THE SOUTHERN GENTLEMAN - STRUCTURAL OATH) */}
          {sector !== 'initial' && flow === 'intro' && (
            <div style={{ animation: 'slideIn 0.8s' }}>
              <div style={personaBadge('#f39c12')}>MR. WORDEN: THE STRUCTURAL AUTHORITY</div>
              <p style={gentlemanQuote}>
                "In my family, we don't build for the check—we build for the next generation. Whether we're managing 
                a 100-site rollout for a national brand or restoring a historic driveway in Windsor Farms, 
                quality is non-negotiable. At J. Worden & Sons, the **6-Inch Stone Base** is the law of the land. 
                Anything less is just sand. Let's look at the dimensions of your project."
              </p>
              <form onSubmit={() => setFlow('structural')} style={formStyle}>
                <button type="submit" style={actionBtn}>INITIALIZE 3D SITE ANALYSIS</button>
              </form>
            </div>
          )}

          {/* STAGE 3: THE 6-INCH MANDATE (CALCULATION) */}
          {flow === 'structural' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 style={{ color: '#f39c12', textTransform: 'uppercase' }}>SOVEREIGN MATH & PREDICTABILITY</h3>
              <p style={{ fontSize: '0.9rem', color: '#888' }}>Applying 12% Sovereign Waste Buffer & Worden Standard Load-Bearing Specs...</p>
              <form onSubmit={handleStructuralSubmit} style={formStyle}>
                <label>Total Square Footage of Project Site:</label>
                <input 
                  type="number" 
                  placeholder="e.g., 15000" 
                  style={inputStyle} 
                  onChange={(e) => setSqft(Number(e.target.value))}
