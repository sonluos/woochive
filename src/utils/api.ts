// localStorage 기반 데이터 관리 API

const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  music: 'portfolio_music',
  publications: 'portfolio_publications',
  bio: 'portfolio_bio',
  courses: 'portfolio_courses'
};

// localStorage에 저장
function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Saved to localStorage: ${key}`);
    
    // 커스텀 이벤트 발생 (같은 탭에서 변경 감지용)
    window.dispatchEvent(new Event('localStorageUpdated'));
  } catch (error) {
    console.error('Failed to save to localStorage:', key, error);
    throw new Error('저장 실패: 브라우저 저장소가 가득 찼을 수 있습니다.');
  }
}

// localStorage에서 로드
function loadFromStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', key, error);
    return null;
  }
}

// 정적 파일에서 초기 데이터 로드
async function loadInitialData<T>(path: string): Promise<T> {
  const response = await fetch(`/data/${path}?t=${Date.now()}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    let data = loadFromStorage<any[]>(STORAGE_KEYS.projects);
    if (!data) {
      data = await loadInitialData<any[]>('projects.json');
      saveToStorage(STORAGE_KEYS.projects, data);
    }
    return data;
  },
  create: async (item: any) => {
    const data = await projectsApi.getAll();
    data.push(item);
    saveToStorage(STORAGE_KEYS.projects, data);
    return item;
  },
  update: async (item: any) => {
    const data = await projectsApi.getAll();
    const index = data.findIndex((p: any) => p.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    saveToStorage(STORAGE_KEYS.projects, data);
    return item;
  },
  delete: async (id: string) => {
    const data = await projectsApi.getAll();
    const filtered = data.filter((p: any) => p.id !== id);
    saveToStorage(STORAGE_KEYS.projects, filtered);
    return { success: true };
  },
};

// Music API
export const musicApi = {
  getAll: async () => {
    let data = loadFromStorage<any[]>(STORAGE_KEYS.music);
    if (!data) {
      data = await loadInitialData<any[]>('music.json');
      saveToStorage(STORAGE_KEYS.music, data);
    }
    return data;
  },
  create: async (item: any) => {
    const data = await musicApi.getAll();
    data.push(item);
    saveToStorage(STORAGE_KEYS.music, data);
    return item;
  },
  update: async (item: any) => {
    const data = await musicApi.getAll();
    const index = data.findIndex((m: any) => m.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    saveToStorage(STORAGE_KEYS.music, data);
    return item;
  },
  delete: async (id: string) => {
    const data = await musicApi.getAll();
    const filtered = data.filter((m: any) => m.id !== id);
    saveToStorage(STORAGE_KEYS.music, filtered);
    return { success: true };
  },
};

// Publications API
export const publicationsApi = {
  getAll: async () => {
    let data = loadFromStorage<any[]>(STORAGE_KEYS.publications);
    if (!data) {
      data = await loadInitialData<any[]>('publications.json');
      saveToStorage(STORAGE_KEYS.publications, data);
    }
    return data;
  },
  create: async (item: any) => {
    const data = await publicationsApi.getAll();
    data.push(item);
    saveToStorage(STORAGE_KEYS.publications, data);
    return item;
  },
  update: async (item: any) => {
    const data = await publicationsApi.getAll();
    const index = data.findIndex((p: any) => p.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    saveToStorage(STORAGE_KEYS.publications, data);
    return item;
  },
  delete: async (id: string) => {
    const data = await publicationsApi.getAll();
    const filtered = data.filter((p: any) => p.id !== id);
    saveToStorage(STORAGE_KEYS.publications, filtered);
    return { success: true };
  },
};

// Bio API
export const bioApi = {
  get: async () => {
    let data = loadFromStorage<any>(STORAGE_KEYS.bio);
    if (!data) {
      data = await loadInitialData<any>('bio.json');
      saveToStorage(STORAGE_KEYS.bio, data);
    }
    return data;
  },
  update: async (item: any) => {
    saveToStorage(STORAGE_KEYS.bio, item);
    return item;
  },
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    let data = loadFromStorage<any[]>(STORAGE_KEYS.courses);
    if (!data) {
      data = await loadInitialData<any[]>('courses.json');
      saveToStorage(STORAGE_KEYS.courses, data);
    }
    return data;
  },
  create: async (item: any) => {
    const data = await coursesApi.getAll();
    data.push(item);
    saveToStorage(STORAGE_KEYS.courses, data);
    return item;
  },
  update: async (item: any) => {
    const data = await coursesApi.getAll();
    const index = data.findIndex((c: any) => c.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    saveToStorage(STORAGE_KEYS.courses, data);
    return item;
  },
  delete: async (id: string) => {
    const data = await coursesApi.getAll();
    const filtered = data.filter((c: any) => c.id !== id);
    saveToStorage(STORAGE_KEYS.courses, filtered);
    return { success: true };
  },
};

// 인증 관련
export function setAuthToken(password: string) {
  localStorage.setItem('adminToken', password);
}

export function clearAuthToken() {
  localStorage.removeItem('adminToken');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
