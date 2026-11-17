"use client";

import Link from "next/link";
import { getProfile, type ProfileLocale } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

type Guide = {
  href: string;
  title: string;
  description: string;
  readingTime: string;
};

/**
 * The featured guides as numbered rows, with the visitor's own industry first
 * when there is a guide for it.
 */
export function GuidesList({
  guides,
  locale = "en",
}: {
  guides: Guide[];
  locale?: ProfileLocale;
}) {
  const answer = useVisitorAnswer();
  const first = answer ? getProfile(answer.profile, locale).guide : null;
  const ordered = first
    ? [...guides].sort(
        (a, b) => Number(b.href === first) - Number(a.href === first),
      )
    : guides;

  return (
    <ol className="guide-rows">
      {ordered.map((guide, index) => (
        // Phones show the first three; the rest are one tap away in "All guides".
        <li key={guide.href} className={index >= 3 ? "hidden sm:block" : undefined}>
          <Link href={guide.href} data-interactive className="guide-row">
            <span className="guide-row__n" aria-hidden>
              0{index + 1}
            </span>
            <span className="guide-row__text">
              <strong className="guide-row__title">{guide.title}</strong>
              <span className="guide-row__body">{guide.description}</span>
            </span>
            <span className="guide-row__meta">
              {guide.readingTime}{" "}
              <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
