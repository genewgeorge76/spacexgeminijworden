import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer" style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      
      <div className="footer-brand" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#f39c12' }}>J. Worden & Sons Asphalt Paving</h3>
        <p style={{ margin: '5px 0' }}>4th Generation Paving Experts | Est. 1984</p>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>National Commercial Contractors & Premium Residential Paving</p>
        <p style={{ margin: '15px 0', fontSize: '1.25rem' }}>
          <strong>Call Direct: <a href="tel:8044461296" style={{ color: '#f39c12', textDecoration: 'none' }}>804-446-1296</a></strong>
        </p>
      </div>

      <div className="footer-service-area" style={{ marginBottom: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h4 style={{ color: '#f39c12', marginBottom: '10px' }}>Proudly Serving 41 Virginia Cities & Neighborhoods:</h4>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#cccccc' }}>
          Richmond, Tuckahoe, Sleepy Hollow, Stratford Hills, River Road, Windsor Farms, Chester, Chesterfield, Midlothian, Henrico, Short Pump, Mechanicsville, Glen Allen, Bon Air, Ashland, Brandermill, Woodlake, Petersburg, Colonial Heights, Hopewell, Powhatan, Goochland, Hanover, Sandston, Varina, Wyndham, Enon, Ettrick, Matoaca, Moseley, Dinwiddie, Prince George, Disputanta, Charles City, New Kent, Quinton, King William, Aylett, St. Stephens Church, Tappahannock, Dunnsville, Center Cross, Montpelier, Rockville, Manakin Sabot.
        </p>
      </div>

      <div className="footer-legal" style={{ fontSize: '0.85rem', color: '#999999', borderTop: '1px solid #333', paddingTop: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <p style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '10px' }}>Built to Virginia DOT Specifications (21B Aggregate Base)</p>
        <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>
          Legal Disclaimer: J. Worden & Sons Asphalt Paving is an independent, family-owned business operated by Gene W. George. We are not affiliated with any other paving company operating under the name "Worden" in the Virginia or South Carolina area.
        </p>
        <p>&copy; 2026 J. Worden & Sons Asphalt Paving. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
