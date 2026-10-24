export function DockSkeleton({ itemCount = 2 }: { itemCount?: number }) {
  const isCompact = itemCount <= 3;

  return (
    <div
      aria-hidden="true"
      className={`hidden md:flex flex-col items-center w-20 md:w-22 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/5 m-4 z-30 fixed left-4 animate-pulse ${
        isCompact
          ? "top-1/2 -translate-y-1/2 h-auto pt-10 pb-8 gap-4"
          : "top-4 h-[calc(100vh-2rem)] pt-14 pb-14 justify-center"
      }`}
    >
      {/* Navigation options skeleton */}
      <div className="flex flex-col items-center gap-3 w-full px-2.5">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div key={i} className="w-full h-12 rounded-2xl bg-white/10" />
        ))}
      </div>
    </div>
  );
}
