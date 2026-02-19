// GitHub API를 사용하여 데이터 파일을 업데이트하는 유틸리티

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'sonluos';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'woochive';
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main';

interface GitHubFileResponse {
  sha: string;
  content: string;
}

/**
 * GitHub에서 파일 내용과 SHA를 가져옵니다
 */
async function getFileFromGitHub(path: string): Promise<GitHubFileResponse | null> {
  if (!GITHUB_TOKEN) {
    console.error('GitHub token not configured');
    return null;
  }

  try {
    // 캐시를 피하기 위해 timestamp 추가
    const timestamp = Date.now();
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}&t=${timestamp}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return {
      sha: data.sha,
      content: data.content,
    };
  } catch (error) {
    console.error('Failed to get file from GitHub:', error);
    throw error;
  }
}

/**
 * GitHub에 파일을 업데이트합니다
 */
async function updateFileOnGitHub(
  path: string,
  content: any,
  message: string
): Promise<boolean> {
  if (!GITHUB_TOKEN) {
    console.error('GitHub token not configured. Please set VITE_GITHUB_TOKEN in .env');
    alert('GitHub 연동이 설정되지 않았습니다. 관리자에게 문의하세요.');
    return false;
  }

  try {
    // 1. 현재 파일의 최신 SHA 가져오기 (재시도 로직 포함)
    let fileInfo = null;
    let retries = 3;
    
    while (retries > 0 && !fileInfo) {
      try {
        fileInfo = await getFileFromGitHub(path);
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        // 1초 대기 후 재시도
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (!fileInfo) {
      throw new Error('Failed to get current file info after retries');
    }

    // 2. 새 내용을 Base64로 인코딩
    const contentString = JSON.stringify(content, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(contentString)));

    // 3. GitHub API로 파일 업데이트
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: encodedContent,
          sha: fileInfo.sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
    }

    console.log('Successfully updated file on GitHub:', path);
    
    // 성공 후 약간의 지연을 주어 GitHub가 변경사항을 처리하도록 함
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('Failed to update file on GitHub:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    
    if (errorMessage.includes('409')) {
      alert('파일이 이미 변경되었습니다. 페이지를 새로고침한 후 다시 시도해주세요.');
    } else {
      alert(`GitHub 업데이트 실패: ${errorMessage}`);
    }
    
    return false;
  }
}

/**
 * Projects 데이터를 GitHub에 저장
 */
export async function saveProjectsToGitHub(projects: any[]): Promise<boolean> {
  return updateFileOnGitHub(
    'public/data/projects.json',
    projects,
    'Update projects data via admin panel'
  );
}

/**
 * Music 데이터를 GitHub에 저장
 */
export async function saveMusicToGitHub(music: any[]): Promise<boolean> {
  return updateFileOnGitHub(
    'public/data/music.json',
    music,
    'Update music data via admin panel'
  );
}

/**
 * Publications 데이터를 GitHub에 저장
 */
export async function savePublicationsToGitHub(publications: any[]): Promise<boolean> {
  return updateFileOnGitHub(
    'public/data/publications.json',
    publications,
    'Update publications data via admin panel'
  );
}

/**
 * Bio 데이터를 GitHub에 저장
 */
export async function saveBioToGitHub(bio: any): Promise<boolean> {
  return updateFileOnGitHub(
    'public/data/bio.json',
    bio,
    'Update bio data via admin panel'
  );
}

/**
 * GitHub 연동이 설정되어 있는지 확인
 */
export function isGitHubConfigured(): boolean {
  return !!GITHUB_TOKEN;
}
