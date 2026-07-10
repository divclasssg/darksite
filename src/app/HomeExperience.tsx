"use client";

import { DateScrubber } from "@/ui/DateScrubber";
import { LayerControls } from "@/ui/LayerControls";
import { PromptBar } from "@/ui/PromptBar";
import { RecommendationPanel } from "@/ui/RecommendationPanel";

export function HomeExperience() {
  return (
    <section className="command-panel" aria-label="Darksite recommendation controls">
      <div className="brand-lockup">
        <p className="brand-kicker">Astrophotography planner</p>
        <h1>Darksite</h1>
      </div>

      <PromptBar />
      <DateScrubber />
      <LayerControls />
      <RecommendationPanel />
    </section>
  );
}
