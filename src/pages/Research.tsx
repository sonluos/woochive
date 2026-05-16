import { useState, useMemo } from 'react';
import { researchData } from '../data/research';
import { ResearchCard } from '../components/ResearchCard';
import './Research.css';

const MUSIC_FILTER_TAGS = new Set(['MIR', 'Music Recommendation', 'Music Structure', 'Audio Analysis']);

export default function Research() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    researchData.projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, []);

  // Filter projects by active tag
  const filteredProjects = activeTag
    ? researchData.projects.filter((p) => p.tags.includes(activeTag))
    : researchData.projects;

  return (
    <main className="research">
      <section className="research__header container">
        <h1 className="research__title">Research</h1>
        <p className="research__desc">
          Connecting mathematics, signal processing, and music through
          research projects and academic presentations.
        </p>
      </section>

      <section className="research__body container">
        <h2 className="research__subsection-heading">Projects</h2>

        <div className="research__tag-filter">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`research__filter-btn ${MUSIC_FILTER_TAGS.has(tag) ? 'research__filter-btn--music' : ''} ${activeTag === tag ? 'research__filter-btn--active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="research__list">
          {filteredProjects.map((project) => (
            <ResearchCard key={project.id} item={project} />
          ))}
        </div>

        <h2 className="research__subsection-heading">Publications</h2>
        <div className="research__list">
          {researchData.publications.map((entry) => (
            <ResearchCard key={entry.id} item={entry} />
          ))}
        </div>
      </section>
    </main>
  );
}
