import { DirectAnswer } from "@/components/sections/DirectAnswer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeCta } from "@/components/sections/HomeCta";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <DirectAnswer />
      <ServicesSection />
      <ProcessSection />
      <HomeCta />
    </>
  );
}
