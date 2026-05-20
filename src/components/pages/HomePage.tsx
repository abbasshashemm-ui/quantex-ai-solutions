"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { LazyViewportScene } from "@/components/three/LazyViewportScene";

const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then((module) => ({
      default: module.ServicesSection,
    })),
  { ssr: false },
);

const RecentProjectsSection = dynamic(
  () =>
    import("@/components/sections/RecentProjectsSection").then((module) => ({
      default: module.RecentProjectsSection,
    })),
  { ssr: false },
);

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
