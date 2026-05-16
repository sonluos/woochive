import './Research.css';

type ResearchItem = {
  id: string;
  title: string;
  type: 'project' | 'publication' | 'presentation' | 'implementation';
  description: string;
  tags: string[];
  year?: string;
  link?: string;
  status?: string;
};

const ITEMS: ResearchItem[] = [
  {
    id: 'mir-tda',
    title: 'Topological Approaches to Music Structure Analysis',
    type: 'project',
    description:
      'Applying persistent homology and TDA techniques to analyze harmonic and rhythmic structure in audio signals. Explores how topological invariants can capture musical form.',
    tags: ['TDA', 'MIR', 'Persistent Homology', 'Audio'],
    year: '2024',
    status: 'In Progress',
  },
  {
    id: 'rec-systems',
    title: 'Graph-Based Music Recommendation via Latent Structure',
    type: 'project',
    description:
      'Investigating recommendation systems that leverage latent mathematical structure in listening behavior and audio features, combining collaborative filtering with spectral graph methods.',
    tags: ['Recommendation Systems', 'Graph Theory', 'Spectral Methods'],
    year: '2024',
    status: 'In Progress',
  },
  {
    id: 'audio-computing',
    title: 'Signal Processing Foundations for Music Analysis',
    type: 'implementation',
    description:
      'Implementation-based study of core DSP algorithms — STFT, CQT, mel-filterbanks — with mathematical derivations and applications to music feature extraction.',
    tags: ['DSP', 'Audio Computing', 'Python', 'Mathematics'],
    year: '2023',
  },
];

const TYPE_LABELS: Record<ResearchItem['type'], string> = {
  project: 'Project',
  publication: 'Publication',
  presentation: 'Presentation',
  implementation: 'Implementation',
};

export default function Research() {
  return (
    <main className="research">
      <div className="research__header container">
        <div className="page-eyebrow fade-up">Woochive</div>
        <h1 className="page-title fade-up" style={{ animationDelay: '60ms' }}>Research</h1>
        <p className="page-desc fade-up" style={{ animationDelay: '120ms' }}>
          Projects, publications, presentations, and implementation-based works
          connecting mathematics, data analysis, and music.
        </p>
      </div>

      <div className="research__body container">
        {ITEMS.length === 0 ? (
          <p className="research__empty">Research items coming soon.</p>
        ) : (
          <div className="research__list">
            {ITEMS.map((item, i) => (
              <article
                key={item.id}
                className="research-card fade-up"
                style={{ animationDelay: `${i * 60 + 180}ms` }}
              >
                <div className="research-card__meta">
                  <span className="research-card__type">{TYPE_LABELS[item.type]}</span>
                  {item.year && <span className="research-card__year">{item.year}</span>}
                  {item.status && (
                    <span className="research-card__status">{item.status}</span>
                  )}
                </div>
                <h2 className="research-card__title">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h2>
                <p className="research-card__desc">{item.description}</p>
                <div className="research-card__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
