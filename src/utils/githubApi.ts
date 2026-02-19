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
    // 캐시를 피하기 위해 timestamp 추가 (URL 파라미터로만)
    const timestamp = Date.now();
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}&t=${timestamp}`;
    
    console.log('Fetching file from GitHub:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    console.log('GitHub API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error response:', errorData);
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Successfully fetched file, SHA:', data.sha);
    
    return {
      sha: data.sha,
      content: data.content,
    };
  } catch (error) {
    console.error('Failed to get file from GitHub:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('네트워크 오류: GitHub API에 연결할 수 없습니다. 인터넷 연결을 확인하세요.');
    }
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

  console.log('=== GitHub Update Start ===');
  console.log('Path:', path);
  console.log('Content to save:', content);
  console.log('GitHub config:', {
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    branch: GITHUB_BRANCH,
    hasToken: !!GITHUB_TOKEN,
    tokenPrefix: GITHUB_TOKEN?.substring(0, 7) + '...'
  });

  try {
    // 1. 현재 파일의 최신 SHA 가져오기 (재시도 로직 포함)
    let fileInfo = null;
    let retries = 3;
    
    while (retries > 0 && !fileInfo) {
      try {
        console.log(`Attempting to get file SHA (${4 - retries}/3)...`);
        fileInfo = await getFileFromGitHub(path);
        break;
      } catch (error) {
        retries--;
        console.error(`Failed to get SHA, retries left: ${retries}`, error);
        if (retries === 0) throw error;
        // 1초 대기 후 재시도
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (!fileInfo) {
      throw new Error('Failed to get current file info after retries');
    }

    console.log('Got file SHA:', fileInfo.sha);

    // 2. 새 내용을 Base64로 인코딩
    const contentString = JSON.stringify(content, null, 2);
    console.log('Content string length:', contentString.length);
    console.log('Content string preview:', contentString.substring(0, 200));
    
    const encodedContent = btoa(unescape(encodeURIComponent(contentString)));
    console.log('Encoded content length:', encodedContent.length);

    // 3. GitHub API로 파일 업데이트
    const updateUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
    console.log('Updating file at:', updateUrl);

    const requestBody = {
      message,
      content: encodedContent,
      sha: fileInfo.sha,
      branch: GITHUB_BRANCH,
    };
    console.log('Request body (without content):', { ...requestBody, content: `[${encodedContent.length} chars]` });

    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Update response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Update error response:', errorData);
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
    }

    const responseData = await response.json();
    console.log('Successfully updated file on GitHub!');
    console.log('New commit SHA:', responseData.commit?.sha);
    console.log('=== GitHub Update Success ===');
    
    // 성공 후 약간의 지연을 주어 GitHub가 변경사항을 처리하도록 함
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('=== GitHub Update Failed ===');
    console.error('Error details:', error);
    
    let errorMessage = '알 수 없는 오류';
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      errorMessage = '네트워크 오류: GitHub API에 연결할 수 없습니다. 인터넷 연결을 확인하세요.';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    if (errorMessage.includes('409')) {
      alert('파일이 이미 변경되었습니다. 페이지를 새로고침한 후 다시 시도해주세요.');
    } else if (errorMessage.includes('401')) {
      alert('GitHub 인증 실패: Token이 유효하지 않습니다. Vercel 환경 변수를 확인하세요.');
    } else if (errorMessage.includes('403')) {
      alert('GitHub 권한 오류: Token에 repo 권한이 없습니다.');
    } else if (errorMessage.includes('404')) {
      alert('GitHub 저장소를 찾을 수 없습니다. OWNER/REPO 설정을 확인하세요.');
    } else {
      alert(`GitHub 업데이트 실패: ${errorMessage}\n\n브라우저 콘솔(F12)에서 자세한 정보를 확인하세요.`);
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
