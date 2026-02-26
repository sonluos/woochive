# Vercel 배포 및 Admin 설정 가이드

## 🎯 목표

배포된 사이트에서도 Admin 페이지를 통해 데이터를 직접 수정할 수 있도록 설정합니다.

## 📋 준비물

1. GitHub 계정
2. Vercel 계정
3. 이 프로젝트의 GitHub 저장소

## 🔧 1단계: GitHub Personal Access Token 생성

1. **GitHub 설정 페이지로 이동**
   - https://github.com/settings/tokens

2. **"Generate new token (classic)" 클릭**

3. **토큰 설정**
   - Note: `WooChive Admin API`
   - Expiration: `No expiration` (또는 원하는 기간)
   - Scopes: **`repo` 전체 선택** ✅
     - repo:status
     - repo_deployment
     - public_repo
     - repo:invite
     - security_events

4. **"Generate token" 클릭**

5. **토큰 복사** (⚠️ 한 번만 표시됩니다!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## 🚀 2단계: Vercel 프로젝트 설정

### 2-1. 프로젝트 배포 (처음인 경우)

1. **Vercel 대시보드**
   - https://vercel.com/dashboard

2. **"Add New..." > "Project" 클릭**

3. **GitHub 저장소 선택**
   - WooChive 저장소 Import

4. **배포 설정**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **"Deploy" 클릭**

### 2-2. 환경 변수 설정

1. **프로젝트 Settings로 이동**
   - Vercel Dashboard > 프로젝트 선택 > Settings

2. **Environment Variables 탭 선택**

3. **다음 변수들 추가:**

   **GITHUB_TOKEN**
   ```
   Value: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Environment: Production, Preview, Development
   ```

   **GITHUB_OWNER**
   ```
   Value: your-github-username
   Environment: Production, Preview, Development
   ```

   **GITHUB_REPO**
   ```
   Value: woochive (또는 저장소 이름)
   Environment: Production, Preview, Development
   ```

   **ADMIN_PASSWORD**
   ```
   Value: sonluoscrool7 (또는 원하는 비밀번호)
   Environment: Production, Preview, Development
   ```

4. **"Save" 클릭**

## 📦 3단계: 패키지 설치 및 배포

### 로컬에서 설치

```bash
npm install @octokit/rest
```

### Git 커밋 및 푸시

```bash
git add .
git commit -m "Add Vercel Serverless Functions for Admin"
git push
```

### Vercel 자동 재배포

- Git push하면 Vercel이 자동으로 재배포합니다
- 약 1-2분 소요

## ✅ 4단계: 테스트

### 배포된 사이트에서 테스트

1. **Admin 로그인**
   ```
   https://your-site.vercel.app/admin/login
   ```

2. **비밀번호 입력**
   - 환경 변수에 설정한 `ADMIN_PASSWORD` 입력

3. **프로젝트 추가 테스트**
   - Projects 관리 페이지로 이동
   - 새 프로젝트 추가
   - 저장

4. **GitHub 확인**
   - GitHub 저장소로 이동
   - `public/data/projects.json` 파일 확인
   - 새 커밋이 생성되었는지 확인

5. **사이트 확인**
   - Projects 페이지로 이동
   - 새로 추가한 프로젝트가 표시되는지 확인

## 🔍 문제 해결

### 1. "GitHub 인증 실패" 에러

**원인**: GitHub Token이 잘못되었거나 권한이 부족합니다.

**해결**:
1. Vercel 환경 변수에서 `GITHUB_TOKEN` 확인
2. GitHub에서 토큰 재생성 (repo 권한 확인)
3. Vercel 환경 변수 업데이트
4. Vercel 재배포

### 2. "Unauthorized" 에러

**원인**: Admin 비밀번호가 틀렸습니다.

**해결**:
1. Vercel 환경 변수에서 `ADMIN_PASSWORD` 확인
2. 로그인 시 정확한 비밀번호 입력

### 3. "Method not allowed" 에러

**원인**: API 엔드포인트가 제대로 배포되지 않았습니다.

**해결**:
1. `api/data/` 폴더에 모든 파일이 있는지 확인
2. Git에 커밋되었는지 확인
3. Vercel 재배포

### 4. 로컬에서는 되는데 배포에서 안 됨

**원인**: 환경 변수가 설정되지 않았습니다.

**해결**:
1. Vercel Dashboard > Settings > Environment Variables
2. 모든 변수가 설정되었는지 확인
3. "Production" 환경에 적용되었는지 확인
4. Vercel 재배포

## 📊 작동 방식

### 로컬 개발 (localhost)
```
Admin 수정 → localStorage 저장 → 즉시 반영
```

### 배포 환경 (Vercel)
```
Admin 수정 → Vercel API → GitHub API → JSON 파일 업데이트 → Git 커밋 → 즉시 반영
```

## 🔒 보안 주의사항

1. **GitHub Token 보안**
   - 절대 코드에 하드코딩하지 마세요
   - 환경 변수로만 관리하세요
   - 토큰이 노출되면 즉시 재생성하세요

2. **Admin 비밀번호**
   - 강력한 비밀번호 사용
   - 정기적으로 변경
   - 환경 변수로만 관리

3. **API 엔드포인트**
   - 인증 없이는 수정 불가
   - GET 요청만 공개
   - POST/PUT/DELETE는 인증 필요

## 📝 체크리스트

- [ ] GitHub Personal Access Token 생성
- [ ] Vercel 환경 변수 설정 (4개)
- [ ] `npm install @octokit/rest` 실행
- [ ] Git commit & push
- [ ] Vercel 자동 배포 완료
- [ ] 배포된 사이트에서 Admin 로그인 테스트
- [ ] 데이터 추가/수정 테스트
- [ ] GitHub에 커밋 생성 확인
- [ ] 사이트에 변경사항 반영 확인

## 🎉 완료!

이제 배포된 사이트에서도 Admin 페이지를 통해 데이터를 직접 수정할 수 있습니다!

- ✅ 로컬: localStorage 사용
- ✅ 배포: GitHub API 사용
- ✅ 자동 감지 및 전환
- ✅ 즉시 반영
