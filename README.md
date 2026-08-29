# FREELY

FREELY는 개인의 금융 계산과 경제적 자유 계획을 돕는 웹 기반 개인 금융 서비스입니다.

현재 단계는 초기 Next.js 프로젝트 구조 생성이며, 실제 금융 계산기 기능은 아직 구현하지 않습니다.

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Recharts
- Vitest
- Playwright

## 폴더 구조

```text
app/                  Next.js App Router 페이지와 레이아웃
components/           화면과 공통 UI 컴포넌트
components/layout/    Header, Footer 같은 레이아웃 컴포넌트
components/ui/        shadcn/ui 기반 공통 UI 컴포넌트
lib/                  공통 유틸리티와 향후 계산 로직
lib/calculations/     금융 계산 순수 함수 위치
types/                프로젝트 공통 TypeScript 타입
tests/                Vitest 테스트와 Playwright E2E 테스트
docs/                 프로젝트 기준 문서
```

## 개발 명령어

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run test:e2e
```

## 현재 범위

- 기본 app layout
- 기본 Header
- 기본 Footer
- Tailwind CSS 설정
- shadcn/ui 설정 파일과 기본 Button 컴포넌트
- Vitest 설정
- Playwright 설정

## 제외한 항목

- 금융 계산 로직
- 금융상품 API
- Database
- 로그인
- 회원 기능

## 배포 준비

Vercel 배포 전 로컬에서 다음 명령이 통과해야 합니다.

```bash
npm run lint
npm run test
npm run build
```

Playwright E2E 테스트는 브라우저가 설치된 환경에서 실행합니다.

```bash
npx playwright install
npm run test:e2e
```

현재 MVP는 데이터베이스, 로그인, 외부 금융상품 API를 사용하지 않으므로 필수 환경변수는 없습니다.
