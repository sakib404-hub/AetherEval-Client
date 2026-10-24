"use client";

interface MentorFieldsProps {
  expertise: string;
  setExpertise: (val: string) => void;
  portfolio: string;
  setPortfolio: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
}

export function MentorFields({
  expertise,
  setExpertise,
  portfolio,
  setPortfolio,
  bio,
  setBio,
}: MentorFieldsProps) {
  return (
    <div className="space-y-4 pt-3 border-t border-white/10 transition-all duration-300">
      {/* Callout Alert Notice */}
      <div className="bg-amber-500/10 text-amber-200 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
        <span className="material-symbols-outlined text-amber-300 text-xl flex-shrink-0 mt-0.5">
          shield
        </span>
        <div className="space-y-1 font-body text-body-sm">
          <span className="font-headline text-xs font-bold text-amber-300 uppercase tracking-wider block">
            Mentor Application Notice
          </span>
          <p className="text-amber-200/90 leading-relaxed">
            Mentor accounts undergo manual verification by the institutional ethics & review board
            within 24-48 hours.
          </p>
        </div>
      </div>

      {/* Technical Expertise */}
      <div className="space-y-1.5">
        <label className="block font-headline text-label-md text-on-surface">
          Area of Technical Expertise
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            code
          </span>
          <input
            type="text"
            required
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g., React, Express, PostgreSQL, Machine Learning, Systems Architecture"
            className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Portfolio / GitHub Profile Link */}
      <div className="space-y-1.5">
        <label className="block font-headline text-label-md text-on-surface">
          Portfolio or GitHub Profile Link
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            link
          </span>
          <input
            type="url"
            required
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://github.com/username or https://portfolio.dev"
            className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Short Bio / Mentorship Background */}
      <div className="space-y-1.5">
        <label className="block font-headline text-label-md text-on-surface">
          Short Bio / Mentorship Background
        </label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Briefly describe your research interests, industry experience, and prior mentorship involvement..."
          className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl px-4 py-3 transition-all duration-200 outline-none resize-none"
        />
      </div>
    </div>
  );
}
