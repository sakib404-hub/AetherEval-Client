"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.3;
    let targetX = mouseX;
    let targetY = mouseY;
    let isVisible = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible && el) {
        isVisible = true;
        el.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (el) el.style.opacity = "0";
    };

    const updatePosition = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      if (el) {
        el.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    animId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 h-[480px] w-[480px] rounded-full opacity-0 transition-opacity duration-700 ease-out will-change-transform mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, rgba(56, 189, 248, 0.08) 35%, rgba(16, 185, 129, 0.04) 55%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}
