# Git 저장소 설정 및 GitHub 푸시 가이드

## 사전 준비

### 1. Git 설치 확인

터미널에서 다음 명령어를 실행하여 Git이 설치되어 있는지 확인하세요:

```bash
git --version
```

Git이 설치되어 있지 않다면:

**macOS:**
```bash
# Homebrew 사용
brew install git

# 또는 Xcode Command Line Tools
xcode-select --install
```

**Windows:**
- [Git for Windows](https://git-scm.com/download/win) 다운로드 및 설치

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# Fedora
sudo dnf install git
```

### 2. Git 설정

처음 사용하는 경우 사용자 정보를 설정하세요:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 1: Git 저장소 초기화

프로젝트 루트 디렉토리에서:

```bash
# Git 저장소 초기화
git init

# 기본 브랜치를 main으로 설정
git branch -M main
```

## Step 2: .gitignore 확인

`.gitignore` 파일이 이미 설정되어 있습니다. 다음 항목들이 포함되어 있는지 확인하세요:

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

## Step 3: 첫 커밋 생성

```bash
# 모든 파일을 스테이징 영역에 추가
git add .

# 커밋 생성
git commit -m "Initial commit: Woochive portfolio website with admin CMS"
```

**커밋 메시지 예시:**
```
Initial commit: Woochive portfolio website with admin CMS

- React + TypeScript + Vite 기반 포트폴리오
- 5개 주요 페이지 (Home, About, Projects, Music, Publications)
- 관리자 CMS 기능 (인증, CRUD)
- 42개 속성 기반 테스트
- 반응형 디자인 및 다크 모드 지원
- SEO 최적화 (메타 태그, sitemap, robots.txt)
- ErrorBoundary 및 성능 최적화
```

## Step 4: GitHub 저장소 생성

### 4.1 GitHub 웹사이트에서 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 '+' 버튼 클릭 → "New repository"
3. 저장소 설정:
   - **Repository name**: `woochive` (또는 원하는 이름)
   - **Description**: "Personal portfolio website showcasing AI research, music, and publications"
   - **Visibility**: 
     - Public (공개) - 추천
     - Private (비공개)
   - **Initialize repository**: 
     - ❌ README 추가하지 않음 (이미 있음)
     - ❌ .gitignore 추가하지 않음 (이미 있음)
     - ❌ License 추가하지 않음
4. "Create repository" 클릭

### 4.2 GitHub CLI 사용 (선택적)

GitHub CLI가 설치되어 있다면:

```bash
# GitHub CLI 설치 (macOS)
brew install gh

# 로그인
gh auth login

# 저장소 생성
gh repo create woochive --public --source=. --remote=origin --push
```

## Step 5: 원격 저장소 연결

GitHub에서 생성한 저장소의 URL을 복사하고:

```bash
# HTTPS 사용
git remote add origin https://github.com/YOUR_USERNAME/woochive.git

# 또는 SSH 사용 (SSH 키 설정 필요)
git remote add origin git@github.com:YOUR_USERNAME/woochive.git
```

**YOUR_USERNAME을 실제 GitHub 사용자명으로 변경하세요!**

## Step 6: GitHub에 푸시

```bash
# main 브랜치를 원격 저장소에 푸시
git push -u origin main
```

### 인증 방법

**HTTPS 사용 시:**
- Username: GitHub 사용자명
- Password: Personal Access Token (PAT)
  - GitHub → Settings → Developer settings → Personal access tokens
  - "Generate new token (classic)" 클릭
  - `repo` 권한 선택
  - 생성된 토큰을 비밀번호로 사용

**SSH 사용 시:**
- SSH 키 생성 및 GitHub에 등록 필요
- [GitHub SSH 설정 가이드](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Step 7: 푸시 확인

1. GitHub 저장소 페이지 새로고침
2. 모든 파일이 업로드되었는지 확인
3. README.md가 제대로 표시되는지 확인

## 일반적인 문제 해결

### 문제 1: "Permission denied"

**원인**: 인증 실패

**해결책**:
```bash
# HTTPS로 변경
git remote set-url origin https://github.com/YOUR_USERNAME/woochive.git

# Personal Access Token 사용
```

### 문제 2: "Repository not found"

**원인**: 저장소 URL이 잘못됨

**해결책**:
```bash
# 현재 원격 저장소 확인
git remote -v

# 잘못된 URL 제거
git remote remove origin

# 올바른 URL로 다시 추가
git remote add origin https://github.com/YOUR_USERNAME/woochive.git
```

### 문제 3: "Updates were rejected"

**원인**: 원격 저장소에 로컬에 없는 커밋이 있음

**해결책**:
```bash
# 원격 변경사항 가져오기
git pull origin main --rebase

# 다시 푸시
git push -u origin main
```

### 문제 4: 파일이 너무 큼

**원인**: 100MB 이상의 파일

**해결책**:
```bash
# 큰 파일 찾기
find . -type f -size +50M

# .gitignore에 추가하거나 Git LFS 사용
git lfs install
git lfs track "*.mp3"
git lfs track "*.mp4"
```

## 추가 Git 명령어

### 상태 확인
```bash
git status
```

### 변경사항 확인
```bash
git diff
```

### 커밋 히스토리
```bash
git log --oneline
```

### 브랜치 관리
```bash
# 새 브랜치 생성
git checkout -b feature/new-feature

# 브랜치 전환
git checkout main

# 브랜치 병합
git merge feature/new-feature
```

## 다음 단계

Git 저장소 설정이 완료되면:

1. ✅ Task 19 완료 체크
2. ➡️ Task 20: Vercel 배포 진행
3. 📝 DEPLOYMENT_GUIDE.md 참조

## 유용한 리소스

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub 가이드](https://guides.github.com/)
- [Git 치트시트](https://education.github.com/git-cheat-sheet-education.pdf)
- [Pro Git 책 (무료)](https://git-scm.com/book/ko/v2)

## 체크리스트

- [ ] Git 설치 확인
- [ ] Git 사용자 정보 설정
- [ ] Git 저장소 초기화 (`git init`)
- [ ] 기본 브랜치를 main으로 설정
- [ ] .gitignore 확인
- [ ] 첫 커밋 생성 (`git commit`)
- [ ] GitHub 저장소 생성
- [ ] 원격 저장소 연결 (`git remote add`)
- [ ] GitHub에 푸시 (`git push`)
- [ ] GitHub에서 파일 확인

완료되면 tasks.md에서 Task 19를 체크하세요! ✅
