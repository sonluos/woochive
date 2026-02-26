// 환경 감지
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const API_BASE = isProduction ? '/api/data' : '';

// localStorage 키 (로컬 개발용)
const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  music: 'portfolio_music',
  publications: 'portfolio_publications',
  bio: 'portfolio_bio',
  courses: 'portfolio_courses'
};

// 인증 토큰 가져오기
function getAuthToken(): string {
  // sessionStorage에서 인증 상태 확인
  const isAuth = sessionStorage.getItem('isAuthenticated') === 'true';
  if (!isAuth) return '';
  
  // 프로덕션에서는 환경 변수의 ADMIN_PASSWORD 사용
  // 로컬에서는 'admin-token' 사용
  if (isProduction) {
    // 프로덕션: 실제 비밀번호를 토큰으로 사용
    // Vercel 환경 변수 ADMIN_PASSWORD와 매칭되어야 함
    return 'sonluoscrool7';
  }
  return 'admin-token';
}

// API 요청 헬퍼
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const token = getAuthToken();
  if (token && options.method !== 'GET') {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const url = isProduction ? `${API_BASE}${endpoint}` : `/data${endpoint}?t=${Date.now()}`;
  console.log(`[api] ${options.method || 'GET'} ${url}`);
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// 로컬 개발: localStorage 사용
function loadFromLocalStorage<T>(storageKey: string): T | null {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log(`[api] ✅ Loaded ${storageKey} from localStorage:`, Array.isArray(parsed) ? `${parsed.length} items` : 'object');
      return parsed;
    } catch (e) {
      console.error(`[api] ❌ Failed to parse ${storageKey}:`, e);
      localStorage.removeItem(storageKey);
    }
  }
  return null;
}

function saveToLocalStorage<T>(storageKey: string, data: T): void {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(storageKey, jsonString);
  console.log(`[api] 💾 Saved to ${storageKey}:`, Array.isArray(data) ? `${data.length} items` : 'object', `(${jsonString.length} bytes)`);
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    if (isProduction) {
      return await apiRequest<any[]>('/projects');
    } else {
      const cached = loadFromLocalStorage<any[]>(STORAGE_KEYS.projects);
      if (cached) return cached;
      return await apiRequest<any[]>('/projects.json');
    }
  },
  
  create: async (project: any) => {
    if (isProduction) {
      return await apiRequest<any>('/projects', {
        method: 'POST',
        body: JSON.stringify(project),
      });
    } else {
      const projects = await projectsApi.getAll();
      projects.push(project);
      saveToLocalStorage(STORAGE_KEYS.projects, projects);
      return project;
    }
  },
  
  update: async (project: any) => {
    if (isProduction) {
      return await apiRequest<any>('/projects', {
        method: 'PUT',
        body: JSON.stringify(project),
      });
    } else {
      const projects = await projectsApi.getAll();
      const index = projects.findIndex(p => p.id === project.id);
      if (index === -1) throw new Error('Project not found');
      projects[index] = project;
      saveToLocalStorage(STORAGE_KEYS.projects, projects);
      return project;
    }
  },
  
  delete: async (id: string) => {
    if (isProduction) {
      return await apiRequest<{ success: boolean }>(`/projects?id=${id}`, {
        method: 'DELETE',
      });
    } else {
      const projects = await projectsApi.getAll();
      const filtered = projects.filter(p => p.id !== id);
      saveToLocalStorage(STORAGE_KEYS.projects, filtered);
    }
  }
};

// Music API
export const musicApi = {
  getAll: async () => {
    if (isProduction) {
      return await apiRequest<any[]>('/music');
    } else {
      const cached = loadFromLocalStorage<any[]>(STORAGE_KEYS.music);
      if (cached) return cached;
      return await apiRequest<any[]>('/music.json');
    }
  },
  
  create: async (music: any) => {
    if (isProduction) {
      return await apiRequest<any>('/music', {
        method: 'POST',
        body: JSON.stringify(music),
      });
    } else {
      const musicWorks = await musicApi.getAll();
      musicWorks.push(music);
      saveToLocalStorage(STORAGE_KEYS.music, musicWorks);
      return music;
    }
  },
  
  update: async (music: any) => {
    if (isProduction) {
      return await apiRequest<any>('/music', {
        method: 'PUT',
        body: JSON.stringify(music),
      });
    } else {
      const musicWorks = await musicApi.getAll();
      const index = musicWorks.findIndex(m => m.id === music.id);
      if (index === -1) throw new Error('Music not found');
      musicWorks[index] = music;
      saveToLocalStorage(STORAGE_KEYS.music, musicWorks);
      return music;
    }
  },
  
  delete: async (id: string) => {
    if (isProduction) {
      return await apiRequest<{ success: boolean }>(`/music?id=${id}`, {
        method: 'DELETE',
      });
    } else {
      const musicWorks = await musicApi.getAll();
      const filtered = musicWorks.filter(m => m.id !== id);
      saveToLocalStorage(STORAGE_KEYS.music, filtered);
    }
  }
};

