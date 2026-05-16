import type { PublicationEntry, ResearchProject } from '../types/archive';
import { StatusBadge } from './StatusBadge';
import { TagList } from './TagList';
import { Placeholder } from './Placeholder';
import './ResearchCard.css';

interface ResearchCardProps {
  item: ResearchProject | PublicationEntry;
}

export function ResearchCard({ item }: ResearchCardProps) {
  // Discriminate by the presence of 'description', which only ResearchProject has
  if ('description' in item) {
    return <ResearchProjectCard project={item} />;
  }
  return <PublicationCard entry={item} />;
}

/* ── ResearchProject card ── */

interface ResearchProjectCardProps {
  project: ResearchProject;
}

function ResearchProjectCard({ project }: ResearchProjectCardProps) {
  return (
    <article className="research-card">
      <div className="research-card__header">
        <h3 className="research-card__title">{project.title}</h3>
        <div className="research-card__meta">
          <span className="research-card__year">{project.year}</span>
          {project.status && <StatusBadge status={project.status} />}
        </div>
      </div>

      <p className="research-card__description">{project.description}</p>

      <div className="research-card__footer">
        {project.tags.length > 0 && <TagList tags={project.tags} />}
        {project.pdfUrl && (
          <a
            className="research-card__pdf-link"
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF ↗
          </a>
        )}
      </div>
    </article>
  );
}

/* ── PublicationEntry card ── */

interface PublicationCardProps {
  entry: PublicationEntry;
}

function PublicationCard({ entry }: PublicationCardProps) {
  return (
    <article className="research-card">
      <div className="research-card__header">
        <div className="research-card__meta">
          <span className="research-card__venue">{entry.venue}</span>
          <span className="research-card__type">{entry.type}</span>
        </div>
        <StatusBadge status={entry.status} />
      </div>

      <div className="research-card__fields">
        {/* Title */}
        <div className="research-card__field">
          <span className="research-card__field-label">Title</span>
          {entry.title !== undefined ? (
            <span>{entry.title}</span>
          ) : (
            <Placeholder label="Title" />
          )}
        </div>

        {/* Authors */}
        <div className="research-card__field">
          <span className="research-card__field-label">Authors</span>
          {entry.authors !== undefined ? (
            <span>{entry.authors.join(', ')}</span>
          ) : (
            <Placeholder label="Authors" />
          )}
        </div>

        {/* Abstract */}
        <div className="research-card__field">
          <span className="research-card__field-label">Abstract</span>
          {entry.abstract !== undefined ? (
            <span>{entry.abstract}</span>
          ) : (
            <Placeholder label="Abstract" />
          )}
        </div>

        {/* Poster PDF */}
        <div className="research-card__field">
          <span className="research-card__field-label">Poster PDF</span>
          {entry.posterPdf !== undefined ? (
            <a href={entry.posterPdf} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          ) : (
            <Placeholder label="Poster PDF" kind="pdf" />
          )}
        </div>

        {/* Related Project */}
        <div className="research-card__field">
          <span className="research-card__field-label">Project</span>
          {entry.relatedProject !== undefined ? (
            <span>{entry.relatedProject}</span>
          ) : (
            <Placeholder label="Related Project" kind="link" />
          )}
        </div>
      </div>
    </article>
  );
}
