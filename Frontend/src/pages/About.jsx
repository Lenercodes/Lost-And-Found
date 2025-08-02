import Navbar from "../components/Navbar";

function About() {
  return (
    <main>
      <Navbar />
      <div className="about-page">
        <div className="about-hero">
          <h1>About Find It Back</h1>
          <p>Connecting communities through lost and found items</p>
        </div>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Find It Back, we believe that every lost item has a story and every found item 
              has the potential to bring joy back to someone's life. Our mission is to create a 
              community-driven platform that helps reunite people with their lost belongings, 
              fostering connections and trust within our communities.
            </p>
          </section>
          
          <section className="about-section">
            <h2>How It Works</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Report Lost Items</h3>
                <p>Easily report your lost items with detailed descriptions and photos</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Search & Browse</h3>
                <p>Search through found items or browse categories to find your belongings</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>Connect & Claim</h3>
                <p>Connect with finders and securely claim your items with verification</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Safe & Secure</h3>
                <p>Our verification system ensures safe and legitimate item transfers</p>
              </div>
            </div>
          </section>
          
          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-list">
              <div className="value-item">
                <h3>Community First</h3>
                <p>We believe in the power of community to help one another</p>
              </div>
              <div className="value-item">
                <h3>Trust & Safety</h3>
                <p>We prioritize the safety and security of all our users</p>
              </div>
              <div className="value-item">
                <h3>Transparency</h3>
                <p>Clear communication and honest interactions are our foundation</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We continuously improve our platform to better serve our community</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>📧 Email</h3>
              <p>support@finditback.com</p>
              <p>We typically respond within 24 hours</p>
            </div>
            <div className="contact-card">
              <h3>📞 Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
            <div className="contact-card">
              <h3>💬 Live Chat</h3>
              <p>Available on our website</p>
              <p>Real-time support during business hours</p>
            </div>
            <div className="contact-card">
              <h3>📍 Address</h3>
              <p>123 Community Street</p>
              <p>City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How do I report a lost item?</h3>
              <p>Simply click on "Report Item" in the navigation, fill out the form with details and photos, and submit. Your item will be visible to the community immediately.</p>
            </div>
            <div className="faq-item">
              <h3>How do I claim an item?</h3>
              <p>When you find your item in the listings, click "Claim Item" and provide proof of ownership. Our team will verify and facilitate the return.</p>
            </div>
            <div className="faq-item">
              <h3>Is my personal information safe?</h3>
              <p>Yes, we take privacy seriously. Your personal information is encrypted and only shared with verified parties during the claiming process.</p>
            </div>
            <div className="faq-item">
              <h3>What if someone falsely claims my item?</h3>
              <p>We have a verification system in place. Claimants must provide proof of ownership, and our team reviews all claims before approval.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About; 