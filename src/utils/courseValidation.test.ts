import { describe, it, expect } from 'vitest';
import { isValidCourse, validateCourses, groupCoursesBy } from './courseValidation';
import { Course } from '../types/portfolio';

describe('courseValidation', () => {
  describe('isValidCourse', () => {
    it('should return true for valid course', () => {
      const validCourse = {
        id: 'cs101',
        code: 'CS101',
        name: 'Introduction to CS',
        semester: '2024-1',
        year: 2024,
        credits: 3
      };

      expect(isValidCourse(validCourse)).toBe(true);
    });

    it('should return false for course with empty string fields', () => {
      const invalidCourse = {
        id: '',
        code: 'CS101',
        name: 'Introduction to CS',
        semester: '2024-1',
        year: 2024,
        credits: 3
      };

      expect(isValidCourse(invalidCourse)).toBe(false);
    });

    it('should return false for course with whitespace-only fields', () => {
      const invalidCourse = {
        id: '   ',
        code: 'CS101',
        name: 'Introduction to CS',
        semester: '2024-1',
        year: 2024,
        credits: 3
      };

      expect(isValidCourse(invalidCourse)).toBe(false);
    });

    it('should return false for course with invalid year', () => {
      const invalidCourse = {
        id: 'cs101',
        code: 'CS101',
        name: 'Introduction to CS',
        semester: '2024-1',
        year: 1800,
        credits: 3
      };

      expect(isValidCourse(invalidCourse)).toBe(false);
    });

    it('should return false for course with zero credits', () => {
      const invalidCourse = {
        id: 'cs101',
        code: 'CS101',
        name: 'Introduction to CS',
        semester: '2024-1',
        year: 2024,
        credits: 0
      };

      expect(isValidCourse(invalidCourse)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isValidCourse(null)).toBe(false);
      expect(isValidCourse(undefined)).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isValidCourse('string')).toBe(false);
      expect(isValidCourse(123)).toBe(false);
      expect(isValidCourse([])).toBe(false);
    });
  });

  describe('validateCourses', () => {
    it('should filter out invalid courses', () => {
      const courses = [
        {
          id: 'cs101',
          code: 'CS101',
          name: 'Valid Course',
          semester: '2024-1',
          year: 2024,
          credits: 3
        },
        {
          id: '',
          code: 'CS102',
          name: 'Invalid Course',
          semester: '2024-1',
          year: 2024,
          credits: 3
        },
        {
          id: 'cs103',
          code: 'CS103',
          name: 'Another Valid',
          semester: '2024-2',
          year: 2024,
          credits: 4
        }
      ];

      const result = validateCourses(courses);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('cs101');
      expect(result[1].id).toBe('cs103');
    });

    it('should return empty array for non-array input', () => {
      expect(validateCourses(null as any)).toEqual([]);
      expect(validateCourses(undefined as any)).toEqual([]);
      expect(validateCourses({} as any)).toEqual([]);
    });

    it('should return empty array when all courses are invalid', () => {
      const courses = [
        { id: '', code: '', name: '', semester: '', year: 0, credits: 0 },
        { id: '   ', code: '   ', name: '   ', semester: '   ', year: 1800, credits: -1 }
      ];

      expect(validateCourses(courses)).toEqual([]);
    });
  });

  describe('groupCoursesBy', () => {
    const courses: Course[] = [
      {
        id: 'cs101',
        code: 'CS101',
        name: 'Course 1',
        semester: '2024-1',
        year: 2024,
        credits: 3,
        category: 'Computer Science'
      },
      {
        id: 'cs102',
        code: 'CS102',
        name: 'Course 2',
        semester: '2024-1',
        year: 2024,
        credits: 3,
        category: 'Computer Science'
      },
      {
        id: 'math101',
        code: 'MATH101',
        name: 'Course 3',
        semester: '2024-2',
        year: 2024,
        credits: 4,
        category: 'Mathematics'
      }
    ];

    it('should group courses by category', () => {
      const grouped = groupCoursesBy(courses, 'category');
      
      expect(grouped.size).toBe(2);
      expect(grouped.get('Computer Science')).toHaveLength(2);
      expect(grouped.get('Mathematics')).toHaveLength(1);
    });

    it('should group courses by semester', () => {
      const grouped = groupCoursesBy(courses, 'semester');
      
      expect(grouped.size).toBe(2);
      expect(grouped.get('2024-1')).toHaveLength(2);
      expect(grouped.get('2024-2')).toHaveLength(1);
    });

    it('should group courses by year', () => {
      const grouped = groupCoursesBy(courses, 'year');
      
      expect(grouped.size).toBe(1);
      expect(grouped.get(2024)).toHaveLength(3);
    });

    it('should handle empty array', () => {
      const grouped = groupCoursesBy([], 'category');
      expect(grouped.size).toBe(0);
    });
  });
});
