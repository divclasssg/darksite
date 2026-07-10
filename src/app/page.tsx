import { HomeExperience } from "@/app/HomeExperience";
import { GlobeCanvas } from "@/globe/GlobeCanvas";

export default function Home() {
  return (
    <main className="darksite-shell">
      <HomeExperience />

      <section className="globe-panel" aria-label="Interactive globe preview">
        <GlobeCanvas />
      </section>
    </main>
  );
}
