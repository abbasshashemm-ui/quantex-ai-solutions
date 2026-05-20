"use client";

import { useMounted } from "@/hooks/useMounted";
import { HomeScene } from "./HomeScene";

export function ViewportScene() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 h-[100dvh] w-full bg-void" aria-hidden />
    );
  }

  return <HomeScene />;
}
