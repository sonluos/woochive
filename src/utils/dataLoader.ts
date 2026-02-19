import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

// API에서 데이터 로드
async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/data/${endpoint}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new DataLoadError(
        `Failed to load data from ${endpoint}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to load from API:', endpoint, error);
    if (error instanceof DataLoadError) {
      throw error;
    }
    throw new DataLoadError(`Network error while loading ${endpoint}`);
  }
}

// 정적 파일에서 데이터 로드 (폴백)
async function fetchFromStatic<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`/data/${path}?t=${Date.now()}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new DataLoadError(
        `Failed to load data from ${path}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to load from static:', path, error);
    if (error instanceof DataLoadError) {
      throw error;
    }
    throw new DataLoadError(`Network error while loading ${path}`);
  }
}

export async function loadProjects(): Promise<ResearchProject[]> {
  try {
    return await fetchFromApi<ResearchProject[]>('projects');
  } catch (error) {
    console.warn('API failed, falling back to static file');
    return await fetchFromStatic<ResearchProject[]>('projects.json');
  }
}

export async function loadMusic(): Promise<MusicWork[]> {
  try {
    return await fetchFromApi<MusicWork[]>('music');
  } catch (error) {
    console.warn('API failed, falling back to static file');
    return await fetchFromStatic<MusicWork[]>('music.json');
  }
}

export async function loadPublications(): Promise<Publication[]> {
  try {
    return await fetchFromApi<Publication[]>('publications');
  } catch (error) {
    console.warn('API failed, falling back to static file');
    return await fetchFromStatic<Publication[]>('publications.json');
  }
}

export async function loadBio(): Promise<Bio> {
  return await fetchFromStatic<Bio>('bio.json');
}

export async function loadCourses(): Promise<Course[]> {
  return await fetchFromStatic<Course[]>('courses.json');
}
