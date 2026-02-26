// localStorage 키
const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  music: 'portfolio_music',
  publications: 'portfolio_publications',
  bio: 'portfolio_bio',
  courses: 'portfolio_courses'
};

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

// localStorage에서 데이터 로드 (없으면 정적 파일에서 로드)
async function loadData<T>(storageKey: string, staticPath: string): Promise<T> {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      console.log(`[api] ✅ Loaded ${storageKey} from localStorage`);
      return JSON.parse(stored);
    } catch (e) {
      console.error(`[api] ❌ Failed to parse ${storageKey}:`, e);
      localStorage.removeItem(storageKey);
    }
  }
  
  console.log(`[api] 📁 Loading ${staticPath} from static files`);
  return await loadFromStatic<T>(staticPath);
}

// localStorage에 데이터 저장
function saveData<T>(storageKey: string, data: T): void {
  localStorage.setItem(storageKey, JSON.stringify(data));
  console.log(`[api] 💾 Saved to ${storageKey}`);
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    return await loadData<any[]>(STORAGE_KEYS.projects, 'projects.json');
  },
  
  create: async (project: any) => {
    const projects = await projectsApi.getAll();
    projects.push(project);
    saveData(STORAGE_KEYS.projects, projects);
    return project;
  },
  
  update: async (project: any) => {
    const projects = await projectsApi.getAll();
    const index = projects.findIndex(p => p.id === project.id);
    if (index === -1) throw new Error('Project not found');
    projects[index] = project;
    saveData(STORAGE_KEYS.projects, projects);
    return project;
  },
  
  delete: async (id: string) => {
    const projects = await projectsApi.getAll();
    const filtered = projects.filter(p => p.id !== id);
    saveData(STORAGE_KEYS.projects, filtered);
  }
};

// Music API
export const musicApi = {
  getAll: async () => {
    return await loadData<any[]>(STORAGE_KEYS.music, 'music.json');
  },
  
  create: async (music: any) => {
    const musicWorks = await musicApi.getAll();
    musicWorks.push(music);
    saveData(STORAGE_KEYS.music, musicWorks);
    return music;
  },
  
  update: async (music: any) => {
    const musicWorks = await musicApi.getAll();
    const index = musicWorks.findIndex(m => m.id === music.id);
    if (index === -1) throw new Error('Music not found');
    musicWorks[index] = music;
    saveData(STORAGE_KEYS.music, musicWorks);
    return music;
  },
  
  delete: async (id: string) => {
    const musicWorks = await musicApi.getAll();
    const filtered = musicWorks.filter(m => m.id !== id);
    saveData(STORAGE_KEYS.music, filtered);
  }
};

// Publications API
export const publicationsApi = {
  getAll: async () => {
    return await loadData<any[]>(STORAGE_KEYS.publications, 'publications.json');
  },
  
  create: async (publication: any) => {
    const publications = await publicationsApi.getAll();
    publications.push(publication);
    saveData(STORAGE_KEYS.publications, publications);
    return publication;
  },
  
  update: async (publication: any) => {
    const publications = await publicationsApi.getAll();
    const index = publications.findIndex(p => p.id === publication.id);
    if (index === -1) throw new Error('Publication not found');
    publications[index] = publication;
    saveData(STORAGE_KEYS.publications, publications);
    return publication;
  },
  
  delete: async (id: string) => {
    const publications = await publicationsApi.getAll();
    const filtered = publications.filter(p => p.id !== id);
    saveData(STORAGE_KEYS.publications, filtered);
  }
};

// Bio API
export const bioApi = {
  get: async () => {
    return await loadData<any>(STORAGE_KEYS.bio, 'bio.json');
  },
  
  update: async (bio: any) => {
    saveData(STORAGE_KEYS.bio, bio);
    return bio;
  }
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    return await loadData<any[]>(STORAGE_KEYS.courses, 'courses.json');
  },
  
  create: async (course: any) => {
    const courses = await coursesApi.getAll();
    courses.push(course);
    saveData(STORAGE_KEYS.courses, courses);
    return course;
  },
  
  update: async (course: any) => {
    const courses = await coursesApi.getAll();
    const index = courses.findIndex(c => c.id === course.id);
    if (index === -1) throw new Error('Course not found');
    courses[index] = course;
    saveData(STORAGE_KEYS.courses, courses);
    return course;
  },
  
  delete: async (id: string) => {
    const courses = await coursesApi.getAll();
    const filtered = courses.filter(c => c.id !== id);
    saveData(STORAGE_KEYS.courses, filtered);
  }
};
