import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/usePortfolioData';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import GradientCard from '../components/GradientCard';

function Projects() {
  const { data: projects, loading, error, reload } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    if (!projects) return [];
    const tagSet = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    
    return projects
      .filter((project) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query)) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query));
        
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.some(tag => project.tags.includes(tag));
        
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects, searchQuery, selectedTags]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={reload} />;
  }

  return (
    <div className="projects-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Research projects in AI, Mathematics, and Signal Processing.</p>
        </div>
        
        <div className="filter-section">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="프로젝트 검색..."
          />

          <TagFilter 
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>
        
        {filteredProjects.length === 0 ? (
          <p className="no-results">검색 결과가 없습니다.</p>
        ) : (
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => {
              const gradients: Array<'purple' | 'blue' | 'orange'> = ['purple', 'blue', 'orange'];
              return (
                <GradientCard
                  key={project.id}
                  gradient={gradients[index % 3]}
                  hover={true}
                >
                  <Link to={`/projects/${project.id}`} className="portfolio-card-link">
                    {project.thumbnail && (
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        loading="lazy"
                        className="portfolio-thumbnail"
                      />
                    )}
                    <div className="portfolio-card-content">
                      <h2 className="portfolio-card-title">{project.title}</h2>
                      <p className="portfolio-card-description">{project.description}</p>
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <p className="portfolio-card-date">{new Date(project.date).toLocaleDateString('ko-KR')}</p>
                    </div>
                  </Link>
                </GradientCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
