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
  const data = await fetchJson<ResearchProject[]>('/data/projects.json');
  return data;
}

export async function loadMusic(): Promise<MusicWork[]> {
  const data = await fetchJson<MusicWork[]>('/data/music.json');
  return data;
}

export async function loadPublications(): Promise<Publication[]> {
  const data = await fetchJson<Publication[]>('/data/publications.json');
  return data;
}

export async function loadBio(): Promise<Bio> {
  const data = await fetchJson<Bio>('/data/bio.json');
  return data;
}

export async function loadCourses(): Promise<Course[]> {
  const data = await fetchJson<Course[]>('/data/courses.json');
  return data;
}
