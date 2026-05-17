import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container--wide">
        <span className="footer__copy">© 2026 Woochive</span>
        <span className="footer__sep">/</span>
        <a href="mailto:sonluos1013@gmail.com" className="footer__link">sonluos1013@gmail.com</a>
        <span className="footer__sep">/</span>
        <a
          href="https://github.com/sonluos"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          GitHub
        </a>
        <span className="footer__sep">/</span>
        <a
          href="https://www.linkedin.com/in/woojin-son-541705267"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
