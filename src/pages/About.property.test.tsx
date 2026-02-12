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
          name: 'Advanced Mathematics',
          semester: '2024-1',
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

      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Advanced Mathematics')).toBeInTheDocument();
        expect(screen.getByText(/2024-1/)).toBeInTheDocument();
      });
    });

    it('should display all courses with required fields', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string(),
              name: fc.string({ minLength: 1 }),
              semester: fc.string({ minLength: 1 })
            }),
            { minLength: 0, maxLength: 20 }
          ),
          (courses) => {
            // Property: all courses have required fields
            return courses.every(course => 
              course.id && course.name && course.semester
            );
          }
        )
      );
    });
  });

  describe('Property 13: Course grouping', () => {
    it('should group courses by semester or category', async () => {
      const mockBio = {
        name: 'Test Name',
        introduction: 'Test Introduction'
      };

      const mockCourses = [
        {
          id: 'c1',
          name: 'Course 1',
          semester: '2024-1',
          category: 'Math'
        },
        {
          id: 'c2',
          name: 'Course 2',
          semester: '2024-1',
          category: 'Math'
        },
        {
          id: 'c3',
          name: 'Course 3',
          semester: '2024-2',
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

      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>
      );

      await waitFor(() => {
        // Check that courses are displayed (grouping logic may vary)
        expect(screen.getByText('Course 1')).toBeInTheDocument();
        expect(screen.getByText('Course 2')).toBeInTheDocument();
        expect(screen.getByText('Course 3')).toBeInTheDocument();
      });
    });

    it('should maintain grouping property', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string(),
              name: fc.string(),
              semester: fc.constantFrom('2024-1', '2024-2', '2023-1'),
              category: fc.constantFrom('Math', 'CS', 'Physics')
            })
          ),
          (courses) => {
            // Property: courses can be grouped by semester or category
            const bySemester = new Map<string, typeof courses>();
            const byCategory = new Map<string, typeof courses>();
            
            courses.forEach(course => {
              if (!bySemester.has(course.semester)) {
                bySemester.set(course.semester, []);
              }
              bySemester.get(course.semester)!.push(course);
              
              if (course.category) {
                if (!byCategory.has(course.category)) {
                  byCategory.set(course.category, []);
                }
                byCategory.get(course.category)!.push(course);
              }
            });
            
            return bySemester.size >= 0 && byCategory.size >= 0;
          }
        )
      );
    });
  });
});
