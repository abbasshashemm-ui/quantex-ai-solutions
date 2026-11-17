"use client";

import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";
import { getProfile } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/** Shown once the visitor has said what their business does. */
export function ForYouSection() {
  const answer = useVisitorAnswer();
  if (!answer) return null;

  const profile = getProfile(answer.profile);
  const whatsapp = `${CONTACT.whatsapp}?text=${encodeURIComponent(profile.whatsapp)}`;

  return (
    <section id="for-you" className="alu-section" aria-labelledby="for-you-heading">
      <div className="alu-section__inner">
        <PageEyebrow>Built around your answer</PageEyebrow>
        <h2 id="for-you-heading" className="alu-display alu-section__title">
          How it would work for {profile.noun}
        </h2>

        <div className="for-you">
          <figure className="work-frame mock for-you__chat">
            <div className="work-frame__bar" aria-hidden>
              <span className="work-frame__dots">
                <i />
                <i />
                <i />
              </span>
              <span className="work-frame__address">Assistant · WhatsApp</span>
            </div>
            <div className="mock__body">
              <div className="mock-chat__thread">
                {profile.chat.map((message) => (
                  <span
                    key={message.text}
                    className={`offer-bubble${message.from === "out" ? " offer-bubble--out" : ""}`}
                  >
                    {message.text}
                  </span>
                ))}
                <span className="mock-handover">{profile.handover}</span>
              </div>
            </div>
            <figcaption className="for-you__caption">Sample conversation</figcaption>
          </figure>

          <div>
            <p className="page-label">What changes for you</p>
            <ol className="for-you__outcomes">
              {profile.outcomes.map((outcome, index) => (
                <li key={outcome}>
                  <span className="ask-step__n">0{index + 1}</span>
                  {outcome}
                </li>
              ))}
            </ol>
            <div className="alu-ctas">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
                data-conversion-location="for_you"
                className="btn-primary"
              >
                Talk it through on WhatsApp
              </a>
              <Link href="/pricing" data-interactive className="btn-secondary">
                See all prices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
