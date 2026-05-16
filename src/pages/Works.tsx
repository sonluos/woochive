import { worksData } from '../data/works';
import { WorkCard } from '../components/WorkCard';
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
        <div className="works__grid">
          {worksData.map((card) => (
            <WorkCard key={card.id} card={card} />
          ))}
        </div>
      </section>
    </main>
  );
}
