# 커스텀 도메인 설정 가이드

## 도메인 정보
- **도메인**: woochive.me
- **현재 Vercel URL**: https://woochive.vercel.app
- **목표**: woochive.me와 www.woochive.me 모두 연결

---

## Step 1: Vercel에 도메인 추가

### 1.1 Vercel 대시보드 접속
1. https://vercel.com/sonluos-projects/woochive 접속
2. "Settings" 탭 클릭
3. 왼쪽 메뉴에서 "Domains" 클릭

### 1.2 도메인 추가
1. "Add" 버튼 클릭
2. 다음 도메인들을 하나씩 추가:
   - `woochive.me` (루트 도메인)
   - `www.woochive.me` (www 서브도메인)

---

## Step 2: DNS 설정

도메인을 구매한 곳(도메인 등록 업체)에서 DNS 레코드를 설정해야 해요.

### 2.1 도메인 등록 업체 로그인
- GoDaddy, Namecheap, Gabia, Cafe24 등 도메인을 구매한 곳에 로그인
- DNS 관리 또는 네임서버 설정 페이지로 이동

### 2.2 DNS 레코드 추가

#### 방법 1: A 레코드 사용 (권장)

**루트 도메인 (woochive.me):**
```
Type: A
Name: @ (또는 비워두기)
Value: 76.76.21.21
TTL: 3600 (또는 자동)
```

**www 서브도메인 (www.woochive.me):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (또는 자동)
```

#### 방법 2: CNAME 레코드 사용 (일부 제공업체)

일부 도메인 제공업체는 루트 도메인에 CNAME을 지원합니다:

**루트 도메인 (woochive.me):**
```
Type: CNAME
Name: @ (또는 비워두기)
Value: cname.vercel-dns.com
TTL: 3600 (또는 자동)
```

**www 서브도메인 (www.woochive.me):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (또는 자동)
```

---

## Step 3: DNS 전파 대기

DNS 설정 후 전파까지 시간이 걸립니다:
- **최소**: 5-10분
- **평균**: 1-2시간
- **최대**: 48시간

### DNS 전파 확인 방법

#### 방법 1: 온라인 도구
- https://dnschecker.org
- 도메인 입력: `woochive.me`
- 레코드 타입: A 또는 CNAME
- 전 세계 DNS 서버에서 전파 상태 확인

#### 방법 2: 터미널 명령어 (macOS/Linux)
```bash
# A 레코드 확인
dig woochive.me

# CNAME 레코드 확인
dig www.woochive.me

# 또는 nslookup 사용
nslookup woochive.me
nslookup www.woochive.me
```

---

## Step 4: Vercel에서 도메인 확인

### 4.1 도메인 상태 확인
1. Vercel 대시보드 → Settings → Domains
2. 추가한 도메인 상태 확인:
   - ✅ **Valid Configuration**: 설정 완료
   - ⏳ **Pending**: DNS 전파 대기 중
   - ❌ **Invalid Configuration**: DNS 설정 오류

### 4.2 SSL 인증서 자동 발급
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- 보통 몇 분 내에 완료
- HTTPS 자동 활성화

---

## Step 5: 리디렉션 설정 (선택)

### www → non-www 리디렉션
`www.woochive.me` → `woochive.me`로 자동 리디렉션하려면:

1. Vercel 대시보드 → Settings → Domains
2. `woochive.me` 옆의 "Edit" 클릭
3. "Redirect www.woochive.me to woochive.me" 체크

### non-www → www 리디렉션
`woochive.me` → `www.woochive.me`로 자동 리디렉션하려면:

1. Vercel 대시보드 → Settings → Domains
2. `www.woochive.me` 옆의 "Edit" 클릭
3. "Redirect woochive.me to www.woochive.me" 체크

---

## 도메인 제공업체별 설정 가이드

### GoDaddy
1. 내 제품 → 도메인 → DNS 관리
2. 레코드 추가
3. 위의 DNS 레코드 입력

### Namecheap
1. Domain List → Manage → Advanced DNS
2. Add New Record
3. 위의 DNS 레코드 입력

### Gabia (가비아)
1. My가비아 → 도메인 → DNS 정보
2. 레코드 추가
3. 위의 DNS 레코드 입력

### Cafe24
1. 나의 서비스 관리 → 도메인 관리
2. DNS 설정
3. 위의 DNS 레코드 입력

### Cloudflare (DNS 사용 시)
1. DNS → Records
2. Add record
3. 위의 DNS 레코드 입력
4. Proxy status: DNS only (회색 구름)

---

## 문제 해결

### 문제 1: "Invalid Configuration" 오류

**원인**: DNS 레코드가 올바르게 설정되지 않음

**해결책**:
1. DNS 레코드 다시 확인
2. A 레코드 값: `76.76.21.21`
3. CNAME 레코드 값: `cname.vercel-dns.com`
4. 레코드 이름 확인 (@ 또는 www)
5. 기존 충돌하는 레코드 삭제

### 문제 2: DNS 전파가 너무 오래 걸림

**원인**: TTL 값이 너무 높거나 캐시 문제

**해결책**:
1. TTL을 300 (5분)으로 낮추기
2. DNS 캐시 플러시:
   ```bash
   # macOS
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   ```
3. 시크릿 모드에서 테스트

### 문제 3: SSL 인증서 발급 실패

**원인**: DNS가 완전히 전파되지 않음

**해결책**:
1. DNS 전파 완료 대기
2. Vercel 대시보드에서 "Refresh" 클릭
3. 여전히 실패하면 도메인 제거 후 다시 추가

### 문제 4: 일부 지역에서만 작동

**원인**: DNS 전파가 일부 지역에서만 완료됨

**해결책**:
1. 더 기다리기 (최대 48시간)
2. https://dnschecker.org 에서 전파 상태 확인

---

## 확인 체크리스트

설정 완료 후 다음을 확인하세요:

- [ ] https://woochive.me 접속 가능
- [ ] https://www.woochive.me 접속 가능
- [ ] HTTPS 자동 적용 (자물쇠 아이콘)
- [ ] HTTP → HTTPS 자동 리디렉션
- [ ] 모든 페이지 정상 작동
- [ ] 관리자 로그인 가능
- [ ] 모바일에서도 접속 가능

---

## 최종 결과

설정이 완료되면:

- ✅ **메인 도메인**: https://woochive.me
- ✅ **www 도메인**: https://www.woochive.me
- ✅ **Vercel 도메인**: https://woochive.vercel.app (여전히 작동)
- ✅ **SSL 인증서**: 자동 발급 및 갱신
- ✅ **HTTPS**: 자동 적용

---

## 추가 설정 (선택)

### 이메일 설정
도메인으로 이메일을 받으려면:
1. Google Workspace, Zoho Mail 등 이메일 서비스 가입
2. MX 레코드 추가
3. 이메일 계정 생성

### 서브도메인 추가
추가 서브도메인이 필요하면:
```
Type: CNAME
Name: blog (또는 원하는 이름)
Value: cname.vercel-dns.com
```

---

## 유용한 링크

- **Vercel 도메인 문서**: https://vercel.com/docs/concepts/projects/custom-domains
- **DNS 전파 확인**: https://dnschecker.org
- **SSL 테스트**: https://www.ssllabs.com/ssltest/

---

## 지원

문제가 발생하면:
1. Vercel 지원: https://vercel.com/support
2. 도메인 제공업체 고객센터
3. DNS 설정 재확인

---

축하합니다! 커스텀 도메인 설정이 완료되면 https://woochive.me 에서 포트폴리오를 확인할 수 있습니다! 🎉
