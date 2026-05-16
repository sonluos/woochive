import './Foundations.css';

type FoundationItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  type: 'course' | 'paper' | 'book' | 'notes';
  status?: 'studying' | 'completed' | 'planned';
};

const ITEMS: FoundationItem[] = [
  {
    id: 'alg-topology',
    title: 'Algebraic Topology',
    category: 'Mathematics',
    description:
      'Fundamental concepts of homotopy, homology, and cohomology. Basis for understanding TDA and persistent homology in data analysis.',
    tags: ['Topology', 'Homology', 'Homotopy'],
    type: 'course',
    status: 'studying',
  },
  {
    id: 'real-analysis',
    title: 'Real Analysis',
    category: 'Mathematics',
    description:
      'Measure theory, Lebesgue integration, and functional analysis. Essential for rigorous signal processing and probability theory.',
    tags: ['Analysis', 'Measure Theory', 'Functional Analysis'],
    type: 'course',
    status: 'completed',
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra & Matrix Analysis',
    category: 'Mathematics',
    description:
      'Spectral theory, SVD, and matrix decompositions. Core tool for dimensionality reduction, audio feature extraction, and recommendation systems.',
    tags: ['Linear Algebra', 'Spectral Theory', 'SVD'],
    type: 'course',
    status: 'completed',
  },
  {
    id: 'prob-stats',
    title: 'Probability & Statistical Learning',
    category: 'Mathematics / ML',
    description:
      'Probabilistic models, Bayesian inference, and statistical learning theory. Foundation for understanding machine learning algorithms rigorously.',
    tags: ['Probability', 'Statistics', 'Bayesian'],
    type: 'course',
    status: 'studying',
  },
  {
    id: 'dsp',
    title: 'Digital Signal Processing',
    category: 'Computer Science / Engineering',
    description:
      'Fourier analysis, filter design, sampling theory, and spectral estimation. Direct application to audio analysis and MIR.',
    tags: ['DSP', 'Fourier', 'Audio'],
    type: 'course',
    status: 'completed',
  },
  {
    id: 'ml-foundations',
    title: 'Foundations of Machine Learning',
    category: 'AI / ML',
    description:
      'PAC learning, VC dimension, kernel methods, and neural network theory. Mathematical underpinnings of modern ML.',
    tags: ['ML Theory', 'Kernels', 'Neural Networks'],
    type: 'course',
    status: 'studying',
  },
  {
    id: 'graph-theory',
    title: 'Graph Theory & Network Analysis',
    category: 'Mathematics / CS',
    description:
      'Spectral graph theory, random walks, and network structure. Applied to recommendation systems and music knowledge graphs.',
    tags: ['Graph Theory', 'Spectral Methods', 'Networks'],
    type: 'course',
    status: 'planned',
  },
];

const STATUS_LABELS = {
  studying: 'Studying',
  completed: 'Completed',
  planned: 'Planned',
};

const CATEGORIES = [...new Set(ITEMS.map(i => i.category))];

export default function Foundations() {
  return (
    <main className="foundations">
      <div className="foundations__header container">
        <div className="page-eyebrow fade-up">Woochive</div>
        <h1 className="page-title fade-up" style={{ animationDelay: '60ms' }}>Foundations</h1>
        <p className="page-desc fade-up" style={{ animationDelay: '120ms' }}>
          The mathematical, computational, and theoretical base behind the research.
          Courses, papers, and self-study organized by domain.
        </p>
      </div>

      <div className="foundations__body container">
        {CATEGORIES.map((cat, ci) => {
          const catItems = ITEMS.filter(i => i.category === cat);
          return (
            <section
              key={cat}
              className="foundations__section fade-up"
              style={{ animationDelay: `${ci * 40 + 180}ms` }}
            >
              <h2 className="foundations__cat-label">{cat}</h2>
              <div className="foundations__list">
                {catItems.map(item => (
                  <article key={item.id} className="foundation-card">
                    <div className="foundation-card__top">
                      <h3 className="foundation-card__title">{item.title}</h3>
                      {item.status && (
                        <span className={`foundation-card__status foundation-card__status--${item.status}`}>
                          {STATUS_LABELS[item.status]}
                        </span>
                      )}
                    </div>
                    <p className="foundation-card__desc">{item.description}</p>
                    <div className="foundation-card__tags">
                      {item.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
