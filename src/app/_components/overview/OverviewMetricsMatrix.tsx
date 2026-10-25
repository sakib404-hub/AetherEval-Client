"use client";

interface MetricItem {
  id: string;
  label: string;
  value: string;
  trend: string;
  icon: string;
  subtext: string;
}

const METRICS: MetricItem[] = [
  {
    id: "submissions",
    label: "Project Artifacts",
    value: "1,420+",
    trend: "+28% this term",
    icon: "folder_zip",
    subtext: "Verified codebases & live deployments",
  },
  {
    id: "mentors",
    label: "Accredited Mentors",
    value: "360+",
    trend: "100% vetted",
    icon: "supervisor_account",
    subtext: "Faculty & domain evaluation chairs",
  },
  {
    id: "turnaround",
    label: "Turnaround SLA",
    value: "< 48h",
    trend: "Guaranteed SLA",
    icon: "schedule",
    subtext: "Average time to consensus verdict",
  },
  {
    id: "consensus",
    label: "Actionable Feedback",
    value: "99.8%",
    trend: "Audited ledger",
    icon: "fact_check",
    subtext: "Documented critique on every review",
  },
];

// Repeat METRICS 4 times to guarantee a truly infinite, seamless left-to-right loop across all screens
const MARQUEE_METRICS = [...METRICS, ...METRICS, ...METRICS, ...METRICS];

export function OverviewMetricsMatrix() {
  return (
    <section
      aria-label="System Metrics Marquee"
      className="w-full max-w-7xl mx-auto mb-20 overflow-hidden relative marquee-container py-3"
    >
      {/* Left Specular Fade Mask */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#070412] to-transparent z-20"
        aria-hidden="true"
      />

      {/* Right Specular Fade Mask */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#070412] to-transparent z-20"
        aria-hidden="true"
      />

      {/* Continuously Moving Track: Left to Right with Pause on Hover */}
      <div className="flex items-center gap-5 w-max animate-marquee-ltr select-none">
        {MARQUEE_METRICS.map((metric, idx) => (
          <div
            key={`${metric.id}-${idx}`}
            className="w-[260px] sm:w-[290px] shrink-0 p-4 bg-transparent border-0 shadow-none transition-transform duration-200 transform hover:scale-[1.04] cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-2xl p-2 rounded-xl bg-primary-container/20 border border-primary/30">
                {metric.icon}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                {metric.trend}
              </span>
            </div>

            <div>
              <div className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                {metric.value}
              </div>
              <div className="font-headline text-sm font-semibold text-white/90">
                {metric.label}
              </div>
              <p className="font-body text-xs text-on-surface-variant mt-1 leading-snug">
                {metric.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
