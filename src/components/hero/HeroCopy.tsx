import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { HeroFacts, HeroHeadline } from "./HeroHeadline";

const HEADLINE = ["Automate.", "Scale.", "Dominate."] as const;

/** Hero copy plus the two scroll beats that follow it. */
export function HeroCopy() {
  return (
    <>
      <div className="alu-hero">
        <PageEyebrow>Beirut · AI studio</PageEyebrow>
        <HeroHeadline lines={HEADLINE} />
        <p className="alu-lede">
          Websites that win customers and AI assistants that answer them. Built
          by a Beirut studio you can message directly.
        </p>
        <div className="alu-ctas">
          <Link
            href="/contact"
            data-interactive
            data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
            data-conversion-location="hero"
            className="btn-primary"
          >
            Start a project
          </Link>
          <a href="#solutions" data-interactive className="btn-secondary">
            See what we build
          </a>
        </div>
        <HeroFacts
          label="The studio"
          ariaLabel="Studio facts"
          items={["10+ paying clients", "Replies within 24 hours", "Beirut, Lebanon"]}
        />
      </div>

      <p className="sr-only">
        Websites that convert: fast, clear, and built around one goal, turning
        visitors into enquiries. Assistants that answer: a chatbot that knows
        your business, replies on your website and WhatsApp, and hands over to
        you when a person is needed.
      </p>

      <div className="alu-beat alu-beat--one">
        <p className="alu-beat__index">01 / Websites</p>
        <h2 className="alu-display alu-beat__title">Websites that convert.</h2>
        <p className="alu-lede">
          Fast, clear, and built around one goal: turning visitors into
          enquiries.
        </p>
        <Link
          href="/services/high-converting-websites"
          data-interactive
          className="alu-link"
        >
          See websites <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="alu-beat alu-beat--two">
        <p className="alu-beat__index">02 / Assistants</p>
        <h2 className="alu-display alu-beat__title">Assistants that answer.</h2>
        <p className="alu-lede">
          A chatbot that knows your business, replies on your website and
          WhatsApp, and hands over to you when a person is needed.
        </p>
        <Link
          href="/services/custom-intelligent-chatbots"
          data-interactive
          className="alu-link"
        >
          See assistants <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}
