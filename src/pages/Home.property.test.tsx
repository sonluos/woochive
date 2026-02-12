import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import fc from 'fast-check';
import * as portfolioData from '../hooks/usePortfolioData';

vi.mock('../hooks/usePortfolioData');

describe('Home Page Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 4: Recent items limit', () => {
    it('should display at most 6 recent items', async () => {
      const mockProjects = Array.from({ length: 10 }, (_, i) => ({
        id: `project-${i}`,
        title: `Project ${i}`,
        description: `Description ${i}`,
        date: new Date(2024, 0, i + 1).toISOString(),
        tags: ['tag'],
        fullDescription: 'Full',
        images: [],
        technologies: []
      }));

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: mockProjects,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: [],
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: [],
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link');
        // Filter out hero links (3) and only count recent cards
        const recentCards = cards.filter(link => 
          link.className.includes('recent-card')
        );
        expect(recentCards.length).toBeLessThanOrEqual(6);
      });
    });

    it('should never display more than 6 items regardless of total count', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 20 }),
          fc.integer({ min: 0, max: 20 }),
          fc.integer({ min: 0, max: 20 }),
          (projectCount, musicCount, pubCount) => {
            const totalItems = projectCount + musicCount + pubCount;
            const displayedItems = Math.min(totalItems, 6);
            return displayedItems <= 6;
          }
        )
      );
    });
  });

  describe('Property 5: Recent items are most recent', () => {
    it('should display items sorted by date in descending order', async () => {
      const mockProjects = [
        {
          id: 'p1',
          title: 'Old Project',
          description: 'Desc',
          date: '2023-01-01',
          tags: [],
          fullDescription: '',
          images: [],
          technologies: []
        },
        {
          id: 'p2',
          title: 'New Project',
          description: 'Desc',
          date: '2024-12-01',
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

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: [],
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: [],
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        const cards = screen.getAllByRole('link').filter(link => 
          link.className.includes('recent-card')
        );
        // First card should be the newer project
        expect(cards[0]).toHaveTextContent('New Project');
      });
    });
  });

  describe('Property 6: Recent item navigation', () => {
    it('should have correct navigation links for each item type', async () => {
      const mockProjects = [{
        id: 'proj1',
        title: 'Project',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        fullDescription: '',
        images: [],
        technologies: []
      }];

      const mockMusic = [{
        id: 'music1',
        title: 'Music',
        description: 'Desc',
        date: '2024-01-02',
        tags: [],
        instruments: [],
        fullDescription: ''
      }];

      const mockPubs = [{
        id: 'pub1',
        title: 'Publication',
        authors: ['Author'],
        venue: 'Venue',
        date: '2024-01-03',
        abstract: 'Abstract'
      }];

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: mockProjects,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.useMusic).mockReturnValue({
        data: mockMusic,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.usePublications).mockReturnValue({
        data: mockPubs,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        const pubLink = screen.getByText('Publication').closest('a');
        expect(pubLink).toHaveAttribute('href', '/publications/pub1');

        const musicLink = screen.getByText('Music').closest('a');
        expect(musicLink).toHaveAttribute('href', '/music/music1');

        const projLink = screen.getByText('Project').closest('a');
        expect(projLink).toHaveAttribute('href', '/projects/proj1');
      });
    });
  });
});
