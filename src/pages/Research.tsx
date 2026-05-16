import { researchData } from '../data/research';
import { ResearchCard } from '../components/ResearchCard';
import './Research.css';

export default function Research() {
  return (
    <main className="research">
      <section className="research__header container">
        <h1 className="research__title">Research</h1>
        <p className="research__desc">
          Projects, publications, presentations, and implementation-based works
          connecting mathematics, data analysis, and music.
        </p>
      </section>

      <section className="research__body container">
        <h2 className="research__subsection-heading">Publications &amp; Presentations</h2>
        <div className="research__list" data-testid="publications-list">
          {researchData.publications.map((entry) => (
            <ResearchCard key={entry.id} item={entry} />
          ))}
        </div>

        <h2 className="research__subsection-heading">MIR Recommendation System</h2>
        <h2 className="research__subsection-heading">MIR with TDA</h2>
        <h2 className="research__subsection-heading">Bone Suppression &amp; Anisotropic Diffusion</h2>
        <h2 className="research__subsection-heading">Diffusion Education Program</h2>

        <div className="research__list research__list--grid" data-testid="projects-list">
          {researchData.projects.map((project) => (
            <ResearchCard key={project.id} item={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
