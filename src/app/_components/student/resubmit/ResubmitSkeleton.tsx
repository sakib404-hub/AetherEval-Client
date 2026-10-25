export function ResubmitSkeleton() {
  return (
    <div className="max-w-6xl mx-auto w-full space-y-7 pt-1 animate-pulse" aria-busy="true">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-28 bg-white/10 rounded-full" />
            <div className="h-4 w-3 bg-white/5 rounded-full" />
            <div className="h-5 w-32 bg-white/10 rounded-full" />
          </div>
          <div className="h-9 w-72 bg-white/10 rounded-2xl" />
          <div className="h-4 w-full max-w-xl bg-white/5 rounded-lg" />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-14 w-24 bg-white/10 rounded-2xl" />
          <div className="h-9 w-24 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Search Input Skeleton */}
      <div className="h-12 w-full bg-white/5 rounded-2xl border border-white/10" />

      {/* Cards Skeletons */}
      <div className="space-y-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-7 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-60 bg-white/10 rounded-xl" />
                  <div className="h-4 w-20 bg-white/5 rounded" />
                </div>
                <div className="h-4 w-44 bg-white/5 rounded" />
              </div>
              <div className="h-7 w-48 bg-white/10 rounded-full shrink-0" />
            </div>

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-3/4 bg-white/5 rounded" />
            </div>

            {/* Critique box */}
            <div className="h-20 w-full bg-white/5 rounded-2xl border border-white/5" />

            {/* Divider */}
            <div className="h-px w-full bg-white/10" />

            {/* Footer row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-28 bg-white/10 rounded-full" />
                <div className="h-8 w-28 bg-white/10 rounded-full" />
              </div>
              <div className="h-9 w-36 bg-white/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
