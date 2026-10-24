import { GlassCard } from "./_components/ui/GlassCard";
import { StatusBadge } from "./_components/ui/StatusBadge";

export default function OverviewPage() {
  return (
    <main className="max-w-4xl mx-auto w-full pt-12">
      <GlassCard level={1} className="p-8 text-left space-y-4">
        <div className="flex items-center justify-between">
          <StatusBadge variant="node" label="Route: / (Overview)" icon="dashboard" />
          <span className="text-body-xs font-headline text-on-surface-variant">
            AetherEval Network
          </span>
        </div>

        <h1 className="font-headline text-3xl md:text-4xl font-bold text-white tracking-tight">
          Overview
        </h1>

        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          Welcome to the Overview route. Use the sidebar to navigate to{" "}
          <strong className="text-white">How It Works</strong> and{" "}
          <strong className="text-white">Login / Register</strong>.
        </p>
      </GlassCard>
    </main>
  );
}
