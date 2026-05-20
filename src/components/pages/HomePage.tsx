"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LazyViewportScene } from "@/components/three/LazyViewportScene";

export function HomePage() {
  return (
    <>
      <LazyViewportScene />
      <HeroSection />
      <ServicesSection />
      <RecentProjectsSection />
    </>
  );
}
