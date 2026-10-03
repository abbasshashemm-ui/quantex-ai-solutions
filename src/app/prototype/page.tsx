import Link from "next/link";
import { HeroChat } from "@/components/chat/HeroChat";
import { HeroCopy } from "@/components/prototype/HeroCopy";
import { HeroStage } from "@/components/prototype/HeroStage";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";

const OFFERS = [
  {
    index: "01",
    title: "Websites",
    body: "Fast, clear sites designed to turn visitors into enquiries.",
    href: "/services/high-converting-websites",
  },
  {
    index: "02",
    title: "AI assistants",
    body: "Chatbots that answer customers on your site and WhatsApp, then hand over to you.",
    href: "/services/custom-intelligent-chatbots",
  },
  {
    index: "03",
    title: "Automation",
    body: "Repetitive tasks handled for you, so your time goes to customers.",
    href: "/services/business-process-automation",
  },
] as const;

const PROMISES = [
  {
    title: "You own everything",
    body: "Code, domain and accounts are handed over to you.",
  },
  {
    title: "Reply within 24 hours",
    body: "Message us and you get a real answer, not a form letter.",
  },
  {
    title: "A direct line",
    body: "You talk to the person building it, on WhatsApp or email.",
  },
] as const;

export default function PrototypePage() {
  return (
    <>
      <HeroStage>
        <HeroCopy />
      </HeroStage>

      <div className="alu-after">
        <section id="assistant" className="alu-section">
          <div className="alu-section__inner alu-split">
            <div>
              <PageEyebrow>Try it now</PageEyebrow>
              <h2 className="alu-display alu-section__title">
                Ask the studio anything.
              </h2>
              <p className="alu-lede">
                Our assistant answers questions about websites, chatbots and
                pricing—and passes you to a real person on WhatsApp whenever you
                want.
              </p>
            </div>
            <HeroChat />
          </div>
        </section>

        <section id="solutions" className="alu-section">
          <div className="alu-section__inner">
            <PageEyebrow>What we build</PageEyebrow>
            <h2 className="alu-display alu-section__title">
              One studio. Three ways to grow.
            </h2>
            <ul className="alu-cards">
              {OFFERS.map((offer) => (
                <li key={offer.href}>
                  <Link
                    href={offer.href}
                    data-interactive
                    className="alu-card alu-glass"
                  >
                    <span className="alu-card__index">{offer.index}</span>
                    <span className="alu-display alu-card__title">
                      {offer.title}
                    </span>
                    <span className="alu-card__body">{offer.body}</span>
                    <span className="alu-link">
                      Learn more <span aria-hidden>→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="alu-section alu-section--last">
          <div className="alu-section__inner">
            <ul className="alu-promises">
              {PROMISES.map((promise) => (
                <li key={promise.title} className="alu-promise alu-glass">
                  <span className="alu-display alu-promise__title">
                    {promise.title}
                  </span>
                  <span className="alu-promise__body">{promise.body}</span>
                </li>
              ))}
            </ul>
            <div className="alu-final">
              <h2 className="alu-display alu-section__title">
                Tell us what you need.
              </h2>
              <div className="alu-ctas">
                <Link
                  href="/contact"
                  data-interactive
                  data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
                  data-conversion-location="closing"
                  className="btn-primary"
                >
                  Start a project
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive
                  className="btn-secondary"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
