"use client";

import { useChrome } from "@/lib/i18n/use-chrome";
import { getProfile } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/** A heading that addresses the visitor's kind of business once they have said it. */
export function AnswerTitle({ fallback }: { fallback: string }) {
  const { lang } = useChrome();
  const answer = useVisitorAnswer();
  return <>{answer ? getProfile(answer.profile, lang).closing : fallback}</>;
}
