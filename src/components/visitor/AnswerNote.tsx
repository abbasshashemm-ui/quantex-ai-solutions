"use client";

import { getProfile, type ProfileLocale } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/**
 * On a service page: how this service fits the visitor's kind of business,
 * when their answer on the home page included it. Shows nothing otherwise.
 */
export function AnswerNote({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: ProfileLocale;
}) {
  const answer = useVisitorAnswer();
  if (!answer) return null;

  const profile = getProfile(answer.profile, locale);
  const step = profile.steps.find((item) =>
    item.href.endsWith(`/services/${slug}`),
  );
  if (!step) return null;

  return (
    <aside className="answer-note" aria-live="polite">
      <p className="page-label">{profile.answerLine}</p>
      <p className="answer-note__title">{step.title}</p>
      <p className="answer-note__body">
        {step.detail} · <strong>{step.price}</strong>
      </p>
    </aside>
  );
}
