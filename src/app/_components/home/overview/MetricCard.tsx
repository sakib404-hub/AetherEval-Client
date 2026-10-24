import { GlassCard } from "../../ui/GlassCard";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: string;
  subtext?: string;
}

export function MetricCard({
  label,
  value,
  trend,
  icon,
  subtext,
}: MetricCardProps) {
  return (
    <GlassCard interactive level={1} className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="material-symbols-outlined text-primary text-2xl p-2 rounded-xl bg-primary-container/20 border border-primary/30">
          {icon}
        </span>
        {trend && (
          <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            {trend}
          </span>
        )}
      </div>

      <div>
        <div className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
          {value}
        </div>
        <div className="font-headline text-body-sm font-medium text-white/80">
          {label}
        </div>
        {subtext && (
          <p className="font-body text-body-xs text-on-surface-variant mt-1">
            {subtext}
          </p>
        )}
      </div>
    </GlassCard>
  );
}
