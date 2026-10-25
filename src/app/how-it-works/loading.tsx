import { DockSkeleton } from "../_components/ui/skeletons/DockSkeleton";

export default function HowItWorksLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <DockSkeleton itemCount={3} />

      {/* Main Structure-Mirroring Curvy Skeleton */}
      <main className="flex flex-col items-center w-full max-w-5xl mx-auto pt-4 md:pt-8 animate-pulse px-4">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full pb-8">
          <div className="w-56 h-7 rounded-full bg-white/10 mb-5" />
          <div className="w-3/4 max-w-2xl h-12 rounded-2xl bg-white/10 mb-4" />
          <div className="w-full max-w-md h-5 rounded bg-white/5 mb-2" />
        </div>

        {/* Curvy Workflow Road Skeleton (Alternating 4 Milestones) */}
        <div className="w-full my-8 space-y-12 sm:space-y-16">
          {[...Array(4)].map((_, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Circular Node Skeleton */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 shrink-0" />

                {/* Curved Glass Card Skeleton */}
                <div className="w-full lg:w-[460px] rounded-[32px] p-6 sm:p-7 bg-white/[0.04] border border-white/5 space-y-3.5">
                  <div className="flex justify-between items-center pb-2">
                    <div className="w-28 h-6 rounded-full bg-white/10" />
                    <div className="w-32 h-4 rounded bg-white/5" />
                  </div>
                  <div className="w-52 h-6 rounded-lg bg-white/10" />
                  <div className="w-full h-10 rounded bg-white/5" />
                  <div className="pt-3 border-t border-white/5 flex justify-between">
                    <div className="w-40 h-4 rounded bg-white/10" />
                    <div className="w-24 h-4 rounded bg-white/5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curvy Criteria Pills Skeleton */}
        <div className="w-full my-12">
          <div className="text-center mb-6 space-y-2">
            <div className="w-24 h-4 rounded bg-white/10 mx-auto" />
            <div className="w-64 h-7 rounded-xl bg-white/10 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-[24px] bg-white/[0.03] border border-white/5 h-20"
              />
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="w-full p-8 sm:p-12 rounded-[32px] bg-white/[0.04] border border-white/5 h-44 mb-16" />
      </main>
    </div>
  );
}
