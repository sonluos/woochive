import './Placeholder.css';

type PlaceholderKind = 'link' | 'pdf' | 'email';

interface PlaceholderProps {
  label: string;
  kind?: PlaceholderKind;
}

const KIND_ICON: Record<PlaceholderKind, string> = {
  link: '🔗',
  pdf: '📄',
  email: '✉',
};

export function Placeholder({ label, kind }: PlaceholderProps) {
  const icon = kind ? KIND_ICON[kind] : null;

  return (
    <span className="placeholder" aria-label={`${label} (not yet available)`}>
      {icon && <span className="placeholder__icon" aria-hidden="true">{icon}</span>}
      <span className="placeholder__label">{label}</span>
    </span>
  );
}
