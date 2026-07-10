import { FormEvent } from "react";
import { useRecommendationWorkspace } from "@/recommendation/state";
import "./PromptBar.scss";

export function PromptBar() {
  const prompt = useRecommendationWorkspace((state) => state.prompt);
  const setPrompt = useRecommendationWorkspace((state) => state.setPrompt);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="prompt-bar" onSubmit={handleSubmit}>
      <label className="prompt-label" htmlFor="darksite-prompt">
        촬영 계획
      </label>
      <div className="prompt-row">
        <input
          className="prompt-input"
          id="darksite-prompt"
          name="prompt"
          placeholder="2026년 4월 뉴질랜드에서 별 사진 찍기 좋은 날짜와 장소"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button className="prompt-submit" type="submit">
          탐색
        </button>
      </div>
    </form>
  );
}
