"use client";

import { ContactPageTracker } from "@/components/analytics/ContactPageTracker";
import { ContactSection } from "@/components/sections/ContactSection";
import { LazyViewportScene } from "@/components/three/LazyViewportScene";

export function ContactPageShell() {
  return (
    <>
      <ContactPageTracker />
      <LazyViewportScene />
      <ContactSection />
    </>
  );
}
