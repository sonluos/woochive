import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">Woo Jin Son</h3>
            <p className="footer-tagline">MIR researcher / Interdisciplinary Creator</p>
            <p className="footer-description">
              AI와 음악의 교차점에서 새로운 가능성을 탐구합니다.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/music">Music</Link></li>
              <li><Link to="/publications">Publications</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <ul className="footer-links">
              <li>
                <a 
                  href="https://github.com/woochive" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <span className="social-icon">💻</span>
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@woochive.me"
                  className="footer-social-link"
                >
                  <span className="social-icon">✉️</span>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Woo Jin Son. All rights reserved.
            </p>
            <p className="footer-tech">
              Built with React · TypeScript · Vite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
