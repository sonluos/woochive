import { worksData } from '../data/works';
import './Works.css';

export default function Works() {
  return (
    <main className="works">
      <section className="works__header container">
        <h1 className="works__title">Works</h1>
        <p className="works__desc">
          Music, writing, concerts, and creative projects outside of research.
        </p>
      </section>

      <section className="works__body container">
        <div className="works__mosaic">
          {worksData.map((work) => (
            <article
              key={work.id}
              className={`works__piece works__piece--${work.size || 'md'}`}
            >
              <h3 className="works__piece-title">{work.title}</h3>
              <p className="works__piece-desc">{work.description}</p>
              <div className="works__piece-tags">
                {work.tags.map((tag) => (
                  <span key={tag} className="works__piece-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
