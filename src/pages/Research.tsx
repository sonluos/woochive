import { researchData } from '../data/research';
import { ResearchCard } from '../components/ResearchCard';
import './Research.css';

export default function Research() {
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
        <div className="research__list">
          {researchData.projects.map((project) => (
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
