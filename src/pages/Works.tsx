import { worksData } from '../data/works';
import './Works.css';

export default function Works() {
  return (
    <main className="works">
      <section className="works__header container">
        <h1 className="works__title">Works</h1>
        <p className="works__desc">
          <strong>Production</strong>, <strong>Cover</strong>, <strong>Report</strong>, and <strong>Creative Experiment</strong>.
        </p>
      </section>

      <section className="works__body container">
        <div className="works__mosaic">
          {worksData.map((work, index) => (
            <article
              key={work.id}
              className={`works__piece works__piece--${index}`}
            >
              <div className="works__piece-top">
                <span className="works__piece-category">{work.category}</span>
                <span className="works__piece-year">{work.year}</span>
              </div>
              <h3 className="works__piece-title">{work.title}</h3>
              <p className="works__piece-desc">{work.description}</p>
              <div className="works__piece-bottom">
                <div className="works__piece-tags">
                  {work.tags.map((tag) => (
                    <span key={tag} className="works__piece-tag">{tag}</span>
                  ))}
                </div>
                {(work.mediaUrl || work.pdfUrl) && (
                  <div className="works__piece-footer">
                    {work.mediaUrl && (
                      <a
                        className="works__piece-pdf"
                        href={work.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ▶ ↗
                      </a>
                    )}
                    {work.pdfUrl && (
                      <a
                        className="works__piece-pdf"
                        href={work.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
