import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setActive(false);
  }, [location]);

  function openNav() {
    setActive(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeNav() {
    setActive(false);
    document.body.style.overflow = 'unset'; // Restore scroll
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="logo-text">
        Find It Back
      </Link>
      
      <ul className={active ? 'active' : 'inactive'}>
        <li>
          <Link to="/" className={isActive('/') ? 'active-link' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/find" className={isActive('/find') ? 'active-link' : ''}>
            Browse Items
          </Link>
        </li>
        <li>
          <Link to="/post" className={isActive('/post') ? 'active-link' : ''}>
            Report Found
          </Link>
        </li>
        <li>
          <Link to="/report" className={isActive('/report') ? 'active-link' : ''}>
            Report Lost
          </Link>
        </li>
        <li>
          <Link to="/about" className={isActive('/about') ? 'active-link' : ''}>
            About
          </Link>
        </li>
        <li className="auth-links">
          <Link to="/login" className={`auth-btn ${isActive('/login') ? 'active-link' : ''}`}>
            <PersonIcon />
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className="menu-container" onClick={active ? closeNav : openNav}>
        {active ? (
          <CloseIcon className="menu close" />
        ) : (
          <MenuIcon className="menu" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {active && (
        <div className="mobile-overlay" onClick={closeNav}></div>
      )}
    </nav>
  );
}

export default Navbar;
