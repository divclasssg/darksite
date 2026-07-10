import { create } from "zustand";
import type { LayerKey } from "@/recommendation/types";

export type { LayerKey } from "@/recommendation/types";

type RecommendationWorkspaceState = {
  prompt: string;
  selectedDate: string;
  selectedPlace: string;
  activeLayers: Record<LayerKey, boolean>;
  setPrompt: (prompt: string) => void;
  setSelectedDate: (day: number) => void;
  toggleLayer: (layer: LayerKey) => void;
};

const initialPrompt = "2026년 4월 뉴질랜드에서 별 사진 찍기 좋은 날짜와 장소";

function toAprilDate(day: number) {
  const safeDay = Math.min(30, Math.max(1, day));
  return `2026-04-${String(safeDay).padStart(2, "0")}`;
}

export const useRecommendationWorkspace = create<RecommendationWorkspaceState>((set) => ({
  prompt: initialPrompt,
  selectedDate: "2026-04-17",
  selectedPlace: "Lake Tekapo",
  activeLayers: {
    moon: true,
    weather: true,
    darkSky: true
  },
  setPrompt: (prompt) => set({ prompt }),
  setSelectedDate: (day) => set({ selectedDate: toAprilDate(day) }),
  toggleLayer: (layer) =>
    set((state) => ({
      activeLayers: {
        ...state.activeLayers,
        [layer]: !state.activeLayers[layer]
      }
    }))
}));
