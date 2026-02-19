# GitHub Token 설정 가이드

Admin 패널에서 데이터를 수정하면 GitHub 저장소에 자동으로 커밋되도록 하려면 GitHub Personal Access Token이 필요합니다.

## 1. GitHub Personal Access Token 생성

1. GitHub에 로그인
2. 우측 상단 프로필 클릭 → **Settings**
3. 좌측 메뉴 맨 아래 **Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token** → **Generate new token (classic)** 선택
6. Token 설정:
   - **Note**: `Woochive Admin Panel` (또는 원하는 이름)
   - **Expiration**: `No expiration` (또는 원하는 기간)
   - **Select scopes**: 
     - ✅ `repo` (Full control of private repositories) 체크
7. **Generate token** 클릭
8. 생성된 토큰을 복사 (⚠️ 이 페이지를 벗어나면 다시 볼 수 없습니다!)

## 2. 로컬 개발 환경 설정

프로젝트 루트에 `.env` 파일 생성:

```bash
# .env
VITE_GITHUB_TOKEN=ghp_your_token_here
VITE_GITHUB_OWNER=sonluos
VITE_GITHUB_REPO=woochive
VITE_GITHUB_BRANCH=main
```

⚠️ `.env` 파일은 절대 Git에 커밋하지 마세요! (`.gitignore`에 이미 포함되어 있음)

## 3. Vercel 배포 환경 설정

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables** 클릭
4. 다음 변수들을 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GITHUB_TOKEN` | `ghp_your_token_here` | Production, Preview, Development |
| `VITE_GITHUB_OWNER` | `sonluos` | Production, Preview, Development |
| `VITE_GITHUB_REPO` | `woochive` | Production, Preview, Development |
| `VITE_GITHUB_BRANCH` | `main` | Production, Preview, Development |

5. **Save** 클릭
6. 프로젝트 재배포 (Deployments → 최신 배포 → Redeploy)

## 4. 작동 방식

1. Admin 패널에서 데이터 수정/추가/삭제
2. "저장" 버튼 클릭
3. GitHub API를 통해 `public/data/*.json` 파일이 자동으로 업데이트됨
4. GitHub에 커밋이 생성됨
5. Vercel이 자동으로 새 커밋을 감지하고 재배포 (1-2분 소요)
6. 모든 기기/브라우저에서 업데이트된 데이터 확인 가능

## 5. 보안 주의사항

- ⚠️ GitHub Token은 절대 공개하지 마세요
- ⚠️ Token이 노출되면 즉시 GitHub에서 삭제하고 새로 생성하세요
- ⚠️ `.env` 파일을 Git에 커밋하지 마세요
- ✅ Vercel Environment Variables는 안전하게 암호화되어 저장됩니다

## 6. 문제 해결

### "GitHub 연동이 설정되지 않았습니다" 경고가 뜨는 경우
- `.env` 파일에 `VITE_GITHUB_TOKEN`이 제대로 설정되어 있는지 확인
- 개발 서버를 재시작 (`npm run dev`)

### "GitHub API error: 401" 오류
- Token이 만료되었거나 잘못되었습니다
- GitHub에서 새 Token을 생성하고 `.env` 파일 업데이트

### "GitHub API error: 403" 오류
- Token에 `repo` 권한이 없습니다
- Token을 다시 생성하고 `repo` 권한을 체크

### 변경사항이 반영되지 않는 경우
- GitHub 저장소에 커밋이 생성되었는지 확인
- Vercel에서 자동 배포가 진행 중인지 확인 (1-2분 소요)
- 브라우저 캐시를 지우고 새로고침 (Ctrl+Shift+R 또는 Cmd+Shift+R)

## 7. 백업 방법

Admin 패널에서 "JSON 다운로드" 버튼을 클릭하면 현재 데이터를 백업할 수 있습니다.
정기적으로 백업하는 것을 권장합니다.
