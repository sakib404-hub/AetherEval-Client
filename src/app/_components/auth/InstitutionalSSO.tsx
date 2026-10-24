"use client";

interface InstitutionalSSOProps {
  onSelectProvider?: (provider: string) => void;
}

export function InstitutionalSSO({ onSelectProvider }: InstitutionalSSOProps) {
  const handleProviderClick = (name: string) => {
    if (onSelectProvider) {
      onSelectProvider(name);
    } else {
      alert(`Initializing ${name} institutional credential handshake...`);
    }
  };

  return (
    <div className="space-y-3 pt-3 border-t border-white/10">
      <div className="relative flex items-center justify-center">
        <span className="font-headline text-[10px] uppercase tracking-wider text-on-surface-variant bg-[#110c1f] px-3 z-10 rounded-full border border-white/10">
          Or Authenticate via Institutional SSO
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={() => handleProviderClick("Google Workspace (.edu)")}
          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-on-surface-variant hover:text-white flex items-center justify-center gap-2 text-xs font-headline transition-all cursor-pointer"
          title="Google Workspace for Education"
        >
          <span className="material-symbols-outlined text-lg text-rose-400">
            account_circle
          </span>
          <span className="hidden sm:inline">Google .edu</span>
        </button>

        <button
          type="button"
          onClick={() => handleProviderClick("GitHub Education")}
          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-on-surface-variant hover:text-white flex items-center justify-center gap-2 text-xs font-headline transition-all cursor-pointer"
          title="GitHub Student / Faculty Pack"
        >
          <span className="material-symbols-outlined text-lg text-purple-300">
            code
          </span>
          <span className="hidden sm:inline">GitHub Edu</span>
        </button>

        <button
          type="button"
          onClick={() => handleProviderClick("ORCID Researcher ID")}
          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-on-surface-variant hover:text-white flex items-center justify-center gap-2 text-xs font-headline transition-all cursor-pointer"
          title="ORCID Persistent Researcher Identifier"
        >
          <span className="material-symbols-outlined text-lg text-emerald-400">
            badge
          </span>
          <span className="hidden sm:inline">ORCID ID</span>
        </button>
      </div>
    </div>
  );
}
