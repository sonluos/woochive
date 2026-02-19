// Vercel Serverless Functions API 클라이언트

const API_BASE = '/api/data';

// 인증 토큰 가져오기 (localStorage에서)
function getAuthToken(): string | null {
  return localStorage.getItem('adminToken');
}

// API 요청 헬퍼
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token && options.method !== 'GET') {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// Projects API
export const projectsApi = {
  getAll: () => apiRequest<any[]>('/projects'),
  create: (data: any) => apiRequest<any>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (data: any) => apiRequest<any>('/projects', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest<{ success: boolean }>(`/projects?id=${id}`, {
    method: 'DELETE',
  }),
};

// Music API
export const musicApi = {
  getAll: () => apiRequest<any[]>('/music'),
  create: (data: any) => apiRequest<any>('/music', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (data: any) => apiRequest<any>('/music', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest<{ success: boolean }>(`/music?id=${id}`, {
    method: 'DELETE',
  }),
};

// Publications API
export const publicationsApi = {
  getAll: () => apiRequest<any[]>('/publications'),
  create: (data: any) => apiRequest<any>('/publications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (data: any) => apiRequest<any>('/publications', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest<{ success: boolean }>(`/publications?id=${id}`, {
    method: 'DELETE',
  }),
};

// Bio API
export const bioApi = {
  get: () => apiRequest<any>('/bio'),
  update: (data: any) => apiRequest<any>('/bio', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
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
