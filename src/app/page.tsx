import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ViewportScene } from "@/components/three/ViewportScene";

export default function Home() {
  return (
    <>
      <ViewportScene />
      <HeroSection />
      <ServicesSection />
    </>
  );
}
