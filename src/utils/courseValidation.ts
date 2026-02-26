import { Course } from '../types/portfolio';

/**
 * Validates if a course object has all required fields with valid values
 */
export function isValidCourse(course: any): course is Course {
  if (!course || typeof course !== 'object') {
    return false;
  }

  // Check required string fields are non-empty after trimming
  const requiredStringFields: (keyof Course)[] = ['id', 'code', 'name', 'semester'];
  for (const field of requiredStringFields) {
    const value = course[field];
    if (typeof value !== 'string' || value.trim().length === 0) {
      return false;
    }
  }

  // Check required number fields
  if (typeof course.year !== 'number' || course.year < 1900 || course.year > 2100) {
    return false;
  }

  if (typeof course.credits !== 'number' || course.credits <= 0) {
    return false;
  }

  return true;
}

/**
 * Filters and validates an array of courses
 */
export function validateCourses(courses: any[]): Course[] {
  if (!Array.isArray(courses)) {
    return [];
  }

  return courses.filter(isValidCourse);
}

/**
 * Groups courses by a specified field
 */
export function groupCoursesBy<K extends keyof Course>(
  courses: Course[],
  field: K
): Map<Course[K], Course[]> {
  const groups = new Map<Course[K], Course[]>();

  for (const course of courses) {
    const key = course[field];
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(course);
  }

  return groups;
}
