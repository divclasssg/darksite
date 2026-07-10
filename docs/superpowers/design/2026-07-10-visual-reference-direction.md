# 별 사진 촬영지 추천 서비스 디자인 레퍼런스 방향

## 목적

이 문서는 사용자가 제공한 Pinterest 레퍼런스를 바탕으로 1차 원페이지 구현의 시각 방향을 정리한다. 레퍼런스 이미지를 그대로 복제하지 않고, 공통된 시각 언어와 적용 원칙만 추출한다.

사용자가 선호한 방향:

- 미래지향적인 느낌.
- 우주적인 느낌.
- 원페이지 구현에 어울리는 강한 첫인상.
- 3D 지구와 데이터 시각화가 중심이 되는 화면.

## 확인한 레퍼런스

Pinterest 단축 링크는 다음 pin 메타데이터로 확인됐다.

| 링크 | 확인된 제목 | 주요 키워드 |
| --- | --- | --- |
| https://pin.it/7hQmg6pai | Dark Map Ui | dark map, sci-fi dashboard, world map UI, radar, terminal UI |
| https://pin.it/1C9hZXZmq | globe animation | trajectory mapping, Earth globe overlay, radar paths, astronomy software interface |
| https://pin.it/4VX1eGeuW | Data Visualization System Design - Alibaba Design | futuristic data visualization, map data, large-screen dashboard |
| https://pin.it/1lpLkW3iK | The Martian Ui | NASA UI, map dashboard, space-themed digital interface |
| https://pin.it/6fUIYCWXU | Futuristic Digital Interface Screen | Earth at night, data globe, global data visualization |
| https://pin.it/28QdleKVQ | Technology Design Graphic | black/gold map, data dashboard, presentation-style visualization |
| https://pin.it/6aKNHc7cw | 3d Data Visualization | 3D map, large-screen UI, dashboard design |
| https://pin.it/2vWz2uGEP | Tactical Dashboard | tactical dashboard, cybernetic world map, sci-fi map interface |
| https://pin.it/5Vo0WhiQR | Data Visualization Inspiration | weather/climate visualization, global network analytics, modern tech display |

## 공통 시각 언어

레퍼런스의 공통점은 일반적인 여행 서비스 UI보다 관측 장비, 우주 관제실, 데이터 레이더에 가깝다.

핵심 요소:

- 어두운 배경 위의 고대비 데이터 레이어.
- 지구 또는 세계지도 중심의 큰 시각 앵커.
- 얇은 선, 궤적, 링, 그리드, 좌표선.
- 노란색, 청록색, 흰색 계열의 제한적 포인트 컬러.
- 데이터가 발광하는 듯한 glow 표현.
- 작은 숫자, 라벨, 계기판 느낌의 정보 밀도.
- 큰 장식보다 기능적이고 정교한 시각화.

## 적용 방향

### 첫 화면

첫 화면은 제품 설명보다 3D 지구가 먼저 보여야 한다. 지구는 화면의 배경 장식이 아니라 사용자가 직접 조작하는 주 인터페이스다.

권장 구성:

- 전체 화면에 가까운 3D 지구.
- 어두운 우주 배경.
- 지구 주변의 얇은 궤도선과 데이터 링.
- 추천 후보지는 작은 발광 핀으로 표시.
- 구름, 달, 광공해, 은하수 레이어는 색이 다른 얇은 overlay로 표현.

### 프롬프트 입력

프롬프트는 검색창처럼 보이기보다 관측 명령 입력창처럼 보여야 한다.

권장 표현:

- 반투명 어두운 패널.
- 얇은 테두리.
- 입력 중 약한 cyan 또는 warm yellow focus glow.
- placeholder는 실용적 문장으로 유지.

예:

`2026년 4월 뉴질랜드에서 별 사진 찍기 좋은 날짜와 장소`

### 추천 패널

추천 패널은 카드형 여행 추천보다 데이터 판독 패널에 가까워야 한다.

권장 정보:

- 추천 날짜 구간.
- 대표 장소.
- 종합 점수.
- 조건별 점수.
- 신뢰도.
- 리스크.

권장 표현:

