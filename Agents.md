# FREELY — AGENTS.md

> Codex 및 개발자가 FREELY 프로젝트를 개발할 때 따라야 하는 개발 규칙

---

# 1. 프로젝트 목적

FREELY는 개인의 금융 계산과 경제적 자유 계획을 돕는 웹 서비스다.

현재 MVP의 핵심은 금융 계산기다.

```text
투자
대출
저축
FIRE
```

---

# 2. 기술 스택

## 기본

* Next.js
* TypeScript
* Tailwind CSS

## UI

* shadcn/ui

## Form

* React Hook Form
* Zod

## Chart

* Recharts

## Test

* Vitest
* Playwright

## 향후

* PostgreSQL
* Supabase
* Prisma

MVP에서는 데이터베이스를 사용하지 않는다.

---

# 3. 가장 중요한 개발 원칙

## 원칙 1. 사람이 읽을 수 있는 코드를 작성한다.

코드의 짧음보다 가독성을 우선한다.

나중에 다른 개발자 또는 프로젝트 관리자가 코드를 직접 수정할 수 있어야 한다.

---

## 원칙 2. 금융 계산과 UI를 분리한다.

잘못된 예:

```tsx
function FireCalculator() {
  const target = monthlyExpense * 12 / 0.04;
}
```

권장:

```text
FireCalculator.tsx
        ↓
calculateFireTarget()
        ↓
FireResult
```

금융 공식은 `lib/calculations/`에 작성한다.

---

# 4. 파일 구조 원칙

```text
app/
```

페이지와 라우팅을 담당한다.

```text
components/
```

화면에서 사용하는 UI 컴포넌트를 담당한다.

```text
lib/calculations/
```

금융 계산 로직을 담당한다.

```text
types/
```

TypeScript 타입을 담당한다.

```text
tests/
```

테스트를 담당한다.

```text
docs/
```

사람이 읽는 프로젝트 문서를 담당한다.

---

# 5. 금융 계산 코드 규칙

모든 금융 계산 함수는 가능한 한 순수 함수로 작성한다.

예:

```ts
export function calculateFireTarget(
  monthlyExpense: number,
  withdrawalRate: number
): number {
  return (monthlyExpense * 12) / withdrawalRate;
}
```

함수 내부에서 UI 상태를 변경하지 않는다.

API 호출을 하지 않는다.

전역 변수를 사용하지 않는다.

---

# 6. 금융 계산에는 주석을 작성한다.

단순한 코드 설명보다는 **왜 이 계산을 사용하는지**를 설명한다.

좋은 주석:

```ts
// FIRE 목표자산은 연간 생활비를 목표 인출률로 나누어 계산한다.
// 예: 연 생활비 3,600만원 / 4% = 9억원
const targetAsset = annualExpense / withdrawalRate;
```

나쁜 주석:

```ts
// targetAsset 계산
const targetAsset = annualExpense / withdrawalRate;
```

주석은 코드 자체로 알 수 없는 내용을 설명한다.

---

# 7. 금융 계산 숫자 규칙

금액은 기본적으로 원(KRW)을 사용한다.

```text
1000000
```

내부 계산값은 숫자로 유지한다.

화면 표시 시에만:

```text
1,000,000원
```

형태로 변환한다.

계산 과정에서 문자열을 사용하지 않는다.

---

# 8. 소수점 처리

금융 계산에서는 중간 계산에서 임의로 반올림하지 않는다.

권장:

```text
입력
 ↓
원본 숫자
 ↓
계산
 ↓
최종 결과
 ↓
화면 표시용 반올림
```

즉, 가능한 한 마지막 단계에서만 표시용 반올림을 수행한다.

---

# 9. 퍼센트 처리

사용자 입력:

```text
7%
```

내부 계산:

```text
0.07
```

형태로 처리한다.

UI와 계산 함수 사이에서 단위를 명확하게 유지한다.

---

# 10. 함수 이름 규칙

계산 함수는 `calculate` 또는 `simulate`로 시작한다.

예:

```text
calculateCompoundInterest()
calculateLoanPayment()
calculateSavings()
calculateFireTarget()
calculateFireProgress()
simulateFire()
```

---

# 11. 계산 함수 하나에는 하나의 책임만 부여한다.

좋지 않은 예:

```text
calculateFireEverything()
```

권장:

```text
calculateFireTarget()
calculateFireProgress()
calculateFireAge()
simulateFire()
```

각 함수의 역할을 명확하게 한다.

---

# 12. UI 컴포넌트 규칙

컴포넌트는 너무 크게 만들지 않는다.

예:

```text
FireCalculator
├── FireInputForm
├── FireResult
├── FireProgress
├── FireSimulation
└── FireChart
```

하나의 파일에 모든 UI를 넣지 않는다.

---

# 13. 주석 규칙

