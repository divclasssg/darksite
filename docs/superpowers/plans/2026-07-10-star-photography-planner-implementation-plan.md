# Darksite 1차 구현 계획

## 목표

Darksite 1차 구현의 목표는 전 세계 전체 기능을 한 번에 완성하는 것이 아니라, 대표 질문 하나가 처음부터 끝까지 동작하는 MVP 세로 조각을 만드는 것이다.

대표 질문:

> 2026년 4월 뉴질랜드에서 별 사진을 찍으려면 언제 어디가 좋아?

완료된 1차 구현은 다음을 보여줘야 한다.

- 사용자가 프롬프트를 입력하면 추천 상태가 생성된다.
- 3D 지구가 뉴질랜드 남섬 주변으로 이동한다.
- 후보 촬영지가 지구 위에 표시된다.
- 날짜 스크러버를 움직이면 추천 점수와 강조 장소가 바뀐다.
- 추천 카드에 날짜, 장소, 종합 점수, 조건별 점수, 이유, 리스크, 신뢰도가 표시된다.
- 같은 추천 상태를 프롬프트 입력, 지구 선택, 날짜 스크러버가 함께 사용한다.

## 원칙

- 첫 구현은 실제 데이터 연동보다 구조 검증을 우선한다.
- 데이터 제공자는 교체 가능하게 만들고, MVP에서는 fixture 데이터를 먼저 사용한다.
- 천문 계산은 가능한 한 실제 로직으로 시작하되, 날씨와 광공해는 fixture로 시작한다.
- 디자인 디테일은 후속 디자인 단계에서 다루되, 1차 구현의 시각 방향은 `docs/superpowers/design/2026-07-10-visual-reference-direction.md`를 따른다.
- 전 세계 전체 좌표 스캔은 구현하지 않는다. 후보지 DB와 제한적 주변 후보 생성 구조만 만든다.

## 권장 기술 스택

초기 구현은 다음 조합을 권장한다.

- 앱: Next.js + React + TypeScript
- 배포: Vercel
- 3D: Three.js + React Three Fiber
- 상태: Zustand
- 테스트: Vitest + Testing Library
- 스타일: SCSS
- 데이터: 로컬 TypeScript fixture

이 조합은 초기 MVP를 빠르게 만들 수 있으면서, 이후 실제 날씨/지오코딩 API 키 보호, 서버 측 캐싱, Vercel 배포, 서버리스 Route Handler 확장까지 자연스럽게 이어진다.

3D 지구는 브라우저 전용 기능이므로 Next.js App Router 안에서 client component로 분리한다. 1차 구현의 추천 흐름은 client fixture를 먼저 사용한다. Route Handler는 실제 API 키와 서버 캐시가 필요한 단계에 대비해 폴더 구조만 준비하고, 추천 계산은 순수 함수와 인터페이스 중심으로 작성해 나중에 서버 경계로 옮길 수 있게 한다.

## 구현 단계

### 1단계: 프로젝트 스캐폴딩

목표:

- Next.js + React + TypeScript 앱을 생성한다.
- 기본 테스트 환경을 만든다.
- 3D 렌더링에 필요한 의존성을 설치한다.

작업:

- `package.json`, `next.config.ts`, `tsconfig.json`을 만든다.
- App Router 기반의 `src/app/page.tsx`, `src/app/layout.tsx`, 전역 SCSS 파일을 만든다.
- Vitest 설정을 추가한다.
- 3D 지구 컴포넌트는 `use client`가 붙은 client component로 분리한다.
- 앱이 빈 화면이 아니라 첫 번째 레이아웃 골격을 렌더링하게 한다.

완료 기준:

- `npm run dev`로 앱이 실행된다.
- `npm run build`가 성공한다.
- `npm test` 또는 동등한 테스트 명령이 실행된다.

### 2단계: 도메인 타입과 fixture 데이터

목표:

추천 엔진, UI, 지구 모듈이 공유할 타입을 먼저 고정한다.

주요 타입:

