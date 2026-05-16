import type { FoundationCard as FoundationCardData } from '../types/archive';
import { StatusBadge } from './StatusBadge';
import './FoundationCard.css';

interface FoundationCardProps {
  card: FoundationCardData;
}

export function FoundationCard({ card }: FoundationCardProps) {
  return (
    <article className="foundation-card">
      <h3 className="foundation-card__title">{card.title}</h3>
      <ul className="foundation-card__list">
        {card.items.map((item) => (
          <li key={item.label} className="foundation-card__item">
            <span className="foundation-card__label">{item.label}</span>
            {item.status !== undefined && (
              <StatusBadge status={item.status} />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
