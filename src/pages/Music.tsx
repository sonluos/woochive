import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMusic } from '../hooks/usePortfolioData';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Music() {
  const { data: musicWorks, loading, error, reload } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    if (!musicWorks) return [];
    const tagSet = new Set<string>();
    musicWorks.forEach(work => {
      work.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [musicWorks]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredMusic = useMemo(() => {
    if (!musicWorks) return [];
    
    return musicWorks
      .filter((work) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          work.title.toLowerCase().includes(query) ||
          work.description.toLowerCase().includes(query) ||
          work.tags.some(tag => tag.toLowerCase().includes(query)) ||
          work.instruments.some(inst => inst.toLowerCase().includes(query));
        
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.some(tag => work.tags.includes(tag));
        
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [musicWorks, searchQuery, selectedTags]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={reload} />;
  }

  return (
    <div className="music">
      <h1>Music</h1>
      <p>Music works and compositions.</p>
      
      <SearchBar 
        onSearch={setSearchQuery} 
        placeholder="음악 작품 검색..."
      />

      <TagFilter 
        tags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
      />
      
      {filteredMusic.length === 0 ? (
        <p className="no-results">검색 결과가 없습니다.</p>
      ) : (
        <div className="music-grid">
          {filteredMusic.map((work) => (
            <Link to={`/music/${work.id}`} key={work.id} className="music-card">
              {work.thumbnail && (
                <img 
                  src={work.thumbnail} 
                  alt={work.title}
                  loading="lazy"
                  className="music-thumbnail"
                />
              )}
              <h2>{work.title}</h2>
              <p className="description">{work.description}</p>
              <div className="instruments">
                {work.instruments.map((instrument) => (
                  <span key={instrument} className="instrument">{instrument}</span>
                ))}
              </div>
              <div className="tags">
                {work.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p className="date">{new Date(work.date).toLocaleDateString('ko-KR')}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Music;
