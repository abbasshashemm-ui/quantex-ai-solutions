"use client";

import { getProfile, type ProfileLocale } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/**
 * Marks the price plan to start with for the visitor's kind of business, once
 * they have answered the question on the home page. Shows nothing otherwise.
 */
export function PlanMarker({
  planId,
  locale = "en",
}: {
  planId: string;
  locale?: ProfileLocale;
}) {
  const answer = useVisitorAnswer();
  if (!answer) return null;
  const profile = getProfile(answer.profile, locale);
  if (!profile.plans.includes(planId)) return null;
  return <p className="plan-marker">{profile.answerLine}</p>;
}
