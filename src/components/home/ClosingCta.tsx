import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { MiniSculpture } from "@/components/hero/MiniSculpture";
import { ClosingTitle } from "./ClosingTitle";
import { CONTACT } from "@/lib/site/contact";

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

export function ClosingCta() {
  return (
    <section
      className="alu-section alu-section--last band-dark"
      data-force-dark
      data-dark-zone
    >
      <div className="alu-section__inner">
        <ul className="alu-promises">
          {PROMISES.map((promise) => (
            <li
              key={promise.title}
              className="alu-promise rule-item"
              data-reveal
            >
              <span className="alu-display alu-promise__title">
                {promise.title}
              </span>
              <span className="alu-promise__body">{promise.body}</span>
            </li>
          ))}
        </ul>

        <div className="alu-final">
          <div className="alu-final__sculpture" aria-hidden>
            <MiniSculpture mode="idle" minWidth={900} />
          </div>
          <ClosingTitle />
          <div className="alu-ctas">
            <Link
              href="/contact"
              data-interactive
              data-conversion={CONVERSION_EVENTS.CTA_CLICK}
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
  );
}
