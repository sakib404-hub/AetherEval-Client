export function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto w-full space-y-7 pt-1 animate-pulse" aria-busy="true">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-full" />
            <div className="h-4 w-3 bg-white/5 rounded-full" />
            <div className="h-5 w-40 bg-white/10 rounded-full" />
          </div>
          <div className="h-9 w-64 bg-white/10 rounded-2xl" />
          <div className="h-4 w-full max-w-xl bg-white/5 rounded-lg" />
        </div>
        <div className="h-9 w-28 bg-white/10 rounded-full shrink-0" />
      </div>

      {/* Hero Card Skeleton */}
      <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/10 shrink-0" />
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="h-7 w-48 bg-white/10 rounded-xl" />
                <div className="h-6 w-24 bg-white/10 rounded-full" />
              </div>
              <div className="h-4 w-40 bg-white/5 rounded" />
              <div className="h-4 w-52 bg-white/5 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-7 w-40 bg-white/10 rounded-full" />
            <div className="h-6 w-32 bg-white/5 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-2.5">
            <div className="h-4 w-28 bg-white/10 rounded" />
            <div className="h-5 w-36 bg-white/10 rounded-lg" />
            <div className="h-3 w-44 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      {/* Role Card Skeleton */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 md:p-8 space-y-4">
        <div className="h-6 w-52 bg-white/10 rounded-xl" />
        <div className="h-20 w-full bg-white/5 rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 bg-white/5 rounded-2xl" />
          <div className="h-16 bg-white/5 rounded-2xl" />
          <div className="h-16 bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
