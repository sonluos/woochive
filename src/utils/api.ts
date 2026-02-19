// GitHub 기반 데이터 관리 API
import { saveToGitHub, loadFromGitHub, hasGitHubToken } from './githubStorage';

// 정적 파일에서 데이터 로드 (폴백)
async function loadFromStatic<T>(path: string): Promise<T> {
  const response = await fetch(`/data/${path}?t=${Date.now()}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

// 데이터 저장 (GitHub 또는 로컬)
async function saveData<T>(filename: string, data: T, message: string): Promise<void> {
  if (hasGitHubToken()) {
    // GitHub에 저장
    await saveToGitHub(filename, data, message);
    // 저장 후 이벤트 발생
    window.dispatchEvent(new Event('dataUpdated'));
  } else {
    throw new Error('GitHub token이 설정되지 않았습니다. Admin 설정에서 토큰을 입력하세요.');
  }
}

// 데이터 로드 (GitHub 또는 정적 파일)
async function loadData<T>(filename: string): Promise<T> {
  try {
    // 항상 정적 파일에서 로드 (최신 배포된 데이터)
    return await loadFromStatic<T>(filename);
  } catch (error) {
    console.error('Failed to load data:', error);
    throw error;
  }
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    return await loadData<any[]>('projects.json');
  },
  create: async (item: any) => {
    const data = await projectsApi.getAll();
    data.push(item);
    await saveData('projects.json', data, `Add project: ${item.title}`);
    return item;
  },
  update: async (item: any) => {
    const data = await projectsApi.getAll();
    const index = data.findIndex((p: any) => p.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    await saveData('projects.json', data, `Update project: ${item.title}`);
    return item;
  },
  delete: async (id: string) => {
    const data = await projectsApi.getAll();
    const item = data.find((p: any) => p.id === id);
    const filtered = data.filter((p: any) => p.id !== id);
    await saveData('projects.json', filtered, `Delete project: ${item?.title || id}`);
    return { success: true };
  },
};

// Music API
export const musicApi = {
  getAll: async () => {
    return await loadData<any[]>('music.json');
  },
  create: async (item: any) => {
    const data = await musicApi.getAll();
    data.push(item);
    await saveData('music.json', data, `Add music: ${item.title}`);
    return item;
  },
  update: async (item: any) => {
    const data = await musicApi.getAll();
    const index = data.findIndex((m: any) => m.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    await saveData('music.json', data, `Update music: ${item.title}`);
    return item;
  },
  delete: async (id: string) => {
    const data = await musicApi.getAll();
    const item = data.find((m: any) => m.id === id);
    const filtered = data.filter((m: any) => m.id !== id);
    await saveData('music.json', filtered, `Delete music: ${item?.title || id}`);
    return { success: true };
  },
};

// Publications API
export const publicationsApi = {
  getAll: async () => {
    return await loadData<any[]>('publications.json');
  },
  create: async (item: any) => {
    const data = await publicationsApi.getAll();
    data.push(item);
    await saveData('publications.json', data, `Add publication: ${item.title}`);
    return item;
  },
  update: async (item: any) => {
    const data = await publicationsApi.getAll();
    const index = data.findIndex((p: any) => p.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    await saveData('publications.json', data, `Update publication: ${item.title}`);
    return item;
  },
  delete: async (id: string) => {
    const data = await publicationsApi.getAll();
    const item = data.find((p: any) => p.id === id);
    const filtered = data.filter((p: any) => p.id !== id);
    await saveData('publications.json', filtered, `Delete publication: ${item?.title || id}`);
    return { success: true };
  },
};

// Bio API
export const bioApi = {
  get: async () => {
    return await loadData<any>('bio.json');
  },
  update: async (item: any) => {
    await saveData('bio.json', item, 'Update bio');
    return item;
  },
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    return await loadData<any[]>('courses.json');
  },
  create: async (item: any) => {
    const data = await coursesApi.getAll();
    data.push(item);
    await saveData('courses.json', data, `Add course: ${item.code}`);
    return item;
  },
  update: async (item: any) => {
    const data = await coursesApi.getAll();
    const index = data.findIndex((c: any) => c.id === item.id);
    if (index === -1) throw new Error('Item not found');
    data[index] = item;
    await saveData('courses.json', data, `Update course: ${item.code}`);
    return item;
  },
  delete: async (id: string) => {
    const data = await coursesApi.getAll();
    const item = data.find((c: any) => c.id === id);
    const filtered = data.filter((c: any) => c.id !== id);
    await saveData('courses.json', filtered, `Delete course: ${item?.code || id}`);
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
