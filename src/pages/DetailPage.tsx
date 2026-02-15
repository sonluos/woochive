import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects, useMusic, usePublications } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import { ImageGallery } from '../components/ImageGallery';
import { AudioPlayer } from '../components/AudioPlayer';
import GradientCard from '../components/GradientCard';
import { PortfolioItem } from '../types/portfolio';
import './DetailPage.css';

interface DetailPageProps {
  type: 'project' | 'music' | 'publication';
}

function getRelatedItems<T extends PortfolioItem>(
  currentItem: T,
  allItems: T[],
  maxItems: number = 3
): T[] {
  const currentTags = new Set(currentItem.tags);
  
  return allItems
    .filter(item => item.id !== currentItem.id)
    .map(item => ({
      item,
      commonTags: item.tags.filter(tag => currentTags.has(tag)).length
    }))
    .filter(({ commonTags }) => commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, maxItems)
    .map(({ item }) => item);
}

function DetailPage({ type }: DetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: projects, loading: projectsLoading } = useProjects();
  const { data: musicWorks, loading: musicLoading } = useMusic();
  const { data: publications, loading: publicationsLoading } = usePublications();

  if (!id) {
    return <div>Invalid ID</div>;
  }

  if (type === 'project') {
    if (projectsLoading) return <LoadingSpinner />;
    const project = projects?.find(p => p.id === id);
    if (!project) return <div>Project not found</div>;

    const relatedProjects = projects ? getRelatedItems(project, projects) : [];

    return (
      <div className="detail-page-wrapper">
        <div className="container">
          <div className="detail-page project-detail">
            <button onClick={() => navigate('/projects')} className="back-button">
              ← Back to Projects
            </button>
            
            <div className="detail-hero">
              <h1 className="detail-title">{project.title}</h1>
              <div className="detail-meta">
                <p className="detail-date">{new Date(project.date).toLocaleDateString('ko-KR')}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <Link key={tag} to={`/projects?tag=${encodeURIComponent(tag)}`} className="tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="detail-description">{project.description}</p>
            </div>
            
            {project.images && project.images.length > 0 && (
              <div className="detail-gallery">
                <ImageGallery images={project.images} alt={project.title} />
              </div>
            )}
            
            <div className="detail-content-grid">
              <div className="detail-main">
                <section className="detail-section">
                  <h2 className="section-heading">상세 설명</h2>
                  <p className="section-text">{project.fullDescription}</p>
                </section>
              </div>
              
              <aside className="detail-sidebar">
                <GradientCard gradient="purple" hover={false}>
                  <div className="sidebar-card">
                    <h3 className="sidebar-heading">기술 스택</h3>
                    <ul className="tech-list">
                      {project.technologies.map((tech) => (
                        <li key={tech} className="tech-item">{tech}</li>
                      ))}
                    </ul>
                  </div>
                </GradientCard>
                
                {project.links && (
                  <GradientCard gradient="blue" hover={false}>
                    <div className="sidebar-card">
                      <h3 className="sidebar-heading">Links</h3>
                      <div className="link-buttons">
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-button">
                            GitHub
                          </a>
                        )}
                        {project.links.demo && (
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="link-button">
                            Demo
                          </a>
                        )}
                        {project.links.documentation && (
                          <a href={project.links.documentation} target="_blank" rel="noopener noreferrer" className="link-button">
                            Documentation
                          </a>
                        )}
                      </div>
                    </div>
                  </GradientCard>
                )}
              </aside>
            </div>
            
            {relatedProjects.length > 0 && (
              <section className="related-section">
                <h2 className="section-heading">관련 프로젝트</h2>
                <div className="related-grid">
                  {relatedProjects.map((related, index) => {
                    const gradients: Array<'purple' | 'blue' | 'orange'> = ['purple', 'blue', 'orange'];
                    return (
                      <GradientCard key={related.id} gradient={gradients[index % 3]} hover={true}>
                        <Link to={`/projects/${related.id}`} className="related-card-link">
                          {related.thumbnail && (
                            <img src={related.thumbnail} alt={related.title} className="related-thumbnail" />
                          )}
                          <div className="related-content">
                            <h4 className="related-title">{related.title}</h4>
                            <p className="related-description">{related.description}</p>
                          </div>
                        </Link>
                      </GradientCard>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'music') {
    if (musicLoading) return <LoadingSpinner />;
    const work = musicWorks?.find(w => w.id === id);
    if (!work) return <div>Music work not found</div>;

    const relatedWorks = musicWorks ? getRelatedItems(work, musicWorks) : [];

    return (
      <div className="detail-page-wrapper">
        <div className="container">
          <div className="detail-page music-detail">
            <button onClick={() => navigate('/music')} className="back-button">
              ← Back to Music
            </button>
            
            <div className="detail-hero">
              <h1 className="detail-title">{work.title}</h1>
              <div className="detail-meta">
                <p className="detail-date">{new Date(work.date).toLocaleDateString('ko-KR')}</p>
                <div className="tags">
                  {work.tags.map((tag) => (
                    <Link key={tag} to={`/music?tag=${encodeURIComponent(tag)}`} className="tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="detail-description">{work.description}</p>
            </div>
            
            {work.audioFile && (
              <div className="detail-audio">
                <AudioPlayer src={work.audioFile} title={work.title} />
              </div>
            )}
            
            <div className="detail-content-grid">
              <div className="detail-main">
                <section className="detail-section">
                  <h2 className="section-heading">작품 설명</h2>
                  <p className="section-text">{work.fullDescription}</p>
                </section>
              </div>
              
              <aside className="detail-sidebar">
                <GradientCard gradient="blue" hover={false}>
                  <div className="sidebar-card">
                    <h3 className="sidebar-heading">악기</h3>
                    <ul className="tech-list">
                      {work.instruments.map((instrument) => (
                        <li key={instrument} className="tech-item">{instrument}</li>
                      ))}
                    </ul>
                  </div>
                </GradientCard>
                
                {work.links && (
                  <GradientCard gradient="orange" hover={false}>
                    <div className="sidebar-card">
                      <h3 className="sidebar-heading">Links</h3>
                      <div className="link-buttons">
                        {work.links.youtube && (
                          <a href={work.links.youtube} target="_blank" rel="noopener noreferrer" className="link-button">
                            YouTube
                          </a>
                        )}
                        {work.links.soundcloud && (
                          <a href={work.links.soundcloud} target="_blank" rel="noopener noreferrer" className="link-button">
                            SoundCloud
                          </a>
                        )}
                        {work.links.other && (
                          <a href={work.links.other} target="_blank" rel="noopener noreferrer" className="link-button">
                            Other
                          </a>
                        )}
                      </div>
                    </div>
                  </GradientCard>
                )}
              </aside>
            </div>
            
            {relatedWorks.length > 0 && (
              <section className="related-section">
                <h2 className="section-heading">관련 음악</h2>
                <div className="related-grid">
                  {relatedWorks.map((related, index) => {
                    const gradients: Array<'purple' | 'blue' | 'orange'> = ['blue', 'orange', 'purple'];
                    return (
                      <GradientCard key={related.id} gradient={gradients[index % 3]} hover={true}>
                        <Link to={`/music/${related.id}`} className="related-card-link">
                          {related.thumbnail && (
                            <img src={related.thumbnail} alt={related.title} className="related-thumbnail" />
                          )}
                          <div className="related-content">
                            <h4 className="related-title">{related.title}</h4>
                            <p className="related-description">{related.description}</p>
                          </div>
                        </Link>
                      </GradientCard>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'publication') {
    if (publicationsLoading) return <LoadingSpinner />;
    const pub = publications?.find(p => p.id === id);
    if (!pub) return <div>Publication not found</div>;

    const relatedPubs = publications ? getRelatedItems(pub, publications) : [];

    return (
      <div className="detail-page-wrapper">
        <div className="container">
          <div className="detail-page publication-detail">
            <button onClick={() => navigate('/publications')} className="back-button">
              ← Back to Publications
            </button>
            
            <div className="detail-hero">
              <h1 className="detail-title">{pub.title}</h1>
              <div className="detail-meta">
                <p className="publication-authors">{pub.authors.join(', ')}</p>
                <p className="publication-venue">{pub.venue}</p>
                <p className="detail-date">{new Date(pub.date).toLocaleDateString('ko-KR')}</p>
              </div>
              {pub.tags && (
                <div className="tags" style={{ justifyContent: 'center', marginTop: 'var(--spacing-lg)' }}>
                  {pub.tags.map((tag) => (
                    <Link key={tag} to={`/publications?tag=${encodeURIComponent(tag)}`} className="tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="detail-content-grid">
              <div className="detail-main">
                <section className="detail-section">
                  <h2 className="section-heading">Abstract</h2>
                  <p className="section-text">{pub.abstract}</p>
                </section>
                
                {pub.fullContent && (
                  <section className="detail-section">
                    <h2 className="section-heading">Full Content</h2>
                    <p className="section-text">{pub.fullContent}</p>
                  </section>
                )}
              </div>
              
              <aside className="detail-sidebar">
                {pub.pdfFile && (
                  <GradientCard gradient="orange" hover={false}>
                    <div className="sidebar-card">
                      <h3 className="sidebar-heading">Download</h3>
                      <div className="link-buttons">
                        <a href={pub.pdfFile} download className="link-button">
                          📄 Download PDF
                        </a>
                      </div>
                    </div>
                  </GradientCard>
                )}
                
                {pub.links && (
                  <GradientCard gradient="purple" hover={false}>
                    <div className="sidebar-card">
                      <h3 className="sidebar-heading">Links</h3>
                      <div className="link-buttons">
                        {pub.links.doi && (
                          <a href={pub.links.doi} target="_blank" rel="noopener noreferrer" className="link-button">
                            DOI
                          </a>
                        )}
                        {pub.links.arxiv && (
                          <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer" className="link-button">
                            arXiv
                          </a>
                        )}
                        {pub.links.other && (
                          <a href={pub.links.other} target="_blank" rel="noopener noreferrer" className="link-button">
                            Other
                          </a>
                        )}
                      </div>
                    </div>
                  </GradientCard>
                )}
              </aside>
            </div>
            
            {relatedPubs.length > 0 && (
              <section className="related-section">
                <h2 className="section-heading">관련 출판물</h2>
                <div className="related-grid">
                  {relatedPubs.map((related, index) => {
                    const gradients: Array<'purple' | 'blue' | 'orange'> = ['orange', 'purple', 'blue'];
                    return (
                      <GradientCard key={related.id} gradient={gradients[index % 3]} hover={true}>
                        <Link to={`/publications/${related.id}`} className="related-card-link">
                          <div className="related-content publication-related-content">
                            <h4 className="related-title">{related.title}</h4>
                            <p className="publication-related-authors">{related.authors.join(', ')}</p>
                            <p className="publication-related-venue">{related.venue}</p>
                          </div>
                        </Link>
                      </GradientCard>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div>Unknown type</div>;
}

export default DetailPage;
