# Darksite 작업 체크리스트

## 목적

이 문서는 Darksite 작업 내역을 계속 추적하기 위한 체크리스트다. 앞으로 작업을 시작하거나 마칠 때 이 문서를 업데이트해, 완료된 것과 다음에 해야 할 것을 명확히 관리한다.

## 운영 규칙

- 작업을 시작하면 해당 항목을 `진행 중`으로 옮긴다.
- 작업이 끝나면 `완료됨`으로 옮기고 관련 커밋을 적는다.
- 새 결정이나 요청이 생기면 `다음 작업` 또는 `결정 필요`에 추가한다.
- 구현 중 발견한 후속 과제는 바로 기록한다.
- 큰 작업은 작은 검증 가능한 단위로 쪼갠다.

## 완료됨

- [x] 제품 방향 설계 작성
  - 문서: `docs/superpowers/specs/2026-07-09-star-photography-planner-design.md`
  - 커밋: `af61e81`, `80d05eb`

- [x] 서비스명을 `Darksite`로 확정
  - 커밋: `aede14c`

- [x] 1차 구현 계획 작성
  - 문서: `docs/superpowers/plans/2026-07-10-star-photography-planner-implementation-plan.md`
  - 커밋: `53d8704`

- [x] 기술 스택을 `Next.js + Vercel` 기준으로 확정
  - 커밋: `e1a5b52`

- [x] 스타일 규칙 확정
  - SCSS 사용
  - BEM 대신 하이픈 기반 클래스명 사용
  - 커밋: `f0a7227`

- [x] 디자인 레퍼런스 방향 정리
  - 문서: `docs/superpowers/design/2026-07-10-visual-reference-direction.md`
  - 커밋: `d8519e5`

- [x] 작업 폴더를 `/Users/seikpark/Desktop/projects/darksite`로 이동

- [x] GitHub remote 연결 및 최초 push
  - 저장소: `https://github.com/divclasssg/darksite.git`

- [x] 작업 체크리스트 운영 체계 추가
  - 문서: `docs/superpowers/checklists/work-tracker.md`

## 진행 중

- 없음

## 다음 작업

- [ ] Next.js 프로젝트 스캐폴딩
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/globals.scss`
  - 기본 `package.json`, `tsconfig.json`, `next.config.ts`

- [ ] 필수 패키지 설치
  - Next.js
  - React
  - TypeScript
  - Sass
  - Three.js
  - React Three Fiber
  - Zustand
  - Vitest
  - Testing Library

- [ ] 기본 원페이지 골격 구현
  - 3D 지구 영역
  - 프롬프트 입력
  - 추천 패널 자리
  - 날짜 스크러버 자리
  - 레이어 컨트롤 자리

- [ ] 도메인 타입 작성
  - `GeoPoint`
  - `DateRange`
  - `RecommendationRequest`
  - `CandidateLocation`
  - `NightCondition`
  - `ScoreBreakdown`
  - `RecommendationResult`
  - `RecommendationState`

- [ ] 뉴질랜드 2026년 4월 fixture 작성
  - 후보지
  - 날짜별 조건
  - 날씨 fixture
  - 광공해 fixture
  - 달 조건 fixture 또는 계산 결과

- [ ] 점수 엔진과 테스트 작성
  - 달 조건 점수
  - 날씨 점수
  - 어두운 하늘 점수
  - 밤 시간 점수
  - 은하수 보너스
  - 신뢰도

- [ ] 3D 지구 MVP 구현
  - 기본 지구 렌더링
  - 회전/줌
  - 후보지 핀
  - 뉴질랜드로 카메라 이동
  - 핀 클릭 상태 갱신

- [ ] 추천 UI MVP 구현
  - 프롬프트 입력
  - 추천 카드
  - 조건별 점수
  - 날짜 스크러버
  - 레이어 토글

- [ ] 빌드와 테스트 검증
  - `npm run build`
  - `npm test`

## 결정 필요

- [ ] 천문 계산 라이브러리 선택
- [ ] Zustand를 유지할지, Jotai/Context 등 다른 상태 관리 후보를 재검토할지 결정
- [ ] 첫 구현에서 Route Handler를 바로 둘지, 순수 함수 기반 client fixture로 먼저 갈지 결정

## 참고 문서

- 설계: `docs/superpowers/specs/2026-07-09-star-photography-planner-design.md`
- 구현 계획: `docs/superpowers/plans/2026-07-10-star-photography-planner-implementation-plan.md`
- 디자인 방향: `docs/superpowers/design/2026-07-10-visual-reference-direction.md`
