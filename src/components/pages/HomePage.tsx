import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";
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
