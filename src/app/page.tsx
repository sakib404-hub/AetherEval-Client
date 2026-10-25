import type { Metadata } from "next";
import { OverviewHero } from "./_components/overview/OverviewHero";
import { OverviewMetricsMatrix } from "./_components/overview/OverviewMetricsMatrix";
import { RoleArchitectureSection } from "./_components/overview/RoleArchitectureSection";
import { EvaluationPillarsSection } from "./_components/overview/EvaluationPillarsSection";
import { OverviewCTASection } from "./_components/overview/OverviewCTASection";

export const metadata: Metadata = {
  title: "AetherEval — Academic Evaluation & Peer Consensus Overview",
  description:
    "Standardized academic evaluation connecting student builders, vetted review mentors, and administrators in a transparent review workflow.",
};

export default function OverviewPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <OverviewHero />
      <OverviewMetricsMatrix />
      <RoleArchitectureSection />
      <EvaluationPillarsSection />
      <OverviewCTASection />
    </main>
  );
}
