import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

export class DataLoadError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DataLoadError';
  }
}

// localStorage 키
const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  music: 'portfolio_music',
  publications: 'portfolio_publications',
  bio: 'portfolio_bio',
  courses: 'portfolio_courses'
};

// localStorage에서 데이터 로드
function loadFromStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', key, error);
    return null;
  }
}

// 정적 파일에서 데이터 로드
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
  // localStorage 먼저 확인
  const stored = loadFromStorage<ResearchProject[]>(STORAGE_KEYS.projects);
  if (stored) {
    console.log('Loaded projects from localStorage');
    return stored;
  }
  
  // 없으면 정적 파일에서 로드
  console.log('Loading projects from static file');
  return await fetchFromStatic<ResearchProject[]>('projects.json');
}

export async function loadMusic(): Promise<MusicWork[]> {
  const stored = loadFromStorage<MusicWork[]>(STORAGE_KEYS.music);
  if (stored) {
    console.log('Loaded music from localStorage');
    return stored;
  }
  
  console.log('Loading music from static file');
  return await fetchFromStatic<MusicWork[]>('music.json');
}

export async function loadPublications(): Promise<Publication[]> {
  const stored = loadFromStorage<Publication[]>(STORAGE_KEYS.publications);
  if (stored) {
    console.log('Loaded publications from localStorage');
    return stored;
  }
  
  console.log('Loading publications from static file');
  return await fetchFromStatic<Publication[]>('publications.json');
}

export async function loadBio(): Promise<Bio> {
  const stored = loadFromStorage<Bio>(STORAGE_KEYS.bio);
  if (stored) {
    console.log('Loaded bio from localStorage');
    return stored;
  }
  
  console.log('Loading bio from static file');
  return await fetchFromStatic<Bio>('bio.json');
}

export async function loadCourses(): Promise<Course[]> {
  const stored = loadFromStorage<Course[]>(STORAGE_KEYS.courses);
  if (stored) {
    console.log('Loaded courses from localStorage');
    return stored;
  }
  
  console.log('Loading courses from static file');
  return await fetchFromStatic<Course[]>('courses.json');
}
