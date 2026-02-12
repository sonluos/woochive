import { Link } from 'react-router-dom';
import { useProjects, useMusic, usePublications } from '../hooks/usePortfolioData';
import { PortfolioItem, Publication } from '../types/portfolio';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const { data: projects, loading: projectsLoading, error: projectsError, reload: reloadProjects } = useProjects();
  const { data: music, loading: musicLoading, error: musicError, reload: reloadMusic } = useMusic();
  const { data: publications, loading: publicationsLoading, error: publicationsError, reload: reloadPublications } = usePublications();

  const loading = projectsLoading || musicLoading || publicationsLoading;
  const error = projectsError || musicError || publicationsError;
  
  const handleRetry = () => {
    reloadProjects();
    reloadMusic();
    reloadPublications();
  };

  // Get latest items (sorted by date, max 6 total)
  const getLatestItems = () => {
    const allItems: (PortfolioItem | Publication)[] = [
      ...(projects || []),
      ...(music || []),
      ...(publications || [])
    ];
    
    return allItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  };

  const getItemLink = (item: PortfolioItem | Publication) => {
    if (projects?.some(p => p.id === item.id)) return `/projects/${item.id}`;
    if (music?.some(m => m.id === item.id)) return `/music/${item.id}`;
    return `/publications/${item.id}`;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={handleRetry} />;
  }

  const latestItems = getLatestItems();

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Woochive</h1>
        <p className="hero-subtitle">
          AI 연구, 수학, 그리고 음악의 교차점에서 창작하는 공간입니다.
        </p>
        <div className="hero-links">
          <Link to="/projects" className="hero-link">Projects</Link>
          <Link to="/music" className="hero-link">Music</Link>
          <Link to="/publications" className="hero-link">Publications</Link>
        </div>
      </section>

      <section className="recent-section">
        <h2>Recent Work</h2>
        <div className="recent-grid">
          {latestItems.map((item) => (
            <Link to={getItemLink(item)} key={item.id} className="recent-card">
              {item.thumbnail && (
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  loading="lazy"
                  className="recent-thumbnail"
                />
              )}
              <h3>{item.title}</h3>
              <p>
                {'description' in item ? item.description : item.abstract}
              </p>
              {item.tags && (
                <div className="tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
