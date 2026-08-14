import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { ExploreBand } from "@/components/sections/ExploreBand";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeCta } from "@/components/sections/HomeCta";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityMarquee />
      <ServicesSection />
      <ProcessSection />
      <RecentProjectsSection />
      <ExploreBand />
      <HomeCta />
    </>
  );
}
