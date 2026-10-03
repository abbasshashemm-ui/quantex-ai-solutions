"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Writes the pointer position into CSS variables on the hovered cell so the
 * spotlight is drawn by CSS. No React state, so pointer moves never re-render.
 */
export function SpotlightGrid({ children, className }: SpotlightGridProps) {
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const cell = (event.target as HTMLElement).closest<HTMLElement>(
      ".service-card-link",
    );
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    cell.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    cell.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div className={className} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
