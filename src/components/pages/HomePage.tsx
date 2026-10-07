import { AeoBlock } from "@/components/home/AeoBlock";
import { AssistantSection } from "@/components/home/AssistantSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { GuidesSection } from "@/components/home/GuidesSection";
import { Ticker } from "@/components/home/Ticker";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { HeroStage } from "@/components/hero/HeroStage";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatBand } from "@/components/sections/StatBand";

export function HomePage() {
  return (
    <>
      <HeroStage>
        <HeroCopy />
      </HeroStage>
      <Ticker />
      <AeoBlock />
      <AssistantSection />
      <ServicesSection />
      <StatBand />
      <ProcessSection />
      <GuidesSection />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
