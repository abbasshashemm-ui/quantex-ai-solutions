"use client";

import { useEffect, useState } from "react";

/**
 * The article's contents list. Beside the text on wide screens it stays in
 * view and marks the section being read.
 */
export function ArticleToc({
  label,
  heading,
  items,
}: {
  label: string;
  heading: string;
  items: { id: string; heading: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

    // The section whose top has most recently passed the upper part of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="article-toc">
      <p className="page-label">{heading}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
