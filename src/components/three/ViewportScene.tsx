"use client";

import { useMounted } from "@/hooks/useMounted";
import { SplineBackground } from "./SplineBackground";

export function ViewportScene() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className="scene-fallback fixed inset-0 z-0 h-[100dvh] w-full"
        aria-hidden
      />
    );
  }

  return <SplineBackground />;
}
