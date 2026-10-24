export function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-7 sm:p-9 md:p-11 w-full max-w-xl mx-auto animate-pulse space-y-6"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-36 rounded-full bg-white/10" />
        <div className="h-9 w-64 rounded-xl bg-white/10" />
        <div className="h-4 w-80 rounded bg-white/5" />
      </div>

      <div className="h-14 rounded-2xl bg-white/5" />

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-white/10" />
          <div className="h-12 rounded-xl bg-white/5" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-36 rounded bg-white/10" />
          <div className="h-12 rounded-xl bg-white/5" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-white/10" />
          <div className="h-12 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="h-14 rounded-xl bg-white/10" />
    </div>
  );
}
