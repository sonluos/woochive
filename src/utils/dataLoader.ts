import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new DataLoadError(
        `Failed to load data from ${url}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof DataLoadError) {
      throw error;
    }
    throw new DataLoadError(`Network error while loading ${url}`);
  }
}

export async function loadProjects(): Promise<ResearchProject[]> {
  return fetchJson<ResearchProject[]>('/data/projects.json');
}

export async function loadMusic(): Promise<MusicWork[]> {
  return fetchJson<MusicWork[]>('/data/music.json');
}

export async function loadPublications(): Promise<Publication[]> {
  return fetchJson<Publication[]>('/data/publications.json');
}

export async function loadBio(): Promise<Bio> {
  return fetchJson<Bio>('/data/bio.json');
}

export async function loadCourses(): Promise<Course[]> {
  return fetchJson<Course[]>('/data/courses.json');
}
