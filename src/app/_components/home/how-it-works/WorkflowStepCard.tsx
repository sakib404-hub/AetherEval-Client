import { GlassCard } from "../../ui/GlassCard";
import { StatusBadge } from "../../ui/StatusBadge";

interface WorkflowStepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
  badgeText: string;
  badgeVariant?: "approved" | "pending" | "rejected" | "info" | "node";
  bullets: string[];
}

export function WorkflowStepCard({
  stepNumber,
  title,
  description,
  icon,
  badgeText,
  badgeVariant = "info",
  bullets,
}: WorkflowStepCardProps) {
  return (
    <GlassCard
      interactive
      level={2}
      className="p-6 text-left flex flex-col justify-between group border-white/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background ambient step watermark */}
      <span
        aria-hidden="true"
        className="absolute -right-4 -bottom-6 font-headline font-black text-7xl text-white/[0.03] select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors"
      >
        {stepNumber}
      </span>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2">
            <span className="font-headline text-[11px] font-bold tracking-widest text-primary uppercase bg-primary-container/20 border border-primary/30 px-2.5 py-1 rounded-full">
              {stepNumber}
            </span>
          </div>
          <StatusBadge variant={badgeVariant} label={badgeText} />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
            {icon}
          </span>
          <h3 className="font-headline text-headline-sm font-semibold text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-5">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/10 space-y-2">
        {bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">
              check_circle
            </span>
            <span className="font-body text-body-xs text-white/80">
              {bullet}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
