import { StatusBadge } from "../ui/StatusBadge";
import { GlassButton } from "../ui/GlassButton";
import { MetricCard } from "./overview/MetricCard";
import { ProtocolHighlightCard } from "./overview/ProtocolHighlightCard";

export function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative flex flex-col items-center pt-8 md:pt-14 pb-16 scroll-mt-24 max-w-6xl mx-auto w-full"
    >
      {/* Protocol Live Pulse Pill */}
      <div className="mb-6 inline-flex items-center gap-2">
        <StatusBadge
          variant="node"
          label="AetherEval Protocol v2.4 • Mainnet Active"
          icon="verified"
          pulse
        />
      </div>

      {/* Hero Headline with Specular Text Gradient */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-headline-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-primary leading-[1.15]">
          Academic Project Evaluation & Peer Consensus Ledger
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant mt-5 max-w-2xl mx-auto leading-relaxed">
          Cryptographically verified student research submissions, double-blind mentor
          evaluations, and immutable academic credentials—crafted with optical
          glassmorphism and kinetic inertia.
        </p>
      </div>

      {/* Main CTA Cluster */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        <a href="#auth">
          <GlassButton
            variant="primary"
            size="lg"
            icon="how_to_reg"
            className="shadow-[0_0_28px_rgba(124,58,237,0.45)] hover:shadow-[0_0_36px_rgba(124,58,237,0.65)]"
          >
            Register Academic Node
          </GlassButton>
        </a>

        <a href="#how-it-works">
          <GlassButton variant="frosted" size="lg" icon="schema">
            Explore Protocol Flow
          </GlassButton>
        </a>

        <a
          href="#auth"
          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-body-sm font-headline text-on-surface-variant hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">login</span>
          Sign In Existing Node
        </a>
      </div>

      {/* Protocol Live Metrics Matrix (4 Atomic Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
        <MetricCard
          label="Attested Project Artifacts"
          value="1,420+"
          trend="+28% this term"
          icon="folder_zip"
          subtext="Cryptographically frozen repository trees"
        />
        <MetricCard
          label="Verified Research Mentors"
          value="360+"
          trend="+14% verified"
          icon="supervisor_account"
          subtext="Active across 24 global university nodes"
        />
        <MetricCard
          label="Double-Blind Consensus"
          value="99.98%"
          trend="0.04s latency"
          icon="balance"
          subtext="Zero-bias evaluation rubric agreement"
        />
        <MetricCard
          label="Ledger Integrity Rate"
          value="100%"
          trend="SHA-256 Merkle"
          icon="security"
          subtext="Tamper-proof academic verification receipts"
        />
      </div>

      {/* Protocol Architectural Pillars (3 Atomic Cards) */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
              Core Capabilities
            </div>
            <h2 className="font-headline text-headline-md font-bold text-white">
              Institutional Evaluation Architecture
            </h2>
          </div>
          <p className="font-body text-body-sm text-on-surface-variant max-w-md">
            Built for universities, hackathons, and research consortiums seeking
            objective, verifiable peer evaluation standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProtocolHighlightCard
            title="Dual-Role Node Attestation"
            description="Students gain instant Git submission access via verified academic emails, while mentor applicants undergo peer credential review."
            badgeText="Role Governance"
            badgeVariant="node"
            icon="admin_panel_settings"
            metricLabel="Verification SLA"
            metricValue="Instant (.edu) / 24h (Mentor)"
          />

          <ProtocolHighlightCard
            title="Double-Blind Evaluation Queue"
            description="All student identifying metadata is anonymized before routing into the mentor evaluation pool to guarantee strictly meritocratic scoring."
            badgeText="Unbiased Scoring"
            badgeVariant="info"
            icon="visibility_off"
            metricLabel="Rubric Dimensions"
            metricValue="Architecture • Code • Novelty"
          />

          <ProtocolHighlightCard
            title="Immutable Attestation Ledger"
            description="Every submitted score, reviewer comment, and rubric breakdown is permanently timestamped and cryptographically linked."
            badgeText="Audit-Ready"
            badgeVariant="approved"
            icon="receipt_long"
            metricLabel="Receipt Standard"
            metricValue="SHA-256 Merkle Anchor"
          />
        </div>
      </div>
    </section>
  );
}
