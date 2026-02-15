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
  // localStorage에서 먼저 확인
  const cached = localStorage.getItem('projects_data');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      console.error('Failed to parse cached projects:', error);
    }
  }
  
  // localStorage에 없으면 JSON 파일에서 로드
  const data = await fetchJson<ResearchProject[]>('/data/projects.json');
  localStorage.setItem('projects_data', JSON.stringify(data));
  return data;
}

export async function loadMusic(): Promise<MusicWork[]> {
  // localStorage에서 먼저 확인
  const cached = localStorage.getItem('music_data');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      console.error('Failed to parse cached music:', error);
    }
  }
  
  // localStorage에 없으면 JSON 파일에서 로드
  const data = await fetchJson<MusicWork[]>('/data/music.json');
  localStorage.setItem('music_data', JSON.stringify(data));
  return data;
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
