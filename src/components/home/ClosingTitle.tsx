"use client";

import { getProfile } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

/** The page's last line, addressed to the visitor's kind of business. */
export function ClosingTitle() {
  const answer = useVisitorAnswer();
  return (
    <h2 className="alu-display alu-section__title">
      {answer ? getProfile(answer.profile).closing : "Tell us what you need"}
    </h2>
  );
}
