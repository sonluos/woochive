import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

// GitHub API를 통해 직접 데이터 로드 (캐시 없음)
async function fetchFromGitHubAPI<T>(path: string): Promise<T> {
  try {
    const owner = 'sonluos';
    const repo = 'woochive';
    const branch = 'main';
    
    // GitHub API 사용 (raw URL 대신)
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
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
    if (error instanceof DataLoadError) {
      throw error;
    }
    throw new DataLoadError(`Network error while loading ${path}`);
  }
}

export async function loadProjects(): Promise<ResearchProject[]> {
  const data = await fetchFromGitHubAPI<ResearchProject[]>('public/data/projects.json');
  return data;
}

export async function loadMusic(): Promise<MusicWork[]> {
  const data = await fetchFromGitHubAPI<MusicWork[]>('public/data/music.json');
  return data;
}

export async function loadPublications(): Promise<Publication[]> {
  const data = await fetchFromGitHubAPI<Publication[]>('public/data/publications.json');
  return data;
}

export async function loadBio(): Promise<Bio> {
  const data = await fetchFromGitHubAPI<Bio>('public/data/bio.json');
  return data;
}

export async function loadCourses(): Promise<Course[]> {
  const data = await fetchFromGitHubAPI<Course[]>('public/data/courses.json');
  return data;
}
