import { HeroChat } from "@/components/chat/HeroChat";
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { DirectAnswer } from "@/components/sections/DirectAnswer";
import { ExploreBand } from "@/components/sections/ExploreBand";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeCta } from "@/components/sections/HomeCta";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityMarquee />
      <section className="ask-bay" aria-labelledby="ask-heading">
        <div className="ask-bay__copy">
          <p className="poster__index">Assistant online</p>
          <h2 id="ask-heading" className="ask-bay__title">
            Ask the machine.
          </h2>
        </div>
        <HeroChat />
      </section>
      <DirectAnswer />
      <ServicesSection />
      <ProcessSection />
      <ExploreBand />
      <HomeCta />
    </>
  );
}
