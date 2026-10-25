export default function AdminMentorsLoading() {
  return (
    <main
      className="max-w-7xl mx-auto w-full space-y-6 pt-1 pb-16 animate-pulse"
      aria-hidden="true"
    >
      {/* Context Bar Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-28 h-6 rounded-full bg-white/10" />
            <div className="w-32 h-4 rounded bg-white/5" />
          </div>
          <div className="w-72 h-9 rounded-2xl bg-white/10" />
          <div className="w-96 h-4 rounded bg-white/5" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-64 h-10 rounded-2xl bg-white/5" />
          <div className="w-44 h-10 rounded-2xl bg-white/5" />
        </div>
      </div>

      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 rounded-3xl bg-white/[0.04] border border-white/5 p-5 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-32 h-4 rounded bg-white/10" />
              <div className="w-20 h-5 rounded-full bg-white/10" />
            </div>
            <div className="w-16 h-8 rounded bg-white/15" />
            <div className="w-40 h-3 rounded bg-white/5" />
          </div>
        ))}
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-32 h-10 rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="w-36 h-10 rounded-xl bg-white/5" />
          <div className="w-36 h-10 rounded-xl bg-white/5" />
          <div className="w-32 h-10 rounded-xl bg-white/10" />
        </div>
      </div>

      {/* Applications Table Skeleton */}
      <div className="w-full h-96 rounded-3xl bg-white/[0.04] border border-white/10 p-6 space-y-4">
        <div className="w-full h-10 rounded-xl bg-white/5" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full h-14 rounded-xl bg-white/[0.02]" />
        ))}
      </div>

      {/* Autonomous Oracle Preview Skeleton */}
      <div className="w-full h-36 rounded-3xl bg-white/[0.04] border border-white/10 p-6" />
    </main>
  );
}
