import { CursorGlow } from "./CursorGlow";

export function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070412]"
    >
      {/* 1. Interactive Cursor Magnetic Glow (Option 2) */}
      <CursorGlow />

      {/* 2. Aurora Borealis Emerald & Teal Stream */}
      <div
        className="animate-aurora-1 absolute -top-[15%] left-[10%] h-[680px] w-[880px] rounded-[45%_55%_70%_30%/50%_60%_40%_50%] bg-gradient-to-tr from-emerald-500/35 via-teal-400/30 to-cyan-500/35 opacity-40 blur-[110px] mix-blend-screen"
        style={{ willChange: "transform, opacity" }}
      />

      {/* 4. Cosmic Violet & Electric Orchid Ribbon */}
      <div
        className="animate-aurora-2 absolute top-[5%] right-[-10%] h-[780px] w-[950px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-[#7C3AED]/45 via-purple-600/40 to-indigo-500/35 opacity-50 blur-[125px] mix-blend-screen"
        style={{ willChange: "transform, opacity" }}
      />

      {/* 5. Deep Indigo & Royal Purple Grounding Wave */}
      <div
        className="animate-aurora-3 absolute -bottom-[20%] left-[-15%] h-[850px] w-[1050px] rounded-[50%_50%_60%_40%/40%_60%_50%_50%] bg-gradient-to-tr from-[#4C1D95]/55 via-[#592da2]/45 to-blue-700/30 opacity-45 blur-[140px] mix-blend-screen"
        style={{ willChange: "transform, opacity" }}
      />

      {/* 6. Celestial Cyan & Sky Informational Accent Flare */}
      <div
        className="animate-aurora-4 absolute top-[30%] left-[25%] h-[550px] w-[750px] rounded-[40%_60%_50%_50%] bg-gradient-to-r from-cyan-400/30 via-sky-500/25 to-[#7C3AED]/35 opacity-35 blur-[105px] mix-blend-screen"
        style={{ willChange: "transform, opacity" }}
      />

      {/* 7. Aurora Curtain Light Rays (Vertical Dispersion Drape) */}
      <div
        className="animate-aurora-shimmer absolute inset-x-0 -top-24 h-[550px] opacity-35 blur-[90px] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(16, 185, 129, 0.35) 0%, rgba(124, 58, 237, 0.3) 40%, rgba(56, 189, 248, 0.22) 70%, transparent 100%)",
        }}
      />

      {/* 8. Constellation Grid Texture Overlay */}
      <div className="bg-grid-mesh absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_65%,transparent_100%)]" />

      {/* 9. Subtle Vignette Edge Shadow for High Text Legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#070412_95%)] opacity-85" />
    </div>
  );
}
