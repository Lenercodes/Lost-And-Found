import Navbar from "../components/Navbar";
import About from "../components/About";
import ParticlesBackground from "../components/Particle";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Home() {
  return (
    <main>
      <Navbar />
      <div className="particle-container">
        <ParticlesBackground />
      </div>
      
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Find It Back</h1>
          <p className="hero-subtitle">
            Reconnect with your lost items through our community-driven platform
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <TrendingUpIcon />
              <span>1,234+ Items Found</span>
            </div>
            <div className="stat-item">
              <PersonIcon />
              <span>500+ Happy Users</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/find" className="hero-btn primary">
              <SearchIcon />
              Browse Items
            </Link>
            <Link to="/post" className="hero-btn secondary">
              <AddIcon />
              Report Found Item
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <section className="quick-actions">
        <div className="container">
          <h2>What would you like to do?</h2>
          <div className="action-cards">
            <Link to="/find" className="action-card">
              <div className="action-icon">🔍</div>
              <h3>Find Lost Item</h3>
              <p>Search through our database of found items</p>
            </Link>
            <Link to="/post" className="action-card">
              <div className="action-icon">📝</div>
              <h3>Report Found Item</h3>
              <p>Help someone find their lost belongings</p>
            </Link>
            <Link to="/report" className="action-card">
              <div className="action-icon">🚨</div>
              <h3>Report Lost Item</h3>
              <p>Let the community know about your lost item</p>
            </Link>
            <Link to="/about" className="action-card">
              <div className="action-icon">ℹ️</div>
              <h3>Learn More</h3>
              <p>Discover how our platform works</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Find It Back?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>Community Driven</h3>
              <p>Our platform thrives on community support and collaboration</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your personal information is protected and secure</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Easy</h3>
              <p>Quick search and reporting process for maximum efficiency</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access our platform from any device, anywhere</p>
            </div>
          </div>
        </div>
      </section>

      <About />
    </main>
  );
}

export default Home; 