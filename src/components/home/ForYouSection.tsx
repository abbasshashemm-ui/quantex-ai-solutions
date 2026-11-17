"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";
import {
  getProfile,
  type Profile,
  type ProfileLocale,
} from "@/lib/visitor/profiles";
import { ASK_UI, type AskUi } from "@/lib/visitor/ui";
import { useVisitorAnswer } from "@/lib/visitor/store";

/** Pause before a customer message and before the assistant's reply, in ms. */
const IN_MS = 650;
const OUT_MS = 1100;

/** The sample conversation in a phone, arriving one message at a time. */
function Phone({ profile, ui }: { profile: Profile; ui: AskUi }) {
  const ref = useRef<HTMLDivElement>(null);
  const total = profile.chat.length + 1; // the handover line is the last step
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let timer: number | undefined;
    let cancelled = false;

    const play = (step: number) => {
      if (cancelled) return;
      setShown(step);
      if (step >= total) return;
      const next = profile.chat[step];
      timer = window.setTimeout(
        () => play(step + 1),
        next && next.from === "in" ? IN_MS : OUT_MS,
      );
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setTimeout(() => setShown(total), 0);
      return () => window.clearTimeout(timer);
    }

    // Start when the phone is properly on screen, and only once per answer.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => play(1), 300);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [profile, total]);

  const next = profile.chat[shown];
  const typing = shown > 0 && shown < profile.chat.length && next?.from === "out";

  return (
    <figure className="phone" ref={ref}>
      <div className="phone__screen">
        <div className="phone__bar">
          <span className="mock-avatar" aria-hidden />
          <span>
            <strong>{profile.chatName}</strong>
            <small>
              <i className="mock-dot" aria-hidden /> {ui.online}
            </small>
          </span>
        </div>
        <div className="phone__thread">
          {profile.chat.map((message, index) => (
            <span
              key={message.text}
              className={`offer-bubble phone__msg${message.from === "out" ? " offer-bubble--out" : ""}`}
              data-shown={index < shown ? "true" : undefined}
            >
              {message.text}
            </span>
          ))}
          <span
            className="mock-handover phone__msg"
            data-shown={shown >= total ? "true" : undefined}
          >
            {profile.handover}
          </span>
          <span className="phone__typing" data-on={typing ? "true" : undefined} aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
      <figcaption className="phone__caption">{ui.sample}</figcaption>
    </figure>
  );
}

/** Shown once the visitor has said what their business does. */
export function ForYouSection({ locale = "en" }: { locale?: ProfileLocale }) {
  const answer = useVisitorAnswer();
  if (!answer) return null;

  const ui = ASK_UI[locale];
  const profile = getProfile(answer.profile, locale);
  const whatsapp = `${CONTACT.whatsapp}?text=${encodeURIComponent(profile.whatsapp)}`;

  return (
    <section
      id="for-you"
      className="alu-section for-you-band"
      data-force-dark
      data-dark-zone
      aria-labelledby="for-you-heading"
    >
      <div className="alu-section__inner for-you">
        <div>
          <PageEyebrow>{ui.forYouEyebrow}</PageEyebrow>
          <h2 id="for-you-heading" className="alu-display alu-section__title">
            {profile.forYouTitle}
          </h2>
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
              {ui.whatsapp}
            </a>
            <Link
              href={locale === "en" ? "/pricing" : `/${locale}/pricing`}
              data-interactive
              className="btn-secondary"
            >
              {ui.prices}
            </Link>
          </div>
        </div>

        <Phone key={`${profile.id}-${locale}`} profile={profile} ui={ui} />
      </div>
    </section>
  );
}
