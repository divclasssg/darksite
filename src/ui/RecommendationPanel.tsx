import { useRecommendationWorkspace } from "@/recommendation/state";
import "./RecommendationPanel.scss";

const scoreRows = [
  { label: "달", value: "초승달 이후 낮은 밝기" },
  { label: "날씨", value: "구름/강수 fixture 연결 예정" },
  { label: "하늘", value: "남섬 어두운 후보지" }
];

export function RecommendationPanel() {
  const selectedDate = useRecommendationWorkspace((state) => state.selectedDate);
  const selectedPlace = useRecommendationWorkspace((state) => state.selectedPlace);

  return (
    <section className="recommendation-panel" aria-label="추천 요약">
      <p className="panel-label">1차 fixture target</p>
      <div className="recommendation-heading">
        <h2>뉴질랜드 남섬 · 2026년 4월</h2>
        <strong>86</strong>
      </div>
      <p className="panel-copy">
        {selectedDate} 기준으로 {selectedPlace}를 우선 후보로 놓고, 다음 단계에서 client fixture와 점수 엔진을 연결합니다.
      </p>
      <div className="score-list">
        {scoreRows.map((row) => (
          <div className="score-row" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
