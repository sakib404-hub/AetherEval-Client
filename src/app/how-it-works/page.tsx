import type { Metadata } from "next";
import { HowItWorksHero } from "../_components/how-it-works/HowItWorksHero";
import { CurvyWorkflowRoad } from "../_components/how-it-works/CurvyWorkflowRoad";
import { CurvyCriteriaPills } from "../_components/how-it-works/CurvyCriteriaPills";
import { HowItWorksCTA } from "../_components/how-it-works/HowItWorksCTA";

export const metadata: Metadata = {
  title: "AetherEval — How It Works: The Curated Evaluation Journey",
  description:
    "Explore the 4-stage chronological lifecycle of academic project evaluation—from initial dual-artifact dispatch to double-blind mentor reviews and binding consensus verdicts.",
};

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <HowItWorksHero />
      <CurvyWorkflowRoad />
      <CurvyCriteriaPills />
      <HowItWorksCTA />
    </main>
  );
}
