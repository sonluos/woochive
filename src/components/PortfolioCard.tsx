import { Link } from 'react-router-dom';
import { PortfolioItem } from '../types/portfolio';
import './PortfolioCard.css';

interface PortfolioCardProps {
  item: PortfolioItem;
  type: 'project' | 'music' | 'publication';
}

export function PortfolioCard({ item, type }: PortfolioCardProps) {
  const linkPath = `/${type === 'project' ? 'projects' : type === 'music' ? 'music' : 'publications'}/${item.id}`;

  return (
    <Link to={linkPath} className={`portfolio-card ${type}-card`}>
      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="card-thumbnail"
        />
      )}
      
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        
        <p className="card-description">
          {'description' in item ? item.description : 'abstract' in item ? item.abstract : ''}
        </p>
        
        {item.tags && item.tags.length > 0 && (
          <div className="card-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="card-date">
          {new Date(item.date).toLocaleDateString('ko-KR')}
        </p>
      </div>
    </Link>
  );
}
