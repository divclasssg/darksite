import { LayerKey, useRecommendationWorkspace } from "@/recommendation/state";
import "./LayerControls.scss";

const layers: Array<{ key: LayerKey; label: string }> = [
  { key: "moon", label: "달" },
  { key: "weather", label: "날씨" },
  { key: "darkSky", label: "어두운 하늘" }
];

export function LayerControls() {
  const activeLayers = useRecommendationWorkspace((state) => state.activeLayers);
  const toggleLayer = useRecommendationWorkspace((state) => state.toggleLayer);

  return (
    <div className="layer-controls" aria-label="레이어 컨트롤">
      {layers.map((layer) => {
        const isActive = activeLayers[layer.key];

        return (
          <button
            aria-pressed={isActive}
            className={`layer-control ${isActive ? "is-active" : ""}`}
            key={layer.key}
            type="button"
            onClick={() => toggleLayer(layer.key)}
          >
            {layer.label}
          </button>
        );
      })}
    </div>
  );
}
