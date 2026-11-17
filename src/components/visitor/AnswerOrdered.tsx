"use client";

import type { ReactNode } from "react";
import { getProfile, type ProfileLocale } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/**
 * Sections keyed by service, shown in the order that matters to the visitor's
 * kind of business once they have answered the home page's question. Without
 * an answer the order is unchanged.
 */
export function AnswerOrdered({
  items,
  locale = "en",
}: {
  items: { slug: string; node: ReactNode }[];
  locale?: ProfileLocale;
}) {
  const answer = useVisitorAnswer();
  const profile = answer ? getProfile(answer.profile, locale) : null;
  const rank = (slug: string) => {
    const index = profile ? profile.services.indexOf(slug) : -1;
    return index === -1 ? 99 : index;
  };
  const ordered = profile
    ? [...items].sort((a, b) => rank(a.slug) - rank(b.slug))
    : items;

  return (
    <>
      {profile?.servicesNote ? (
        <p className="page-label answer-note-line" aria-live="polite">
          {profile.servicesNote}
        </p>
      ) : null}
      {ordered.map((item) => (
        <div key={item.slug}>{item.node}</div>
      ))}
    </>
  );
}
