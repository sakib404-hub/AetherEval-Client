import { GlassCard } from "../_components/ui/GlassCard";
import { StatusBadge } from "../_components/ui/StatusBadge";

export default function HowItWorksPage() {
  return (
    <main className="max-w-4xl mx-auto w-full pt-12">
      <GlassCard level={1} className="p-8 text-left space-y-4">
        <div className="flex items-center justify-between">
          <StatusBadge variant="info" label="Route: /how-it-works" icon="schema" />
          <span className="text-body-xs font-headline text-on-surface-variant">
            AetherEval Protocol
          </span>
        </div>

        <h1 className="font-headline text-3xl md:text-4xl font-bold text-white tracking-tight">
          How It Works
        </h1>

        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          This is the dedicated How It Works page. Ready for layout and workflow
          components when you specify the design.
        </p>
      </GlassCard>
    </main>
  );
}
