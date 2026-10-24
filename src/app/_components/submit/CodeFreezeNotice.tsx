export function CodeFreezeNotice() {
  return (
    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-200">
      <span className="material-symbols-outlined text-amber-400 mt-0.5 text-lg shrink-0">
        shield
      </span>
      <div className="leading-relaxed">
        <strong className="font-semibold text-amber-300">Rate Limit Active:</strong> Max 5
        submissions/hr. Single active pending submission allowed under quantum ledger lock.
        Upon confirmation, commit tree is cryptographically frozen via SHA-256 fingerprinting.
      </div>
    </div>
  );
}
