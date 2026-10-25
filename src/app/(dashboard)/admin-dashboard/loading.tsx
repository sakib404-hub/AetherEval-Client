export default function AdminOverviewLoading() {
  return (
    <main
      className="max-w-7xl mx-auto w-full space-y-6 pt-1 pb-20 animate-pulse"
      aria-hidden="true"
    >
      {/* Context Bar Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-36 h-6 rounded-full bg-white/10" />
            <div className="w-44 h-4 rounded bg-white/5" />
          </div>
          <div className="w-96 h-9 rounded-2xl bg-white/10" />
          <div className="w-full max-w-xl h-4 rounded bg-white/5" />
        </div>
        <div className="w-48 h-11 rounded-full bg-white/10" />
      </div>

      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-3xl bg-white/[0.04] border border-white/5 p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-xl bg-white/10" />
              <div className="w-20 h-6 rounded bg-white/5" />
            </div>
            <div className="space-y-1.5">
              <div className="w-24 h-7 rounded-lg bg-white/10" />
              <div className="w-36 h-4 rounded bg-white/5" />
              <div className="w-32 h-4 rounded-full bg-white/5" />
            </div>
          </div>
        ))}
      </div>

      {/* Full-width Area Chart Skeleton */}
      <div className="w-full h-80 rounded-3xl bg-white/[0.04] border border-white/5 p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <div className="space-y-2">
            <div className="w-36 h-4 rounded bg-white/10" />
            <div className="w-72 h-7 rounded-xl bg-white/10" />
          </div>
          <div className="w-64 h-9 rounded-2xl bg-white/5 hidden sm:block" />
        </div>
        <div className="w-full h-44 rounded-2xl bg-white/[0.02]" />
      </div>

      {/* 3-Column Visual Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart Skeleton */}
        <div className="h-96 rounded-3xl bg-white/[0.04] border border-white/5 p-6 flex flex-col justify-between">
          <div className="flex justify-between pb-4 border-b border-white/5">
            <div className="w-44 h-6 rounded-lg bg-white/10" />
            <div className="w-16 h-5 rounded-full bg-white/5" />
          </div>
          <div className="w-40 h-40 rounded-full border-8 border-white/10 mx-auto" />
          <div className="space-y-2 pt-4 border-t border-white/5">
            <div className="w-full h-8 rounded-xl bg-white/5" />
            <div className="w-full h-8 rounded-xl bg-white/5" />
          </div>
        </div>

        {/* Funnel Chart Skeleton */}
        <div className="h-96 rounded-3xl bg-white/[0.04] border border-white/5 p-6 flex flex-col justify-between">
          <div className="flex justify-between pb-4 border-b border-white/5">
            <div className="w-44 h-6 rounded-lg bg-white/10" />
            <div className="w-20 h-5 rounded-full bg-white/5" />
          </div>
          <div className="w-full h-16 rounded-2xl bg-white/5" />
          <div className="space-y-3 pt-2">
            <div className="w-full h-8 rounded-xl bg-white/5" />
            <div className="w-full h-8 rounded-xl bg-white/5" />
            <div className="w-full h-8 rounded-xl bg-white/5" />
          </div>
          <div className="w-full h-10 rounded-xl bg-white/10" />
        </div>

        {/* Gauge Chart Skeleton */}
        <div className="h-96 rounded-3xl bg-white/[0.04] border border-white/5 p-6 flex flex-col justify-between">
          <div className="flex justify-between pb-4 border-b border-white/5">
            <div className="w-44 h-6 rounded-lg bg-white/10" />
            <div className="w-24 h-5 rounded-full bg-white/5" />
          </div>
          <div className="w-48 h-24 rounded-t-full border-8 border-white/10 mx-auto" />
          <div className="space-y-2 pt-4 border-t border-white/5">
            <div className="w-full h-8 rounded-xl bg-white/5" />
            <div className="w-full h-8 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>

      {/* Operations Table Skeleton */}
      <div className="w-full h-72 rounded-3xl bg-white/[0.04] border border-white/5 p-6 space-y-4">
        <div className="flex justify-between pb-4 border-b border-white/5">
          <div className="w-64 h-6 rounded-lg bg-white/10" />
          <div className="w-40 h-8 rounded-xl bg-white/5" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-10 rounded-xl bg-white/[0.02]" />
        ))}
      </div>
    </main>
  );
}
