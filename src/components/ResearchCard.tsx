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

      <p className="research-card__description">
        {project.description.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < project.description.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className="research-card__footer">
        {project.tags.length > 0 && <TagList tags={project.tags} />}
        {project.pdfUrl && (
          <a
            className="research-card__pdf-link"
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            📄
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
        <span className="research-card__venue-type">
          {entry.venue} | {entry.type.toUpperCase()}
        </span>
        <StatusBadge status={entry.status} />
      </div>

      <div className="research-card__fields">
        {/* Title */}
        <div className="research-card__field">
          <span className="research-card__field-label">Title</span>
          {entry.title !== undefined ? (
            <span className="research-card__field-value research-card__field-value--title">{entry.title}</span>
          ) : (
            <Placeholder label="Title" />
          )}
        </div>

        {/* Authors */}
        <div className="research-card__field">
          <span className="research-card__field-label">Authors</span>
          {entry.authors !== undefined ? (
            <span className="research-card__field-value research-card__field-value--authors">{entry.authors.join(', ')}</span>
          ) : (
            <Placeholder label="Authors" />
          )}
        </div>

        {/* Abstract */}
        <div className="research-card__field">
          <span className="research-card__field-label">Abstract</span>
          {entry.abstract !== undefined ? (
            <span className="research-card__field-value research-card__field-value--abstract">{entry.abstract}</span>
          ) : (
            <Placeholder label="Abstract" />
          )}
        </div>

        {/* PDF */}
        {entry.posterPdf !== undefined && (
          <div className="research-card__footer">
            <span />
            <a
              className="research-card__pdf-link"
              href={entry.posterPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
