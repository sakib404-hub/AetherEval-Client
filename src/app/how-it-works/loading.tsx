import { DockSkeleton } from "../_components/ui/skeletons/DockSkeleton";

export default function HowItWorksLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <DockSkeleton itemCount={3} />

      {/* Main Structure-Mirroring Skeleton */}
      <main className="flex flex-col items-center w-full max-w-6xl mx-auto pt-4 md:pt-8 animate-pulse">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full pb-10">
          <div className="w-72 h-8 rounded-full bg-white/10 mb-6" />
          <div className="w-3/4 max-w-2xl h-12 rounded-2xl bg-white/10 mb-4" />
          <div className="w-full max-w-xl h-14 rounded-xl bg-white/5 mb-8" />
          
          {/* 4 Time indicator pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 h-20 flex flex-col justify-between"
              >
                <div className="w-16 h-3 rounded bg-white/10 mx-auto" />
                <div className="w-20 h-6 rounded bg-white/10 mx-auto" />
                <div className="w-24 h-3 rounded bg-white/5 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* TimeFlowTracker Card Skeleton */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/5 mb-16 space-y-6">
          <div className="flex justify-between items-center pb-6 border-b border-white/5">
            <div className="space-y-2">
              <div className="w-32 h-4 rounded bg-white/10" />
              <div className="w-64 h-7 rounded-xl bg-white/10" />
            </div>
            <div className="w-48 h-8 rounded-full bg-white/5 hidden sm:block" />
          </div>

          <div className="w-full h-2 rounded-full bg-white/5" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 h-16" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
            <div className="md:col-span-2 space-y-4">
              <div className="w-48 h-6 rounded-full bg-white/10" />
              <div className="w-80 h-8 rounded bg-white/10" />
              <div className="w-full h-16 rounded bg-white/5" />
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 h-44" />
          </div>
        </div>

        {/* TimelineFlowCards Skeleton */}
        <div className="w-full mb-16 space-y-8 pl-6 sm:pl-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/5 h-64 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div className="w-48 h-6 rounded-full bg-white/10" />
                <div className="w-36 h-4 rounded bg-white/5" />
              </div>
              <div className="space-y-2">
                <div className="w-64 h-7 rounded bg-white/10" />
                <div className="w-full h-12 rounded bg-white/5" />
              </div>
              <div className="w-full h-8 rounded bg-white/5" />
            </div>
          ))}
        </div>

        {/* Criteria Matrix Skeleton */}
        <div className="w-full mb-16">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
              <div className="w-28 h-4 rounded bg-white/10" />
              <div className="w-72 h-8 rounded-xl bg-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white/[0.04] border border-white/5 h-80 flex flex-col justify-between"
              />
            ))}
          </div>
        </div>

        {/* Turnaround Benchmark Skeleton */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/5 mb-16 h-64" />

        {/* CTA Skeleton */}
        <div className="w-full p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/5 h-48 mb-12 flex flex-col md:flex-row justify-between items-center gap-6" />
      </main>
    </div>
  );
}
