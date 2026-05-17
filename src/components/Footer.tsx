import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container--wide">
        <span className="footer__name">Woochive</span>
        <p className="footer__tagline">
          Music, mathematics, research, and creative records.
        </p>
        <div className="footer__contact">
          <a href="mailto:sonluos1013@gmail.com" className="footer__email">
            sonluos1013@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
