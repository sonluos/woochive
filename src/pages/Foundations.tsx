import { foundationsData } from '../data/foundations';
import { FoundationCard } from '../components/FoundationCard';
import './Foundations.css';

export default function Foundations() {
  return (
    <main className="foundations">
      <section className="foundations__header container">
        <h1 className="foundations__title">Foundations</h1>
        <p className="foundations__desc">
          The mathematical, computational, and theoretical base behind the research.
        </p>
      </section>

      <section className="foundations__body container">
        <div className="foundations__grid">
          {foundationsData.map((card) => (
            <FoundationCard key={card.id} card={card} />
          ))}
        </div>
      </section>
    </main>
  );
}
