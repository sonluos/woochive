# Woochive 빠른 시작 가이드

이 가이드는 Woochive 포트폴리오 웹사이트를 빠르게 설정하고 배포하는 방법을 안내합니다.

## 📋 체크리스트

- [ ] Node.js 설치 (v18 이상)
- [ ] Git 설치
- [ ] GitHub 계정
- [ ] Vercel 계정 (무료)

## 🚀 5분 안에 배포하기

### 1단계: 프로젝트 설정 (1분)

```bash
# 의존성 설치
npm install

# 개발 서버 실행하여 확인
npm run dev
```

브라우저에서 `http://localhost:5173` 접속하여 확인

### 2단계: Git 저장소 설정 (2분)

**자동 설정 (권장):**

```bash
# macOS/Linux
npm run git:setup

# Windows
npm run git:setup:win
```

**수동 설정:**

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: Woochive portfolio website"
```

### 3단계: GitHub에 푸시 (1분)

1. [GitHub](https://github.com/new)에서 새 저장소 생성
   - 이름: `woochive`
   - Public 선택
   - README, .gitignore, license 추가하지 않음

2. 원격 저장소 연결 및 푸시:

```bash
git remote add origin https://github.com/YOUR_USERNAME/woochive.git
git push -u origin main
```

### 4단계: Vercel 배포 (1분)

1. [Vercel](https://vercel.com) 로그인 (GitHub 계정 사용)
2. "New Project" 클릭
3. GitHub 저장소 import (`woochive` 선택)
4. 설정 확인:
   - Framework Preset: Vite (자동 감지)
   - Root Directory: `woochive` (프로젝트가 하위 폴더에 있는 경우)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. "Deploy" 클릭

배포 완료! 약 1-2분 소요 🎉

**배포 URL**: `https://woochive.vercel.app` (또는 자동 생성된 URL)

## 📝 다음 단계

### 콘텐츠 수정

1. `public/data/` 폴더의 JSON 파일 편집
2. 또는 `/admin/login`에서 웹 기반 편집 (비밀번호: `woochive2024`)

### 비밀번호 변경 (중요!)

`src/contexts/AuthContext.tsx` 파일에서:

```typescript
const ADMIN_PASSWORD = 'your_secure_password';
```

### 커스텀 도메인 연결

1. Vercel 대시보드 > Settings > Domains
2. 도메인 추가
3. DNS 설정

## 📚 상세 가이드

- [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md) - Git 설정 상세 가이드
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 배포 가이드
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - 관리자 기능 가이드
- [README.md](./README.md) - 프로젝트 전체 문서

## 🛠️ 개발 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 미리보기
npm run test         # 테스트 실행
npm run lint         # 린트 검사
```

## 🔧 문제 해결

### "Git is not installed"
- macOS: `brew install git`
- Windows: [Git 다운로드](https://git-scm.com/download/win)
- Linux: `sudo apt-get install git`

### "Permission denied"
- Personal Access Token 사용
- GitHub → Settings → Developer settings → Personal access tokens

### "Build failed"
- `npm install` 재실행
- Node.js 버전 확인 (v18 이상)
- `node_modules` 삭제 후 재설치

## 💡 팁

1. **로컬 테스트**: 배포 전 `npm run build && npm run preview`로 확인
2. **자동 배포**: GitHub에 푸시하면 Vercel이 자동으로 재배포
3. **환경 변수**: Vercel 대시보드에서 설정 가능
4. **롤백**: Vercel 대시보드에서 이전 배포로 롤백 가능

## 🎯 완료 확인

- [ ] 로컬에서 개발 서버 실행 확인
- [ ] GitHub 저장소 생성 및 푸시 완료
- [ ] Vercel 배포 완료
- [ ] 배포된 사이트 접속 확인
- [ ] 관리자 로그인 테스트
- [ ] 비밀번호 변경 완료

모든 항목을 완료했다면 축하합니다! 🎊

이제 포트폴리오를 공유하고 콘텐츠를 추가하세요!
