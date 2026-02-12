# Woochive 배포 가이드

이 문서는 Woochive 포트폴리오 웹사이트를 GitHub와 Vercel에 배포하는 방법을 안내합니다.

## 완료된 작업

✅ 프로젝트 초기 설정 및 기본 구조
✅ 데이터 모델 및 샘플 데이터
✅ 데이터 로딩 유틸리티
✅ 라우팅 및 네비게이션
✅ 공통 컴포넌트 (AudioPlayer, ImageGallery 포함)
✅ 필터링 및 검색 로직
✅ 모든 페이지 구현 (Home, About, Projects, Music, Publications, DetailPage)
✅ 에러 처리 및 로딩 상태
✅ 성능 최적화 (이미지 레이지 로딩)
✅ 스타일링 및 반응형 디자인
✅ vercel.json 설정
✅ README.md 문서화

## 남은 작업

### 1. 속성 기반 테스트 작성 (선택적)

다음 속성 테스트들이 아직 작성되지 않았습니다:

- Property 4-10: Home, About, Projects, Music, Publications 페이지 속성 테스트
- Property 14-16: DetailPage 속성 테스트
- Property 28-34: 반응형 및 고급 기능 속성 테스트

이 테스트들은 선택적이며, 기본 기능은 이미 단위 테스트로 커버되어 있습니다.

### 2. Git 저장소 설정 및 GitHub 푸시

```bash
# Git 초기화
git init
git branch -M main

# .gitignore 확인 (이미 설정되어 있음)
# node_modules, dist, .env 등이 포함되어 있는지 확인

# 첫 커밋 생성
git add .
git commit -m "Initial commit: Woochive portfolio website"

# GitHub에서 새 저장소 생성
# 1. GitHub.com에 로그인
# 2. 우측 상단 '+' 버튼 클릭 > New repository
# 3. Repository name: woochive (또는 원하는 이름)
# 4. Public/Private 선택
# 5. Create repository 클릭

# 원격 저장소 연결 및 푸시
git remote add origin https://github.com/YOUR_USERNAME/woochive.git
git push -u origin main
```

### 3. Vercel 배포

#### 방법 1: Vercel 웹사이트를 통한 배포 (권장)

1. [Vercel](https://vercel.com)에 로그인 (GitHub 계정으로 로그인 권장)
2. "New Project" 클릭
3. GitHub 저장소 import
   - "Import Git Repository" 선택
   - 방금 생성한 저장소 선택
4. 프로젝트 설정 확인
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. "Deploy" 버튼 클릭
6. 배포 완료 후 URL 확인 (예: `https://woochive.vercel.app`)

#### 방법 2: Vercel CLI를 통한 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 4. 배포 후 검증

배포가 완료되면 다음 사항들을 확인하세요:

#### 기본 기능
- [ ] 홈페이지 로딩 확인
- [ ] 모든 네비게이션 링크 동작 확인
- [ ] 직접 URL 접근 확인 (/projects, /about 등)
- [ ] 404 페이지 동작 확인

#### 미디어 파일
- [ ] 이미지 로딩 확인
- [ ] 오디오 파일 재생 확인 (Music 페이지)
- [ ] PDF 다운로드 확인 (Publications 페이지)

#### 반응형 디자인
- [ ] 모바일 뷰 확인 (< 768px)
- [ ] 태블릿 뷰 확인 (768px-1024px)
- [ ] 데스크톱 뷰 확인 (> 1024px)
- [ ] 모바일 네비게이션 메뉴 동작 확인

#### 기능 테스트
- [ ] 검색 기능 동작 확인
- [ ] 태그 필터링 동작 확인
- [ ] 상세 페이지 이동 확인
- [ ] 관련 항목 추천 표시 확인
- [ ] 이미지 갤러리 모달 동작 확인
- [ ] 오디오 플레이어 동작 확인

#### 브라우저 콘솔
- [ ] 콘솔에 에러가 없는지 확인
- [ ] 네트워크 탭에서 404 에러 확인
- [ ] 성능 탭에서 로딩 시간 확인

### 5. 문제 해결

#### 404 에러 (페이지 새로고침 시)
- `vercel.json` 파일이 올바르게 설정되어 있는지 확인
- Vercel 대시보드에서 재배포 시도

#### 이미지 로딩 실패
- 이미지 경로가 `/images/...` 형식으로 시작하는지 확인
- `public` 폴더에 이미지가 있는지 확인
- 대소문자 구분 확인

#### 빌드 실패
- Vercel 대시보드에서 빌드 로그 확인
- 로컬에서 `npm run build` 실행하여 에러 확인
- TypeScript 에러가 있는지 확인

### 6. 커스텀 도메인 연결 (선택적)

woochive.me 도메인을 연결하려면:

1. Vercel 프로젝트 Settings > Domains 이동
2. "Add" 버튼 클릭
3. `woochive.me` 입력
4. DNS 설정 안내에 따라 도메인 등록 업체에서 설정
   - A 레코드: `76.76.21.21`
   - 또는 CNAME 레코드: `cname.vercel-dns.com`
5. DNS 전파 대기 (최대 48시간, 보통 몇 분 내)
6. SSL 인증서 자동 발급 확인

## 로컬 개발

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

## 데이터 업데이트

포트폴리오 데이터를 업데이트하려면:

1. `public/data/` 폴더의 JSON 파일 수정
2. 변경사항 커밋 및 푸시
3. Vercel이 자동으로 재배포

## 추가 개선 사항 (선택적)

- [ ] 이미지 최적화 (WebP 형식, 반응형 이미지)
- [ ] SEO 메타 태그 추가
- [ ] Google Analytics 연동
- [ ] 다국어 지원
- [ ] 블로그 섹션 추가
- [ ] Contact 폼 추가
- [ ] 애니메이션 효과 추가

## 지원

문제가 발생하면 다음을 확인하세요:

- [Vercel 문서](https://vercel.com/docs)
- [Vite 문서](https://vitejs.dev/)
- [React Router 문서](https://reactrouter.com/)
