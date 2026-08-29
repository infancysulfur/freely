# ROADMAP.md

# FREELY 개발 로드맵

> 목표: 금융 계산기를 시작으로 경제적 자유를 관리할 수 있는 개인 금융 서비스로 확장한다.

---

# Phase 0 — 기획

상태: 완료

* [x] 서비스 컨셉 정의
* [x] MVP 범위 정의
* [x] 주요 계산기 정의
* [x] FIRE 계산기 방향 정의
* [x] 기술 스택 정의
* [x] 프로젝트 문서 작성

---

# Phase 1 — 프로젝트 기본 구조

상태: 진행 예정

* [ ] Next.js 프로젝트 생성
* [ ] TypeScript 설정
* [ ] Tailwind CSS 설정
* [ ] shadcn/ui 설정
* [ ] ESLint 설정
* [ ] Vitest 설정
* [ ] Playwright 설정
* [ ] GitHub 연결
* [ ] 기본 Layout 구현
* [ ] Header 구현
* [ ] Footer 구현

완료 조건:

```text
npm run lint
npm run test
npm run build
```

가 정상적으로 실행되어야 한다.

---

# Phase 2 — 디자인 시스템

상태: 진행 예정

* [ ] Button
* [ ] Input
* [ ] Select
* [ ] Card
* [ ] Result Card
* [ ] Number Input
* [ ] Percentage Input
* [ ] Currency Input
* [ ] Calculator Layout
* [ ] Error Message
* [ ] Loading 상태

---

# Phase 3 — 계산 엔진

상태: 진행 예정

## 투자

* [ ] 복리 계산
* [ ] 적립식 투자 계산
* [ ] 목표금액 계산
* [ ] 배당금 계산

## 대출

* [ ] 원리금균등
* [ ] 원금균등
* [ ] 만기일시

## 저축

* [ ] 예금
* [ ] 적금

## FIRE

* [ ] FIRE 목표자산
* [ ] FIRE 달성률
* [ ] FIRE 예상시점
* [ ] FIRE 시뮬레이션

---

# Phase 4 — 계산기 화면

상태: 진행 예정

개발 순서:

```text
1. 복리
2. 예금
3. 적금
4. 대출
5. 투자
6. FIRE
```

각 계산기는 다음 구조를 기본으로 한다.

```text
입력
 ↓
계산
 ↓
결과
 ↓
상세 설명
 ↓
관련 계산기
```

---

# Phase 5 — FIRE 핵심 기능

상태: 진행 예정

* [ ] FIRE 입력 화면
* [ ] 목표자산 결과
* [ ] FIRE 달성률
* [ ] 남은 자산
* [ ] 예상 FIRE 나이
* [ ] 자산 성장 그래프
* [ ] 월 투자금 시뮬레이션
* [ ] 수익률 시뮬레이션
* [ ] 생활비 시뮬레이션
* [ ] FIRE 레버리지 분석

---

# Phase 6 — 품질

상태: 진행 예정

* [ ] 모든 계산 함수 Unit Test
* [ ] 주요 계산기 E2E Test
* [ ] 모바일 테스트
* [ ] Chrome 테스트
* [ ] Edge 테스트
* [ ] 입력값 오류 검증
* [ ] 접근성 기본 점검
* [ ] 성능 점검

---

# Phase 7 — SEO

상태: 진행 예정

* [ ] 메타 title
* [ ] 메타 description
* [ ] Open Graph
* [ ] sitemap
* [ ] robots.txt
* [ ] canonical
* [ ] 구조화 데이터 검토

주요 SEO 페이지:

```text
/ calculators
/ calculators/investment/compound
/ calculators/investment/target
/ calculators/investment/dividend
/ calculators/loan
/ calculators/savings
/ calculators/fire
```

---

# Phase 8 — MVP 배포

상태: 진행 예정

* [ ] GitHub repository
* [ ] Vercel 연결
* [ ] Production build
* [ ] Production 테스트
* [ ] 도메인 연결
* [ ] Analytics
* [ ] 오류 모니터링

---

# Phase 9 — 금융상품

상태: 향후

* [ ] 예금 데이터
* [ ] 적금 데이터
* [ ] ETF 데이터
* [ ] 배당주 데이터
* [ ] 채권 데이터
* [ ] 금융상품 검색
* [ ] 금융상품 비교
* [ ] 데이터 기준일 표시

---

# Phase 10 — 개인 금융관리

상태: 향후

* [ ] 회원가입
* [ ] 로그인
* [ ] 자산 등록
* [ ] 부채 등록
* [ ] 수입 관리
* [ ] 지출 관리
* [ ] 투자 관리
* [ ] FIRE 목표 저장

---

# Phase 11 — 개인 금융 Dashboard

상태: 향후

```text
총자산
순자산
월 수입
월 지출
월 저축액
투자자산
FIRE 달성률
예상 FIRE 나이
```

---

# Phase 12 — 고도화

상태: 장기

* [ ] 금융상품 자동 업데이트
* [ ] 자산 변화 분석
* [ ] FIRE 시나리오 비교
* [ ] 투자 목표 관리
* [ ] 금융 리포트
* [ ] AI 금융 코치
* [ ] 개인화 추천

---

# 개발 우선순위 원칙

기능을 추가할 때 다음 순서로 판단한다.

```text
정확성
 ↓
사용성
 ↓
유지보수성
 ↓
SEO
 ↓
확장성
```

기능 수를 늘리는 것보다 기존 기능의 정확성과 사용성을 먼저 개선한다.

---

