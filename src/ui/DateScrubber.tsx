import { useRecommendationWorkspace } from "@/recommendation/state";
import "./DateScrubber.scss";

export function DateScrubber() {
  const selectedDate = useRecommendationWorkspace((state) => state.selectedDate);
  const setSelectedDate = useRecommendationWorkspace((state) => state.setSelectedDate);
  const day = Number(selectedDate.slice(-2));

  return (
    <div className="date-scrubber">
      <div className="date-scrubber-header">
        <label className="prompt-label" htmlFor="darksite-date">
          촬영 날짜
        </label>
        <output className="date-scrubber-value" htmlFor="darksite-date">
          {selectedDate}
        </output>
      </div>
      <input
        aria-describedby="date-scrubber-hint"
        className="date-scrubber-input"
        id="darksite-date"
        max="30"
        min="1"
        type="range"
        value={day}
        onChange={(event) => setSelectedDate(Number(event.target.value))}
      />
      <div className="date-scrubber-scale" id="date-scrubber-hint">
        <span>4월 1일</span>
        <span>4월 30일</span>
      </div>
    </div>
  );
}
