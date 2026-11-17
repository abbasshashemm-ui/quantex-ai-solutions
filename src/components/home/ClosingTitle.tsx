"use client";

import { getProfile, type ProfileLocale } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/** The page's last line, addressed to the visitor's kind of business. */
export function ClosingTitle({
  locale = "en",
  fallback = "Tell us what you need",
}: {
  locale?: ProfileLocale;
  fallback?: string;
}) {
  const answer = useVisitorAnswer();
  return (
    <h2 className="alu-display alu-section__title">
      {answer ? getProfile(answer.profile, locale).closing : fallback}
    </h2>
  );
}
