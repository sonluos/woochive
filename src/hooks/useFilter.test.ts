import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilter } from './useFilter';
import { ResearchProject } from '../types/portfolio';

describe('useFilter Hook', () => {
  const mockProjects: ResearchProject[] = [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description 1',
      date: '2024-01-01',
      tags: ['AI', 'Python'],
      fullDescription: 'Full',
      images: [],
      technologies: []
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description 2',
      date: '2024-01-02',
      tags: ['AI', 'JavaScript'],
      fullDescription: 'Full',
      images: [],
      technologies: []
    },
    {
      id: '3',
      title: 'Project 3',
      description: 'Description 3',
      date: '2024-01-03',
      tags: ['Music', 'Python'],
      fullDescription: 'Full',
      images: [],
      technologies: []
    }
  ];

  it('should extract all unique tags', () => {
    const { result } = renderHook(() => useFilter(mockProjects));
    
    expect(result.current.availableTags).toEqual(['AI', 'JavaScript', 'Music', 'Python']);
  });

  it('should return all items when no tags are selected', () => {
    const { result } = renderHook(() => useFilter(mockProjects));
    
    expect(result.current.filteredItems).toHaveLength(3);
  });

  it('should filter items by selected tag', () => {
    const { result } = renderHook(() => useFilter(mockProjects));
    
    act(() => {
      result.current.toggleTag('AI');
    });
    
    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.every(item => item.tags.includes('AI'))).toBe(true);
  });

  it('should filter items by multiple tags (OR logic)', () => {
    const { result } = renderHook(() => useFilter(mockProjects));
    
    act(() => {
      result.current.toggleTag('AI');
      result.current.toggleTag('Music');
    });
    
    expect(result.current.filteredItems).toHaveLength(3);
  });

  it('should toggle tag selection', () => {
    const { result } = renderHook(() => useFilter(mockProjects));
    
    act(() => {
      result.current.toggleTag('Python');
    });
    
    expect(result.current.selectedTags).toContain('Python');
    
    act(() => {
      result.current.toggleTag('Python');
    });
    
    expect(result.current.selectedTags).not.toContain('Python');
  });

  it('should clear all selected tags', () => {
    const { result } = renderHook(() => useFilter(mockProjects));
    
    act(() => {
      result.current.toggleTag('AI');
      result.current.toggleTag('Python');
    });
    
    expect(result.current.selectedTags).toHaveLength(2);
    
    act(() => {
      result.current.clearTags();
    });
    
    expect(result.current.selectedTags).toHaveLength(0);
    expect(result.current.filteredItems).toHaveLength(3);
  });

  it('should handle null items', () => {
    const { result } = renderHook(() => useFilter(null));
    
    expect(result.current.availableTags).toEqual([]);
    expect(result.current.filteredItems).toEqual([]);
  });
});
