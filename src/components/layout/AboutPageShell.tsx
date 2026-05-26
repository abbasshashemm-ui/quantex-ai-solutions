"use client";

import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { LazyViewportScene } from "@/components/three/LazyViewportScene";

export function AboutPageShell() {
  return (
    <>
      <LazyViewportScene />
      <AboutPageContent />
    </>
  );
}
