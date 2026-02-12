import { PortfolioItem, Publication } from '../types/portfolio';

export function searchPortfolioItems<T extends PortfolioItem | Publication>(
  items: T[],
  query: string
): T[] {
  if (!query || query.trim() === '') {
    return items;
  }

  const lowerQuery = query.toLowerCase();

  return items.filter(item => {
    // Search in title
    if (item.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in description/abstract
    if ('description' in item && item.description.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    if ('abstract' in item && item.abstract.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in tags
    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      return true;
    }

    return false;
  });
}

export function highlightKeywords(text: string, keywords: string): string {
  if (!keywords || keywords.trim() === '') {
    return text;
  }

  const regex = new RegExp(`(${keywords})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
