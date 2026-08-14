"use client";

import dynamic from "next/dynamic";
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { HomeCta } from "@/components/sections/HomeCta";
import { HeroSection } from "@/components/sections/HeroSection";

const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then((module) => ({
      default: module.ServicesSection,
    })),
  { ssr: false },
);

const ProcessSection = dynamic(
  () =>
    import("@/components/sections/ProcessSection").then((module) => ({
      default: module.ProcessSection,
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
      <HeroSection />
      <CapabilityMarquee />
      <ServicesSection />
      <ProcessSection />
      <RecentProjectsSection />
      <HomeCta />
    </>
  );
}
