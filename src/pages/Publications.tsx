import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePublications } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

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
    <div className="publications">
      <h1>Publications</h1>
      <p>Academic publications and research papers.</p>
      
      <div className="publication-list">
        {sortedPublications.map((pub) => (
          <Link to={`/publications/${pub.id}`} key={pub.id} className="publication-card">
            <h2>{pub.title}</h2>
            <p className="authors">{pub.authors.join(', ')}</p>
            <p className="venue">{pub.venue}</p>
            <p className="abstract">{pub.abstract}</p>
            {pub.tags && (
              <div className="tags">
                {pub.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <p className="date">{new Date(pub.date).toLocaleDateString('ko-KR')}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Publications;
