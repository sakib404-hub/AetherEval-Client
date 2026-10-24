"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

const PUBLIC_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", href: "/", icon: "dashboard" },
  { id: "how-it-works", label: "How It Works", href: "/how-it-works", icon: "schema" },
  { id: "login", label: "Login / Register", href: "/login", icon: "how_to_reg" },
];

const STUDENT_DASHBOARD_NAV_ITEMS: NavItem[] = [
  { id: "history", label: "History", href: "/student-dashboard", icon: "folder_managed" },
  { id: "submit", label: "Submit", href: "/student-dashboard/submit", icon: "cloud_upload" },
];

const MENTOR_DASHBOARD_NAV_ITEMS: NavItem[] = [
  { id: "reviews", label: "Reviews", href: "/mentor-dashboard", icon: "fact_check" },
];

interface FloatingDockProps {
  items?: NavItem[];
}

export function FloatingDock({ items }: FloatingDockProps) {
  const pathname = usePathname();

  // Determine dashboard route contexts
  const isStudentDashboard = pathname.startsWith("/student-dashboard");
  const isMentorDashboard = pathname.startsWith("/mentor-dashboard");
  const isDashboard = isStudentDashboard || isMentorDashboard;

  // Select active nav list
  let activeNavItems = items;
  if (!activeNavItems) {
    if (isStudentDashboard) {
      activeNavItems = STUDENT_DASHBOARD_NAV_ITEMS;
    } else if (isMentorDashboard) {
      activeNavItems = MENTOR_DASHBOARD_NAV_ITEMS;
    } else {
      activeNavItems = PUBLIC_NAV_ITEMS;
    }
  }

  const itemCount = activeNavItems.length;

  // Rule: for 2 or 3 items -> smaller compact height; for 4 or 5 items -> larger height
  const isCompact = itemCount <= 3;

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/student-dashboard") {
      return pathname === "/student-dashboard";
    }
    if (href === "/mentor-dashboard") {
      return pathname === "/mentor-dashboard";
    }
    if (href === "/login") {
      return pathname.startsWith("/login") || pathname.startsWith("/register");
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =========================================================================
          Desktop Vertical Left Floating Dock
          - Dynamic items: Student Dashboard (History + Submit) vs Public (Overview + How It Works + Login)
          - For 2 or 3 items: compact height, vertically centered (top-1/2 -translate-y-1/2)
          - Logout button at the bottom for student dashboard session
         ========================================================================= */}
      <aside
        aria-label="Quantum Portal Navigation Dock"
        className={`hidden md:flex flex-col items-center w-20 md:w-22 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-40 fixed left-4 transition-all duration-300 flex-shrink-0 ${
          isCompact
            ? "top-1/2 -translate-y-1/2 h-auto pt-10 pb-8 gap-4"
            : "top-4 h-[calc(100vh-2rem)] pt-14 pb-14 justify-center"
        }`}
      >
        {/* Navigation Items Stack with Smooth Gliding Capsule Transition */}
        <nav
          aria-label="Portal Navigation"
          className="flex flex-col items-center gap-3 w-full px-2.5 relative"
        >
          {activeNavItems.map((item) => {
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.label}
                className="relative rounded-2xl p-2.5 w-full flex flex-col items-center gap-1.5 transition-colors duration-200 group cursor-pointer"
              >
                {/* Smooth Gliding Active Glass Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="activeDesktopDockCapsule"
                    className="absolute inset-0 rounded-2xl bg-primary-container/25 border border-primary/50 shadow-[0_0_20px_rgba(124,58,237,0.45)] pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                {/* Smooth Gliding Active Side Pip Micro-Light */}
                {isActive && (
                  <motion.span
                    layoutId="activeDesktopDockPip"
                    aria-hidden="true"
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-3.5 bg-primary rounded-l-full shadow-[0_0_10px_#d2bbff] pointer-events-none z-20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                {/* Icon with Smooth Scaling & Glow */}
                <span
                  className={`material-symbols-outlined text-[22px] relative z-10 transition-all duration-300 ${
                    isActive
                      ? "fill-icon scale-110 text-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                      : "text-on-surface-variant group-hover:text-white group-hover:scale-105"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={`font-headline text-[9.5px] text-center tracking-tight leading-tight relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-on-surface-variant group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Utility: Logout Button for Dashboard sessions (Student & Mentor) */}
        {isDashboard && (
          <div className="pt-3 border-t border-white/10 w-full flex justify-center mt-1">
            <Link
              href="/login"
              title="Disconnect Evaluation Session (Logout)"
              className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 text-on-surface-variant hover:text-rose-400 border border-white/10 hover:border-rose-500/30 flex items-center justify-center transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                logout
              </span>
            </Link>
          </div>
        )}
      </aside>

      {/* =========================================================================
          Mobile Bottom Floating Dock (Synchronized Route Navigation)
         ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0d091b]/90 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.65)] max-w-[92vw]"
      >
        {activeNavItems.map((item) => {
          const isActive = isItemActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-headline font-medium transition-colors duration-200 cursor-pointer"
            >
              {/* Smooth Gliding Active Pill for Mobile */}
              {isActive && (
                <motion.div
                  layoutId="activeMobileDockCapsule"
                  className="absolute inset-0 rounded-xl bg-primary-container/30 border border-primary/50 shadow-[0_0_12px_rgba(124,58,237,0.4)] pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                />
              )}

              <span
                className={`material-symbols-outlined text-lg relative z-10 transition-colors duration-300 ${
                  isActive ? "text-primary fill-icon" : "text-on-surface-variant"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? "text-white font-semibold" : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {isDashboard && (
          <Link
            href="/login"
            title="Logout"
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-headline text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </Link>
        )}
      </nav>
    </>
  );
}
