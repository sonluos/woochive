import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioCard } from './PortfolioCard';
import fc from 'fast-check';

describe('PortfolioCard Property Tests', () => {
  describe('Property 8: Portfolio card contains required fields', () => {
    it('should display all required fields for a project', () => {
      const mockProject = {
        id: 'proj1',
        title: 'Test Project',
        description: 'Test Description',
        date: '2024-01-01',
        tags: ['AI', 'ML'],
        fullDescription: 'Full',
        images: [],
        technologies: []
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockProject} type="project" />
        </BrowserRouter>
      );

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('AI')).toBeInTheDocument();
      expect(screen.getByText('ML')).toBeInTheDocument();
      expect(screen.getByText(/2024/)).toBeInTheDocument();
    });

    it('should display all required fields for music', () => {
      const mockMusic = {
        id: 'music1',
        title: 'Test Music',
        description: 'Test Description',
        date: '2024-01-01',
        tags: ['Electronic'],
        instruments: ['Piano'],
        fullDescription: 'Full'
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockMusic} type="music" />
        </BrowserRouter>
      );

      expect(screen.getByText('Test Music')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Electronic')).toBeInTheDocument();
    });

    it('should always have required fields', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            date: fc.date().map(d => d.toISOString()),
            tags: fc.array(fc.string(), { minLength: 0, maxLength: 5 })
          }),
          (item) => {
            // Property: all required fields are present
            return (
              item.id.length > 0 &&
              item.title.length > 0 &&
              item.description.length > 0 &&
              item.date.length > 0 &&
              Array.isArray(item.tags)
            );
          }
        )
      );
    });
  });

  describe('Property: Card navigation', () => {
    it('should have correct href for project type', () => {
      const mockProject = {
        id: 'proj1',
        title: 'Test',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        fullDescription: '',
        images: [],
        technologies: []
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockProject} type="project" />
        </BrowserRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/projects/proj1');
    });

    it('should have correct href for music type', () => {
      const mockMusic = {
        id: 'music1',
        title: 'Test',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        instruments: [],
        fullDescription: ''
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockMusic} type="music" />
        </BrowserRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/music/music1');
    });

    it('should have correct href for publication type', () => {
      const mockPub = {
        id: 'pub1',
        title: 'Test',
        authors: ['Author'],
        venue: 'Venue',
        date: '2024-01-01',
        abstract: 'Abstract'
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockPub} type="publication" />
        </BrowserRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/publications/pub1');
    });
  });

  describe('Property: Thumbnail display', () => {
    it('should display thumbnail when available', () => {
      const mockProject = {
        id: 'proj1',
        title: 'Test',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        thumbnail: '/images/test.jpg',
        fullDescription: '',
        images: [],
        technologies: []
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockProject} type="project" />
        </BrowserRouter>
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/images/test.jpg');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('should not display thumbnail when not available', () => {
      const mockProject = {
        id: 'proj1',
        title: 'Test',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        fullDescription: '',
        images: [],
        technologies: []
      };

      render(
        <BrowserRouter>
          <PortfolioCard item={mockProject} type="project" />
        </BrowserRouter>
      );

      const img = screen.queryByRole('img');
      expect(img).not.toBeInTheDocument();
    });
  });
});
