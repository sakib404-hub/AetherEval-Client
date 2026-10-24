export default function StudentSubmitLoading() {
  return (
    <main className="max-w-6xl mx-auto w-full space-y-6 pt-2 animate-pulse" aria-hidden="true">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="w-64 h-8 rounded-2xl bg-white/10" />
          <div className="w-80 h-4 rounded-lg bg-white/5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 h-[600px] rounded-3xl bg-white/[0.04] border border-white/5 p-8 space-y-5">
          <div className="w-48 h-6 rounded bg-white/10" />
          <div className="w-full h-12 rounded-xl bg-white/10" />
          <div className="w-full h-12 rounded-xl bg-white/10" />
          <div className="w-full h-24 rounded-xl bg-white/5" />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="h-[320px] rounded-3xl bg-white/[0.04] border border-white/5 p-6 space-y-4" />
          <div className="h-20 rounded-3xl bg-white/[0.04] border border-white/5" />
        </div>
      </div>
    </main>
  );
}
