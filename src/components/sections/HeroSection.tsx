"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";

const LIVE_STATUS = [
  { stage: "06 GRAPH", status: "RUNNING" },
  { stage: "05 INDEX", status: "OK" },
  { stage: "07 ANALYZE", status: "QUEUED" },
] as const;

export function HeroSection() {
  const [statusIndex, setStatusIndex] = useState(0);
  const live = LIVE_STATUS[statusIndex] ?? LIVE_STATUS[0];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % LIVE_STATUS.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero-crt" aria-labelledby="hero-heading">
      <div className="hero-crt__frame">
        <div className="hero-crt__media" aria-hidden>
          <Image
            src="/hero-quantex-dashboard.webp"
            alt=""
            fill
            priority
            quality={80}
            sizes="100vw"
            className="hero-crt__bg"
          />
          <div className="hero-crt__veil" />
          <div className="hero-crt__scan" />
        </div>

        <div className="hero-crt__content">
          <p className="hero-crt__live" aria-live="polite">
            <span className="hero-crt__live-dot" />
            <span className="hero-crt__live-label">LIVE</span>
            <span className="hero-crt__live-stage">{live.stage}</span>
            <span className="hero-crt__live-sep">▸</span>
            <span className="hero-crt__live-status">{live.status}</span>
            <span className="hero-crt__cursor" />
          </p>

          <h1 id="hero-heading">Crawl. Index. Rank.</h1>
          <p className="hero-crt__support">
            Technical SEO, Core Web Vitals, and search visibility—engineered at
            the source.
          </p>
          <div className="hero-crt__ctas">
            <a
              href="/contact"
              data-interactive
              data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
              data-conversion-location="hero"
              className="hero-crt__btn hero-crt__btn--primary"
            >
              [ RUN_VISIBILITY_AUDIT ]
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
              data-conversion-location="hero"
              className="hero-crt__btn hero-crt__btn--ghost"
            >
              [ BOOK_STRATEGY_CALL ]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
