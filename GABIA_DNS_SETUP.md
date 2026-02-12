# 가비아 DNS 설정 가이드

## 도메인: woochive.me

---

## Step 1: Vercel에 도메인 추가

### 1.1 Vercel 대시보드 접속
1. https://vercel.com/sonluos-projects/woochive/settings/domains 접속
2. "Add" 버튼 클릭

### 1.2 도메인 추가
다음 도메인들을 하나씩 추가:

**첫 번째 도메인:**
```
woochive.me
```
입력 후 "Add" 클릭

**두 번째 도메인:**
```
www.woochive.me
```
입력 후 "Add" 클릭

Vercel이 DNS 설정 방법을 보여줄 거야. 이제 가비아로 가자!

---

## Step 2: 가비아 DNS 설정

### 2.1 가비아 로그인
1. https://www.gabia.com 접속
2. 로그인
3. 상단 메뉴 "My가비아" 클릭

### 2.2 도메인 관리 페이지 이동
1. 왼쪽 메뉴에서 "서비스 관리" 클릭
2. "도메인" 섹션 찾기
3. `woochive.me` 도메인 찾기
4. "관리" 또는 "DNS 정보" 버튼 클릭

### 2.3 DNS 관리 페이지 접속
1. "DNS 관리" 또는 "DNS 설정" 탭 클릭
2. "레코드 수정" 버튼 클릭

---

## Step 3: DNS 레코드 추가

### 3.1 기존 레코드 확인
먼저 기존에 있는 레코드를 확인해:
- 기본적으로 A 레코드나 CNAME 레코드가 있을 수 있어
- 충돌하는 레코드는 삭제하거나 수정해야 해

### 3.2 A 레코드 추가 (루트 도메인)

**"레코드 추가" 또는 "+" 버튼 클릭 후:**

```
타입(Type): A
호스트(Host): @ (또는 비워두기)
값/IP 주소(Value): 76.76.21.21
TTL: 3600 (기본값 사용)
```

**입력 예시:**
- 타입: `A`
- 호스트: `@`
- 값: `76.76.21.21`
- TTL: `3600` (또는 1시간)

"추가" 또는 "저장" 버튼 클릭

### 3.3 CNAME 레코드 추가 (www 서브도메인)

**다시 "레코드 추가" 또는 "+" 버튼 클릭 후:**

```
타입(Type): CNAME
호스트(Host): www
값/대상(Value): cname.vercel-dns.com.
TTL: 3600 (기본값 사용)
```

**입력 예시:**
- 타입: `CNAME`
- 호스트: `www`
- 값: `cname.vercel-dns.com.` ← **끝에 점(.) 필수!**
- TTL: `3600` (또는 1시간)

"추가" 또는 "저장" 버튼 클릭

### 3.4 최종 저장
- 모든 변경사항 저장
- "적용" 또는 "확인" 버튼 클릭

---

## Step 4: 최종 DNS 레코드 확인

설정 완료 후 다음과 같이 보여야 해:

| 타입 | 호스트 | 값/IP 주소 | TTL |
|------|---------|------------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com. | 3600 |

⚠️ **주의**: CNAME 값 끝에 점(.)이 있어야 합니다!

---

## Step 5: DNS 전파 대기

### 5.1 전파 시간
- **최소**: 5-10분
- **평균**: 30분-1시간
- **최대**: 24-48시간

### 5.2 전파 상태 확인

**방법 1: 온라인 도구**
1. https://dnschecker.org 접속
2. 도메인 입력: `woochive.me`
3. 레코드 타입: `A`
4. "Search" 클릭
5. 전 세계 DNS 서버에서 `76.76.21.21`이 보이면 전파 완료

**방법 2: 터미널 (macOS)**
```bash
# A 레코드 확인
dig woochive.me

# CNAME 레코드 확인
dig www.woochive.me

# 또는
nslookup woochive.me
nslookup www.woochive.me
```

---

## Step 6: Vercel에서 확인

### 6.1 도메인 상태 확인
1. https://vercel.com/sonluos-projects/woochive/settings/domains 접속
2. 추가한 도메인 상태 확인:
   - ✅ **Valid Configuration**: 설정 완료!
   - ⏳ **Pending**: DNS 전파 대기 중
   - ❌ **Invalid Configuration**: DNS 설정 오류

