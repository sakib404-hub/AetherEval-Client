export function OracleMeshCard() {
  return (
    <div className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-[0_8px_32px_0_rgba(124,58,237,0.15)]">
      <div className="flex items-center gap-3.5">
        <span className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse" />
        <div>
          <div className="text-xs font-headline font-semibold text-white">
            Evaluation Oracle Mesh
          </div>
          <div className="text-[11px] font-mono text-outline">
            Cluster #71 — Operational (99.98% SLA)
          </div>
        </div>
      </div>

      <span className="text-[10px] font-headline font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
        LIVE
      </span>
    </div>
  );
}
