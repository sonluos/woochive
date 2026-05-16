import type { WorkCard as WorkCardData } from '../types/archive';
import './WorkCard.css';

interface WorkCardProps {
  card: WorkCardData;
}

export function WorkCard({ card }: WorkCardProps) {
  return (
    <article className="work-card">
      <h3 className="work-card__title">{card.title}</h3>
      <ul className="work-card__list">
        {card.topics.map((topic) => (
          <li key={topic.label} className="work-card__topic">
            {topic.label}
          </li>
        ))}
      </ul>
    </article>
  );
}
