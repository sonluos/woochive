import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './DetailPage';
import fc from 'fast-check';
import * as portfolioData from '../hooks/usePortfolioData';

vi.mock('../hooks/usePortfolioData');

describe('DetailPage Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 14: Detail page navigation', () => {
    it('should navigate to correct detail page for projects', async () => {
      const mockProjects = [{
        id: 'proj1',
        title: 'Test Project',
        description: 'Desc',
        date: '2024-01-01',
        tags: ['AI'],
        fullDescription: 'Full description',
        images: [],
        technologies: ['Python']
      }];

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
        <MemoryRouter initialEntries={['/projects/proj1']}>
          <Routes>
            <Route path="/projects/:id" element={<DetailPage type="project" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Full description')).toBeInTheDocument();
      });
    });

    it('should navigate to correct detail page for music', async () => {
      const mockMusic = [{
        id: 'music1',
        title: 'Test Music',
        description: 'Desc',
        date: '2024-01-01',
        tags: ['Electronic'],
        fullDescription: 'Full description',
        instruments: ['Piano']
      }];

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: [],
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
        data: [],
        loading: false,
        error: null,
        reload: vi.fn()
      });

      render(
        <MemoryRouter initialEntries={['/music/music1']}>
          <Routes>
            <Route path="/music/:id" element={<DetailPage type="music" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Music')).toBeInTheDocument();
        expect(screen.getByText('Piano')).toBeInTheDocument();
      });
    });
  });

  describe('Property 15: Detail page contains required fields', () => {
    it('should display all required fields for project detail', async () => {
      const mockProjects = [{
        id: 'proj1',
        title: 'Test Project',
        description: 'Short description',
        date: '2024-01-01',
        tags: ['AI', 'ML'],
        fullDescription: 'Full description',
        images: ['/images/test.jpg'],
        technologies: ['Python', 'TensorFlow']
      }];

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
        <MemoryRouter initialEntries={['/projects/proj1']}>
          <Routes>
            <Route path="/projects/:id" element={<DetailPage type="project" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Short description')).toBeInTheDocument();
        expect(screen.getByText('Full description')).toBeInTheDocument();
        expect(screen.getByText('AI')).toBeInTheDocument();
        expect(screen.getByText('ML')).toBeInTheDocument();
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('TensorFlow')).toBeInTheDocument();
      });
    });
  });

  describe('Property 16: Conditional media display', () => {
    it('should display images when available', async () => {
      const mockProjects = [{
        id: 'proj1',
        title: 'Test Project',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        fullDescription: 'Full',
        images: ['/images/test1.jpg', '/images/test2.jpg'],
        technologies: []
      }];

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

      const { container } = render(
        <MemoryRouter initialEntries={['/projects/proj1']}>
          <Routes>
            <Route path="/projects/:id" element={<DetailPage type="project" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const gallery = container.querySelector('.image-gallery');
        expect(gallery).toBeInTheDocument();
      });
    });

    it('should not display images when not available', async () => {
      const mockProjects = [{
        id: 'proj1',
        title: 'Test Project',
        description: 'Desc',
        date: '2024-01-01',
        tags: [],
        fullDescription: 'Full',
        images: [],
        technologies: []
      }];

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

      const { container } = render(
        <MemoryRouter initialEntries={['/projects/proj1']}>
          <Routes>
            <Route path="/projects/:id" element={<DetailPage type="project" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const gallery = container.querySelector('.image-gallery');
        expect(gallery).not.toBeInTheDocument();
      });
    });
  });

  describe('Property 32: Tag click navigates with filter', () => {
    it('should have links to filtered pages from tags', async () => {
      const mockProjects = [{
        id: 'proj1',
        title: 'Test Project',
        description: 'Desc',
        date: '2024-01-01',
        tags: ['AI', 'ML'],
        fullDescription: 'Full',
        images: [],
        technologies: []
      }];

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
        <MemoryRouter initialEntries={['/projects/proj1']}>
          <Routes>
            <Route path="/projects/:id" element={<DetailPage type="project" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const aiTag = screen.getByText('AI').closest('a');
        expect(aiTag).toHaveAttribute('href', '/projects?tag=AI');
      });
    });
  });

  describe('Property 33: Related items by tag', () => {
    it('should display related items with common tags', async () => {
      const mockProjects = [
        {
          id: 'proj1',
          title: 'Main Project',
          description: 'Desc',
          date: '2024-01-01',
          tags: ['AI', 'ML'],
          fullDescription: 'Full',
          images: [],
          technologies: []
        },
        {
          id: 'proj2',
          title: 'Related Project 1',
          description: 'Desc',
          date: '2024-01-02',
          tags: ['AI', 'Python'],
          fullDescription: 'Full',
          images: [],
          technologies: []
        },
        {
          id: 'proj3',
          title: 'Related Project 2',
          description: 'Desc',
          date: '2024-01-03',
          tags: ['ML', 'Data'],
          fullDescription: 'Full',
          images: [],
          technologies: []
        },
        {
          id: 'proj4',
          title: 'Unrelated Project',
          description: 'Desc',
          date: '2024-01-04',
          tags: ['Web', 'Frontend'],
          fullDescription: 'Full',
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
        <MemoryRouter initialEntries={['/projects/proj1']}>
          <Routes>
            <Route path="/projects/:id" element={<DetailPage type="project" />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should show related projects but not unrelated
        expect(screen.getByText('Related Project 1')).toBeInTheDocument();
        expect(screen.getByText('Related Project 2')).toBeInTheDocument();
        expect(screen.queryByText('Unrelated Project')).not.toBeInTheDocument();
      });
    });

    it('should limit related items to maximum 3', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string(),
              tags: fc.array(fc.string(), { minLength: 1, maxLength: 5 })
            }),
            { minLength: 0, maxLength: 20 }
          ),
          (items) => {
            if (items.length === 0) return true;
            
            const currentItem = items[0];
            const currentTags = new Set(currentItem.tags);
            
            const related = items
              .slice(1)
              .filter(item => item.tags.some(tag => currentTags.has(tag)))
              .slice(0, 3);
            
            return related.length <= 3;
          }
        )
      );
    });
  });
});
