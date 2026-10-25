"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { logout } from "@/app/_actions/auth/logout";
import { showSuccessAlert } from "@/lib/alert";
import { getAuthSession, AuthSession } from "@/app/_actions/auth/getAuthSession";

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
  { id: "resubmit", label: "Resubmit", href: "/student-dashboard/resubmit", icon: "published_with_changes" },
  { id: "profile", label: "Profile", href: "/student-dashboard/profile", icon: "account_circle" },
];

const MENTOR_DASHBOARD_NAV_ITEMS: NavItem[] = [
  { id: "reviews", label: "Reviews", href: "/mentor-dashboard", icon: "fact_check" },
  { id: "profile", label: "Profile", href: "/mentor-dashboard/profile", icon: "account_circle" },
];

const ADMIN_DASHBOARD_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", href: "/admin-dashboard", icon: "dashboard" },
  { id: "mentors", label: "Mentors", href: "/admin-dashboard/mentors", icon: "how_to_reg" },
  { id: "reviews", label: "Reviews", href: "/admin-dashboard/reviews", icon: "fact_check" },
  { id: "profile", label: "Profile", href: "/admin-dashboard/profile", icon: "account_circle" },
];

const PROFILE_NAV_ITEMS: NavItem[] = [
  { id: "profile", label: "Profile", href: "/profile", icon: "account_circle" },
];

interface FloatingDockProps {
  items?: NavItem[];
  initialSession?: AuthSession;
}

