# Vercel 환경변수 설정 가이드

## 문제 증상
- Admin에서 추가/수정/삭제가 작동하지 않음
- "GitHub 연동이 설정되지 않았습니다" 경고 표시
- 브라우저 콘솔에 "GitHub token not configured" 에러

## 해결 방법

### 1. GitHub Personal Access Token 생성

1. GitHub 로그인 후 https://github.com/settings/tokens 접속
2. "Generate new token" → "Generate new token (classic)" 클릭
3. 설정:
   - Note: `woochive-admin` (토큰 이름)
   - Expiration: `No expiration` (만료 없음)
   - Scopes: **`repo`** 체크 (전체 repo 권한 필요)
4. "Generate token" 클릭
5. **생성된 토큰을 복사** (다시 볼 수 없으니 주의!)
   - 형식: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. Vercel 환경변수 설정

1. https://vercel.com 로그인
2. woochive 프로젝트 선택
3. "Settings" 탭 클릭
4. 왼쪽 메뉴에서 "Environment Variables" 클릭
5. 다음 변수들을 추가:

#### 필수 환경변수:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GITHUB_TOKEN` | `ghp_your_token_here` | Production, Preview, Development |
| `VITE_GITHUB_OWNER` | `sonluos` | Production, Preview, Development |
| `VITE_GITHUB_REPO` | `woochive` | Production, Preview, Development |
| `VITE_GITHUB_BRANCH` | `main` | Production, Preview, Development |

**중요:** 
- 모든 환경(Production, Preview, Development)에 체크
- `VITE_` 접두사 필수 (Vite 프로젝트)

### 3. 재배포

환경변수 추가 후:
1. Vercel 프로젝트 페이지에서 "Deployments" 탭
2. 최신 배포 옆 "..." 메뉴 클릭
3. "Redeploy" 클릭
4. 1-2분 대기

### 4. 확인

1. woochive.me/admin 접속
2. 로그인
3. Projects/Music/Publications 관리 페이지 접속
4. 브라우저 콘솔(F12) 열기
5. 항목 추가/수정/삭제 시도
6. 콘솔에서 확인:
   - ✅ "=== GitHub Update Start ===" 표시
   - ✅ "hasToken: true" 표시
   - ✅ "Successfully updated file on GitHub!" 표시

## 문제 해결

### "GitHub token not configured" 에러
→ Vercel 환경변수에 `VITE_GITHUB_TOKEN`이 없거나 잘못됨

### "GitHub 인증 실패: Token이 유효하지 않습니다"
→ Token이 만료되었거나 잘못 복사됨. 새 토큰 생성 필요

### "GitHub 권한 오류: Token에 repo 권한이 없습니다"
→ Token 생성 시 `repo` 스코프를 체크하지 않음. 새 토큰 생성 필요

### "파일이 이미 변경되었습니다"
→ 페이지 새로고침 후 다시 시도

## 보안 주의사항

- ⚠️ GitHub Token은 절대 코드에 직접 넣지 마세요
- ⚠️ Token은 Vercel 환경변수에만 저장
- ⚠️ Token이 노출되면 즉시 삭제하고 새로 생성
- ⚠️ `.env` 파일은 `.gitignore`에 포함되어 있음 (커밋 안 됨)
