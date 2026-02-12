import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects, useMusic, usePublications } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import { ImageGallery } from '../components/ImageGallery';
import { AudioPlayer } from '../components/AudioPlayer';
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
      <div className="detail-page project-detail">
        <button onClick={() => navigate('/projects')} className="back-button">← Back to Projects</button>
        <h1>{project.title}</h1>
        <p className="date">{new Date(project.date).toLocaleDateString('ko-KR')}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <Link key={tag} to={`/projects?tag=${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
        <p className="description">{project.description}</p>
        
        {project.images && project.images.length > 0 && (
          <ImageGallery images={project.images} alt={project.title} />
        )}
        
        <div className="full-description">
          <h2>상세 설명</h2>
          <p>{project.fullDescription}</p>
        </div>
        <div className="technologies">
          <h3>기술 스택</h3>
          <ul>
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        {project.links && (
          <div className="links">
            <h3>Links</h3>
            {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Demo</a>}
            {project.links.documentation && <a href={project.links.documentation} target="_blank" rel="noopener noreferrer">Documentation</a>}
          </div>
        )}
        
        {relatedProjects.length > 0 && (
          <div className="related-items">
            <h3>관련 프로젝트</h3>
            <div className="related-grid">
              {relatedProjects.map(related => (
                <Link key={related.id} to={`/projects/${related.id}`} className="related-card">
                  {related.thumbnail && <img src={related.thumbnail} alt={related.title} />}
                  <h4>{related.title}</h4>
                  <p>{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'music') {
    if (musicLoading) return <LoadingSpinner />;
    const work = musicWorks?.find(w => w.id === id);
    if (!work) return <div>Music work not found</div>;

    const relatedWorks = musicWorks ? getRelatedItems(work, musicWorks) : [];

    return (
      <div className="detail-page music-detail">
        <button onClick={() => navigate('/music')} className="back-button">← Back to Music</button>
        <h1>{work.title}</h1>
        <p className="date">{new Date(work.date).toLocaleDateString('ko-KR')}</p>
        <div className="tags">
          {work.tags.map((tag) => (
            <Link key={tag} to={`/music?tag=${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
        <p className="description">{work.description}</p>
        
        {work.audioFile && (
          <AudioPlayer src={work.audioFile} title={work.title} />
        )}
        
        <div className="instruments">
          <h3>악기</h3>
          <ul>
            {work.instruments.map((instrument) => (
              <li key={instrument}>{instrument}</li>
            ))}
          </ul>
        </div>
        <div className="full-description">
          <h2>작품 설명</h2>
          <p>{work.fullDescription}</p>
        </div>
        
        {relatedWorks.length > 0 && (
          <div className="related-items">
            <h3>관련 음악</h3>
            <div className="related-grid">
              {relatedWorks.map(related => (
                <Link key={related.id} to={`/music/${related.id}`} className="related-card">
                  {related.thumbnail && <img src={related.thumbnail} alt={related.title} />}
                  <h4>{related.title}</h4>
                  <p>{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'publication') {
    if (publicationsLoading) return <LoadingSpinner />;
    const pub = publications?.find(p => p.id === id);
    if (!pub) return <div>Publication not found</div>;

    const relatedPubs = publications ? getRelatedItems(pub, publications) : [];

    return (
      <div className="detail-page publication-detail">
        <button onClick={() => navigate('/publications')} className="back-button">← Back to Publications</button>
        <h1>{pub.title}</h1>
        <p className="authors">{pub.authors.join(', ')}</p>
        <p className="venue">{pub.venue}</p>
        <p className="date">{new Date(pub.date).toLocaleDateString('ko-KR')}</p>
        {pub.tags && (
          <div className="tags">
            {pub.tags.map((tag) => (
              <Link key={tag} to={`/publications?tag=${encodeURIComponent(tag)}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        )}
        <div className="abstract">
          <h2>Abstract</h2>
          <p>{pub.abstract}</p>
        </div>
        {pub.fullContent && (
          <div className="full-content">
            <h2>Full Content</h2>
            <p>{pub.fullContent}</p>
          </div>
        )}
        {pub.pdfFile && (
          <div className="pdf-download">
            <a href={pub.pdfFile} download className="download-button">
              📄 Download PDF
            </a>
          </div>
        )}
        {pub.links && (
          <div className="links">
            <h3>Links</h3>
            {pub.links.doi && <a href={pub.links.doi} target="_blank" rel="noopener noreferrer">DOI</a>}
            {pub.links.arxiv && <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer">arXiv</a>}
            {pub.links.other && <a href={pub.links.other} target="_blank" rel="noopener noreferrer">Other</a>}
          </div>
        )}
        
        {relatedPubs.length > 0 && (
          <div className="related-items">
            <h3>관련 출판물</h3>
            <div className="related-grid">
              {relatedPubs.map(related => (
                <Link key={related.id} to={`/publications/${related.id}`} className="related-card">
                  <h4>{related.title}</h4>
                  <p className="authors">{related.authors.join(', ')}</p>
                  <p className="venue">{related.venue}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>Unknown type</div>;
}

export default DetailPage;
