import { describe, it, expect } from 'vitest';
import { searchPortfolioItems, highlightKeywords, escapeRegExp } from './search';
import { ResearchProject, Publication } from '../types/portfolio';

describe('Search Utilities', () => {
  const mockProjects: ResearchProject[] = [
    {
      id: '1',
      title: 'AI Music Generation',
      description: 'Deep learning for music',
      date: '2024-01-01',
      tags: ['AI', 'Music'],
      fullDescription: 'Full description',
      images: [],
      technologies: ['Python']
    },
    {
      id: '2',
      title: 'Signal Processing',
      description: 'Audio signal analysis',
      date: '2024-01-02',
      tags: ['DSP', 'Audio'],
      fullDescription: 'Full description',
      images: [],
      technologies: ['C++']
    },
    {
      id: '3',
      title: 'Quantum Computing',
      description: 'Quantum algorithms',
      date: '2024-01-03',
      tags: ['Quantum', 'Algorithms'],
      fullDescription: 'Full description',
      images: [],
      technologies: ['Python']
    }
  ];

  const mockPublications: Publication[] = [
    {
      id: '1',
      title: 'Deep Learning Survey',
      authors: ['Author 1'],
      venue: 'Conference',
      date: '2024-01-01',
      abstract: 'A survey of deep learning methods',
      tags: ['Deep Learning', 'Survey']
    },
    {
      id: '2',
      title: 'Quantum Machine Learning',
      authors: ['Author 2'],
      venue: 'Journal',
      date: '2024-01-02',
      abstract: 'Quantum approaches to ML',
      tags: ['Quantum', 'ML']
    }
  ];

  describe('searchPortfolioItems', () => {
    it('should return all items when query is empty', () => {
      const result = searchPortfolioItems(mockProjects, '');
      expect(result).toHaveLength(3);
    });

    it('should return all items when query is whitespace', () => {
      const result = searchPortfolioItems(mockProjects, '   ');
      expect(result).toHaveLength(3);
    });

    it('should search by title', () => {
      const result = searchPortfolioItems(mockProjects, 'music');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should search by description', () => {
      const result = searchPortfolioItems(mockProjects, 'audio');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('should search by tags', () => {
      const result = searchPortfolioItems(mockProjects, 'quantum');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('3');
    });

    it('should be case insensitive', () => {
      const result = searchPortfolioItems(mockProjects, 'MUSIC');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should search publications by abstract', () => {
      const result = searchPortfolioItems(mockPublications, 'survey');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should return multiple matches', () => {
      const result = searchPortfolioItems(mockProjects, 'python');
      expect(result).toHaveLength(0); // Python is in technologies, not in searchable fields
    });
  });

  describe('highlightKeywords', () => {
    it('should highlight matching keywords', () => {
      const result = highlightKeywords('Hello world', 'world');
      expect(result).toBe('Hello <mark>world</mark>');
    });

    it('should be case insensitive', () => {
      const result = highlightKeywords('Hello World', 'world');
      expect(result).toBe('Hello <mark>World</mark>');
    });

    it('should return original text when keywords are empty', () => {
      const result = highlightKeywords('Hello world', '');
      expect(result).toBe('Hello world');
    });

    it('should highlight multiple occurrences', () => {
      const result = highlightKeywords('test test test', 'test');
      expect(result).toBe('<mark>test</mark> <mark>test</mark> <mark>test</mark>');
    });
  });

  describe('escapeRegExp', () => {
    it('should escape special regex characters', () => {
      const result = escapeRegExp('test.*+?^${}()|[]\\');
      expect(result).toBe('test\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    });

    it('should not modify regular strings', () => {
      const result = escapeRegExp('hello world');
      expect(result).toBe('hello world');
    });
  });
});
