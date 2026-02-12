import './TagFilter.css';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="tag-filter">
      <h3>필터</h3>
      <div className="tag-filter-list">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-filter-button ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagFilter;
