"use client";

import Link from "next/link";
import { getProfile } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";

type Guide = { href: string; title: string; description: string };

/** The featured guides, with the visitor's own industry first when there is one. */
export function GuidesList({ guides }: { guides: Guide[] }) {
  const answer = useVisitorAnswer();
  const first = answer ? getProfile(answer.profile).guide : null;
  const ordered = first
    ? [...guides].sort(
        (a, b) => Number(b.href === first) - Number(a.href === first),
      )
    : guides;

  return (
    <ul className="rule-grid rule-grid--3">
      {ordered.map((guide, index) => (
        // Phones show the first three; the rest are one tap away in "All guides".
        <li
          key={guide.href}
          data-reveal
          className={index >= 3 ? "hidden sm:block" : undefined}
        >
          <Link
            href={guide.href}
            data-interactive
            className="rule-item rule-item--link flex h-full flex-col"
          >
            <h3 className="rule-item__title">{guide.title}</h3>
            <p className="mt-2 flex-1 text-body-sm leading-relaxed text-foreground/80">
              {guide.description}
            </p>
            <span className="mt-4 text-sm font-semibold text-foreground underline underline-offset-4">
              Read the guide
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
