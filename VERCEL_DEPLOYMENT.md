# Vercel 배포 가이드

이 가이드는 Woochive 포트폴리오 웹사이트를 Vercel에 배포하는 방법을 단계별로 안내합니다.

## 사전 준비

- ✅ GitHub 저장소에 코드 푸시 완료
- ✅ Vercel 계정 (무료) - [vercel.com](https://vercel.com)
- ✅ GitHub 계정과 Vercel 연동

## 방법 1: Vercel 웹사이트를 통한 배포 (권장)

### Step 1: Vercel 로그인

1. [Vercel](https://vercel.com) 접속
2. "Sign Up" 또는 "Login" 클릭
3. "Continue with GitHub" 선택
4. GitHub 계정으로 로그인 및 권한 승인

### Step 2: 새 프로젝트 생성

1. Vercel 대시보드에서 "Add New..." 버튼 클릭
2. "Project" 선택
3. "Import Git Repository" 섹션에서 GitHub 저장소 찾기
4. `woochive` 저장소 옆의 "Import" 버튼 클릭

### Step 3: 프로젝트 설정

Vercel이 자동으로 설정을 감지합니다:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Root Directory 설정 (중요!):**
- 프로젝트가 `woochive` 폴더 안에 있다면:
- "Root Directory" → "Edit" 클릭
- `woochive` 입력
- "Continue" 클릭

**환경 변수 설정 (선택적):**
- "Environment Variables" 섹션 펼치기
- 필요한 환경 변수 추가:
  ```
  VITE_ADMIN_PASSWORD=your_secure_password
  ```

### Step 4: 배포 시작

1. "Deploy" 버튼 클릭
2. 배포 진행 상황 확인 (약 1-2분 소요)
3. 배포 완료 시 축하 화면 표시

### Step 5: 배포 확인

1. "Visit" 버튼 클릭하여 사이트 접속
2. 배포 URL 확인 (예: `https://woochive.vercel.app`)
3. 모든 페이지 동작 확인:
   - ✅ 홈페이지
   - ✅ About
   - ✅ Projects
   - ✅ Music
   - ✅ Publications
   - ✅ 상세 페이지
   - ✅ 관리자 로그인

## 방법 2: Vercel CLI를 통한 배포

### Step 1: Vercel CLI 설치

```bash
npm install -g vercel
```

### Step 2: 로그인

```bash
vercel login
```

이메일 주소 입력 후 인증 메일 확인

### Step 3: 프로젝트 배포

```bash
# 프로젝트 디렉토리에서
cd woochive

# 첫 배포 (프리뷰)
vercel

# 프로덕션 배포
vercel --prod
```

### Step 4: 설정 확인

CLI가 다음 질문을 합니다:

```
? Set up and deploy "~/woochive"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? woochive
? In which directory is your code located? ./
```

## 배포 후 설정

### 1. 도메인 설정

**기본 도메인:**
- `https://woochive.vercel.app`
- `https://woochive-[username].vercel.app`

**커스텀 도메인 연결:**

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Domains"
3. "Add" 버튼 클릭
4. 도메인 입력 (예: `woochive.me`)
5. DNS 설정 안내에 따라 설정:

   **A 레코드:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **CNAME 레코드 (www):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

6. DNS 전파 대기 (최대 48시간, 보통 몇 분)
7. SSL 인증서 자동 발급 확인

### 2. 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Environment Variables"
3. 변수 추가:

   ```
   Name: VITE_ADMIN_PASSWORD
   Value: your_secure_password
   Environment: Production, Preview, Development
   ```

4. "Save" 클릭
5. 재배포 필요 (자동으로 트리거됨)

### 3. 빌드 설정 확인

1. "Settings" → "General"
2. "Build & Development Settings" 확인:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 4. Git 통합 설정

1. "Settings" → "Git"
2. "Production Branch": `main` 확인
3. "Auto-deploy" 활성화 확인
4. 이제 `main` 브랜치에 푸시하면 자동 배포

## 자동 배포 워크플로우

```bash
# 1. 로컬에서 변경사항 작업
# 2. 변경사항 커밋
git add .
git commit -m "Update content"

# 3. GitHub에 푸시
git push origin main

# 4. Vercel이 자동으로 감지하고 배포 시작
# 5. 약 1-2분 후 배포 완료
# 6. 배포 알림 이메일 수신
```

## 배포 확인 체크리스트

### 기본 기능
- [ ] 홈페이지 로딩
- [ ] 모든 네비게이션 링크 동작
- [ ] 직접 URL 접근 (새로고침)
- [ ] 404 페이지 동작

### 콘텐츠
- [ ] 프로젝트 목록 표시
- [ ] 음악 목록 표시
- [ ] 출판물 목록 표시
- [ ] 상세 페이지 접근
- [ ] 이미지 로딩 (있는 경우)
- [ ] 오디오 재생 (있는 경우)

### 기능
- [ ] 검색 기능
- [ ] 태그 필터링
- [ ] 관련 항목 추천
- [ ] 관리자 로그인

### 반응형
- [ ] 모바일 뷰 (< 768px)
- [ ] 태블릿 뷰 (768px-1024px)
- [ ] 데스크톱 뷰 (> 1024px)
- [ ] 모바일 네비게이션 메뉴

### 성능
- [ ] 페이지 로드 속도 (< 3초)
- [ ] 이미지 레이지 로딩
- [ ] 브라우저 콘솔 에러 없음
- [ ] 네트워크 404 에러 없음

### SEO
- [ ] 메타 태그 확인 (View Source)
- [ ] robots.txt 접근 가능
- [ ] sitemap.xml 접근 가능
- [ ] Open Graph 이미지 (설정한 경우)

## 문제 해결

### 문제 1: "Build Failed"

**원인**: 빌드 에러

**해결책**:
1. Vercel 대시보드에서 빌드 로그 확인
2. 로컬에서 `npm run build` 실행하여 에러 확인
3. 에러 수정 후 다시 푸시

```bash
# 로컬 빌드 테스트
npm run build
npm run preview
```

### 문제 2: "404 on Page Refresh"

**원인**: SPA 라우팅 설정 누락

**해결책**:
- `vercel.json` 파일 확인
- rewrites 설정이 있는지 확인
- 이미 설정되어 있음 ✅

### 문제 3: "Environment Variables Not Working"

**원인**: 환경 변수 미설정 또는 재배포 필요

**해결책**:
1. Vercel 대시보드에서 환경 변수 확인
2. "Redeploy" 버튼 클릭
3. 또는 더미 커밋 후 푸시

```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### 문제 4: "Images Not Loading"

**원인**: 이미지 경로 문제

**해결책**:
1. 이미지가 `public/` 폴더에 있는지 확인
2. 경로가 `/images/...` 형식인지 확인 (절대 경로)
3. 대소문자 확인 (Linux는 대소문자 구분)

### 문제 5: "Slow Build Times"

**원인**: 의존성이 많거나 빌드 최적화 필요

**해결책**:
1. `node_modules` 캐싱 확인 (자동)
2. 불필요한 의존성 제거
3. 빌드 명령어 최적화

## 고급 설정

### 1. 프리뷰 배포

모든 브랜치와 PR에 대해 자동으로 프리뷰 배포 생성:

1. "Settings" → "Git"
2. "Deploy Previews" 활성화
3. 새 브랜치 푸시 시 프리뷰 URL 생성

### 2. 성능 모니터링

1. "Analytics" 탭에서 성능 확인
2. Core Web Vitals 모니터링
3. 방문자 통계 확인

### 3. 로그 확인

1. "Deployments" 탭
2. 특정 배포 클릭
3. "Build Logs" 및 "Function Logs" 확인

### 4. 롤백

1. "Deployments" 탭
2. 이전 배포 선택
3. "Promote to Production" 클릭

## Vercel CLI 유용한 명령어

```bash
# 프로젝트 정보
vercel inspect

# 로그 확인
vercel logs

# 환경 변수 관리
vercel env ls
vercel env add VITE_ADMIN_PASSWORD
vercel env rm VITE_ADMIN_PASSWORD

# 도메인 관리
vercel domains ls
vercel domains add woochive.me

# 프로젝트 제거
vercel remove woochive
```

## 비용

Vercel 무료 플랜:
- ✅ 무제한 배포
- ✅ 자동 HTTPS
- ✅ 100GB 대역폭/월
- ✅ 프리뷰 배포
- ✅ 분석 기능

Pro 플랜 ($20/월):
- 더 많은 대역폭
- 팀 협업 기능
- 우선 지원

## 다음 단계

배포가 완료되면:

1. ✅ Task 20 완료 체크
2. ➡️ Task 21: 배포 후 검증
3. 🎉 프로젝트 완료!

## 유용한 링크

- [Vercel 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [커스텀 도메인 설정](https://vercel.com/docs/concepts/projects/custom-domains)

## 지원

문제가 발생하면:
1. [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)
2. [Vercel 지원](https://vercel.com/support)
3. 프로젝트 GitHub Issues

---

배포 완료를 축하합니다! 🎉
