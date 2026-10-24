export default function MentorDashboardLoading() {
  return (
    <main
      className="max-w-7xl mx-auto w-full space-y-6 pt-1 pb-16 animate-pulse"
      aria-hidden="true"
    >
      {/* Context Bar Skeleton */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-64 h-8 rounded-2xl bg-white/10" />
            <div className="w-36 h-6 rounded-full bg-white/10" />
          </div>
          <div className="w-96 h-4 rounded-lg bg-white/5" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-72 h-10 rounded-2xl bg-white/5" />
          <div className="w-48 h-10 rounded-2xl bg-white/5" />
        </div>
      </div>

      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-3xl bg-white/[0.04] border border-white/5 p-5 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-28 h-4 rounded bg-white/10" />
              <div className="w-9 h-9 rounded-xl bg-white/10" />
            </div>
            <div className="w-20 h-7 rounded bg-white/15" />
          </div>
        ))}
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-28 h-10 rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="w-40 h-10 rounded-2xl bg-white/5" />
          <div className="w-32 h-10 rounded-2xl bg-white/5" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="w-full h-96 rounded-3xl bg-white/[0.03] border border-white/10 p-6 space-y-4">
        <div className="w-full h-8 rounded-xl bg-white/5" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full h-12 rounded-xl bg-white/[0.03]" />
        ))}
      </div>
    </main>
  );
}
