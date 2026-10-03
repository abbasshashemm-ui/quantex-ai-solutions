import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";

const HEADLINE = ["Automate.", "Scale.", "Dominate."] as const;

/** Hero copy plus the two scroll beats that follow it. */
export function HeroCopy() {
  return (
    <>
      <div className="alu-hero">
        <PageEyebrow>Beirut · AI studio</PageEyebrow>
        <h1 className="alu-display alu-h1">
          {HEADLINE.map((line, index) => (
            <span
              key={line}
              className="alu-h1__line"
              style={{ "--i": index } as React.CSSProperties}
            >
              {line}
            </span>
          ))}
        </h1>
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
        <ul className="alu-chips" aria-label="Studio facts">
          <li className="alu-chip">
            <span className="alu-chip__dot" aria-hidden />
            10+ paying clients
          </li>
          <li className="alu-chip">Founded 2024</li>
          <li className="alu-chip">Replies within 24 hours</li>
        </ul>
      </div>

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
