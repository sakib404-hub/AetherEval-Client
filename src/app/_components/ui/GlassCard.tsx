"use client";

import React, { useRef } from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  interactive?: boolean;
  specularTop?: boolean;
  as?: "div" | "article" | "section";
  children: React.ReactNode;
}

export function GlassCard({
  level = 1,
  interactive = false,
  specularTop = true,
  as: Component = "div",
  className = "",
  children,
  onMouseMove,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-card-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-card-y", `${y}px`);
    }
    onMouseMove?.(e);
  };

  const levelStyle =
    level === 3
      ? "glass-panel-elevated shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
      : level === 2
      ? "glass-panel-elevated"
      : "glass-panel";
  const interactiveStyle = interactive ? "glass-card-interactive cursor-pointer" : "";

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-3xl p-6 sm:p-8 overflow-hidden ${levelStyle} ${interactiveStyle} ${className}`}
      {...props}
    >
      {/* Specular Edge Gradient along the top border */}
      {specularTop && (
        <div
          className="specular-border absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none opacity-80"
          aria-hidden="true"
        />
      )}

      {children}
    </Component>
  );
}
