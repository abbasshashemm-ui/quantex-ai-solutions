import Image from "next/image";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";

const HERO_WIDTH = 3072;
const HERO_HEIGHT = 2048;

export function HeroSection() {
  return (
    <section id="home" className="hero-crt" aria-labelledby="hero-heading">
      <div className="hero-crt__frame">
        <div className="hero-crt__media" aria-hidden>
          <Image
            src="/hero-quantex-dashboard.png"
            alt=""
            width={HERO_WIDTH}
            height={HERO_HEIGHT}
            priority
            quality={100}
            unoptimized
            sizes="100vw"
            className="hero-crt__bg"
          />
          <div className="hero-crt__veil" />
        </div>

        <div className="hero-crt__content">
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
