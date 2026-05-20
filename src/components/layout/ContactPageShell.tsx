"use client";

import { ContactSection } from "@/components/sections/ContactSection";
import { LazyViewportScene } from "@/components/three/LazyViewportScene";

export function ContactPageShell() {
  return (
    <>
      <LazyViewportScene />
      <ContactSection />
    </>
  );
}
