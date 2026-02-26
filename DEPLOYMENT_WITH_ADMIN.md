# 배포 환경에서 Admin 사용하기

## 현재 상황

- ✅ 로컬(localhost:5173)에서는 Admin이 완벽하게 작동
- ❌ 배포된 사이트에서는 Admin 수정사항이 반영 안 됨

## 이유

localStorage는 **브라우저에만 저장**되기 때문입니다:
- 로컬에서 수정 → 로컬 브라우저의 localStorage에 저장
- 배포된 사이트 → 서버의 JSON 파일을 읽음 (localStorage 없음)

## 해결 방법

### 방법 1: 로컬에서만 Admin 사용 (가장 간단)

1. **로컬에서 데이터 수정**
   ```bash
   npm run dev
   # http://localhost:5173/admin/login
   # 데이터 수정
   ```

2. **JSON 파일 다운로드**
   - Admin 페이지에서 "JSON 다운로드" 버튼 클릭
   - `projects.json`, `music.json` 등 다운로드

3. **파일 교체**
   ```bash
   # 다운로드한 파일을 public/data/ 폴더에 복사
   cp ~/Downloads/projects.json public/data/projects.json
   cp ~/Downloads/music.json public/data/music.json
   cp ~/Downloads/bio.json public/data/bio.json
   cp ~/Downloads/courses.json public/data/courses.json
   ```

4. **Git 커밋 & 푸시**
   ```bash
   git add public/data/*.json
   git commit -m "Update portfolio data"
   git push
   ```

5. **Vercel 자동 배포**
   - Git push하면 Vercel이 자동으로 재배포
   - 새 데이터가 반영됨

### 방법 2: Vercel Serverless Functions 사용 (고급)

실제 백엔드 API를 만들어서 배포된 사이트에서도 Admin을 사용할 수 있게 합니다.

#### 필요한 것:
1. GitHub Personal Access Token
2. Vercel 환경 변수 설정
3. Serverless Functions 구현

#### 설정 방법:

1. **GitHub Token 생성**
   - https://github.com/settings/tokens
   - "Generate new token (classic)"
   - Scopes: `repo` 전체 선택
   - 토큰 복사

2. **Vercel 환경 변수 설정**
   - Vercel Dashboard > 프로젝트 선택
   - Settings > Environment Variables
   - 추가:
     ```
     GITHUB_TOKEN=ghp_your_token_here
     GITHUB_OWNER=your-username
     GITHUB_REPO=your-repo-name
     ADMIN_PASSWORD=your-admin-password
     ```

3. **패키지 설치**
   ```bash
   npm install @octokit/rest
   ```

4. **api.ts 수정**
   - 현재 localStorage 버전을 백엔드 API 호출로 변경
   - `/api/data/projects` 엔드포인트 호출

5. **재배포**
   ```bash
   git add .
   git commit -m "Add serverless functions"
   git push
   ```

### 방법 3: 하이브리드 (권장)

로컬과 배포 환경을 자동으로 감지:

```typescript
// src/utils/api.ts
const isProduction = window.location.hostname !== 'localhost';

async function loadData<T>(storageKey: string, staticPath: string): Promise<T> {
  if (isProduction) {
    // 배포 환경: 정적 파일만 읽기
    return await loadFromStatic<T>(staticPath);
  } else {
    // 로컬: localStorage 확인
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    return await loadFromStatic<T>(staticPath);
  }
}
```

## 추천 워크플로우

### 개발 단계 (지금)
- 로컬에서 Admin 사용
- JSON 다운로드 → 파일 교체 → Git push
- 간단하고 안전함

### 프로덕션 단계 (나중에)
- Serverless Functions 구현
- 배포된 사이트에서도 Admin 사용 가능
- 실시간 업데이트

## 현재 사용 가능한 기능

### 로컬 (localhost:5173)
- ✅ Admin 로그인
- ✅ 데이터 추가/수정/삭제
- ✅ 즉시 반영
- ✅ localStorage 저장

### 배포 (Vercel)
- ✅ 모든 페이지 읽기
- ❌ Admin 수정 반영 안 됨 (localStorage는 로컬에만 있음)
- ✅ Git push로 업데이트 가능

## 빠른 업데이트 스크립트

```bash
#!/bin/bash
# update-data.sh

echo "📥 Downloading data from Admin..."
# Admin에서 JSON 다운로드 (수동)

echo "📋 Copying files..."
cp ~/Downloads/projects.json public/data/
cp ~/Downloads/music.json public/data/
cp ~/Downloads/publications.json public/data/
cp ~/Downloads/bio.json public/data/
cp ~/Downloads/courses.json public/data/

echo "📤 Committing and pushing..."
git add public/data/*.json
git commit -m "Update portfolio data from Admin"
git push

echo "✅ Done! Vercel will auto-deploy."
```

## 요약

**지금 당장 사용하려면:**
1. 로컬에서 Admin으로 수정
2. JSON 다운로드
3. `public/data/` 폴더에 복사
4. Git push
5. Vercel 자동 배포 대기

**나중에 개선하려면:**
- Serverless Functions 구현
- GitHub API 연동
- 배포된 사이트에서도 Admin 사용 가능
