"use client";

import dynamic from "next/dynamic";

function ViewportSceneFallback() {
  return (
    <div
      className="scene-fallback fixed inset-0 z-0 h-[100dvh] w-full"
      aria-hidden
    />
  );
}

export const LazyViewportScene = dynamic(
  () =>
    import("./ViewportScene").then((module) => ({
      default: module.ViewportScene,
    })),
  {
    ssr: false,
    loading: ViewportSceneFallback,
  },
);
