export default function StudentDashboardLoading() {
  return (
    <main className="max-w-6xl mx-auto w-full space-y-7 pt-1 animate-pulse" aria-hidden="true">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="w-56 h-8 rounded-2xl bg-white/10" />
          <div className="w-80 h-4 rounded-lg bg-white/5" />
        </div>
        <div className="flex gap-3">
          <div className="w-56 h-10 rounded-xl bg-white/5" />
          <div className="w-36 h-10 rounded-xl bg-white/15" />
        </div>
      </div>

      {/* 3 KPI chips skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-3xl bg-white/[0.04] border border-white/5 p-5" />
        ))}
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-28 h-9 rounded-2xl bg-white/5" />
        ))}
      </div>

      {/* Cards list skeleton */}
      <div className="space-y-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-56 rounded-3xl bg-white/[0.04] border border-white/5 p-7 space-y-4"
          >
            <div className="flex justify-between">
              <div className="w-64 h-6 rounded bg-white/10" />
              <div className="w-32 h-6 rounded-full bg-white/10" />
            </div>
            <div className="w-full h-12 rounded bg-white/5" />
          </div>
        ))}
      </div>
    </main>
  );
}