### 6.2 SSL 인증서 자동 발급
- DNS 전파가 완료되면 Vercel이 자동으로 SSL 인증서 발급
- 보통 5-10분 내에 완료
- HTTPS 자동 활성화

---

## Step 7: 리디렉션 설정 (선택)

### www → non-www 리디렉션 (권장)
`www.woochive.me` → `woochive.me`로 자동 리디렉션:

1. Vercel 대시보드 → Settings → Domains
2. `woochive.me` 도메인 찾기
3. 오른쪽 "..." 메뉴 클릭
4. "Edit" 선택
5. "Redirect www.woochive.me to woochive.me" 체크
6. "Save" 클릭

---

## 가비아 특이사항

### 네임서버 확인
가비아에서 네임서버가 가비아 기본 네임서버로 설정되어 있는지 확인:
```
ns.gabia.co.kr
ns1.gabia.co.kr
ns2.gabia.co.kr
```

다른 네임서버(예: Cloudflare)를 사용 중이라면 해당 서비스에서 DNS 설정해야 해.

### DNS 관리 권한
- 도메인 소유자만 DNS 설정 가능
- 부계정이라면 권한 확인 필요

---

## 문제 해결

### 문제 1: "레코드를 추가할 수 없습니다"

**원인**: 기존 레코드와 충돌

**해결책**:
1. 기존 A 레코드 또는 CNAME 레코드 삭제
2. 특히 `@` 호스트의 A 레코드 확인
3. `www` 호스트의 CNAME 레코드 확인

### 문제 2: "Invalid Configuration" 오류 (Vercel)

**원인**: DNS 레코드가 올바르게 설정되지 않음

**해결책**:
1. 가비아에서 DNS 레코드 다시 확인
2. A 레코드 값: `76.76.21.21` (정확히 입력)
3. CNAME 레코드 값: `cname.vercel-dns.com.` ← **끝에 점(.) 필수!**
4. 호스트 이름 확인 (@ 또는 www)

### 문제 3: DNS 전파가 너무 오래 걸림

**원인**: TTL 값이 높거나 캐시 문제

**해결책**:
1. TTL을 300 (5분)으로 낮추기
2. 브라우저 캐시 삭제
3. 시크릿 모드에서 테스트
4. DNS 캐시 플러시:
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

### 문제 4: 일부 페이지만 작동

**원인**: DNS 전파가 완전히 완료되지 않음

**해결책**:
1. 더 기다리기 (최대 24시간)
2. https://dnschecker.org 에서 전파 상태 확인
3. 모든 지역에서 전파 완료될 때까지 대기

---

## 확인 체크리스트

모든 설정이 완료되면:

- [ ] 가비아 DNS 레코드 추가 완료
  - [ ] A 레코드: @ → 76.76.21.21
  - [ ] CNAME 레코드: www → cname.vercel-dns.com. (끝에 점!)
- [ ] Vercel 도메인 상태: Valid Configuration
- [ ] https://woochive.me 접속 가능
- [ ] https://www.woochive.me 접속 가능
- [ ] HTTPS 자동 적용 (자물쇠 아이콘)
- [ ] HTTP → HTTPS 자동 리디렉션
- [ ] 모든 페이지 정상 작동
- [ ] 관리자 로그인 가능 (https://woochive.me/admin/login)

---

## 최종 결과

설정이 완료되면:

- ✅ **메인 도메인**: https://woochive.me
- ✅ **www 도메인**: https://www.woochive.me
- ✅ **Vercel 도메인**: https://woochive.vercel.app (여전히 작동)
- ✅ **SSL 인증서**: Let's Encrypt (자동 발급 및 갱신)
- ✅ **HTTPS**: 강제 적용
- ✅ **리디렉션**: www → non-www (설정한 경우)

---

## 가비아 고객센터

문제가 발생하면:
- **전화**: 1544-4755
- **이메일**: help@gabia.com
- **채팅**: 가비아 웹사이트 우측 하단
- **운영시간**: 평일 09:00-18:00

---

## 다음 단계

도메인 설정이 완료되면:

1. ✅ Task 22 완료 체크
2. 🎉 프로젝트 완전 완료!
3. 🌐 https://woochive.me 에서 포트폴리오 확인
4. 📱 소셜 미디어에 공유
5. 🔐 관리자 비밀번호 변경 (중요!)

---

축하합니다! 커스텀 도메인 설정이 완료되면 https://woochive.me 에서 포트폴리오를 확인할 수 있습니다! 🎉
