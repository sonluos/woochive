import './TagList.css';

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag} className="tag-list__tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
