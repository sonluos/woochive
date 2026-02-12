import { useState, useMemo } from 'react';
import { PortfolioItem } from '../types/portfolio';

export function useFilter<T extends PortfolioItem>(items: T[] | null) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from items
  const availableTags = useMemo(() => {
    if (!items) return [];
    const tagSet = new Set<string>();
    items.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [items]);

  // Filter items by selected tags
  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (selectedTags.length === 0) return items;
    
    return items.filter(item =>
      selectedTags.some(tag => item.tags.includes(tag))
    );
  }, [items, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  return {
    selectedTags,
    availableTags,
    filteredItems,
    toggleTag,
    clearTags
  };
}