- `GeoPoint`
- `DateRange`
- `RecommendationRequest`
- `CandidateLocation`
- `NightCondition`
- `ScoreBreakdown`
- `RecommendationResult`
- `RecommendationState`

초기 fixture:

- 뉴질랜드 남섬 후보지
- 2026년 4월 날짜별 조건
- 후보지별 광공해/고도/도시 거리 추정치
- 날짜별 구름/강수/습도/시정 fixture
- 날짜별 달 조건 fixture 또는 천문 계산 결과

초기 후보지:

- Lake Tekapo
- Aoraki / Mount Cook National Park
- Queenstown outskirts
- Wanaka outskirts
- Stewart Island

완료 기준:

- fixture만으로 대표 질문에 대한 추천 결과를 생성할 수 있다.
- 타입이 UI와 엔진 사이의 계약 역할을 한다.

### 3단계: 의도 및 지역 해석

목표:

자연어 프롬프트를 MVP용 추천 요청으로 바꾼다.

작업:

- `parsePromptToRequest` 함수를 만든다.
- MVP에서는 다음 패턴을 우선 지원한다.
  - `2026년 4월 뉴질랜드`
  - `4월 뉴질랜드`
  - `뉴질랜드 별 사진`
- 지구에서 지역을 선택했을 때도 같은 `RecommendationRequest`를 만들 수 있게 한다.

완료 기준:

- 대표 질문이 `region = New Zealand`, `dateRange = 2026-04-01..2026-04-30`, `target = stars`로 해석된다.
- 직접 지구 선택도 동일한 요청 구조를 생성한다.
- 애매한 입력은 안전한 기본값과 안내 메시지를 반환한다.

### 4단계: 후보 장소 엔진

목표:

요청된 지역에 맞는 후보 촬영지를 반환한다.

작업:

- `getCandidateLocations(request)`를 만든다.
- 지역이 뉴질랜드이면 fixture 후보지를 반환한다.
- 향후 확장을 위해 후보지 DB 조회와 제한 격자 스캔 인터페이스를 분리한다.

완료 기준:

- 뉴질랜드 요청에서 남섬 후보지가 반환된다.
- 알 수 없는 지역 요청은 빈 결과가 아니라 "지원 예정 지역" 상태를 반환한다.
- 후보지 엔진은 날씨나 점수 계산을 직접 하지 않는다.

### 5단계: 점수 엔진

목표:

장소와 날짜 조합을 랭킹하고 설명 가능한 점수 결과를 만든다.

작업:

- `scoreLocationNight(location, condition)`을 만든다.
- 조건별 점수를 계산한다.
  - 달 점수
  - 날씨 점수
  - 어두운 하늘 점수
  - 밤 시간 점수
  - 은하수 보너스
  - 리스크 페널티
  - 신뢰도
- `rankRecommendations(request, candidates, conditions)`를 만든다.
- 추천 이유와 리스크 문구를 점수에서 생성한다.

완료 기준:

- 2026년 4월 뉴질랜드 fixture에서 상위 날짜 구간과 장소가 나온다.
- 달 조건이 좋은 날짜가 더 높은 점수를 받는다.
- 구름/강수 조건이 나쁜 날짜는 랭킹이 내려간다.
- 종합 점수와 조건별 점수가 함께 반환된다.

### 6단계: 추천 상태 관리

목표:

프롬프트, 지구 선택, 날짜 스크러버가 같은 상태를 갱신하게 만든다.

작업:

- `RecommendationState` store를 만든다.
- 상태에 다음을 포함한다.
  - 현재 요청
  - 선택 지역
  - 선택 날짜
  - 후보 장소
  - 랭킹 결과
  - 활성 레이어
  - 로딩/오류/대체 데이터 상태
- 프롬프트 입력 이벤트와 지구 선택 이벤트를 같은 action으로 연결한다.

완료 기준:

- 프롬프트 입력 후 지구와 추천 카드가 같은 결과를 본다.
- 지구에서 후보지를 선택하면 추천 카드가 해당 장소 중심으로 갱신된다.
- 날짜 스크러버를 움직이면 같은 결과 목록에서 선택 날짜가 바뀐다.

