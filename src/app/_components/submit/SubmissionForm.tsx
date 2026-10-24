"use client";

import { useState } from "react";
import Link from "next/link";
import { TrackSelector, TrackType } from "./TrackSelector";
import { TechStackTagManager } from "./TechStackTagManager";
import { CodeFreezeNotice } from "./CodeFreezeNotice";

export function SubmissionForm() {
  const [title, setTitle] = useState("AetherGrid: Quantum-Resistant DHT Protocol");
  const [track, setTrack] = useState<TrackType>("distributed");
  const [repoUrl, setRepoUrl] = useState("https://github.com/aether-nodes/aethergrid-quantum-dht");
  const [demoUrl, setDemoUrl] = useState("https://demo.vercel.app/aethergrid");
  const [abstract, setAbstract] = useState(
    "A zero-knowledge distributed hash table providing post-quantum Byzantine fault tolerance across unstructured academic peer overlays. Leverages state-pruning micro-rollups and lattice polynomial cryptography for state replication guarantees."
  );
  const [tags, setTags] = useState<string[]>(["Rust", "WebAssembly", "Next.js", "Solidity"]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [freezeSuccess, setFreezeSuccess] = useState<string | null>(null);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate SHA-256 Merkle repository tree hashing
    setTimeout(() => {
      setIsSubmitting(false);
      setFreezeSuccess("0x9f8a2c41e8840b2a95c8614e0bbd3910f54e12da84");
    }, 1200);
  };

  if (freezeSuccess) {
    return (
      <div className="rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/15 p-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(52,211,153,0.35)]">
          <span className="material-symbols-outlined text-3xl">lock</span>
        </div>
        <div>
          <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
            SHA-256 Freeze Attested
          </span>
          <h3 className="font-headline text-headline-sm font-bold text-white mt-3 mb-1">
            Project Codebase Successfully Frozen!
          </h3>
          <p className="font-body text-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
            Your repository commit tree has been permanently locked for double-blind review.
            Any subsequent commits to the branch will be flagged by the oracle consensus engine.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-1 font-mono text-body-xs max-w-md mx-auto">
          <div className="text-on-surface-variant text-[11px]">IMMUTABLE MERKLE HASH:</div>
          <div className="text-primary break-all">{freezeSuccess}</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/student-dashboard"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-container to-[#4C1D95] text-white font-headline text-body-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all inline-flex items-center gap-2"
          >
            <span>View in Submission Ledger</span>
            <span className="material-symbols-outlined text-base">folder_managed</span>
          </Link>
          <button
            type="button"
            onClick={() => setFreezeSuccess(null)}
            className="px-5 py-3 rounded-full bg-white/[0.05] border border-white/15 text-on-surface-variant hover:text-white transition-all text-body-sm font-headline"
          >
            Submit Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/15 p-6 md:p-8 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] relative overflow-hidden">
      {/* Specular Highlight Edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Form Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-headline-sm text-white font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">memory</span>
            Submit Project Details
          </h2>
          <span className="text-xs font-headline text-primary bg-primary-container/20 border border-primary/30 px-2.5 py-1 rounded-full">
            Step 1 of 2
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant mt-1">
          Register your cryptographic repository, autonomous builds, and live deployment nodes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 1. Project Title */}
        <div className="space-y-1.5">
          <label className="block font-headline text-label-md text-on-surface-variant">
            Project Title <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              folder_code
            </span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AetherGrid: Quantum-Resistant DHT Protocol"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body"
            />
          </div>
        </div>

        {/* 2. Track Selector */}
        <TrackSelector selectedTrack={track} onSelectTrack={setTrack} />

        {/* 3. GitHub Repository URL */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-headline text-label-md text-on-surface-variant">
              GitHub Repository URL <span className="text-primary">*</span>
            </label>
            <span className="text-[11px] font-headline text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              Verified Git Synced
            </span>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              terminal
            </span>
            <input
              type="url"
              required
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body"
            />
          </div>
          <p className="text-[11px] text-outline mt-1 font-body">
            Must be public after submission deadline or grant deploy access to bot@aethereval.net
          </p>
        </div>

        {/* 4. Live Deployment Link */}
        <div className="space-y-1.5">
          <label className="block font-headline text-label-md text-on-surface-variant">
            Live Deployment Link
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              language
            </span>
            <input
              type="text"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://demo.vercel.app or ipfs://QmZ..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body"
            />
          </div>
        </div>

        {/* 5. Project Description & Counter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-headline text-label-md text-on-surface-variant">
              Abstract & Architecture Summary
            </label>
            <span className="text-[11px] font-headline text-outline">
              {abstract.length} / 1000
            </span>
          </div>
          <textarea
            rows={4}
            value={abstract}
            maxLength={1000}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Summarize your evaluation thesis, algorithmic invariants, and verification steps..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body leading-relaxed"
          />
        </div>

        {/* 6. Technical Stack Tags */}
        <TechStackTagManager
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />

        {/* Rate Limit Warning Banner */}
        <CodeFreezeNotice />

        {/* Action Button Cluster */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-[#4C1D95] text-white font-headline font-semibold shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.8)] border border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-xl">
              {isSubmitting ? "hourglass_empty" : "rocket_launch"}
            </span>
            <span>{isSubmitting ? "Freezing Codebase SHA-256..." : "Submit for Review"}</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Draft state cached to local node storage.")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-headline font-medium backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">drafts</span>
            <span>Save Draft</span>
          </button>
        </div>
      </form>
    </div>
  );
}
