import { Link } from 'react-router-dom';
import { useProjects, useMusic, usePublications } from '../hooks/usePortfolioData';
import { PortfolioItem, Publication } from '../types/portfolio';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import HeroSection from '../components/HeroSection';
import StatCard from '../components/StatCard';
import GradientCard from '../components/GradientCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function Home() {
  const { data: projects, loading: projectsLoading, error: projectsError, reload: reloadProjects } = useProjects();
  const { data: music, loading: musicLoading, error: musicError, reload: reloadMusic } = useMusic();
  const { data: publications, loading: publicationsLoading, error: publicationsError, reload: reloadPublications } = usePublications();

  // Intersection observers for scroll animations (must be before any conditional returns)
  const [statsRef, statsVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [featuredRef, featuredVisible] = useIntersectionObserver({ threshold: 0.1 });

  const loading = projectsLoading || musicLoading || publicationsLoading;
  const error = projectsError || musicError || publicationsError;
  
  const handleRetry = () => {
    reloadProjects();
    reloadMusic();
    reloadPublications();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={handleRetry} />;
  }

  // Get latest items (sorted by date, max 6 total)
  const getLatestItems = () => {
    const allItems: (PortfolioItem | Publication)[] = [
      ...(projects || []),
      ...(music || []),
      ...(publications || [])
    ];
    
    console.log('All items before sort:', allItems.length, allItems);
    
    return allItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  };

  const getItemLink = (item: PortfolioItem | Publication) => {
    if (projects?.some(p => p.id === item.id)) return `/projects/${item.id}`;
    if (music?.some(m => m.id === item.id)) return `/music/${item.id}`;
    return `/publications/${item.id}`;
  };

  const latestItems = getLatestItems();
  const featuredItems = latestItems.slice(0, 3);

  console.log('Home Debug:', {
    projects: projects?.length,
    music: music?.length,
    publications: publications?.length,
    latestItems: latestItems.length,
    featuredItems: featuredItems.length,
    featuredItemsData: featuredItems
  });

  return (
    <div className="home">
      <HeroSection
        title="Woo Jin Son"
        subtitle="MIR researcher / Interdisciplinary Creator"
        gradient={true}
        height="full"
      >
        <div className="hero-links">
          <Link to="/about" className="hero-link">About</Link>
          <Link to="/projects" className="hero-link">Projects</Link>
          <Link to="/music" className="hero-link">Music</Link>
          <Link to="/publications" className="hero-link">Publications</Link>
        </div>
      </HeroSection>

      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className={`stats-grid ${statsVisible ? 'animate-on-scroll is-visible' : 'animate-on-scroll'}`}>
            <StatCard
              title="Research Projects"
              value={projects?.length || 0}
              subtitle="AI & Music Technology"
              icon="💻"
              gradient="purple"
            />
            <StatCard
              title="Music Works"
              value={music?.length || 0}
              subtitle="Compositions & Performances"
              icon="🎵"
              gradient="blue"
            />
            <StatCard
              title="Publications"
              value={publications?.length || 0}
              subtitle="Academic Papers"
              icon="📚"
              gradient="orange"
            />
          </div>
        </div>
      </section>

      <section className="featured-section" ref={featuredRef}>
        <div className="container">
          <h2 className={`section-title ${featuredVisible ? 'animate-on-scroll is-visible' : 'animate-on-scroll'}`}>Featured Work</h2>
          {featuredItems && featuredItems.length > 0 ? (
            <>
              <div className="featured-grid">
                {featuredItems.map((item, index) => {
                  const gradients: Array<'purple' | 'blue' | 'orange'> = ['purple', 'blue', 'orange'];
                  return (
                    <div 
                      key={item.id}
                      className={`stagger-item ${featuredVisible ? 'is-visible' : ''}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <GradientCard
                        gradient={gradients[index % 3]}
                        hover={true}
                        onClick={() => window.location.href = getItemLink(item)}
                      >
                        <div className="featured-card">
                          {item.thumbnail && (
                            <img 
                              src={item.thumbnail} 
                              alt={item.title}
                              loading="lazy"
                              className="featured-thumbnail"
                            />
                          )}
                          <div className="featured-content">
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
                          </div>
                        </div>
                      </GradientCard>
                    </div>
                  );
                })}
              </div>
              <div className="view-all-container">
                <Link to="/projects" className="view-all-button">View All Projects →</Link>
              </div>
            </>
          ) : (
            <p className="no-items">No featured items available</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
