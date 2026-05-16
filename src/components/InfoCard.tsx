import type { InfoCardData } from '../types/archive';

interface InfoCardProps extends InfoCardData {}

export default function InfoCard({ affiliation, email, links }: InfoCardProps) {
  return (
    <div className="info-card">
      <p className="info-card__affiliation">{affiliation}</p>
      {email && <p className="info-card__email">{email}</p>}
      <div className="info-card__links">
        {links.map((link) => (
          <a
            key={link.label}
            className="info-card__link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
