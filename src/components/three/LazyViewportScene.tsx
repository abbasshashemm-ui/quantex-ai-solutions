"use client";

import dynamic from "next/dynamic";

function ViewportSceneFallback() {
  return (
    <div
      className="fixed inset-0 z-0 h-[100dvh] w-full bg-void"
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
