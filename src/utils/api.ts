// 정적 파일에서 데이터 로드
async function loadFromStatic<T>(path: string): Promise<T> {
  const response = await fetch(`/data/${path}?t=${Date.now()}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    return await loadFromStatic<any[]>('projects.json');
  },
};

// Music API
export const musicApi = {
  getAll: async () => {
    return await loadFromStatic<any[]>('music.json');
  },
};

// Publications API
export const publicationsApi = {
  getAll: async () => {
    return await loadFromStatic<any[]>('publications.json');
  },
};

// Bio API
export const bioApi = {
  get: async () => {
    return await loadFromStatic<any>('bio.json');
  },
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    return await loadFromStatic<any[]>('courses.json');
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
