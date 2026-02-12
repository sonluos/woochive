# Woochive 관리자 기능 가이드

## 개요

Woochive 포트폴리오 웹사이트에 관리자 인증 및 콘텐츠 관리 시스템(CMS)이 추가되었습니다. 이제 웹 브라우저에서 직접 프로젝트, 음악, 출판물을 추가하고 편집할 수 있습니다.

## 주요 기능

### 1. 관리자 인증
- 비밀번호 기반 로그인
- 세션 기반 인증 (브라우저 세션 유지)
- 보안 라우트 보호

### 2. 콘텐츠 관리
- **Projects**: 연구 프로젝트 추가/편집/삭제
- **Music**: 음악 작품 추가/편집/삭제
- **Publications**: 출판물 추가/편집/삭제
- **About**: 자기소개 및 과목 관리 (예정)

### 3. 웹 기반 편집
- 직관적인 폼 인터페이스
- 실시간 미리보기
- JSON 파일 자동 생성 및 다운로드

## 사용 방법

### 1단계: 관리자 로그인

1. 웹사이트에서 `/admin/login` 페이지로 이동
2. 기본 비밀번호 입력: `woochive2024`
3. 로그인 성공 시 관리자 대시보드로 이동

**⚠️ 보안 주의사항:**
- 첫 로그인 후 반드시 비밀번호를 변경하세요
- `src/contexts/AuthContext.tsx` 파일에서 `ADMIN_PASSWORD` 상수 변경
- 실제 프로덕션에서는 환경 변수 사용 권장

### 2단계: 콘텐츠 관리

#### 프로젝트 관리

1. 대시보드에서 "Projects" 선택
2. "프로젝트 관리" 버튼 클릭
3. 작업 선택:
   - **새 프로젝트**: "+ 새 프로젝트" 버튼 클릭
   - **편집**: 기존 프로젝트 카드에서 "편집" 버튼
   - **삭제**: 기존 프로젝트 카드에서 "삭제" 버튼

4. 폼 작성:
   - **제목**: 프로젝트 이름
   - **짧은 설명**: 카드에 표시될 요약
   - **상세 설명**: 상세 페이지 내용
   - **날짜**: 프로젝트 날짜
   - **태그**: 쉼표로 구분 (예: AI, ML, Python)
   - **기술 스택**: 쉼표로 구분 (예: React, TypeScript)
   - **이미지 URL**: 쉼표로 구분 (예: /images/img1.jpg, /images/img2.jpg)
   - **썸네일 URL**: 카드 썸네일 이미지

5. "저장 (JSON 다운로드)" 버튼 클릭
6. 다운로드된 `projects.json` 파일을 `public/data/` 폴더에 업로드

#### 음악 관리

1. 대시보드에서 "Music" 선택
2. "음악 관리" 버튼 클릭
3. 프로젝트와 동일한 방식으로 작업
4. 추가 필드:
   - **악기**: 쉼표로 구분 (예: Piano, Synthesizer)
   - **오디오 파일 URL**: 오디오 파일 경로 (예: /audio/track.mp3)

5. 다운로드된 `music.json` 파일을 `public/data/` 폴더에 업로드

#### 출판물 관리

1. 대시보드에서 "Publications" 선택
2. "출판물 관리" 버튼 클릭
3. 추가 필드:
   - **저자**: 쉼표로 구분
   - **출판처**: 학회/저널 이름
   - **초록**: 논문 요약
   - **PDF 파일 URL**: PDF 경로

4. 다운로드된 `publications.json` 파일을 `public/data/` 폴더에 업로드

### 3단계: 변경사항 배포

#### 로컬 개발 환경

1. 다운로드한 JSON 파일을 `public/data/` 폴더에 복사
2. 브라우저 새로고침하여 변경사항 확인

#### Vercel 배포 환경

1. 다운로드한 JSON 파일을 로컬 프로젝트의 `public/data/` 폴더에 복사
2. Git 커밋 및 푸시:
   ```bash
   git add public/data/*.json
   git commit -m "Update portfolio content"
   git push
   ```
3. Vercel이 자동으로 재배포
4. 몇 분 후 변경사항 확인

## 파일 구조

```
src/
├── contexts/
│   └── AuthContext.tsx          # 인증 컨텍스트
├── pages/
│   ├── AdminLogin.tsx           # 로그인 페이지
│   ├── AdminDashboard.tsx       # 관리자 대시보드
│   ├── AdminEditProjects.tsx    # 프로젝트 편집
│   ├── AdminEditMusic.tsx       # 음악 편집
│   └── AdminEdit.css            # 편집 페이지 스타일

public/
└── data/
    ├── projects.json            # 프로젝트 데이터
    ├── music.json               # 음악 데이터
    ├── publications.json        # 출판물 데이터
    ├── bio.json                 # 자기소개
    └── courses.json             # 수강 과목
```

## 보안 설정

### 비밀번호 변경

1. `src/contexts/AuthContext.tsx` 파일 열기
2. `ADMIN_PASSWORD` 상수 찾기:
   ```typescript
   const ADMIN_PASSWORD = 'woochive2024'; // 변경 필요!
   ```
3. 강력한 비밀번호로 변경:
   ```typescript
   const ADMIN_PASSWORD = 'your_secure_password_here';
   ```
4. 변경사항 커밋 및 배포

### 환경 변수 사용 (권장)

1. `.env` 파일 생성:
   ```
   VITE_ADMIN_PASSWORD=your_secure_password
   ```

2. `AuthContext.tsx` 수정:
   ```typescript
   const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'woochive2024';
   ```

3. Vercel 환경 변수 설정:
   - Vercel 대시보드 > Settings > Environment Variables
   - `VITE_ADMIN_PASSWORD` 추가
   - 재배포

## 향후 개선 사항

### 단기
- [ ] About 섹션 편집 기능
- [ ] 이미지 업로드 기능
- [ ] 오디오 파일 업로드 기능
- [ ] 미리보기 기능

### 중기
- [ ] 백엔드 API 연동
- [ ] 데이터베이스 저장
- [ ] 실시간 업데이트 (JSON 파일 자동 업로드)
- [ ] 다중 사용자 지원

### 장기
- [ ] 역할 기반 권한 관리
- [ ] 버전 관리 및 롤백
- [ ] 이미지 최적화 자동화
- [ ] SEO 메타데이터 관리

## 문제 해결

### 로그인이 안 돼요
- 비밀번호가 정확한지 확인
- 브라우저 캐시 삭제 후 재시도
- 개발자 도구 콘솔에서 에러 확인

### 변경사항이 반영되지 않아요
- JSON 파일이 올바른 위치(`public/data/`)에 있는지 확인
- 브라우저 캐시 삭제 (Ctrl+Shift+R 또는 Cmd+Shift+R)
- Vercel 배포 상태 확인

### JSON 파일이 다운로드되지 않아요
- 브라우저 팝업 차단 해제
- 다운로드 폴더 확인
- 다른 브라우저에서 시도

## 지원

문제가 발생하면:
1. 브라우저 개발자 도구 콘솔 확인
2. 네트워크 탭에서 요청 상태 확인
3. GitHub Issues에 문제 보고

## 라이선스

MIT License - 자유롭게 수정 및 사용 가능
