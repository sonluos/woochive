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

// 정적 파일에서 데이터 로드
async function fetchFromStatic<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`/data/${path}?t=${Date.now()}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new DataLoadError(
        `Failed to load data from ${path}: ${response.statusText}`,
        response.status
      );
    }
    
    const data = await response.json();
    
    if (data === null || data === undefined) {
      throw new DataLoadError(`No data found in ${path}`);
    }
    
    return data;
  } catch (error) {
    console.error('Failed to load from static:', path, error);
    if (error instanceof DataLoadError) {
      throw error;
    }
    if (error instanceof SyntaxError) {
      throw new DataLoadError(`Invalid JSON in ${path}`);
    }
    throw new DataLoadError(`Network error while loading ${path}`);
  }
}

// localStorage에서 데이터 로드 (없으면 정적 파일에서 로드)
async function loadData<T>(storageKey: string, staticPath: string): Promise<T> {
  // localStorage 확인
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log(`[dataLoader] ✅ Loaded ${storageKey} from localStorage`);
      return parsed;
    } catch (e) {
      console.error(`[dataLoader] ❌ Failed to parse ${storageKey}:`, e);
      localStorage.removeItem(storageKey);
    }
  }
  
  // localStorage에 없으면 정적 파일에서 로드
  console.log(`[dataLoader] 📁 Loading ${staticPath} from static files`);
  return await fetchFromStatic<T>(staticPath);
}

export async function loadProjects(): Promise<ResearchProject[]> {
  return await loadData<ResearchProject[]>(STORAGE_KEYS.projects, 'projects.json');
}

export async function loadMusic(): Promise<MusicWork[]> {
  return await loadData<MusicWork[]>(STORAGE_KEYS.music, 'music.json');
}

export async function loadPublications(): Promise<Publication[]> {
  return await loadData<Publication[]>(STORAGE_KEYS.publications, 'publications.json');
}

export async function loadBio(): Promise<Bio> {
  return await loadData<Bio>(STORAGE_KEYS.bio, 'bio.json');
}

export async function loadCourses(): Promise<Course[]> {
  return await loadData<Course[]>(STORAGE_KEYS.courses, 'courses.json');
}