### 7단계: 3D 지구 MVP

목표:

3D 지구가 추천 상태를 시각적으로 보여주고 직접 탐색 입력을 제공한다.

작업:

- 기본 지구 구체를 렌더링한다.
- 회전과 줌을 지원한다.
- 후보지 좌표를 지구 위 핀으로 표시한다.
- 추천 점수에 따라 핀 밝기 또는 크기를 바꾼다.
- 뉴질랜드 요청 시 카메라가 남섬 쪽으로 이동한다.
- 핀 클릭 시 선택 장소 상태를 갱신한다.

완료 기준:

- 지구가 빈 캔버스가 아니라 명확히 보인다.
- 뉴질랜드 후보지가 지구 위에 표시된다.
- 핀 선택이 추천 카드 상태를 바꾼다.
- 기본 데스크톱과 모바일 폭에서 캔버스가 깨지지 않는다.

### 8단계: 추천 UI MVP

목표:

추천 결과를 이해 가능한 형태로 보여준다.

작업:

- 프롬프트 입력 영역을 만든다.
- 추천 요약 카드를 만든다.
- 조건별 점수 표시를 만든다.
- 날짜 스크러버를 만든다.
- 레이어 토글을 만든다.
- 신뢰도와 리스크 메시지를 표시한다.

완료 기준:

- 사용자는 "언제", "어디", "왜", "무엇이 리스크인지"를 한 화면에서 이해할 수 있다.
- 날짜를 바꾸면 점수와 추천 이유가 바뀐다.
- 디자인은 임시여도 정보 위계가 명확하다.

### 9단계: 천문 계산 실제화

목표:

fixture 중 달과 밤 시간 조건을 실제 계산 로직으로 대체한다.

작업:

- 천문 계산 라이브러리를 선택한다.
- 위치와 날짜 기준으로 달 위상, 달 밝기, 월출/월몰, 천문박명을 계산한다.
- 기존 fixture와 같은 `NightCondition` 형식으로 정규화한다.

완료 기준:

- 달 조건과 밤 시간 점수는 실제 계산 결과를 사용한다.
- 날씨와 광공해는 여전히 fixture를 사용할 수 있다.
- 계산 결과를 테스트로 검증한다.

### 10단계: 검증과 마무리

목표:

1차 MVP가 대표 시나리오를 안정적으로 통과하는지 확인한다.

작업:

- 대표 질문을 수동 QA한다.
- 지구 직접 선택 흐름을 수동 QA한다.
- 날짜 스크러버와 레이어 토글을 수동 QA한다.
- 점수 엔진 단위 테스트를 작성한다.
- 빌드와 테스트를 통과시킨다.

완료 기준:

- `npm run build`가 성공한다.
- 테스트가 통과한다.
- 대표 질문이 end-to-end로 동작한다.
- 데이터가 fixture임을 UI 또는 내부 상태에서 명확히 구분할 수 있다.

## 1차 구현에서 제외할 것

- 최종 비주얼 디자인.
- 사용자 계정.
- 실제 전 세계 장소 DB.
- 실시간 날씨 API 연동.
- 광공해 데이터셋 다운로드와 전처리.
- LLM 기반 자연어 파싱.
- 여행 일정 저장.
- 공유 링크.
- 결제 또는 구독.

## 실제 데이터 연동 순서

1차 구현 이후 실제 데이터는 다음 순서로 붙인다.

1. 천문 계산 실제화.
2. 지오코딩 API.
3. 가까운 날짜 날씨 API.
4. 장기 계획용 기후/과거 날씨 데이터.
5. 광공해 데이터셋.
6. 후보지 DB 확장.
7. 제한 격자 스캔.

이 순서가 좋은 이유는 천문 계산은 비용이 낮고 안정적이며, 날씨와 광공해는 제공자 선택과 비용 통제가 더 중요하기 때문이다.

## 위험 요소와 대응

### 3D 지구가 복잡해져 추천 UX를 가리는 위험

대응:

- 첫 구현에서는 지구 기능을 회전, 줌, 핀, 선택, 카메라 이동으로 제한한다.
- 레이어는 실제 시뮬레이션보다 상태 표시부터 시작한다.