- 검은색/짙은 남색 반투명 패널.
- 얇은 구분선.
- 작은 라벨과 숫자.
- `Moon`, `Cloud`, `Dark sky`, `Milky Way` 같은 조건별 chip 또는 meter.
- 좋은 조건은 금색 또는 청록색 glow로 강조.

### 날짜 스크러버

날짜 스크러버는 일반 form slider보다 타임라인 계기판처럼 보여야 한다.

권장 표현:

- 날짜별 세로 tick.
- 좋은 밤은 밝은 점 또는 짧은 발광 막대로 표시.
- 선택 날짜는 링 또는 pulse로 강조.
- 구름 리스크가 높은 날은 흐린 회색/보라색으로 약하게 표시.

### 레이어 컨트롤

레이어 컨트롤은 지도 앱의 단순 버튼보다 관측 모드 전환처럼 보여야 한다.

권장 모드:

- Moon.
- Clouds.
- Dark sky.
- Milky Way.
- Confidence.

권장 표현:

- 작은 아이콘 + 짧은 라벨.
- 활성 상태는 `is-active` 클래스와 glow.
- 비활성 상태는 낮은 opacity.

## 컬러 방향

레퍼런스는 어두운 배경과 제한된 포인트 컬러가 공통이다.

권장 팔레트:

- 배경: near-black, deep navy, space black.
- 기본 선: blue gray, muted cyan.
- 주요 강조: warm yellow, pale gold.
- 보조 강조: electric cyan, soft teal.
- 경고/리스크: muted violet 또는 dim red.
- 텍스트: off-white, blue gray.

주의:

- 화면 전체를 보라색/파란색 그라데이션 하나로 덮지 않는다.
- 베이지, 브라운, 일반 여행 서비스풍 팔레트는 피한다.
- glow는 중요한 데이터에만 제한적으로 사용한다.

## 모션 방향

미래지향적인 느낌은 애니메이션에서 많이 나온다. 하지만 추천 서비스이므로 장식 모션보다 상태 변화를 이해시키는 모션이 우선이다.

권장 모션:

- 검색 후 지구가 선택 지역으로 부드럽게 이동.
- 후보 핀이 순차적으로 점등.
- 날짜 스크러버 이동 시 지구 위 후보 점수가 부드럽게 변함.
- 레이어 전환 시 overlay가 fade in/out.
- 좋은 날짜 구간이 pulse 또는 scan line으로 강조.

피할 것:

- 사용자의 읽기를 방해하는 과한 loop animation.
- 모든 요소가 계속 빛나는 표현.
- 정보 패널 자체가 흔들리거나 과하게 움직이는 표현.

## 원페이지 구조

1차 구현은 원페이지로 만든다.

권장 흐름:

1. 첫 viewport: 3D 지구 + 프롬프트 + 추천 요약.
2. 같은 화면 안의 보조 패널: 날짜 스크러버, 조건별 점수, 리스크.
3. 아래로 스크롤하면 방법론 또는 데이터 신뢰도 설명을 보여줄 수 있지만, MVP에서는 첫 viewport 안에서 대표 질문을 해결하는 것을 우선한다.

중요:

- 랜딩 페이지처럼 긴 설명으로 시작하지 않는다.
- 첫 화면에서 실제 도구가 바로 보여야 한다.
- 브랜드/제품 소개보다 “어디서 언제 찍을지”를 바로 탐색하게 한다.

## 구현에 반영할 규칙

- 3D 지구가 가장 큰 시각 요소다.
- 정보 패널은 지구를 가리지 않도록 가장자리 또는 하단에 배치한다.
- 점수와 리스크는 숨기지 않는다.
- 사용자가 조작할 수 있는 요소는 명확히 구분한다.
- 클래스명은 기존 계획대로 하이픈 기반을 사용한다.
- SCSS에서 색상, glow, spacing은 변수로 관리한다.

## 1차 구현에서 하지 않을 것

- 레퍼런스 이미지를 그대로 복제하지 않는다.
- 복잡한 장식성 HUD를 과하게 만들지 않는다.
- 모든 데이터를 실제 API처럼 보이게 하지 않는다. fixture 기반 데이터는 명확히 구분한다.
- 최종 디자인 시스템을 완성하려고 하지 않는다.