중요한 파일에는 파일 상단에 간단한 설명을 작성한다.

예:

```ts
/**
 * FIRE 계산 관련 순수 함수를 모아둔 파일.
 *
 * UI 컴포넌트에서는 이 파일의 함수를 호출해서 사용한다.
 * 금융 계산 공식은 docs/CALCULATIONS.md에서 관리한다.
 */
```

복잡한 계산에는 단계별 주석을 작성한다.

단, 모든 코드 줄에 주석을 달지는 않는다.

---

# 14. 문서와 코드의 관계

금융 공식의 원본 문서는:

```text
docs/CALCULATIONS.md
```

이다.

코드가 문서와 다른 계산을 수행하는 경우 반드시 확인한다.

공식 변경 시:

```text
CALCULATIONS.md
        ↓
계산 함수
        ↓
테스트
```

순서로 변경한다.

---

# 15. 테스트 규칙

금융 계산 함수는 반드시 테스트한다.

예:

```text
calculateFireTarget()
```

테스트:

```text
300만원 / 4%
→ 9억원
```

경계조건도 테스트한다.

```text
0원
100% 인출률
매우 큰 금액
목표자산과 현재자산이 같은 경우
현재자산이 목표자산보다 큰 경우
```

---

# 16. 테스트가 없는 금융 계산 코드를 완료된 코드로 간주하지 않는다.

새로운 금융 계산 기능을 추가할 때:

```text
1. 공식 확인
2. 함수 작성
3. 테스트 작성
4. 테스트 실행
5. UI 연결
```

순서로 진행한다.

---

# 17. UI와 계산 함수 연결

UI에서 직접 금융 공식을 작성하지 않는다.

잘못된 구조:

```tsx
const result = asset * (1 + rate) ** years;
```

권장:

```tsx
const result = calculateInvestment(...);
```

---

# 18. 새로운 라이브러리 추가

새로운 npm 패키지를 추가하기 전에 반드시 기존 라이브러리로 해결할 수 있는지 확인한다.

불필요한 패키지를 추가하지 않는다.

---

# 19. 기존 코드 수정 원칙

기존 기능을 수정할 때는 필요한 부분만 수정한다.

요청받지 않은 대규모 리팩토링을 하지 않는다.

특히 금융 계산 로직을 수정할 때는 관련 테스트를 먼저 확인한다.

---

# 20. 디자인 원칙

FREELY는 금융 서비스이므로:

* 과도한 애니메이션을 사용하지 않는다.
* 결과 숫자의 가독성을 최우선한다.
* 모바일에서 입력하기 쉽게 만든다.
* 입력 오류를 명확하게 표시한다.
* 계산 결과를 시각적으로 구분한다.

---

# 21. 에러 처리

잘못된 입력을 허용하지 않는다.

예:

```text
음수 투자금
음수 기간
0% 이하가 허용되지 않는 항목
100%를 초과하는 인출률
```

각 입력값의 허용 범위를 명확하게 정의한다.

---

# 22. 금융상품 관련 규칙

금융상품 정보를 향후 추가할 때는:

* 기준일 표시
* 출처 표시
* 데이터 갱신일 표시
* 투자 수익 보장 표현 금지
* 특정 금융상품의 매수 권유 표현 금지

를 기본 원칙으로 한다.

---

# 23. Git 규칙

작업 단위를 작게 commit한다.

예:

```text
feat: add compound interest calculator
feat: add fire target calculation
fix: correct loan monthly payment formula
test: add fire calculation edge cases
docs: update fire calculation formula
refactor: split fire result components
```

---

# 24. Codex 작업 규칙

Codex는 요청받은 범위 안에서만 수정한다.

작업 시작 전에 관련 문서를 읽는다.

최소한 다음을 확인한다.

```text
docs/PRD.md
docs/ROADMAP.md
docs/CALCULATIONS.md
AGENTS.md
```

기능 구현 후:

```text
lint
test
build
```

를 가능한 한 실행한다.

---

# 25. Codex가 임의로 결정하면 안 되는 것

다음 사항은 임의로 변경하지 않는다.

* 금융 계산 공식
* 주요 URL 구조
* DB 구조
* 핵심 UX
* 프로젝트 기술 스택
* MVP 범위

필요한 경우 변경 이유를 먼저 설명한다.

---

# 26. 완료 기준

작업 완료 시 다음 내용을 요약한다.

```text
변경한 파일
구현한 기능
실행한 테스트
테스트 결과
추가로 확인해야 할 사항
```

---

# 27. 유지보수 원칙

FREELY는 Codex가 계속 관리하는 프로젝트가 아니다.

최종적으로 사람이 직접 유지보수할 수 있어야 한다.

따라서:

```text
짧은 코드
명확한 이름
작은 함수
충분한 테스트
적절한 주석
간단한 문서
```

를 우선한다.
