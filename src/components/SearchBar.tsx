import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

function SearchBar({ onSearch, placeholder = '검색...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          className="clear-button"
        >
          ✕
        </button>
      )}
    </form>
  );
}

export default SearchBar;
