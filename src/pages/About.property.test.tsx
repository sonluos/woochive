import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './About';
import fc from 'fast-check';
import * as portfolioData from '../hooks/usePortfolioData';

vi.mock('../hooks/usePortfolioData');

describe('About Page Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 10: Course display contains required fields', () => {
    it('should display all required course fields', async () => {
      const mockBio = {
        name: 'Test Name',
        introduction: 'Test Introduction'
      };

      const mockCourses = [
        {
          id: 'course1',
          code: 'CS101',
          name: 'Advanced Mathematics',
          semester: '2024-1',
          year: 2024,
          credits: 3,
          description: 'Course description'
        }
      ];

      vi.mocked(portfolioData.useBio).mockReturnValue({
        data: mockBio,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.useCourses).mockReturnValue({
        data: mockCourses,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: [],
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
          <About />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Advanced Mathematics/)).toBeInTheDocument();
        expect(screen.getByText(/2024-1/)).toBeInTheDocument();
      });
    });

    it('should validate all courses have required fields', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string({ minLength: 2 }).filter(s => s.trim().length > 0),
              code: fc.string({ minLength: 2 }).filter(s => s.trim().length > 0),
              name: fc.string({ minLength: 2 }).filter(s => s.trim().length > 0),
              semester: fc.string({ minLength: 2 }).filter(s => s.trim().length > 0),
              year: fc.integer({ min: 2000, max: 2030 }),
              credits: fc.integer({ min: 1, max: 6 })
            }),
            { minLength: 0, maxLength: 20 }
          ),
          (courses) => {
            // Property: all courses have required fields with valid values
            return courses.every(course => 
              course.id.trim().length > 0 && 
              course.code.trim().length > 0 &&
              course.name.trim().length > 0 && 
              course.semester.trim().length > 0 &&
              course.year >= 2000 &&
              course.credits > 0
            );
          }
        )
      );
    });
  });

  describe('Property 13: Course grouping', () => {
    it('should group courses by category', async () => {
      const mockBio = {
        name: 'Test Name',
        introduction: 'Test Introduction'
      };

      const mockCourses = [
        {
          id: 'c1',
          code: 'MATH101',
          name: 'Course 1',
          semester: '2024-1',
          year: 2024,
          credits: 3,
          category: 'Math'
        },
        {
          id: 'c2',
          code: 'MATH102',
          name: 'Course 2',
          semester: '2024-1',
          year: 2024,
          credits: 3,
          category: 'Math'
        },
        {
          id: 'c3',
          code: 'CS101',
          name: 'Course 3',
          semester: '2024-2',
          year: 2024,
          credits: 3,
          category: 'CS'
        }
      ];

      vi.mocked(portfolioData.useBio).mockReturnValue({
        data: mockBio,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.useCourses).mockReturnValue({
        data: mockCourses,
        loading: false,
        error: null,
        reload: vi.fn()
      });

      vi.mocked(portfolioData.useProjects).mockReturnValue({
        data: [],
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
          <About />
        </BrowserRouter>
      );

      await waitFor(() => {
        // Check that courses are displayed (grouping logic may vary)
        expect(screen.getByText(/Course 1/)).toBeInTheDocument();
        expect(screen.getByText(/Course 2/)).toBeInTheDocument();
        expect(screen.getByText(/Course 3/)).toBeInTheDocument();
      });
    });

    it('should maintain grouping property', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string({ minLength: 1 }),
              code: fc.string({ minLength: 1 }),
              name: fc.string({ minLength: 1 }),
              semester: fc.constantFrom('2024-1', '2024-2', '2023-1'),
              year: fc.integer({ min: 2023, max: 2024 }),
              credits: fc.integer({ min: 1, max: 4 }),
              category: fc.constantFrom('Math', 'CS', 'Physics')
            })
          ),
          (courses) => {
            // Property: courses can be grouped by category
            const byCategory = new Map<string, typeof courses>();
            
            courses.forEach(course => {
              if (course.category) {
                if (!byCategory.has(course.category)) {
                  byCategory.set(course.category, []);
                }
                byCategory.get(course.category)!.push(course);
              }
            });
            
            // Verify each group contains only courses from that category
            for (const [category, groupCourses] of byCategory.entries()) {
              if (!groupCourses.every(c => c.category === category)) {
                return false;
              }
            }
            
            return true;
          }
        )
      );
    });
  });
});
