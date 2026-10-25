"use client";

import { HeroHeader } from "./HeroHeader";
import { HeroActionButtons } from "./HeroActionButtons";
import { HeroPreviewCard } from "./HeroPreviewCard";

export function OverviewHero() {
  return (
    <section
      aria-label="AetherEval Overview Hero"
      className="relative flex flex-col items-center max-w-6xl mx-auto w-full pt-4 md:pt-10 pb-16"
    >
      <HeroHeader />
      <HeroActionButtons />
      <HeroPreviewCard />
    </section>
  );
}
