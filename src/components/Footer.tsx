import { Placeholder } from './Placeholder';
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
          <Placeholder label="Email" kind="email" />
          <Placeholder label="GitHub" kind="link" />
        </div>
      </div>
    </footer>
  );
}
