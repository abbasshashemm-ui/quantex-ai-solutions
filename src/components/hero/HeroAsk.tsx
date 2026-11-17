"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import {
  QUICK_PICKS,
  getProfile,
  matchProfile,
  type ProfileId,
} from "@/lib/visitor/profiles";
import { setVisitorAnswer, useVisitorAnswer } from "@/lib/visitor/store";

/** How long the sculpture "thinks" before the answer appears. */
const THINK_MS = 700;

function setThinking(on: boolean) {
  const stage = document.querySelector<HTMLElement>(".alu-stage");
  if (!stage) return;
  if (on) stage.dataset.thinking = "true";
  else delete stage.dataset.thinking;
}

/**
 * The hero as a question. The visitor says what their business does, and the
 * hero answers with where to start. The rest of the page reads the same answer.
 */
export function HeroAsk() {
  const answer = useVisitorAnswer();
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      setThinking(false);
    },
    [],
  );

  const respond = (profile: ProfileId, said: string) => {
    if (pending) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const commit = () => {
      setVisitorAnswer({ profile, text: said.slice(0, 80) });
      setPending(false);
      setThinking(false);
    };
    if (reduce) {
      commit();
      return;
    }
    setPending(true);
    setThinking(true);
    timer.current = window.setTimeout(commit, THINK_MS);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const said = text.trim();
    if (!said) {
      inputRef.current?.focus();
      return;
    }
    respond(matchProfile(said), said);
  };

  const reset = () => {
    setVisitorAnswer(null);
    setText("");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  if (answer) {
    const profile = getProfile(answer.profile);
    return (
      <div className="alu-hero ask ask--answered" aria-live="polite">
        <PageEyebrow>
          You said: <q>{answer.text}</q>
        </PageEyebrow>
        <h1 className="alu-display ask__title ask__title--answer">
          For {profile.noun}, start here
        </h1>
        <ol className="ask-steps">
          {profile.steps.map((step, index) => (
            <li key={step.title}>
              <Link href={step.href} data-interactive className="ask-step">
                <span className="ask-step__n">0{index + 1}</span>
                <span className="ask-step__text">
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </span>
                <span className="ask-step__price">{step.price}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="alu-ctas">
          <a href="#for-you" data-interactive className="btn-primary">
            See how it would work
          </a>
          <button type="button" data-interactive className="ask-reset" onClick={reset}>
            Change my answer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alu-hero ask" data-pending={pending ? "true" : undefined}>
      <PageEyebrow>
        Beirut AI studio · 10+ paying clients · Replies within 24 hours
      </PageEyebrow>
      <h1 className="alu-display ask__title">
        <span>What does your</span> <span>business do?</span>
      </h1>
      <form className="ask-form" onSubmit={onSubmit}>
        <label htmlFor="ask-input" className="sr-only">
          Describe your business in a few words
        </label>
        <input
          id="ask-input"
          ref={inputRef}
          data-interactive
          className="ask-form__input"
          type="text"
          inputMode="text"
          autoComplete="off"
          maxLength={80}
          placeholder="A dental clinic"
          value={text}
          onChange={(event) => setText(event.target.value)}
          disabled={pending}
        />
        <button
          type="submit"
          data-interactive
          data-conversion={CONVERSION_EVENTS.CTA_CLICK}
          data-conversion-location="hero_ask"
          className="btn-primary ask-form__submit"
          disabled={pending}
        >
          {pending ? "Thinking" : "Show me"}
        </button>
      </form>
      <ul className="ask-picks" aria-label="Or pick one">
        {QUICK_PICKS.map((pick) => (
          <li key={pick.id}>
            <button
              type="button"
              data-interactive
              className="alu-chip alu-chip--link"
              disabled={pending}
              onClick={() => respond(pick.id, pick.pick)}
            >
              {pick.pick}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
