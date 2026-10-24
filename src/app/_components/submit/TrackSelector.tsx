"use client";

export type TrackType = "distributed" | "aiml" | "crypto";

interface TrackSelectorProps {
  selectedTrack: TrackType;
  onSelectTrack: (track: TrackType) => void;
}

export function TrackSelector({ selectedTrack, onSelectTrack }: TrackSelectorProps) {
  const tracks: { id: TrackType; label: string; icon: string }[] = [
    { id: "distributed", label: "Distributed Systems", icon: "hub" },
    { id: "aiml", label: "AI/ML Infrastructure", icon: "psychology" },
    { id: "crypto", label: "Cryptographic Security", icon: "enhanced_encryption" },
  ];

  return (
    <div>
      <label className="block font-headline text-label-md text-on-surface-variant mb-2">
        Evaluation Track <span className="text-primary">*</span>
      </label>
      <div className="flex flex-wrap gap-2.5">
        {tracks.map((t) => {
          const isSelected = selectedTrack === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTrack(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-headline font-medium border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-primary-container/80 to-purple-800/80 border-primary text-white shadow-[0_0_16px_rgba(124,58,237,0.45)]"
                  : "border-white/10 bg-white/[0.04] text-on-surface-variant hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {t.icon}
              </span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
