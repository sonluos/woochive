// GitHub API를 사용한 데이터 저장
// Personal Access Token이 필요합니다

const GITHUB_OWNER = 'sonluos';
const GITHUB_REPO = 'woochive';
const GITHUB_BRANCH = 'main';

// GitHub Personal Access Token (환경 변수에서 가져오기)
function getGitHubToken(): string | null {
  return localStorage.getItem('github_token');
}

export function setGitHubToken(token: string) {
  localStorage.setItem('github_token', token);
}

export function clearGitHubToken() {
  localStorage.removeItem('github_token');
}

export function hasGitHubToken(): boolean {
  return !!getGitHubToken();
}

// GitHub API 요청
async function githubRequest(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getGitHubToken();
  if (!token) {
    throw new Error('GitHub token not set');
  }

  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }

  return response.json();
}

// 파일 내용 가져오기
async function getFileContent(path: string): Promise<{ content: string; sha: string }> {
  const data = await githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`
  );
  
  return {
    content: atob(data.content.replace(/\n/g, '')),
    sha: data.sha,
  };
}

// 파일 업데이트
async function updateFile(
  path: string,
  content: string,
  message: string,
  sha: string
): Promise<void> {
  await githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );
}

// 데이터 저장
export async function saveToGitHub<T>(
  filename: string,
  data: T,
  commitMessage: string
): Promise<void> {
  const path = `public/data/${filename}`;
  const content = JSON.stringify(data, null, 2);
  
  try {
    // 현재 파일의 SHA 가져오기
    const { sha } = await getFileContent(path);
    
    // 파일 업데이트
    await updateFile(path, content, commitMessage, sha);
    
    console.log(`Successfully saved to GitHub: ${filename}`);
  } catch (error) {
    console.error('Failed to save to GitHub:', error);
    throw error;
  }
}

// 데이터 로드
export async function loadFromGitHub<T>(filename: string): Promise<T> {
  const path = `public/data/${filename}`;
  
  try {
    const { content } = await getFileContent(path);
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load from GitHub:', error);
    throw error;
  }
}
