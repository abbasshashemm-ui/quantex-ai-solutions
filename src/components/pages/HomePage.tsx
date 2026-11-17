import { AeoBlock } from "@/components/home/AeoBlock";
import { AssistantSection } from "@/components/home/AssistantSection";
import { ForYouSection } from "@/components/home/ForYouSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { GuidesSection } from "@/components/home/GuidesSection";
import { WorkSection } from "@/components/home/WorkSection";
import { SiteCheckBand } from "@/components/home/SiteCheckBand";
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
      <ForYouSection />
      <WorkSection />
      <ServicesSection />
      <AssistantSection />
      <StatBand />
      <ProcessSection />
      <SiteCheckBand />
      <GuidesSection />
      <AeoBlock />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
