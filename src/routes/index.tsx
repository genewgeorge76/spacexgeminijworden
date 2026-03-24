import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div>
      <header style={{ background: '#111', color: '#fff', padding: '2rem', textAlign: 'center', borderBottom: '5px solid #ffcc00' }}>
        <h1 style={{ margin: 0 }}>J. WORDEN & SONS</h1>
        <p style={{ margin: 0, marginTop: '10px' }}>4th-Generation Paving | 2015 Transition Leadership</p>
      </header>
      <div className="award-banner" style={{ background: '#ffcc00', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
        🏆 4-TIME BEST OF HOUZZ WINNER | TOP CONTRACTOR AWARD
      </div>
      <div className="container" style={{ maxWidth: '1000px', margin: 'auto', padding: '2rem', textAlign: 'center' }}>
        <h2>The Structural Standard: 6-Inch Stone Base</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '10px auto 20px' }}>
          Most paving contractors use a 4-inch compacted stone base. <strong>J. Worden &amp; Sons installs a full 6-inch compacted #21A stone base</strong> — the same specification demanded by national commercial chains and Virginia’s most exclusive subdivisions.
        </p>
        <p>Vetted by <strong>KFC, Arby’s, and Taco Bell</strong>. Serving <strong>Maidstone Village</strong> and the 41-City VA Grid.</p>
        <a href="tel:8044461296" className="btn" style={{ background: '#ffcc00', color: '#000', padding: '1rem 2rem', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px', display: 'inline-block' }}>CALL 804-446-1296</a>
        <br /><br />
        <a href="https://www.houzz.com/pro/jwordenandsonspaving" target="_blank" rel="noreferrer" style={{ color: '#7ac143', fontWeight: 'bold' }}>VIEW OUR HOUZZ PRO REVIEWS</a>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}><h3>Commercial</h3> Milling, Striping, Parking Lots.</div>
            <div className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}><h3>Residential</h3> Driveways, Jewelry Finish, Sealcoating.</div>
            <div className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}><h3>Repair</h3> Crack Filling & Industrial Maintenance.</div>
        </div>
      </div>
      <section style={{ background: '#111', color: '#fff', padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: 'auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', color: '#ffcc00', marginBottom: '1rem' }}>Why the 6-Inch Standard Matters</h2>
              <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                  The foundation beneath your asphalt is what separates a driveway that lasts 30 years from one that cracks in 5. Our 6-inch #21A compacted stone base provides superior load distribution, drainage, and freeze-thaw resistance.
              </p>
              <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div style={{ background: '#222', border: '1px solid #ffcc00', padding: '24px', borderRadius: '10px' }}>
                      <h4 style={{ color: '#ffcc00', margin: '0 0 10px 0' }}>50% More Base Depth</h4>
                      <p style={{ margin: 0, color: '#ccc' }}>Industry standard is 4 inches. We build to 6 inches — providing 50% more compacted base for long-term structural integrity under heavy loads.</p>
                  </div>
                  <div style={{ background: '#222', border: '1px solid #ffcc00', padding: '24px', borderRadius: '10px' }}>
                      <h4 style={{ color: '#ffcc00', margin: '0 0 10px 0' }}>Commercial-Grade #21A Stone</h4>
                      <p style={{ margin: 0, color: '#ccc' }}>We use VDOT-spec #21A crushed aggregate — the same material required for Virginia state road construction — compacted in lifts for maximum density.</p>
                  </div>
                  <div style={{ background: '#222', border: '1px solid #ffcc00', padding: '24px', borderRadius: '10px' }}>
                      <h4 style={{ color: '#ffcc00', margin: '0 0 10px 0' }}>National Chain Approved</h4>
                      <p style={{ margin: 0, color: '#ccc' }}>KFC, Arby’s, and Taco Bell require this specification for all their property installations. We bring that same commercial standard to every residential project.</p>
                  </div>
              </div>
          </div>
      </section>
      <section className="residential-dominance" style={{ background: '#fff', padding: '4rem 1rem', borderTop: '2px solid #ffcc00' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: 'auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#111' }}>Custom Residential Driveway Design</h2>
              <p style={{ fontSize: '1.1rem', maxWidth: '900px', margin: '20px auto' }}>
                  A driveway is the first impression of your estate. At <strong>J. Worden & Sons</strong>, we treat every residential project with the same industrial precision used for our national commercial contracts. 
              </p>
              
              <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                  <div className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                      <h4 style={{ margin: '0 0 10px 0' }}>Luxury Estate Paving</h4>
                      <p style={{ margin: 0 }}>From McLean to Great Falls, we specialize in high-end finishes, hand-set Belgian block borders, and precision drainage for luxury estates.</p>
                  </div>
                  <div className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                      <h4 style={{ margin: '0 0 10px 0' }}>4-Time Best of Houzz Service</h4>
                      <p style={{ margin: 0 }}>Verified 4.8-star reputation. We are the only 4th-generation firm in the region with this level of verified residential success.</p>
                  </div>
                  <div className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                      <h4 style={{ margin: '0 0 10px 0' }}>HOA & Subdivision Specialists</h4>
                      <p style={{ margin: 0 }}>Preferred infrastructure partner for <strong>Maidstone Village</strong> and premier HOAs across Virginia.</p>
                  </div>
              </div>
          </div>
      </section>
      <footer style={{ background: '#111', color: '#fff', padding: '2rem', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ margin: 0 }}>J. Worden & Sons Asphalt Paving - Independent 4th-Gen Legacy Since 1984</p>
      </footer>
    </div>
  )
}
