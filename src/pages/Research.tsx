import { useState, useMemo } from 'react';
import { researchData } from '../data/research';
import { ResearchCard } from '../components/ResearchCard';
import './Research.css';

const MUSIC_FILTER_TAGS = new Set(['MIR', 'Music Recommendation', 'Music Structure', 'Audio Analysis']);

// gray #5B6770, purple #C077DB — interpolate based on music tag ratio
function interpolateColor(ratio: number): string {
  // ratio = music tags / total tags (0 = all gray, 1 = all purple)
  const r = Math.round(0x5B + (0xC0 - 0x5B) * ratio);
  const g = Math.round(0x67 + (0x77 - 0x67) * ratio);
  const b = Math.round(0x70 + (0xDB - 0x70) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Research() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    researchData.projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, []);

  // Calculate music tag ratio for title color
  const titleColor = useMemo(() => {
    let musicCount = 0;
    let totalCount = 0;
    researchData.projects.forEach((p) => {
      p.tags.forEach((t) => {
        totalCount++;
        if (MUSIC_FILTER_TAGS.has(t)) musicCount++;
      });
    });
    const ratio = totalCount > 0 ? musicCount / totalCount : 0;
    return interpolateColor(ratio);
  }, []);

  // Filter projects by active tag
  const filteredProjects = activeTag
    ? researchData.projects.filter((p) => p.tags.includes(activeTag))
    : researchData.projects;

  return (
    <main className="research">
      <section className="research__header container">
        <h1 className="research__title" style={{ color: titleColor }}>Research</h1>
        <p className="research__desc">
          <strong className="research__desc-purple">MIR</strong>, <strong className="research__desc-gray">DSP</strong>, <strong className="research__desc-gray">TDA</strong>, and <strong className="research__desc-gray">Image Processing</strong> — <strong className="research__desc-gray">Mathematics</strong>.
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
