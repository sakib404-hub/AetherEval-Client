"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "../ui/GlassCard";
import { GlassButton } from "../ui/GlassButton";
import { StatusBadge } from "../ui/StatusBadge";
import { GlassInput } from "../ui/GlassInput";

export function HomeHero() {
  const [demoInput, setDemoInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyNodeId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-12 md:py-16 text-center">
      {/* System Status Pill */}
      <div className="mb-6 inline-flex items-center gap-2">
        <StatusBadge
          variant="node"
          label="Academic Evaluation Protocol v2.4"
          icon="verified"
          pulse
        />
      </div>

      {/* Hero Headline with Specular Text Gradient */}
      <h1 className="font-headline mb-4 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-primary sm:text-5xl md:text-headline-xl">
        AetherEval Network
      </h1>

      {/* Descriptive Subtitle */}
      <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-xl leading-relaxed">
        Next-generation quantum-attested academic project evaluation and peer
        review platform, styled with optical glassmorphism and kinetic inertia.
      </p>

      {/* Quick Navigation Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
        <Link href="/register" className="group">
          <GlassCard
            interactive
            className="p-5 text-left h-full border-white/10 group-hover:border-primary/40 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
                how_to_reg
              </span>
              <StatusBadge variant="info" label="Stage 3" />
            </div>
            <div className="font-headline text-body-md font-semibold text-white group-hover:text-primary transition-colors">
              Registration Portal
            </div>
            <p className="font-body text-body-sm text-on-surface-variant mt-1">
              Student instant signup & mentor application flow
            </p>
          </GlassCard>
        </Link>

        <Link href="/submit" className="group">
          <GlassCard
            interactive
            className="p-5 text-left h-full border-white/10 group-hover:border-primary/40 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
                cloud_upload
              </span>
              <StatusBadge variant="pending" label="Stage 4" />
            </div>
            <div className="font-headline text-body-md font-semibold text-white group-hover:text-primary transition-colors">
              Student Submission
            </div>
            <p className="font-body text-body-sm text-on-surface-variant mt-1">
              Quantum repository sync & evaluation guidelines
            </p>
          </GlassCard>
        </Link>

        <Link href="/reviews" className="group">
          <GlassCard
            interactive
            className="p-5 text-left h-full border-white/10 group-hover:border-primary/40 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
                fact_check
              </span>
              <StatusBadge variant="approved" label="Stage 5" />
            </div>
            <div className="font-headline text-body-md font-semibold text-white group-hover:text-primary transition-colors">
              Mentor Dashboard
            </div>
            <p className="font-body text-body-sm text-on-surface-variant mt-1">
              Review queue, track filters & audit receipts
            </p>
          </GlassCard>
        </Link>
      </div>

      {/* Stage 2 UI Primitives Interactive Showcase */}
      <GlassCard level={2} interactive className="w-full text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="font-headline text-headline-sm font-semibold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                token
              </span>
              Core Design System Primitives
            </h2>
            <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
              Atomic components with specular glass refraction and ambient hover
              bloom
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge variant="approved" label="Approved" />
            <StatusBadge variant="pending" label="Pending" />
            <StatusBadge variant="rejected" label="Rejected" />
          </div>
        </div>

        {/* Input Demo with Action */}
        <div className="space-y-4">
          <GlassInput
            label="Academic Node ID / ENS Address"
            icon="fingerprint"
            placeholder="0x71C...a429 or elena.vance@mit.edu"
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
            hint="Input fields feature dynamic violet focus halos and backdrop filtration"
            rightElement={
              <GlassButton
                variant="primary"
                size="sm"
                icon={copied ? "check" : "content_copy"}
                onClick={handleCopyNodeId}
              >
                {copied ? "Copied" : "Copy"}
              </GlassButton>
            }
          />
        </div>

        {/* Button Variants Cluster */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <GlassButton variant="primary" size="md" icon="rocket_launch">
            Primary Gradient
          </GlassButton>
          <GlassButton variant="frosted" size="md" icon="drafts">
            Frosted Glass
          </GlassButton>
          <GlassButton variant="success" size="md" icon="check_circle">
            Approve Node
          </GlassButton>
          <GlassButton variant="destructive" size="md" icon="cancel">
            Reject Node
          </GlassButton>
          <GlassButton variant="icon" aria-label="Notifications" icon="notifications" />
        </div>
      </GlassCard>
    </section>
  );
}
