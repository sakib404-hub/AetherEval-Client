import { DockSkeleton } from "./_components/ui/skeletons/DockSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <DockSkeleton itemCount={3} />

      {/* Main content placeholder */}
      <main className="max-w-4xl mx-auto w-full pt-12 animate-pulse">
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-6 rounded-full bg-white/10" />
            <div className="w-24 h-4 rounded bg-white/5" />
          </div>
          <div className="w-56 h-10 rounded-2xl bg-white/10" />
          <div className="w-full max-w-lg h-6 rounded-xl bg-white/5" />
        </div>
      </main>
    </div>
  );
}
