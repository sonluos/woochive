import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

// GitHub raw URL에서 데이터 로드 (강력한 캐시 무효화)
async function fetchFromGitHub<T>(path: string): Promise<T> {
  try {
    const owner = 'sonluos';
    const repo = 'woochive';
    const branch = 'main';
    
    // raw.githubusercontent.com 사용 (rate limit 없음)
    // 캐시 무효화: timestamp + random (헤더 없이 URL만 사용)
    const cacheBuster = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}?cb=${cacheBuster}`;
    
    console.log('Loading from GitHub:', path);
    
    const response = await fetch(url, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new DataLoadError(
        `Failed to load data from ${path}`,
        response.status
      );
    }
    
    const data = await response.json();
    console.log('Loaded data from GitHub:', path, data);
    return data;
  } catch (error) {
    console.error('Failed to load from GitHub:', path, error);
    if (error instanceof DataLoadError) {
      throw error;
    }
    throw new DataLoadError(`Network error while loading ${path}`);
  }
}

export async function loadProjects(): Promise<ResearchProject[]> {
  const data = await fetchFromGitHub<ResearchProject[]>('public/data/projects.json');
  return data;
}

export async function loadMusic(): Promise<MusicWork[]> {
  const data = await fetchFromGitHub<MusicWork[]>('public/data/music.json');
  return data;
}

export async function loadPublications(): Promise<Publication[]> {
  const data = await fetchFromGitHub<Publication[]>('public/data/publications.json');
  return data;
}

export async function loadBio(): Promise<Bio> {
  const data = await fetchFromGitHub<Bio>('public/data/bio.json');
  return data;
}

export async function loadCourses(): Promise<Course[]> {
  const data = await fetchFromGitHub<Course[]>('public/data/courses.json');
  return data;
}
