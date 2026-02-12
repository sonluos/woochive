# 배포 전 체크리스트

Vercel에 배포하기 전에 다음 항목들을 확인하세요.

## 📋 필수 체크리스트

### 1. 코드 품질
- [ ] 모든 TypeScript 에러 해결
- [ ] ESLint 경고 확인 및 수정
- [ ] 콘솔 에러 및 경고 제거
- [ ] 사용하지 않는 코드 제거

```bash
# 확인 명령어
npm run lint
npm run build
```

### 2. 테스트
- [ ] 모든 테스트 통과
- [ ] 주요 기능 수동 테스트

```bash
npm run test
```

### 3. 환경 설정
- [ ] `.env.example` 파일 확인
- [ ] 민감한 정보가 코드에 하드코딩되지 않았는지 확인
- [ ] 관리자 비밀번호 변경 완료

### 4. 데이터 파일
- [ ] `public/data/` 폴더의 모든 JSON 파일 확인
- [ ] 샘플 데이터를 실제 데이터로 교체
- [ ] JSON 형식 유효성 검사

```bash
# JSON 유효성 검사 (macOS/Linux)
for file in public/data/*.json; do
  echo "Checking $file..."
  python3 -m json.tool "$file" > /dev/null && echo "✓ Valid" || echo "✗ Invalid"
done
```

### 5. 미디어 파일
- [ ] 이미지 파일 최적화 (압축)
- [ ] 이미지 경로 확인 (`/images/...`)
- [ ] 오디오 파일 경로 확인 (`/audio/...`)
- [ ] PDF 파일 경로 확인 (`/pdfs/...`)
- [ ] 파일 크기 확인 (각 파일 < 10MB 권장)

### 6. SEO 및 메타데이터
- [ ] `index.html`의 메타 태그 확인
- [ ] `title` 및 `description` 업데이트
- [ ] Open Graph 이미지 준비 (`/og-image.jpg`)
- [ ] `robots.txt` 확인
- [ ] `sitemap.xml` 날짜 업데이트

### 7. 보안
- [ ] 관리자 비밀번호 변경 (`src/contexts/AuthContext.tsx`)
- [ ] API 키 및 비밀 정보 환경 변수로 이동
- [ ] CORS 설정 확인 (필요한 경우)
- [ ] 보안 헤더 설정 확인 (`vercel.json`)

### 8. 성능
- [ ] 이미지 레이지 로딩 적용 확인
- [ ] 불필요한 의존성 제거
- [ ] 번들 크기 확인

```bash
npm run build
# dist 폴더 크기 확인
du -sh dist
```

### 9. Git 저장소
- [ ] 모든 변경사항 커밋
- [ ] `.gitignore` 확인
- [ ] GitHub에 푸시 완료
- [ ] README.md 업데이트

```bash
git status
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 10. Vercel 설정
- [ ] `vercel.json` 파일 확인
- [ ] 빌드 명령어 확인
- [ ] 출력 디렉토리 확인 (`dist`)
- [ ] 환경 변수 목록 준비

## 🧪 로컬 테스트

배포 전 로컬에서 프로덕션 빌드를 테스트하세요:

```bash
# 1. 프로덕션 빌드
npm run build

# 2. 빌드 미리보기
npm run preview

# 3. 브라우저에서 http://localhost:4173 접속

# 4. 모든 기능 테스트
```

### 테스트 항목:
- [ ] 홈페이지 로딩
- [ ] 모든 페이지 네비게이션
- [ ] 검색 기능
- [ ] 필터링 기능
- [ ] 상세 페이지 접근
- [ ] 관리자 로그인
- [ ] 404 페이지
- [ ] 모바일 반응형
- [ ] 브라우저 콘솔 에러 확인

## 📊 성능 체크

### Lighthouse 점수 확인

1. Chrome DevTools 열기 (F12)
2. "Lighthouse" 탭 선택
3. "Generate report" 클릭
4. 목표 점수:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

### 번들 크기 분석

```bash
# 번들 분석 (선택적)
npm install -D rollup-plugin-visualizer
```

## 🔍 최종 확인

### 코드 리뷰
- [ ] 하드코딩된 URL 제거
- [ ] 개발용 콘솔 로그 제거
- [ ] TODO 주석 확인
- [ ] 주석 정리

### 문서
- [ ] README.md 완성도 확인
- [ ] 설치 가이드 정확성 확인
- [ ] 라이선스 파일 추가 (선택적)

### 브라우저 호환성
- [ ] Chrome 테스트
- [ ] Firefox 테스트
- [ ] Safari 테스트 (macOS)
- [ ] Edge 테스트 (Windows)
- [ ] 모바일 브라우저 테스트

## ⚠️ 주의사항

### 배포 전 반드시 확인:

1. **비밀번호 변경**
   ```typescript
   // src/contexts/AuthContext.tsx
   const ADMIN_PASSWORD = 'woochive2024'; // ← 이것을 변경하세요!
   ```

2. **환경 변수**
   - Vercel 대시보드에서 설정 필요
   - 로컬 `.env` 파일은 배포되지 않음

3. **데이터 백업**
   - `public/data/` 폴더 백업
   - Git 히스토리 확인

4. **도메인 설정**
   - 커스텀 도메인 사용 시 DNS 설정 준비

## 📝 배포 후 할 일

배포가 완료되면:

1. [ ] 배포 URL 확인
2. [ ] 모든 페이지 동작 확인
3. [ ] 관리자 로그인 테스트
4. [ ] 성능 모니터링 설정
5. [ ] Google Analytics 연동 (선택적)
6. [ ] 소셜 미디어 공유

## 🚀 배포 명령어

모든 체크리스트를 완료했다면:

### Vercel 웹사이트 사용:
1. [Vercel](https://vercel.com) 로그인
2. "New Project" 클릭
3. GitHub 저장소 import
4. "Deploy" 클릭

### Vercel CLI 사용:
```bash
# 로그인
npm run vercel:login

# 프리뷰 배포
npm run deploy:preview

# 프로덕션 배포
npm run deploy:prod
```

## ✅ 완료!

모든 항목을 체크했다면 배포할 준비가 되었습니다!

다음 문서를 참조하세요:
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - 상세 배포 가이드
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 전체 배포 프로세스

행운을 빕니다! 🎉
