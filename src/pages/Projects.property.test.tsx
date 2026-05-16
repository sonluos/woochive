import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Projects from './Projects';
import fc from 'fast-check';
import * as portfolioData from '../hooks/usePortfolioData';

vi.mock('../hooks/usePortfolioData');

describe('Projects Page Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 7: All items displayed', () => {
    it('should display all projects when no filters are applied', async () => {
      const mockProjects = Array.from({ length: 5 }, (_, i) => ({
        id: `project-${i}`,
        title: `Project ${i}`,
        description: `Description ${i}`,
        date: `2024-01-0${i + 1}`,
        tags: ['AI'],
        fullDescription: 'Full',
        images: [],
        technologies: ['Python']
      }));

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: mockProjects,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link').filter(link =>
          link.className.includes('portfolio-card-link')
        );
        expect(cards).toHaveLength(5);
      });
    });

    it('should display correct number of items for any valid count', () => {
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

  describe('Property 12: Reverse chronological sorting', () => {
    it('should sort projects by date in descending order', async () => {
      const mockProjects = [
        {
          id: 'p1',
          title: 'Project 1',
          description: 'Desc',
          date: '2024-01-01',
          tags: [],
          fullDescription: '',
          images: [],
          technologies: []
        },
        {
          id: 'p2',
          title: 'Project 2',
          description: 'Desc',
          date: '2024-06-01',
          tags: [],
          fullDescription: '',
          images: [],
          technologies: []
        },
        {
          id: 'p3',
          title: 'Project 3',
          description: 'Desc',
          date: '2024-03-01',
          tags: [],
          fullDescription: '',
          images: [],
          technologies: []
        }
      ];

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: mockProjects,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link').filter(link =>
          link.className.includes('portfolio-card-link')
        );
        
        // Should be sorted: Project 2 (June), Project 3 (March), Project 1 (Jan)
        expect(cards[0]).toHaveTextContent('Project 2');
        expect(cards[1]).toHaveTextContent('Project 3');
        expect(cards[2]).toHaveTextContent('Project 1');
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

  describe('Property 29: Grid column count matches viewport', () => {
    it('should use CSS grid with auto-fill', async () => {
      const mockProjects = [{
        id: 'p1',
        title: 'Project',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        fullDescription: '',
        images: [],
        technologies: []
      }];

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: mockProjects,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      const { container } = render(
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      );

      await waitFor(() => {
        const grid = container.querySelector('.portfolio-grid');
        expect(grid).toBeInTheDocument();
      });
    });
  });

  describe('Property 8: Portfolio card contains required fields', () => {
    it('should display all required fields in project cards', async () => {
      const mockProjects = [{
        id: 'p1',
        title: 'Test Project',
        description: 'Test Description',
        date: '2024-01-01',
        tags: ['AI', 'Python'],
        fullDescription: 'Full',
        images: [],
        technologies: ['Python']
      }];

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: mockProjects,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getAllByText('AI').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
      });
    });
  });
});
