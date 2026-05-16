import { introData } from '../data/intro';
import { TagList } from '../components/TagList';
import { Placeholder } from '../components/Placeholder';
import './Home.css';

export default function Home() {
  return (
    <main className="intro">
      <section className="intro__hero container">
        <h1 className="intro__title">{introData.title}</h1>
        <p className="intro__tagline">{introData.subtitle}</p>
      </section>

      <section className="intro__about container">
        <p className="intro__bio">{introData.bio}</p>
      </section>

      <section className="intro__keywords container">
        <h2 className="intro__section-label">Research Keywords</h2>
        <TagList tags={introData.keywords} />
      </section>

      <section className="intro__contact container">
        <h2 className="intro__section-label">Contact</h2>
        <div className="intro__contact-row">
          {introData.contact.map((link) =>
            link.href !== undefined ? (
              <a
                key={link.kind}
                href={link.href}
                className="intro__contact-link"
                target={link.kind !== 'email' ? '_blank' : undefined}
                rel={link.kind !== 'email' ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ) : (
              <Placeholder
                key={link.kind}
                label={link.label}
                kind={link.kind === 'cv' ? 'pdf' : link.kind === 'website' ? 'link' : link.kind}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}
