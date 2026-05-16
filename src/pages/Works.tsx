import './Works.css';

type WorkItem = {
  id: string;
  title: string;
  category: 'music' | 'writing' | 'presentation' | 'concert' | 'magazine';
  description: string;
  year?: string;
  link?: string;
  tags?: string[];
};

const ITEMS: WorkItem[] = [
  {
    id: 'mufasho',
    title: 'MuFasho Mag',
    category: 'magazine',
    description:
      'An independent music magazine exploring the intersection of music culture, criticism, and data. Covers emerging artists, genre analysis, and music technology.',
    year: '2023–',
    tags: ['Music Criticism', 'Culture', 'Editorial'],
  },
  {
    id: 'compositions',
    title: 'Original Compositions',
    category: 'music',
    description:
      'A collection of original music spanning electronic, ambient, and experimental genres. Informed by research into music structure and audio synthesis.',
    year: '2021–',
    tags: ['Electronic', 'Ambient', 'Experimental'],
  },
  {
    id: 'concert-archive',
    title: 'Concert Archive',
    category: 'concert',
    description:
      'Recordings and documentation of live performances and concerts. An ongoing archive of musical events and experiences.',
    year: '2020–',
    tags: ['Live', 'Archive', 'Performance'],
  },
  {
    id: 'writings',
    title: 'Writings & Essays',
    category: 'writing',
    description:
      'Essays on mathematics, music, and their connections. Includes informal notes, reading reflections, and longer-form pieces on topics in MIR and TDA.',
    year: '2022–',
    tags: ['Essays', 'Mathematics', 'Music'],
  },
  {
    id: 'presentations',
    title: 'Presentations & Talks',
    category: 'presentation',
    description:
      'Slides and materials from academic presentations, seminar talks, and study group sessions on topics in mathematics and music information retrieval.',
    year: '2023–',
    tags: ['Slides', 'Academic', 'Talks'],
  },
];

const CATEGORY_LABELS: Record<WorkItem['category'], string> = {
  music: 'Music',
  writing: 'Writing',
  presentation: 'Presentation',
  concert: 'Concert Archive',
  magazine: 'Magazine',
};

const CATEGORY_ORDER: WorkItem['category'][] = [
  'magazine', 'music', 'concert', 'writing', 'presentation',
];

export default function Works() {
  const sorted = [...ITEMS].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
  );

  return (
    <main className="works">
      <div className="works__header container">
        <div className="page-eyebrow fade-up">Woochive</div>
        <h1 className="page-title fade-up" style={{ animationDelay: '60ms' }}>Works</h1>
        <p className="page-desc fade-up" style={{ animationDelay: '120ms' }}>
          Creative works, music, writings, presentations, concert records,
          and MuFasho Mag — the creative identity behind the research.
        </p>
      </div>

      <div className="works__body container">
        <div className="works__list">
          {sorted.map((item, i) => (
            <article
              key={item.id}
              className="work-card fade-up"
              style={{ animationDelay: `${i * 60 + 180}ms` }}
            >
              <div className="work-card__meta">
                <span className="work-card__category">{CATEGORY_LABELS[item.category]}</span>
                {item.year && <span className="work-card__year">{item.year}</span>}
              </div>
              <h2 className="work-card__title">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h2>
              <p className="work-card__desc">{item.description}</p>
              {item.tags && (
                <div className="work-card__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
