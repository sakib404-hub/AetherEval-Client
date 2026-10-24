import { WorkflowStepCard } from "./how-it-works/WorkflowStepCard";
import { EvaluationPreviewCard } from "./how-it-works/EvaluationPreviewCard";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative flex flex-col items-center pt-16 pb-20 scroll-mt-24 max-w-6xl mx-auto w-full"
    >
      {/* Section Eyebrow & Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-2">
          System Protocol Lifecycle
        </div>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-headline-lg font-bold tracking-tight text-white mb-4">
          How AetherEval Orchestrates Academic Evaluation
        </h2>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          From initial institutional identity attestation to immutable cryptographic
          consensus, each stage is engineered to eliminate evaluation bias and protect
          academic integrity.
        </p>
      </div>

      {/* 3-Step Interactive Workflow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-14">
        <WorkflowStepCard
          stepNumber="STEP 01"
          title="Node Identity Attestation"
          description="Students authenticate via institutional .edu emails for instant repo submission rights. Mentor applicants submit academic qualifications for consensus validation."
          icon="fingerprint"
          badgeText="Stage 1 • Auth"
          badgeVariant="node"
          bullets={[
            "Instant institutional domain (.edu) verification",
            "Dual-role permissions (Student vs Review Mentor)",
            "Zero-knowledge proof session authentication",
          ]}
        />

        <WorkflowStepCard
          stepNumber="STEP 02"
          title="Cryptographic Code Freeze"
          description="Students submit repository links, project abstracts, and deployment artifacts. Upon confirmation, the Git commit tree is locked with a SHA-256 Merkle fingerprint."
          icon="lock_clock"
          badgeText="Stage 2 • Freeze"
          badgeVariant="pending"
          bullets={[
            "Immutable repository commit hash anchoring",
            "Automatic branch locking prevents retroactive edits",
            "Artifact integrity timestamps permanently recorded",
          ]}
        />

        <WorkflowStepCard
          stepNumber="STEP 03"
          title="Double-Blind Consensus"
          description="Projects enter the peer evaluation pool stripped of identifying metadata. Mentors score along multi-dimensional rubrics, anchoring final grades to the ledger."
          icon="fact_check"
          badgeText="Stage 3 • Consensus"
          badgeVariant="approved"
          bullets={[
            "Metadata blinded to guarantee impartial review",
            "3-mentor independent consensus with outlier rejection",
            "Verifiable cryptographic attestation certificates",
          ]}
        />
      </div>

      {/* Live Interactive Evaluation Simulation Showcase */}
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase">
              Interactive Rubric Simulation
            </div>
            <h3 className="font-headline text-headline-sm font-semibold text-white">
              Simulated Double-Blind Evaluation Matrix
            </h3>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-body-xs font-headline text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Consensus Oracle Ready
          </span>
        </div>

        <EvaluationPreviewCard />
      </div>
    </section>
  );
}
