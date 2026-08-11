import Image from "next/image";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";

export function HeroSection() {
  return (
    <section id="home" className="hero-crt" aria-labelledby="hero-heading">
      <div className="hero-crt__media" aria-hidden>
        <Image
          src="/hero-crt-dashboard.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-crt__bg"
        />
        <div className="hero-crt__veil" />
      </div>

      <div className="hero-crt__content">
        <BrandLogo
          priority
          className="hero-crt__logo h-11 w-auto max-w-[min(300px,78vw)] sm:h-14 md:h-16"
        />
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
    </section>
  );
}
