import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Find It Back</h3>
          <p>
            Connecting communities through lost and found items. 
            Help us make the world a better place, one found item at a time.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <TwitterIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <InstagramIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/find">Browse Items</Link></li>
            <li><Link to="/post">Report Found</Link></li>
            <li><Link to="/report">Report Lost</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/about">Help Center</Link></li>
            <li><Link to="/about">Contact Us</Link></li>
            <li><Link to="/about">Privacy Policy</Link></li>
            <li><Link to="/about">Terms of Service</Link></li>
            <li><Link to="/about">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p>📧 support@finditback.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Community Street, City, State 12345</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Find It Back. All rights reserved.</p>
          <p>Made with ❤️ for the community</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 