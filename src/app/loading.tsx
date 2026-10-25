import { DockSkeleton } from "./_components/ui/skeletons/DockSkeleton";

export default function OverviewLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <DockSkeleton itemCount={3} />

      {/* Main Structure-Mirroring Skeleton */}
      <main className="flex flex-col items-center w-full max-w-6xl mx-auto pt-4 md:pt-8 animate-pulse">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full pb-12">
          <div className="w-64 h-8 rounded-full bg-white/10 mb-6" />
          <div className="w-3/4 max-w-2xl h-12 rounded-2xl bg-white/10 mb-3" />
          <div className="w-1/2 max-w-md h-10 rounded-2xl bg-white/10 mb-5" />
          <div className="w-full max-w-xl h-14 rounded-xl bg-white/5 mb-8" />
          <div className="flex items-center justify-center gap-4">
            <div className="w-48 h-12 rounded-full bg-white/10" />
            <div className="w-40 h-12 rounded-full bg-white/5" />
          </div>
        </div>

        {/* 3-Role Cards Skeleton */}
        <div className="w-full mb-16">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
              <div className="w-28 h-4 rounded bg-white/10" />
              <div className="w-72 h-8 rounded-xl bg-white/10" />
            </div>
            <div className="w-80 h-10 rounded-lg bg-white/5 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white/[0.04] border border-white/5 h-84 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/10" />
                    <div className="w-24 h-6 rounded-full bg-white/5" />
                  </div>
                  <div className="w-44 h-6 rounded-lg bg-white/10" />
                  <div className="w-full h-12 rounded bg-white/5" />
                  <div className="space-y-2 pt-2">
                    <div className="w-full h-4 rounded bg-white/5" />
                    <div className="w-3/4 h-4 rounded bg-white/5" />
                  </div>
                </div>
                <div className="w-full h-9 rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        {/* 3-Pillar Cards Skeleton */}
        <div className="w-full mb-16">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
              <div className="w-28 h-4 rounded bg-white/10" />
              <div className="w-64 h-8 rounded-xl bg-white/10" />
            </div>
            <div className="w-80 h-10 rounded-lg bg-white/5 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white/[0.04] border border-white/5 h-64 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/10" />
                    <div className="w-24 h-6 rounded-full bg-white/5" />
                  </div>
                  <div className="w-40 h-6 rounded-lg bg-white/10" />
                  <div className="w-full h-12 rounded bg-white/5" />
                </div>
                <div className="w-full h-6 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="w-full p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/5 h-48 mb-12 flex flex-col md:flex-row justify-between items-center gap-6" />
      </main>
    </div>
  );
}
