# Admin 기능 테스트 가이드

## 🔧 수정 완료 사항

### 1. dataLoader.ts 수정
- localStorage 확인 로직 추가
- Admin에서 저장한 데이터를 모든 페이지에서 로드하도록 수정
- 콘솔 로그 추가로 어디서 데이터를 로드하는지 확인 가능

### 2. api.ts 수정
- 모든 CRUD 메서드 구현 (create, update, delete)
- localStorage에 데이터 저장

## 🧪 테스트 방법

### 방법 1: 개발 서버로 테스트 (권장)

1. **개발 서버 시작**
   ```bash
   npm run dev
   ```

2. **브라우저 개발자 도구 열기** (F12)
   - Console 탭 열기
   - localStorage 확인: Application > Local Storage

3. **Admin 로그인**
   - http://localhost:5173/admin/login 접속
   - 로그인

4. **데이터 수정 테스트**
   - Projects 관리 페이지로 이동
   - 새 프로젝트 추가 또는 기존 프로젝트 수정
   - 저장 버튼 클릭
   - 콘솔에서 "저장되었습니다!" 메시지 확인

5. **반영 확인**
   - Projects 페이지로 이동 (http://localhost:5173/projects)
   - 콘솔에서 "Loading portfolio_projects from localStorage" 메시지 확인
   - 변경사항이 표시되는지 확인

6. **새로고침 테스트**
   - F5로 페이지 새로고침
   - 변경사항이 유지되는지 확인

### 방법 2: 테스트 페이지로 확인

1. **개발 서버 시작**
   ```bash
   npm run dev
   ```

2. **테스트 페이지 접속**
   - http://localhost:5173/test-admin.html

3. **localStorage 테스트**
   - "저장된 데이터 확인" 버튼 클릭
   - 프로젝트 추가 테스트
   - Bio 수정 테스트
   - 데이터 로드 테스트

## 🔍 문제 해결

### 여전히 반영이 안 된다면?

1. **브라우저 캐시 완전 삭제**
   ```
   Chrome: Ctrl+Shift+Delete
   - "전체 기간" 선택
   - "캐시된 이미지 및 파일" 체크
   - "데이터 삭제"
   ```

2. **localStorage 수동 확인**
   - F12 > Application > Local Storage > http://localhost:5173
   - `portfolio_projects`, `portfolio_bio` 등의 키가 있는지 확인

3. **콘솔 로그 확인**
   - F12 > Console
   - "Loading ... from localStorage" 또는 "Loading ... from static files" 메시지 확인
   - 에러 메시지가 있는지 확인

4. **개발 서버 재시작**
   ```bash
   # 서버 중지 (Ctrl+C)
   npm run dev
   ```

5. **빌드 후 프리뷰**
   ```bash
   npm run build
   npm run preview
   ```

## 📋 체크리스트

- [ ] 개발 서버가 실행 중인가?
- [ ] 브라우저 캐시를 삭제했는가?
- [ ] Admin 페이지에서 저장 시 "저장되었습니다!" 메시지가 나타나는가?
- [ ] 콘솔에 에러가 없는가?
- [ ] localStorage에 데이터가 저장되어 있는가?
- [ ] 페이지 새로고침 후에도 변경사항이 유지되는가?

## 🎯 예상 동작

### 정상 동작 시나리오

1. **Admin에서 프로젝트 추가**
   - 저장 버튼 클릭
   - Alert: "저장되었습니다!"
   - localStorage에 `portfolio_projects` 키로 저장됨

2. **Projects 페이지 접속**
   - Console: "Loading portfolio_projects from localStorage"
   - 새로 추가한 프로젝트가 표시됨

3. **페이지 새로고침**
   - 변경사항 유지됨
   - localStorage에서 계속 로드됨

4. **데이터 초기화**
   - Admin 대시보드 > "데이터 초기화" 버튼
   - localStorage 삭제됨
   - 원본 JSON 파일에서 로드됨

## 💡 주의사항

- **localStorage는 브라우저별로 독립적**
  - Chrome에서 수정한 내용은 Firefox에서 보이지 않음
  - 시크릿 모드에서는 별도의 localStorage 사용

- **개발 서버 재시작 필요 없음**
  - 코드 수정 후 자동으로 핫 리로드됨
  - 단, 처음 서버 시작은 필요

- **프로덕션 배포 시**
  - localStorage는 클라이언트에만 저장됨
  - 실제 JSON 파일은 변경되지 않음
  - 영구적 변경은 JSON 파일 직접 수정 필요
