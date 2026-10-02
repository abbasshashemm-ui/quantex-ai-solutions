import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { DirectAnswer } from "@/components/sections/DirectAnswer";
import { ExploreBand } from "@/components/sections/ExploreBand";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeCta } from "@/components/sections/HomeCta";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SystemShowcase } from "@/components/sections/SystemShowcase";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatBand } from "@/components/sections/StatBand";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <DirectAnswer />
      <CapabilityMarquee />
      <SystemShowcase />
      <ServicesSection />
      <StatBand />
      <ProcessSection />
      <ExploreBand />
      <HomeCta />
    </>
  );
}