// Publications API
export const publicationsApi = {
  getAll: async () => {
    if (isProduction) {
      return await apiRequest<any[]>('/publications');
    } else {
      const cached = loadFromLocalStorage<any[]>(STORAGE_KEYS.publications);
      if (cached) return cached;
      return await apiRequest<any[]>('/publications.json');
    }
  },
  
  create: async (publication: any) => {
    if (isProduction) {
      return await apiRequest<any>('/publications', {
        method: 'POST',
        body: JSON.stringify(publication),
      });
    } else {
      const publications = await publicationsApi.getAll();
      publications.push(publication);
      saveToLocalStorage(STORAGE_KEYS.publications, publications);
      return publication;
    }
  },
  
  update: async (publication: any) => {
    if (isProduction) {
      return await apiRequest<any>('/publications', {
        method: 'PUT',
        body: JSON.stringify(publication),
      });
    } else {
      const publications = await publicationsApi.getAll();
      const index = publications.findIndex(p => p.id === publication.id);
      if (index === -1) throw new Error('Publication not found');
      publications[index] = publication;
      saveToLocalStorage(STORAGE_KEYS.publications, publications);
      return publication;
    }
  },
  
  delete: async (id: string) => {
    if (isProduction) {
      return await apiRequest<{ success: boolean }>(`/publications?id=${id}`, {
        method: 'DELETE',
      });
    } else {
      const publications = await publicationsApi.getAll();
      const filtered = publications.filter(p => p.id !== id);
      saveToLocalStorage(STORAGE_KEYS.publications, filtered);
    }
  }
};

// Bio API
export const bioApi = {
  get: async () => {
    if (isProduction) {
      return await apiRequest<any>('/bio');
    } else {
      const cached = loadFromLocalStorage<any>(STORAGE_KEYS.bio);
      if (cached) return cached;
      return await apiRequest<any>('/bio.json');
    }
  },
  
  update: async (bio: any) => {
    if (isProduction) {
      return await apiRequest<any>('/bio', {
        method: 'PUT',
        body: JSON.stringify(bio),
      });
    } else {
      saveToLocalStorage(STORAGE_KEYS.bio, bio);
      return bio;
    }
  }
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    if (isProduction) {
      return await apiRequest<any[]>('/courses');
    } else {
      const cached = loadFromLocalStorage<any[]>(STORAGE_KEYS.courses);
      if (cached) return cached;
      return await apiRequest<any[]>('/courses.json');
    }
  },
  
  create: async (course: any) => {
    if (isProduction) {
      return await apiRequest<any>('/courses', {
        method: 'POST',
        body: JSON.stringify(course),
      });
    } else {
      const courses = await coursesApi.getAll();
      courses.push(course);
      saveToLocalStorage(STORAGE_KEYS.courses, courses);
      return course;
    }
  },
  
  update: async (course: any) => {
    if (isProduction) {
      return await apiRequest<any>('/courses', {
        method: 'PUT',
        body: JSON.stringify(course),
      });
    } else {
      const courses = await coursesApi.getAll();
      const index = courses.findIndex(c => c.id === course.id);
      if (index === -1) throw new Error('Course not found');
      courses[index] = course;
      saveToLocalStorage(STORAGE_KEYS.courses, courses);
      return course;
    }
  },
  
  delete: async (id: string) => {
    if (isProduction) {
      return await apiRequest<{ success: boolean }>(`/courses?id=${id}`, {
        method: 'DELETE',
      });
    } else {
      const courses = await coursesApi.getAll();
      const filtered = courses.filter(c => c.id !== id);
      saveToLocalStorage(STORAGE_KEYS.courses, filtered);
    }
  }
};
