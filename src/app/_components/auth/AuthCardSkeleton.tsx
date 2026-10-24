export function AuthCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="max-w-xl w-full mx-auto relative rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-7 sm:p-9 md:p-11 space-y-6 animate-pulse"
    >
      {/* Header wireframe */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-56 h-7 rounded-full bg-white/10" />
        <div className="w-64 h-9 rounded-2xl bg-white/15" />
        <div className="w-80 max-w-full h-5 rounded-lg bg-white/5" />
      </div>

      {/* Role toggle wireframe */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 h-16">
        <div className="rounded-xl bg-white/10" />
        <div className="rounded-xl bg-white/5" />
      </div>

      {/* Input fields wireframe */}
      <div className="space-y-4">
        <div className="w-full h-12 rounded-xl bg-white/10" />
        <div className="w-full h-12 rounded-xl bg-white/10" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 rounded-xl bg-white/10" />
          <div className="h-12 rounded-xl bg-white/10" />
        </div>
        <div className="w-full h-2 rounded-full bg-white/10" />
      </div>

      {/* Button wireframe */}
      <div className="w-full h-14 rounded-xl bg-white/15" />
    </div>
  );
}
