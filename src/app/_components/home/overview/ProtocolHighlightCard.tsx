import { GlassCard } from "../../ui/GlassCard";
import { StatusBadge } from "../../ui/StatusBadge";

interface ProtocolHighlightCardProps {
  title: string;
  description: string;
  badgeText: string;
  badgeVariant?: "approved" | "pending" | "rejected" | "info" | "node";
  icon: string;
  metricLabel?: string;
  metricValue?: string;
}

export function ProtocolHighlightCard({
  title,
  description,
  badgeText,
  badgeVariant = "info",
  icon,
  metricLabel,
  metricValue,
}: ProtocolHighlightCardProps) {
  return (
    <GlassCard
      interactive
      level={2}
      className="p-6 text-left flex flex-col justify-between group border-white/10 hover:border-primary/40 transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_16px_rgba(124,58,237,0.3)]">
            <span className="material-symbols-outlined text-2xl">
              {icon}
            </span>
          </div>
          <StatusBadge variant={badgeVariant} label={badgeText} />
        </div>

        <h3 className="font-headline text-headline-sm font-semibold text-white group-hover:text-primary transition-colors mb-2">
          {title}
        </h3>
        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>

      {metricLabel && metricValue && (
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
          <span className="font-headline text-body-xs text-on-surface-variant">
            {metricLabel}
          </span>
          <span className="font-headline text-body-sm font-semibold text-white">
            {metricValue}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
