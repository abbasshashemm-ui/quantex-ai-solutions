import { HeroChat } from "@/components/chat/HeroChat";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

/** The live assistant, on a dark band of its own: this one is real, not a sample. */
export function AssistantSection() {
  return (
    <section
      id="assistant"
      className="alu-section band-dark"
      data-force-dark
      data-dark-zone
      aria-labelledby="assistant-heading"
    >
      <div className="alu-section__inner alu-split">
        <div data-reveal>
          <PageEyebrow>
            <span className="live-dot" aria-hidden /> Live, not a sample
          </PageEyebrow>
          <h2 id="assistant-heading" className="alu-display band-dark__title">
            Ask the studio anything
          </h2>
          <p className="alu-lede">
            This is the kind of assistant we build for clients. Ask it about
            websites, assistants or pricing, or talk to a person any time.
          </p>
        </div>
        <HeroChat />
      </div>
    </section>
  );
}
