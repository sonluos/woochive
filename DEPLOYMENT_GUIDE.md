# 배포 완료 가이드

## 🎉 배포 성공!

Woochive 포트폴리오 웹사이트가 성공적으로 배포되었습니다.

## 배포 정보

- **Production URL**: https://woochive.vercel.app
- **Vercel 대시보드**: https://vercel.com/sonluos-projects/woochive
- **GitHub 저장소**: https://github.com/sonluos/woochive
- **배포 날짜**: 2026년 2월 12일

## 배포된 기능

### 주요 페이지
- ✅ Home (홈페이지) - 최근 6개 항목 표시
- ✅ About (소개) - 자기소개 및 수강 과목
- ✅ Projects (프로젝트) - 연구 프로젝트 목록
- ✅ Music (음악) - 음악 작업물 목록
- ✅ Publications (출판물) - 논문 및 출판물

### 핵심 기능
- ✅ 태그 필터링
- ✅ 검색 기능
- ✅ 상세 페이지
- ✅ 관련 항목 추천
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다크 모드 지원
- ✅ 이미지 레이지 로딩
- ✅ SEO 최적화

### 관리자 기능
- ✅ 관리자 로그인 (/admin/login)
- ✅ 관리자 대시보드 (/admin)
- ✅ 프로젝트 편집 (/admin/projects)
- ✅ 음악 편집 (/admin/music)
- ✅ JSON 다운로드 기능

## 사용 방법

### 1. 웹사이트 접속
```
https://woochive.vercel.app
```

### 2. 관리자 로그인
```
URL: https://woochive.vercel.app/admin/login
기본 비밀번호: woochive2024
```

⚠️ **보안 주의**: 프로덕션 환경에서는 반드시 비밀번호를 변경하세요!

### 3. 콘텐츠 편집
1. 관리자 로그인
2. 대시보드에서 편집할 섹션 선택
3. 항목 추가/수정/삭제
4. "Download JSON" 버튼 클릭
5. 다운로드된 JSON 파일을 `public/data/` 폴더에 업로드
6. GitHub에 커밋 및 푸시
7. Vercel이 자동으로 재배포

## 자동 배포 설정

GitHub에 푸시하면 Vercel이 자동으로 배포합니다:

```bash
# 변경사항 커밋
git add .
git commit -m "Update content"

# GitHub에 푸시
git push origin main

# Vercel이 자동으로 배포 시작 (약 1-2분 소요)
```

## 수동 배포 (필요시)

### Vercel CLI 사용
```bash
cd woochive

# 프리뷰 배포
npm run deploy:preview

# 프로덕션 배포
npm run deploy:prod
```

### Vercel 웹사이트 사용
1. https://vercel.com/sonluos-projects/woochive 접속
2. "Deployments" 탭
3. "Redeploy" 버튼 클릭

## 환경 변수 설정

Vercel 대시보드에서 환경 변수를 설정할 수 있습니다:

1. https://vercel.com/sonluos-projects/woochive/settings/environment-variables
2. 변수 추가:
   - `VITE_ADMIN_PASSWORD`: 관리자 비밀번호

## 커스텀 도메인 연결 (선택)

1. Vercel 대시보드 → Settings → Domains
2. 도메인 추가 (예: woochive.me)
3. DNS 설정:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. DNS 전파 대기 (최대 48시간)
5. SSL 인증서 자동 발급

## 성능 모니터링

### Vercel Analytics
1. Vercel 대시보드 → Analytics
2. 방문자 통계 확인
3. Core Web Vitals 모니터링

### 성능 최적화 팁
- 이미지는 WebP 형식 사용
- 각 이미지 크기 < 500KB 권장
- JSON 파일 크기 최소화
- 불필요한 데이터 제거

## 문제 해결

### 404 에러 (페이지 새로고침 시)
- `vercel.json`의 rewrites 설정 확인
- 이미 설정되어 있음 ✅

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인 및 수정
npm run build:check
```

### 환경 변수 적용 안 됨
1. Vercel 대시보드에서 환경 변수 확인
2. "Redeploy" 클릭하여 재배포

### 이미지 로딩 실패
- 이미지 경로가 `/images/...` 형식인지 확인
- `public/` 폴더에 이미지가 있는지 확인
- 대소문자 정확히 일치하는지 확인

## 백업 및 복구

### 데이터 백업
```bash
# JSON 파일 백업
cp -r public/data ~/backup/data-$(date +%Y%m%d)
```

### 이전 버전으로 롤백
1. Vercel 대시보드 → Deployments
2. 이전 배포 선택
3. "Promote to Production" 클릭

## 유용한 링크

- **Production URL**: https://woochive.vercel.app
- **Vercel 대시보드**: https://vercel.com/sonluos-projects/woochive
- **GitHub 저장소**: https://github.com/sonluos/woochive
- **Vercel 문서**: https://vercel.com/docs
- **Vite 문서**: https://vitejs.dev

## 다음 단계

1. ✅ 배포 완료
2. 🔍 웹사이트 테스트 (https://woochive.vercel.app)
3. 🔐 관리자 비밀번호 변경
4. 📝 실제 콘텐츠로 교체
5. 🎨 디자인 커스터마이징 (선택)
6. 🌐 커스텀 도메인 연결 (선택)
7. 📊 Analytics 설정 (선택)

## 지원

문제가 발생하면:
1. [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)
2. [Vercel 지원](https://vercel.com/support)
3. GitHub Issues

---

축하합니다! 🎉 Woochive 포트폴리오 웹사이트가 성공적으로 배포되었습니다!
