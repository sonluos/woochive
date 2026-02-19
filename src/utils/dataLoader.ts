import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  try {
    // 캐시 방지를 위한 timestamp 추가
    const timestamp = Date.now();
    const urlWithTimestamp = url.includes('?') 
      ? `${url}&t=${timestamp}` 
      : `${url}?t=${timestamp}`;
    
    const response = await fetch(urlWithTimestamp);
    
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

// GitHub raw URL 생성 함수
function getGitHubRawUrl(path: string): string {
  const owner = 'sonluos';
  const repo = 'woochive';
  const branch = 'main';
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

export async function loadProjects(): Promise<ResearchProject[]> {
  // GitHub에서 직접 최신 데이터 로드
  const url = getGitHubRawUrl('public/data/projects.json');
  const data = await fetchJson<ResearchProject[]>(url);
  return data;
}

export async function loadMusic(): Promise<MusicWork[]> {
  const url = getGitHubRawUrl('public/data/music.json');
  const data = await fetchJson<MusicWork[]>(url);
  return data;
}

export async function loadPublications(): Promise<Publication[]> {
  const url = getGitHubRawUrl('public/data/publications.json');
  const data = await fetchJson<Publication[]>(url);
  return data;
}

export async function loadBio(): Promise<Bio> {
  const url = getGitHubRawUrl('public/data/bio.json');
  const data = await fetchJson<Bio>(url);
  return data;
}

export async function loadCourses(): Promise<Course[]> {
  const url = getGitHubRawUrl('public/data/courses.json');
  const data = await fetchJson<Course[]>(url);
  return data;
}
