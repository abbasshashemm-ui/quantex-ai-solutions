import Link from "next/link";
import { HeroChat } from "@/components/chat/HeroChat";
import { Figure } from "@/components/sections/Figure";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { FIGURES } from "@/lib/site/machines";

export function HeroSection() {
  return (
    <section id="home" className="spec-mast" aria-labelledby="hero-heading">
      <Figure figure={FIGURES.chassis} size={148} priority />
      <div className="spec-mast__copy">
        <p className="spec-kicker">Beirut</p>
        <h1 id="hero-heading">Quantex</h1>
        <p>
          Websites and on-brand assistants, built in Beirut and handed to you.
        </p>
        <Link
          href="/contact"
          data-interactive
          data-conversion={CONVERSION_EVENTS.CTA_CLICK}
          data-conversion-location="mast"
          className="btn-primary"
        >
          Send a brief
        </Link>
      </div>
      <div className="ask-bay spec-mast__chat">
        <HeroChat />
      </div>
    </section>
  );
}