### 점수 모델이 불투명해지는 위험

대응:

- 종합 점수만 보여주지 않고 조건별 점수와 이유를 항상 반환한다.
- 점수 엔진 테스트를 먼저 만든다.

### 날씨 정확도에 대한 과신 위험

대응:

- `신뢰도`를 점수와 분리한다.
- 장기 계획은 "기후 기반 추천"으로 명확히 표시한다.

### API 비용이 커지는 위험

대응:

- 1차 구현은 fixture 기반이다.
- 이후에도 후보지 DB와 제한 격자 스캔을 기본으로 유지한다.
- 데이터 제공자 계층에서 캐싱과 호출 제한을 담당하게 한다.

## 추천 파일 구조

초기 앱 구조는 다음처럼 시작한다.

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.scss
    api/
      recommendations/
        .gitkeep
  globe/
    GlobeCanvas.tsx
    GlobeCanvas.scss
    GlobePin.tsx
    globeMath.ts
  recommendation/
    types.ts
    fixtures.ts
    parsePrompt.ts
    candidates.ts
    scoring.ts
    state.ts
  ui/
    PromptBar.tsx
    PromptBar.scss
    RecommendationPanel.tsx
    RecommendationPanel.scss
    DateScrubber.tsx
    DateScrubber.scss
    LayerControls.tsx
    LayerControls.scss
  providers/
    astronomy.ts
    weatherFixture.ts
    lightPollutionFixture.ts
  server/
    recommendationService.ts
  tests/
    scoring.test.ts
    parsePrompt.test.ts
```

1차 구현에서는 클라이언트가 fixture와 순수 추천 함수를 직접 import해 사용한다. `api/recommendations/` 폴더는 Route Handler를 위한 자리만 준비하고, 실제 API 키가 필요한 제공자를 붙이는 시점에 `route.ts`를 추가해 서버 측 경계로 사용한다.

구현 중 구조가 커지면 모듈을 나눌 수 있지만, 1차 구현은 이 정도의 경계로 충분하다.

## 스타일 규칙

스타일은 SCSS를 사용한다. 전역 토큰과 리셋은 `src/app/globals.scss`에 두고, 컴포넌트별 스타일은 컴포넌트 파일 옆에 같은 이름의 `.scss` 파일로 둔다.

클래스명은 BEM 방식이 아니라 하이픈 기반 이름을 사용한다.

사용할 방식:

- `prompt-bar`
- `prompt-input`
- `recommendation-panel`
- `score-row`
- `date-scrubber`
- `layer-control-active`

사용하지 않을 방식:

- `prompt-bar__input`
- `recommendation-panel__score-row`
- `layer-control--active`

상태나 변형은 `is-active`, `is-loading`, `has-warning`처럼 읽히는 하이픈 클래스로 표현한다. 한 컴포넌트 안에서만 쓰이는 스타일이어도 클래스명은 화면에서 의미가 드러나게 작성한다.

## 첫 번째 PR 또는 커밋 묶음 제안

1. 프로젝트 스캐폴딩과 빈 앱 실행.
2. 도메인 타입과 뉴질랜드 fixture.
3. 추천 점수 엔진과 테스트.
4. 프롬프트 입력과 추천 카드.
5. 3D 지구와 후보지 핀.
6. 날짜 스크러버와 상태 동기화.
7. 천문 계산 실제화.
8. QA와 마무리 정리.

## 최종 완료 조건

1차 구현은 다음 조건을 만족하면 완료로 본다.

- 사용자가 대표 질문을 입력할 수 있다.
- 앱이 뉴질랜드 2026년 4월 추천 결과를 계산한다.
- 지구가 뉴질랜드 후보지를 보여준다.
- 후보지를 클릭하면 추천 상태가 갱신된다.
- 날짜를 바꾸면 점수와 이유가 바뀐다.
- 점수 엔진 테스트가 있다.
- 빌드가 성공한다.
- fixture 데이터와 실제 계산 데이터의 구분이 명확하다.
