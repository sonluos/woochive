import { Link } from 'react-router-dom';
import './Home.css';

const INTERESTS = [
  'Music Information Retrieval',
  'Topological Data Analysis',
  'Recommendation Systems',
  'Music & Audio Computing',
  'Mathematical Foundations of ML',
];

export default function Home() {
  return (
    <main className="intro">
      <section className="intro__hero container">
        <div className="intro__eyebrow fade-up">Personal Archive</div>
        <h1 className="intro__title fade-up" style={{ animationDelay: '60ms' }}>
          Woochive
        </h1>
        <p className="intro__tagline fade-up" style={{ animationDelay: '120ms' }}>
          Undergraduate mathematics student working at the intersection of
          mathematical structure, data analysis, and music.
        </p>

        <div className="intro__nav-links fade-up" style={{ animationDelay: '180ms' }}>
          <Link to="/research" className="intro__nav-link">Research →</Link>
          <Link to="/foundations" className="intro__nav-link">Foundations →</Link>
          <Link to="/works" className="intro__nav-link">Works →</Link>
        </div>
      </section>

      <section className="intro__about container fade-up" style={{ animationDelay: '240ms' }}>
        <div className="intro__about-text">
          <p>
            This is a personal archive documenting research projects, mathematical
            foundations, and creative works. The name <em>Woochive</em> combines
            a personal identifier with "archive" — a place to collect, connect,
            and share ideas across disciplines.
          </p>
          <p>
            My work centers on applying rigorous mathematical tools — topology,
            linear algebra, probability — to problems in music and audio. I'm
            particularly drawn to how structure in data can reveal structure in
            sound, and vice versa.
          </p>
        </div>
      </section>

      <section className="intro__interests container fade-up" style={{ animationDelay: '300ms' }}>
        <h2 className="intro__section-label">Research Interests</h2>
        <ul className="intro__interest-list">
          {INTERESTS.map(interest => (
            <li key={interest} className="intro__interest-item">
              <span className="intro__interest-dot" aria-hidden="true" />
              {interest}
            </li>
          ))}
        </ul>
      </section>

      <section className="intro__contact container fade-up" style={{ animationDelay: '360ms' }}>
        <h2 className="intro__section-label">Contact</h2>
        <div className="intro__contact-row">
          <a href="mailto:contact@woochive.me" className="intro__contact-link">
            contact@woochive.me
          </a>
          <a
            href="https://github.com/woochive"
            target="_blank"
            rel="noopener noreferrer"
            className="intro__contact-link"
          >
            GitHub
          </a>
        </div>
        <p className="intro__contact-note">
          Open to research collaborations, lab inquiries, and academic discussions.
        </p>
      </section>
    </main>
  );
}
