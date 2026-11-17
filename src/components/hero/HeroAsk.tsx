"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import {
  getProfile,
  getQuickPicks,
  matchProfile,
  type ProfileId,
  type ProfileLocale,
} from "@/lib/visitor/profiles";
import { ASK_UI } from "@/lib/visitor/ui";
import { setVisitorAnswer, useVisitorAnswer } from "@/lib/visitor/store";
import {
  nudgePresence,
  setPresenceRest,
  setPresenceThinking,
} from "./presence";

/** How long the sculpture "thinks" before the answer appears. */
const THINK_MS = 700;

/** Milliseconds per character when the answer writes itself. */
const TYPE_MS = 26;

/**
 * A line that writes itself, as a reply does. The full text is always in the
 * page (and read out once); only the visible part is revealed, so the layout
 * never shifts while it types.
 */
function TypedLine({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setCount(text.length), 0);
      return () => window.clearTimeout(id);
    }
    let shown = 0;
    const id = window.setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= text.length) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [text]);

  const done = count >= text.length;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="typed" data-done={done ? "true" : undefined}>
        <span>{text.slice(0, count)}</span>
        <span className="typed__rest">{text.slice(count)}</span>
      </span>
    </>
  );
}

/**
 * The hero as a question. The visitor says what their business does, and the
 * hero answers with where to start. The rest of the page reads the same answer.
 */
export function HeroAsk({
  locale = "en",
  eyebrow = "Beirut AI studio · 10+ paying clients · Replies within 24 hours",
}: {
  locale?: ProfileLocale;
  eyebrow?: ReactNode;
}) {
  const ui = ASK_UI[locale];
  const answer = useVisitorAnswer();
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      setPresenceThinking(false);
      setPresenceRest(null);
    },
    [],
  );

  // The sculpture holds a different shape for each kind of business.
  useEffect(() => {
    setPresenceRest(answer ? getProfile(answer.profile).pose : null);
  }, [answer]);

  const respond = (profile: ProfileId, said: string) => {
    if (pending) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const commit = () => {
      setVisitorAnswer({ profile, text: said.slice(0, 80) });
      setPending(false);
      setPresenceThinking(false);
    };
    if (reduce) {
      commit();
      return;
    }
    setPending(true);
    setPresenceThinking(true);
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
    const profile = getProfile(answer.profile, locale);
    const line = profile.answerLine;
    return (
      <div
        className="alu-hero ask ask--answered"
        aria-live="polite"
        style={{ "--type-ms": `${line.length * TYPE_MS}ms` } as CSSProperties}
      >
        <PageEyebrow>
          {ui.youSaid} <q>{answer.text}</q>
        </PageEyebrow>
        <h1 className="alu-display ask__title ask__title--answer">
          <TypedLine key={line} text={line} />
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
            {ui.seeHow}
          </a>
          <button type="button" data-interactive className="ask-reset" onClick={reset}>
            {ui.change}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alu-hero ask" data-pending={pending ? "true" : undefined}>
      <PageEyebrow>{eyebrow}</PageEyebrow>
      <h1 className="alu-display ask__title">
        <span>{ui.question[0]}</span> <span>{ui.question[1]}</span>
      </h1>
      <form className="ask-form" onSubmit={onSubmit}>
        <label htmlFor="ask-input" className="sr-only">
          {ui.inputLabel}
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
          placeholder={ui.placeholder}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            nudgePresence();
          }}
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
          {pending ? ui.thinking : ui.submit}
        </button>
      </form>
      <ul className="ask-picks" aria-label={ui.picksLabel}>
        {getQuickPicks(locale).map((pick) => (
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
