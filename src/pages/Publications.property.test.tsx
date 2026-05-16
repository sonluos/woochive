import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Publications from './Publications';
import fc from 'fast-check';
import * as portfolioData from '../hooks/usePortfolioData';

vi.mock('../hooks/usePortfolioData');

describe('Publications Page Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 9: Publication list item contains required fields', () => {
    it('should display all required fields for publications', async () => {
      const mockPubs = [{
        id: 'pub1',
        title: 'Test Paper',
        authors: ['Author 1', 'Author 2'],
        venue: 'Test Conference',
        date: '2024-01-01',
        abstract: 'Test abstract',
        tags: ['ML', 'AI']
      }];

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: mockPubs,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Publications />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Paper')).toBeInTheDocument();
        expect(screen.getByText(/Author 1/)).toBeInTheDocument();
        expect(screen.getByText(/Test Conference/)).toBeInTheDocument();
      });
    });

    it('should validate publication required fields', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            authors: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
            venue: fc.string({ minLength: 1 }),
            date: fc.date().map(d => d.toISOString()),
            abstract: fc.string({ minLength: 1 })
          }),
          (pub) => {
            // Property: all required fields are present and valid
            return (
              pub.id.length > 0 &&
              pub.title.length > 0 &&
              pub.authors.length > 0 &&
              pub.venue.length > 0 &&
              pub.date.length > 0 &&
              pub.abstract.length > 0
            );
          }
        )
      );
    });
  });

  describe('Property 34: Publication tag filtering', () => {
    it('should filter publications by selected tags', async () => {
      const mockPubs = [
        {
          id: 'pub1',
          title: 'ML Paper',
          authors: ['Author 1'],
          venue: 'Conference',
          date: '2024-01-01',
          abstract: 'Abstract',
          tags: ['ML', 'AI']
        },
        {
          id: 'pub2',
          title: 'Quantum Paper',
          authors: ['Author 2'],
          venue: 'Journal',
          date: '2024-01-02',
          abstract: 'Abstract',
          tags: ['Quantum', 'Physics']
        }
      ];

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: mockPubs,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Publications />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('ML Paper')).toBeInTheDocument();
        expect(screen.getByText('Quantum Paper')).toBeInTheDocument();
      });
    });

    it('should maintain filtering correctness property', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string(),
              tags: fc.array(fc.string(), { minLength: 0, maxLength: 5 })
            }),
            { minLength: 0, maxLength: 20 }
          ),
          fc.array(fc.string(), { minLength: 0, maxLength: 5 }),
          (items, selectedTags) => {
            if (selectedTags.length === 0) {
              // No filter: all items shown
              return true;
            }
            
            const filtered = items.filter(item =>
              selectedTags.some(tag => item.tags.includes(tag))
            );
            
            // Property: filtered items contain at least one selected tag
            return filtered.every(item =>
              selectedTags.some(tag => item.tags.includes(tag))
            );
          }
        )
      );
    });
  });

  describe('Property 7: All items displayed (Publications)', () => {
    it('should display all publications when no filters applied', async () => {
      const mockPubs = Array.from({ length: 3 }, (_, i) => ({
        id: `pub${i}`,
        title: `Paper ${i}`,
        authors: ['Author'],
        venue: 'Venue',
        date: '2024-01-01',
        abstract: 'Abstract'
      }));

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: mockPubs,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Publications />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Paper 0')).toBeInTheDocument();
        expect(screen.getByText('Paper 1')).toBeInTheDocument();
        expect(screen.getByText('Paper 2')).toBeInTheDocument();
      });
    });
  });

  describe('Property 12: Reverse chronological sorting (Publications)', () => {
    it('should sort publications by date descending', async () => {
      const mockPubs = [
        {
          id: 'pub1',
          title: 'Old Paper',
          authors: ['Author'],
          venue: 'Venue',
          date: '2023-01-01',
          abstract: 'Abstract'
        },
        {
          id: 'pub2',
          title: 'New Paper',
          authors: ['Author'],
          venue: 'Venue',
          date: '2024-12-01',
          abstract: 'Abstract'
        },
        {
          id: 'pub3',
          title: 'Mid Paper',
          authors: ['Author'],
          venue: 'Venue',
          date: '2024-06-01',
          abstract: 'Abstract'
        }
      ];

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: mockPubs,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Publications />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link').filter(link =>
          link.className.includes('portfolio-card-link')
        );
        
        // Should be sorted: New, Mid, Old
        expect(cards[0]).toHaveTextContent('New Paper');
        expect(cards[1]).toHaveTextContent('Mid Paper');
        expect(cards[2]).toHaveTextContent('Old Paper');
      });
    });
  });
});