export function FloatingDock({ items, initialSession }: FloatingDockProps) {
  const pathname = usePathname();

  // Determine dashboard route contexts
  const isStudentDashboard = pathname.startsWith("/student-dashboard");
  const isMentorDashboard = pathname.startsWith("/mentor-dashboard");
  const isAdminDashboard = pathname.startsWith("/admin-dashboard");
  const isProfile = pathname === "/profile" || pathname.startsWith("/profile");
  const isDashboard = isStudentDashboard || isMentorDashboard || isAdminDashboard || isProfile;

  // Track authenticated session state - initialized strictly from SSR initialSession to avoid hydration mismatch
  const [authSession, setAuthSession] = useState<AuthSession>(
    initialSession || { isAuthenticated: false, role: null, dashboardHref: null }
  );

  // Sync state if initialSession prop changes
  useEffect(() => {
    if (initialSession) {
      setAuthSession(initialSession);
    }
  }, [initialSession]);

  // Re-verify session on mount and route changes
  useEffect(() => {
    let isMounted = true;

    // Check client cookie immediately on post-mount
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(^|;\s*)userRole=([^;]*)/);
      const role = match ? decodeURIComponent(match[2]).toUpperCase() : null;
      if (role) {
        const href =
          role === "ADMIN"
            ? "/admin-dashboard"
            : role === "MENTOR"
            ? "/mentor-dashboard"
            : "/student-dashboard";
        setAuthSession({ isAuthenticated: true, role, dashboardHref: href });
      }
    }

    getAuthSession().then((session) => {
      if (isMounted) {
        setAuthSession(session);
        if (session.isAuthenticated && session.role && typeof document !== "undefined") {
          document.cookie = `userRole=${session.role}; path=/; max-age=86400; SameSite=Lax`;
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Select active nav list
  let activeNavItems = items;
  if (!activeNavItems) {
    if (isStudentDashboard) {
      activeNavItems = STUDENT_DASHBOARD_NAV_ITEMS;
    } else if (isMentorDashboard) {
      activeNavItems = MENTOR_DASHBOARD_NAV_ITEMS;
    } else if (isAdminDashboard) {
      activeNavItems = ADMIN_DASHBOARD_NAV_ITEMS;
    } else if (isProfile) {
      activeNavItems = PROFILE_NAV_ITEMS;
    } else if (authSession.isAuthenticated && authSession.dashboardHref) {
      // User is logged in on root / public routes:
      // Show Overview, How It Works, and their Respected Dashboard (without Login button!)
      activeNavItems = [
        { id: "overview", label: "Overview", href: "/", icon: "dashboard" },
        { id: "how-it-works", label: "How It Works", href: "/how-it-works", icon: "schema" },
        {
          id: "dashboard",
          label: "Dashboard",
          href: authSession.dashboardHref,
          icon: "space_dashboard",
        },
      ];
    } else {
      activeNavItems = PUBLIC_NAV_ITEMS;
    }
  }

  const showLogout = isDashboard || authSession.isAuthenticated;

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
    if (href === "/admin-dashboard") {
      return pathname === "/admin-dashboard";
    }
    if (href === "/profile" || href.endsWith("/profile")) {
      return pathname === "/profile" || pathname.endsWith("/profile");
    }
    if (href === "/login") {
      return pathname.startsWith("/login") || pathname.startsWith("/register");
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    showSuccessAlert("Logged Out", "Session terminated successfully.");
    setAuthSession({ isAuthenticated: false, role: null, dashboardHref: null });
    if (typeof document !== "undefined") {
      document.cookie = "userRole=; path=/; max-age=0";
    }
    await logout();
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
        suppressHydrationWarning
        className={`hidden md:flex flex-col items-center w-20 md:w-22 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-40 fixed left-4 top-1/2 -translate-y-1/2 transition-all duration-300 flex-shrink-0 ${
          showLogout
            ? "h-[68vh] max-h-[560px] min-h-[420px] py-5 justify-between"
            : "h-auto py-8 gap-3.5"
        }`}
      >
        {/* Top Favicon / Logo: Link to Root Route (/) */}
        {isDashboard && (
          <div className="pb-2.5 border-b border-white/10 w-full flex justify-center mb-1 shrink-0">
            <Link
              href="/"
              title="Return to AetherEval Home (/)"
              className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-primary/50 shadow-[0_0_16px_rgba(124,58,237,0.2)] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all duration-300 group cursor-pointer"
            >
              <Image
                src="/favicon.svg"
                alt="AetherEval Home"
                width={26}
                height={26}
                className="w-6.5 h-6.5 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
              />
            </Link>
          </div>
        )}

        {/* Navigation Items Stack with Smooth Gliding Capsule Transition */}
        <nav
          aria-label="Portal Navigation"
          className="flex flex-col items-center gap-2.5 w-full px-2.5 relative"
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

        {/* Bottom Utility: Logout Button pinned at the end of the sidebar for Dashboard and authenticated sessions */}
        {showLogout && (
          <div className="mt-auto pt-3 border-t border-white/10 w-full px-2.5">
            <form onSubmit={handleLogout} className="w-full">
              <button
                type="submit"
                title="Disconnect Evaluation Session (Logout)"
                className="relative rounded-2xl p-2.5 w-full flex flex-col items-center gap-1.5 transition-all duration-200 group cursor-pointer hover:bg-rose-500/15 text-rose-400/80 hover:text-rose-300 border border-transparent hover:border-rose-500/30 shadow-sm"
              >
                <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
                  logout
                </span>
                <span className="font-headline text-[9.5px] text-center tracking-tight leading-tight font-semibold">
                  Logout
                </span>
              </button>
            </form>
          </div>
        )}
      </aside>

      {/* =========================================================================
          Mobile Bottom Floating Dock (Synchronized Route Navigation)
         ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        suppressHydrationWarning
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0d091b]/90 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.65)] max-w-[92vw]"
      >
        {isDashboard && (
          <Link
            href="/"
            title="Return to Home (/)"
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all cursor-pointer mr-0.5 shrink-0"
          >
            <Image
              src="/favicon.svg"
              alt="AetherEval Home"
              width={18}
              height={18}
              className="w-4.5 h-4.5 object-contain"
            />
          </Link>
        )}
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

        {showLogout && (
          <form onSubmit={handleLogout}>
            <button
              type="submit"
              title="Logout"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-headline text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span className="font-semibold">Logout</span>
            </button>
          </form>
        )}
      </nav>
    </>
  );
}
