import { introData } from '../data/intro';
import { renderHighlightedText } from '../utils/renderHighlightedText';
import InfoCard from '../components/InfoCard';
import type { TextHighlight } from '../types/archive';
import './Home.css';

const subtitleHighlights: TextHighlight[] = [
  { phrase: 'Music Data Research', color: 'gradient' },
  { phrase: 'Mathematical Foundations', color: 'gray' },
  { phrase: 'Creative Works', color: 'purple' },
];

export default function Home() {
  return (
    <main className="intro">
      <section className="intro__hero container">
        <h1 className="intro__title">{introData.title}</h1>
        <p className="intro__tagline">
          {renderHighlightedText(introData.subtitle, subtitleHighlights)}
        </p>
      </section>

      <section className="intro__bio container">
        <div className="intro__bio-content">
          <img
            src="/profile.png"
            alt="Woojin Son"
            className="intro__photo"
          />
          <div className="intro__bio-text">
            {introData.bio.map((line, index) => (
              <p key={index} className="intro__bio-line">
                {renderHighlightedText(line.text, line.highlights)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="intro__info container">
        <InfoCard
          affiliation={introData.infoCard.affiliation}
          email={introData.infoCard.email}
          links={introData.infoCard.links}
        />
      </section>
    </main>
  );
}
