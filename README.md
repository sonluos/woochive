# Woochive Portfolio Website

개인 포트폴리오 웹사이트 - AI 연구, 수학, 음악 작업물을 소개합니다.

## 주요 기능

- 프로젝트, 음악, 출판물 포트폴리오 관리
- 태그 기반 필터링 및 검색
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 이미지 갤러리 및 오디오 플레이어
- 관련 항목 추천 시스템
- 성능 최적화 (이미지 레이지 로딩)
- **관리자 CMS** - 웹 기반 콘텐츠 관리 시스템

## 기술 스택

- React 18 + TypeScript
- Vite
- React Router v6
- Vitest + React Testing Library + fast-check
- CSS Modules

## 개발 가이드

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 테스트 실행
npm run test

# 테스트 (watch 모드)
npm run test:watch

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

## Git 저장소 설정

### 자동 설정 (권장)

**macOS/Linux:**
```bash
npm run git:setup
```

**Windows:**
```bash
npm run git:setup:win
```

### 수동 설정

```bash
# 1. Git 저장소 초기화
git init
git branch -M main

# 2. 첫 커밋 생성
git add .
git commit -m "Initial commit: Woochive portfolio website"

# 3. GitHub 저장소 연결
git remote add origin https://github.com/YOUR_USERNAME/woochive.git

# 4. GitHub에 푸시
git push -u origin main
```

자세한 내용은 [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md)를 참조하세요.

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── AudioPlayer.tsx
│   ├── ImageGallery.tsx
│   ├── Navigation.tsx
│   ├── SearchBar.tsx
│   ├── TagFilter.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── pages/          # 페이지 컴포넌트
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Music.tsx
│   ├── Publications.tsx
│   ├── DetailPage.tsx
│   └── NotFound.tsx
├── hooks/          # 커스텀 React 훅
│   ├── usePortfolioData.ts
│   └── useFilter.ts
├── utils/          # 유틸리티 함수
│   ├── dataLoader.ts
│   ├── search.ts
│   └── validation.ts
├── types/          # TypeScript 타입 정의
│   └── portfolio.ts
└── test/           # 테스트 설정 파일
    └── setup.ts

public/
├── data/           # JSON 데이터 파일
│   ├── bio.json
│   ├── courses.json
│   ├── projects.json
│   ├── music.json
│   └── publications.json
├── images/         # 이미지 에셋
├── audio/          # 오디오 파일
└── pdfs/           # PDF 문서
```

## 데이터 구조

각 데이터 파일은 다음과 같은 구조를 따릅니다:

### projects.json
```json
[
  {
    "id": "unique-id",
    "title": "프로젝트 제목",
    "description": "짧은 설명",
    "fullDescription": "상세 설명",
    "date": "2024-01-01",
    "tags": ["AI", "Python"],
    "thumbnail": "/images/project-thumb.jpg",
    "images": ["/images/project1.jpg"],
    "technologies": ["Python", "TensorFlow"],
    "links": {
      "github": "https://github.com/...",
      "demo": "https://demo.com"
    }
  }
]
```

### music.json
```json
[
  {
    "id": "unique-id",
    "title": "음악 제목",
    "description": "짧은 설명",
    "fullDescription": "작품 설명",
    "date": "2024-01-01",
    "tags": ["Electronic", "Ambient"],
    "thumbnail": "/images/music-thumb.jpg",
    "instruments": ["Piano", "Synthesizer"],
    "audioFile": "/audio/track.mp3"
  }
]
```

### publications.json
```json
[
  {
    "id": "unique-id",
    "title": "논문 제목",
    "authors": ["Author 1", "Author 2"],
    "venue": "Conference/Journal Name",
    "date": "2024-01-01",
    "abstract": "초록",
    "tags": ["Machine Learning", "AI"],
    "pdfFile": "/pdfs/paper.pdf",
    "links": {
      "doi": "https://doi.org/...",
      "arxiv": "https://arxiv.org/..."
    }
  }
]
```

## 배포

Vercel을 통해 배포됩니다. `vercel.json` 파일에 React Router 지원 및 보안 헤더가 설정되어 있습니다.

```bash
# Vercel CLI로 배포
npm install -g vercel
vercel
```

## 테스트

- 단위 테스트: Vitest + React Testing Library
- 속성 기반 테스트: fast-check
- 커버리지: 주요 컴포넌트 및 유틸리티 함수

## 라이선스

MIT


## 관리자 기능

웹 브라우저에서 직접 콘텐츠를 관리할 수 있습니다.

### 로그인

1. `/admin/login` 페이지 접속
2. 기본 비밀번호: `woochive2024`
3. 로그인 후 대시보드에서 콘텐츠 관리

### 콘텐츠 편집

- **Projects**: 연구 프로젝트 추가/편집/삭제
- **Music**: 음악 작품 추가/편집/삭제
- **Publications**: 출판물 추가/편집/삭제

### 사용 방법

1. 관리자 대시보드에서 섹션 선택
2. 항목 추가/편집/삭제
3. "저장" 버튼 클릭하여 JSON 파일 다운로드
4. 다운로드한 파일을 `public/data/` 폴더에 업로드
5. Git 커밋 및 푸시하여 배포

자세한 내용은 [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)를 참조하세요.

**⚠️ 보안 주의**: 프로덕션 배포 전 반드시 비밀번호를 변경하세요!
