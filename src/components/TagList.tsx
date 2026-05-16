import './TagList.css';

const MUSIC_TAGS = new Set([
  'MIR',
  'Music Recommendation',
  'Music Structure',
  'Audio Analysis',
]);

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`tag-list__tag ${MUSIC_TAGS.has(tag) ? 'tag-list__tag--music' : ''}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
