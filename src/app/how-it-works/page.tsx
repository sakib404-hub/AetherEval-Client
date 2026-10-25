import type { Metadata } from "next";
import { HowItWorksHero } from "../_components/how-it-works/HowItWorksHero";
import { TimeFlowTracker } from "../_components/how-it-works/TimeFlowTracker";
import { TimelineFlowCards } from "../_components/how-it-works/TimelineFlowCards";
import { EvaluationCriteriaMatrix } from "../_components/how-it-works/EvaluationCriteriaMatrix";
import { TurnaroundBenchmarkCard } from "../_components/how-it-works/TurnaroundBenchmarkCard";
import { HowItWorksCTA } from "../_components/how-it-works/HowItWorksCTA";

export const metadata: Metadata = {
  title: "AetherEval — How It Works: The Evaluation Lifecycle Timeline",
  description:
    "Explore the chronological lifecycle of academic project evaluation—from onboarding and submission to double-blind mentor reviews and constructive verdicts.",
};

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <HowItWorksHero />
      <TimeFlowTracker />
      <TimelineFlowCards />
      <EvaluationCriteriaMatrix />
      <TurnaroundBenchmarkCard />
      <HowItWorksCTA />
    </main>
  );
}
