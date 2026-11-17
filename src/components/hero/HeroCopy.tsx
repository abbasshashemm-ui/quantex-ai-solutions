import Link from "next/link";
import { HeroAsk } from "./HeroAsk";

/** Hero copy plus the two scroll beats that follow it. */
export function HeroCopy() {
  return (
    <>
      <HeroAsk />

      <p className="sr-only">
        Websites that convert: fast, clear, and built around one goal, turning
        visitors into enquiries. Assistants that answer: a chatbot that knows
        your business, replies on your website and WhatsApp, and hands over to
        you when a person is needed.
      </p>

      <div className="alu-beat alu-beat--one">
        <p className="alu-beat__index">01 / Websites</p>
        <h2 className="alu-display alu-beat__title">Websites that convert</h2>
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
        <h2 className="alu-display alu-beat__title">Assistants that answer</h2>
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
