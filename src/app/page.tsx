import { GlobeCanvas } from "@/globe/GlobeCanvas";

const scoreRows = [
  { label: "달", value: "초승달 이후 낮은 밝기" },
  { label: "날씨", value: "구름/강수 fixture 대기" },
  { label: "하늘", value: "남섬 어두운 후보지" }
];

export default function Home() {
  return (
    <main className="darksite-shell">
      <section className="command-panel" aria-label="Darksite recommendation controls">
        <div className="brand-lockup">
          <p className="brand-kicker">Astrophotography planner</p>
          <h1>Darksite</h1>
        </div>

        <form className="prompt-bar">
          <label className="prompt-label" htmlFor="darksite-prompt">
            촬영 계획
          </label>
          <div className="prompt-row">
            <input
              className="prompt-input"
              id="darksite-prompt"
              name="prompt"
              placeholder="2026년 4월 뉴질랜드에서 별 사진 찍기 좋은 날짜와 장소"
              defaultValue="2026년 4월 뉴질랜드에서 별 사진 찍기 좋은 날짜와 장소"
            />
            <button className="prompt-submit" type="submit">
              탐색
            </button>
          </div>
        </form>

        <div className="recommendation-panel">
          <p className="panel-label">1차 fixture target</p>
          <h2>뉴질랜드 남섬 · 2026년 4월</h2>
          <p className="panel-copy">
            다음 구현에서 client fixture와 점수 엔진이 연결되면 날짜, 장소, 달 조건, 날씨 리스크가 이 영역에 표시됩니다.
          </p>
          <div className="score-list">
            {scoreRows.map((row) => (
              <div className="score-row" key={row.label}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="globe-panel" aria-label="Interactive globe preview">
        <GlobeCanvas />
        <div className="layer-controls">
          <button className="layer-control is-active" type="button">
            Moon
          </button>
          <button className="layer-control" type="button">
            Weather
          </button>
          <button className="layer-control" type="button">
            Dark sky
          </button>
        </div>
      </section>
    </main>
  );
}
