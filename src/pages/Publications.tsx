import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePublications } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import GradientCard from '../components/GradientCard';

function Publications() {
  const { data: publications, loading, error, reload } = usePublications();

  const sortedPublications = useMemo(() => {
    if (!publications) return [];
    return [...publications].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [publications]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={reload} />;
  }

  return (
    <div className="publications-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Publications</h1>
          <p className="page-subtitle">Academic publications and research papers.</p>
        </div>
        
        <div className="portfolio-grid">
          {sortedPublications.map((pub, index) => {
            const gradients: Array<'purple' | 'blue' | 'orange'> = ['orange', 'purple', 'blue'];
            return (
              <GradientCard
                key={pub.id}
                gradient={gradients[index % 3]}
                hover={true}
              >
                <Link to={`/publications/${pub.id}`} className="portfolio-card-link">
                  <div className="portfolio-card-content publication-content">
                    <h2 className="portfolio-card-title">{pub.title}</h2>
                    <p className="publication-authors">{pub.authors.join(', ')}</p>
                    <p className="publication-venue">{pub.venue}</p>
                    <p className="portfolio-card-description publication-abstract">{pub.abstract}</p>
                    {pub.tags && (
                      <div className="tags">
                        {pub.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="portfolio-card-date">{new Date(pub.date).toLocaleDateString('ko-KR')}</p>
                  </div>
                </Link>
              </GradientCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Publications;
