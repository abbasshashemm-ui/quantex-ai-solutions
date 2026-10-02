import Image from "next/image";
import Link from "next/link";
import { HeroChat } from "@/components/chat/HeroChat";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";

export function HeroSection() {
  return (
    <section
      id="home"
      className="hero-studio"
      aria-labelledby="hero-heading"
    >
      <div className="hero-veil" aria-hidden>
        <Image
          src="/quantex-chrome-mark-v2.webp"
          alt=""
          width={1100}
          height={966}
          priority
          sizes="(max-width: 1024px) 70vw, 46vw"
          className="hero-mark"
          aria-hidden
        />
      </div>

      <div className="hero-studio__inner">
        <div className="hero-studio__copy">
          <PageEyebrow>[ AI Solutions · Beirut ]</PageEyebrow>
          <h1 id="hero-heading" className="hero-heading">
            <span className="hero-heading__line">Automate.</span>
            <span className="hero-heading__line">Scale.</span>
            <span className="hero-heading__line">Dominate.</span>
          </h1>
          <p>
            High-converting websites and on-brand AI assistants—built to
            perform, convert, and hand off to humans when it matters.
          </p>
          <div className="hero-ctas">
            <a
              href="/contact"
              data-interactive
              data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
              data-conversion-location="hero"
              className="btn-primary"
            >
              Start a project
            </a>
            <a
              href="#solutions"
              data-interactive
              className="btn-secondary"
            >
              Explore solutions
            </a>
          </div>
          <div className="hero-follow">
            <Link href="/about" data-interactive>
              The studio
            </Link>
            <span aria-hidden>·</span>
            <Link href="#process" data-interactive>
              How we work
            </Link>
          </div>
          <div className="hero-meta">
            <span className="hero-meta__chip">
              <span className="hero-meta__dot" aria-hidden />
              Assistant online
            </span>
            <Link href="/about" className="hero-meta__chip" data-interactive>
              10+ businesses
            </Link>
            <span className="hero-meta__chip">Founded 2024</span>
          </div>
        </div>

        <HeroChat />
      </div>
    </section>
  );
}
