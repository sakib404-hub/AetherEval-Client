"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassButton } from "../ui/GlassButton";

interface TopNavbarProps {
  nodeLabel?: string;
}

export function TopNavbar({ nodeLabel = "Node v2.4" }: TopNavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Portal", href: "/" },
    { label: "Submit", href: "/submit" },
    { label: "History", href: "/history" },
    { label: "Reviews", href: "/reviews" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <header className="bg-surface-dim/60 dark:bg-surface-dim/60 backdrop-blur-xl sticky top-0 z-50 w-full border-b border-outline-variant/30 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)]">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-container via-purple-600 to-primary flex items-center justify-center shadow-[0_0_18px_rgba(124,58,237,0.6)] border border-white/20 transition-transform duration-200 group-hover:scale-105">
            <span className="material-symbols-outlined text-white text-xl">
              auto_awesome
            </span>
          </div>
          <span className="text-headline-sm font-headline font-bold tracking-tight text-white flex items-center gap-2">
            AetherEval
            <span className="text-[10px] font-headline font-bold tracking-widest text-primary uppercase bg-primary-container/20 border border-primary-container/40 px-2 py-0.5 rounded-full">
              {nodeLabel}
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline text-label-md transition-colors duration-200 pb-1 ${
                  isActive
                    ? "text-primary border-b-2 border-primary font-semibold shadow-[0_1px_12px_rgba(124,58,237,0.4)]"
                    : "text-on-surface-variant hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Trailing Actions Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Docs Link */}
          <Link
            href="#docs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-label-sm font-headline text-on-surface-variant hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all duration-150 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">
              description
            </span>
            Docs
          </Link>

          {/* Notifications Button */}
          <button
            type="button"
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#7c3aed]" />
          </button>

          {/* Help Center Button */}
          <button
            type="button"
            aria-label="Help and guidelines"
            className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              help_outline
            </span>
          </button>

          <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />

          {/* Connect ID Primary Action */}
          <GlassButton
            variant="primary"
            size="md"
            icon="fingerprint"
            className="shadow-[0_0_24px_rgba(124,58,237,0.5)]"
          >
            Connect ID
          </GlassButton>
        </div>
      </div>
    </header>
  );
}
