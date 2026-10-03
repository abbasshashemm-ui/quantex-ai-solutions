import { HeroChat } from "@/components/chat/HeroChat";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

export function AssistantSection() {
  return (
    <section
      id="assistant"
      className="alu-section"
      aria-labelledby="assistant-heading"
    >
      <div className="alu-section__inner alu-split">
        <div data-reveal>
          <PageEyebrow>Try it now</PageEyebrow>
          <h2 id="assistant-heading" className="alu-display alu-section__title">
            Ask the studio anything.
          </h2>
          <p className="alu-lede">
            Our assistant answers questions about websites, AI assistants and
            pricing, and passes you to a real person on WhatsApp whenever you
            want. It is the same kind of assistant we build for clients.
          </p>
        </div>
        <HeroChat />
      </div>
    </section>
  );
}
