import Link from "next/link";

export function GlassFooter() {
  return (
    <footer className="w-full mt-16 border-t border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_-8px_32px_0_rgba(124,58,237,0.15)]">
      <div className="w-full py-8 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">
              terminal
            </span>
            <span className="text-headline-sm font-headline text-primary font-bold">
              AetherEval
            </span>
          </div>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <p className="text-body-sm font-body text-on-surface-variant max-w-md">
            © 2025 AetherEval Academic Network. All rights reserved.
            Quantum-encrypted evaluation nodes.
          </p>
        </div>

        {/* Links & System Status */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center justify-center gap-6 text-label-md font-headline"
        >
          <Link
            href="#protocol"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 hover:underline"
          >
            Evaluation Protocol
          </Link>
          <Link
            href="#privacy"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 hover:underline"
          >
            Data Privacy
          </Link>
          <Link
            href="#ethics"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 hover:underline"
          >
            Institutional Ethics
          </Link>
          <div className="flex items-center gap-1.5 text-primary font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Consensus Synchronized</span>
          </div>
        </nav>
      </div>
    </footer>
  );
}
