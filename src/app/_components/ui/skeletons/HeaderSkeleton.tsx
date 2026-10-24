export function HeaderSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-surface-dim/40 backdrop-blur-xl w-full border-b border-white/5 h-20 animate-pulse"
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10" />
          <div className="h-5 w-28 rounded-lg bg-white/10" />
          <div className="h-5 w-16 rounded-full bg-white/5 hidden sm:block" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="h-4 w-14 rounded bg-white/10" />
          <div className="h-4 w-14 rounded bg-white/10" />
          <div className="h-4 w-14 rounded bg-white/10" />
          <div className="h-4 w-14 rounded bg-white/10" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10" />
          <div className="h-10 w-28 rounded-full bg-white/10 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
