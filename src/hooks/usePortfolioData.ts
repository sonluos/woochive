import { useState, useEffect } from 'react';
import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';
import { 
  loadProjects, 
  loadMusic, 
  loadPublications, 
  loadBio, 
  loadCourses,
  DataLoadError 
} from '../utils/dataLoader';

interface UsePortfolioDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

function useDataLoader<T>(
  loader: () => Promise<T>,
  deps: unknown[] = []
): UsePortfolioDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await loader();
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    // localStorage 변경 감지 (다른 탭/창에서 변경 시)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('portfolio_')) {
        loadData();
      }
    };

    // 커스텀 이벤트 감지 (같은 탭에서 변경 시)
    const handleCustomStorageChange = () => {
      loadData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleCustomStorageChange);

    return () => {
      cancelled = true;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleCustomStorageChange);
    };
  }, [reloadTrigger, ...deps]);

  const reload = () => {
    setReloadTrigger(prev => prev + 1);
  };

  return { data, loading, error, reload };
}

export function useProjects(): UsePortfolioDataResult<ResearchProject[]> {
  return useDataLoader(loadProjects);
}

export function useMusic(): UsePortfolioDataResult<MusicWork[]> {
  return useDataLoader(loadMusic);
}

export function usePublications(): UsePortfolioDataResult<Publication[]> {
  return useDataLoader(loadPublications);
}

export function useBio(): UsePortfolioDataResult<Bio> {
  return useDataLoader(loadBio);
}

export function useCourses(): UsePortfolioDataResult<Course[]> {
  return useDataLoader(loadCourses);
}

// Combined hook for loading all portfolio data
export function useAllPortfolioData() {
  const projects = useProjects();
  const music = useMusic();
  const publications = usePublications();
  const bio = useBio();
  const courses = useCourses();

  const loading = projects.loading || music.loading || publications.loading || 
                  bio.loading || courses.loading;
  
  const error = projects.error || music.error || publications.error || 
                bio.error || courses.error;

  const reload = () => {
    projects.reload();
    music.reload();
    publications.reload();
    bio.reload();
    courses.reload();
  };

  return {
    projects: projects.data,
    music: music.data,
    publications: publications.data,
    bio: bio.data,
    courses: courses.data,
    loading,
    error,
    reload
  };
}
