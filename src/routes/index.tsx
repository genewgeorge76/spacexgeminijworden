import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div>
      <section className="hero-video-container">
        <video autoPlay muted loop playsInline poster="fallback-image.jpg" className="back-video">
          <source src="your-paver-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>4 Generations of Infrastructure Authority</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>The 6-Inch Compacted Stone Standard | Richmond & Beyond</p>
          <div className="cta-buttons">
            <a href="tel:8042442609" className="btn-911">🚨 911 DISPATCH</a>
            <a href="#contact" className="btn-outline">REQUEST AUDIT</a>
          </div>
        </div>
      </section>

      <div className="award-banner" style={{ background: '#ffcc00', padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#000', textTransform: 'uppercase' }}>
        🏆 4-Time Best of Houzz Winner | The Top Contractor Award for Paving Excellence
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: 'auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#111', marginBottom: '20px' }}>The Structural Standard: 6-Inch Stone Base</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.6' }}>
          Vetted by <strong>KFC, Arby’s, and Taco Bell</strong>. Serving <strong>Maidstone Village</strong> and the complete 41-City VA Grid. We build foundations that last generations.
        </p>
        <a href="tel:8044461296" className="btn" style={{ background: '#ffcc00', color: '#000', padding: '1.2rem 2.5rem', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px', display: 'inline-block', fontSize: '1.1rem', marginBottom: '20px' }}>CALL 804-446-1296</a>
        <br />
        <a href="https://www.houzz.com/pro/jwordenandsonspaving" target="_blank" rel="noreferrer" style={{ color: '#7ac143', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'underline' }}>VERIFIED BY HOUZZ PRO REVIEWS</a>
        
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '50px' }}>
            <div className="card" style={{ border: '1px solid #eee', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'left' }}>
              <h3 style={{ color: '#ff9900', borderBottom: '2px solid #ff9900', paddingBottom: '10px' }}>Commercial Paving</h3> 
              <p style={{ marginTop: '15px', color: '#555' }}>Heavy-duty milling, precision striping, and expansive parking lot construction designed for high traffic and maximum durability.</p>
            </div>
            <div className="card" style={{ border: '1px solid #eee', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'left' }}>
              <h3 style={{ color: '#ff9900', borderBottom: '2px solid #ff9900', paddingBottom: '10px' }}>Residential Estates</h3> 
              <p style={{ marginTop: '15px', color: '#555' }}>Luxury custom driveways, flawless jewelry finish, and professional sealcoating to protect and elevate your property value.</p>
            </div>
            <div className="card" style={{ border: '1px solid #eee', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'left' }}>
              <h3 style={{ color: '#ff9900', borderBottom: '2px solid #ff9900', paddingBottom: '10px' }}>Industrial Repair</h3> 
              <p style={{ marginTop: '15px', color: '#555' }}>Advanced hot pour crack filling, pothole patching, and comprehensive industrial maintenance programs.</p>
            </div>
        </div>
      </div>

      <section className="residential-dominance" style={{ background: '#f9fafb', padding: '5rem 2rem', borderTop: '4px solid #ffcc00' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: 'auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#111', marginBottom: '20px' }}>Custom Residential Driveway Design</h2>
              <p style={{ fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 40px', color: '#444', lineHeight: '1.6' }}>
                  A driveway is the first impression of your estate. At <strong>J. Worden & Sons</strong>, we treat every residential project with the exact same industrial precision used for our national commercial contracts.
              </p>
              
              <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                  <div className="card" style={{ background: '#fff', border: '1px solid #eaeaea', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '1.3rem', margin: '0 0 15px 0', color: '#222' }}>Luxury Estate Paving</h4>
                      <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>From McLean to Great Falls, we specialize in high-end finishes, hand-set Belgian block borders, and precision drainage systems tailored for luxury estates.</p>
                  </div>
                  <div className="card" style={{ background: '#fff', border: '1px solid #eaeaea', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '1.3rem', margin: '0 0 15px 0', color: '#222' }}>4-Time Best of Houzz Service</h4>
                      <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>Backed by a verified 4.8-star reputation. We stand as the only 4th-generation firm in the region with this validated level of residential success.</p>
                  </div>
                  <div className="card" style={{ background: '#fff', border: '1px solid #eaeaea', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '1.3rem', margin: '0 0 15px 0', color: '#222' }}>HOA & Subdivision Specialists</h4>
                      <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>The preferred infrastructure and paving partner for <strong>Maidstone Village</strong> and premier homeowners associations across the state of Virginia.</p>
                  </div>
              </div>
          </div>
      </section>

      <section id="contact" style={{ background: '#222', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ff9900', marginBottom: '20px' }}>Ready to Upgrade Your Infrastructure?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Contact the 4th-Generation Authority in Asphalt Paving today for a comprehensive site audit.</p>
          <a href="tel:8042442609" className="btn" style={{ background: '#ff9900', color: '#000', padding: '1.2rem 3rem', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px', display: 'inline-block', fontSize: '1.2rem' }}>REQUEST AUDIT: 804-244-2609</a>
        </div>
      </section>

      <footer style={{ background: '#000', color: '#888', padding: '2rem', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} J. Worden & Sons Asphalt Paving. All Rights Reserved. Independent 4th-Gen Legacy Since 1984.</p>
      </footer>
    </div>
  )
}
