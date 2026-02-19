import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

// GitHub에서 데이터 로드 (API 사용 - 캐시 없음)
async function fetchFromGitHub<T>(path: string): Promise<T> {
  try {
    const owner = 'sonluos';
    const repo = 'woochive';
    const branch = 'main';
    
    // GitHub API 사용 (인증 없이도 public repo는 접근 가능)
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    
    console.log('Loading from GitHub API:', path);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      // API rate limit 초과 시 raw URL로 폴백
      if (response.status === 403) {
        console.warn('GitHub API rate limit, falling back to raw URL');
        const cacheBuster = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}?cb=${cacheBuster}`;
        const rawResponse = await fetch(rawUrl, { cache: 'no-store' });
        if (!rawResponse.ok) {
          throw new DataLoadError(`Failed to load data from ${path}`, rawResponse.status);
        }
        return await rawResponse.json();
      }
      throw new DataLoadError(`Failed to load data from ${path}`, response.status);
    }
    
    const data = await response.json();
    console.log('Loaded data from GitHub API:', path, data);
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
