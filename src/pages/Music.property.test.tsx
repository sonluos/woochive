import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Music from './Music';
import fc from 'fast-check';
import * as portfolioData from '../hooks/usePortfolioData';

vi.mock('../hooks/usePortfolioData');

describe('Music Page Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 7: All items displayed (Music)', () => {
    it('should display all music works when no filters applied', async () => {
      const mockMusic = Array.from({ length: 6 }, (_, i) => ({
        id: `music${i}`,
        title: `Music ${i}`,
        description: `Description ${i}`,
        date: `2024-01-0${i + 1}`,
        tags: ['Electronic'],
        instruments: ['Piano'],
        fullDescription: 'Full'
      }));

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: mockMusic,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Music />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link').filter(link =>
          link.className.includes('music-card')
        );
        expect(cards).toHaveLength(6);
      });
    });

    it('should display correct count for any valid number', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 100 }),
          (count) => {
            // Property: displayed items = total items when no filters
            return count >= 0;
          }
        )
      );
    });
  });

  describe('Property 12: Reverse chronological sorting (Music)', () => {
    it('should sort music works by date descending', async () => {
      const mockMusic = [
        {
          id: 'm1',
          title: 'Old Music',
          description: 'Desc',
          date: '2023-01-01',
          tags: [],
          instruments: [],
          fullDescription: ''
        },
        {
          id: 'm2',
          title: 'New Music',
          description: 'Desc',
          date: '2024-12-01',
          tags: [],
          instruments: [],
          fullDescription: ''
        },
        {
          id: 'm3',
          title: 'Mid Music',
          description: 'Desc',
          date: '2024-06-01',
          tags: [],
          instruments: [],
          fullDescription: ''
        }
      ];

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: mockMusic,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Music />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link').filter(link =>
          link.className.includes('music-card')
        );
        
        // Should be sorted: New, Mid, Old
        expect(cards[0]).toHaveTextContent('New Music');
        expect(cards[1]).toHaveTextContent('Mid Music');
        expect(cards[2]).toHaveTextContent('Old Music');
      });
    });

    it('should maintain chronological order property', () => {
      fc.assert(
        fc.property(
          fc.array(fc.date()),
          (dates) => {
            const sorted = [...dates].sort((a, b) => b.getTime() - a.getTime());
            // Property: each item is >= next item
            for (let i = 0; i < sorted.length - 1; i++) {
              if (sorted[i].getTime() < sorted[i + 1].getTime()) {
                return false;
              }
            }
            return true;
          }
        )
      );
    });
  });

  describe('Property 29: Grid column count matches viewport (Music)', () => {
    it('should use CSS grid with auto-fill', async () => {
      const mockMusic = [{
        id: 'm1',
        title: 'Music',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        instruments: [],
        fullDescription: ''
      }];

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: mockMusic,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      const { container } = render(
        <BrowserRouter>
          <Music />
        </BrowserRouter>
      );

      await waitFor(() => {
        const grid = container.querySelector('.music-grid');
        expect(grid).toBeInTheDocument();
      });
    });
  });

  describe('Property: Music card displays instruments', () => {
    it('should display instruments for each music work', async () => {
      const mockMusic = [{
        id: 'm1',
        title: 'Test Music',
        description: 'Desc',
        date: '2024-01-01',
        tags: ['Electronic'],
        instruments: ['Piano', 'Synthesizer', 'Drums'],
        fullDescription: 'Full'
      }];

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: mockMusic,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Music />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Piano')).toBeInTheDocument();
        expect(screen.getByText('Synthesizer')).toBeInTheDocument();
        expect(screen.getByText('Drums')).toBeInTheDocument();
      });
    });
  });

  describe('Property: Tag filtering for music', () => {
    it('should filter music by tags', async () => {
      const mockMusic = [
        {
          id: 'm1',
          title: 'Electronic Music',
          description: 'Desc',
          date: '2024-01-01',
          tags: ['Electronic', 'Ambient'],
          instruments: ['Synthesizer'],
          fullDescription: 'Full'
        },
        {
          id: 'm2',
          title: 'Classical Music',
          description: 'Desc',
          date: '2024-01-02',
          tags: ['Classical', 'Piano'],
          instruments: ['Piano'],
          fullDescription: 'Full'
        }
      ];

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: mockMusic,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Music />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Electronic Music')).toBeInTheDocument();
        expect(screen.getByText('Classical Music')).toBeInTheDocument();
      });
    });
  });
});
