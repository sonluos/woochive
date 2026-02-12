# 관리자 접속 정보

## 🔐 관리자 로그인

### Production (커스텀 도메인)
- **URL**: https://woochive.me/admin/login
- **또는**: https://www.woochive.me/admin/login
- **기본 비밀번호**: `woochive2024`

### Vercel 도메인
- **URL**: https://woochive.vercel.app/admin/login
- **기본 비밀번호**: `woochive2024`

---

## 📊 관리자 대시보드

로그인 후 접속 가능:
- **URL**: https://woochive.me/admin
- **기능**:
  - Projects 편집
  - Music 편집
  - JSON 다운로드

---

## 🎯 관리자 기능

### 1. 프로젝트 관리
- **URL**: https://woochive.me/admin/projects
- **기능**: 프로젝트 추가/수정/삭제

### 2. 음악 관리
- **URL**: https://woochive.me/admin/music
- **기능**: 음악 작업물 추가/수정/삭제

---

## 🔄 콘텐츠 업데이트 방법

### 1. 관리자 로그인
```
https://woochive.me/admin/login
```

### 2. 섹션 선택
- Projects 또는 Music 선택

### 3. 편집
- 항목 추가/수정/삭제

### 4. JSON 다운로드
- "Download JSON" 버튼 클릭
- 파일 저장

### 5. 파일 업로드
- 다운로드한 JSON 파일을 `public/data/` 폴더에 업로드
- 파일명 확인:
  - `projects.json`
  - `music.json`

### 6. GitHub 푸시
```bash
cd woochive
git add public/data/
git commit -m "Update content"
git push origin main
```

### 7. 자동 배포
- Vercel이 자동으로 재배포 (약 1-2분)
- https://woochive.me 에서 변경사항 확인

---

## ⚠️ 보안 주의사항

### 비밀번호 변경 (중요!)

**방법 1: 코드에서 직접 변경**
```typescript
// woochive/src/contexts/AuthContext.tsx
const ADMIN_PASSWORD = 'woochive2024'; // ← 이것을 변경하세요!
```

**방법 2: Vercel 환경 변수 사용 (권장)**
1. https://vercel.com/sonluos-projects/woochive/settings/environment-variables
2. 새 변수 추가:
   - Name: `VITE_ADMIN_PASSWORD`
   - Value: `새로운_비밀번호`
   - Environment: Production, Preview, Development
3. "Save" 클릭
4. 재배포 (자동 트리거됨)

### 보안 팁
- ✅ 강력한 비밀번호 사용 (최소 12자, 대소문자+숫자+특수문자)
- ✅ 정기적으로 비밀번호 변경
- ✅ 비밀번호를 Git에 커밋하지 않기
- ✅ 환경 변수 사용 권장
- ❌ 기본 비밀번호 그대로 사용하지 않기

---

## 🔗 주요 링크

### 웹사이트
- **메인**: https://woochive.me
- **www**: https://www.woochive.me
- **Vercel**: https://woochive.vercel.app

### 관리자
- **로그인**: https://woochive.me/admin/login
- **대시보드**: https://woochive.me/admin
- **프로젝트 편집**: https://woochive.me/admin/projects
- **음악 편집**: https://woochive.me/admin/music

### 개발
- **GitHub**: https://github.com/sonluos/woochive
- **Vercel 대시보드**: https://vercel.com/sonluos-projects/woochive

---

## 📝 빠른 참조

### 로그인 정보
```
URL: https://woochive.me/admin/login
비밀번호: woochive2024 (변경 필요!)
```

### 콘텐츠 파일 위치
```
public/data/bio.json          - 자기소개
public/data/courses.json       - 수강 과목
public/data/projects.json      - 프로젝트
public/data/music.json         - 음악 작업물
public/data/publications.json  - 출판물
```

### 배포 명령어
```bash
# 로컬 개발
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview

# Vercel 배포
npm run deploy:prod
```

---

## 🆘 문제 해결

### 로그인 안 됨
- 비밀번호 확인
- 브라우저 캐시 삭제
- 시크릿 모드에서 시도

### 변경사항이 반영 안 됨
- GitHub 푸시 확인
- Vercel 배포 상태 확인
- 브라우저 캐시 삭제 (Ctrl+Shift+R 또는 Cmd+Shift+R)

### JSON 다운로드 안 됨
- 브라우저 팝업 차단 해제
- 다운로드 폴더 확인

---

**마지막 업데이트**: 2026년 2월 12일
**도메인 설정 완료**: ✅
**SSL 인증서**: ✅ Let's Encrypt
