import { HeroMedia } from "@/components/ui/HeroMedia";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { PAGE_STILLS } from "@/lib/brand/stills";
import { CONTACT } from "@/lib/site/contact";
import { SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";

export function HeroSection() {
  return (
    <section id="home" className="relative pb-16 sm:pb-20 md:pb-24">
      <HeroMedia
        src={PAGE_STILLS.home.src}
        alt={PAGE_STILLS.home.alt}
        priority
      />

      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
        <PageEyebrow>Quantex AI Solutions</PageEyebrow>
        <h1 className="display-title max-w-4xl">We build digital machines.</h1>
        <span className="signal-rule" aria-hidden />
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/78 sm:text-base">
          Custom software, high-converting websites, automation, and AI
          assistants—designed, built, and shipped with clarity from first call
          to launch.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
            data-conversion-location="hero"
            className="btn-primary w-full sm:w-auto"
          >
            Book strategy call
          </a>
          <a
            href={SOLUTIONS_OVERVIEW_HREF}
            data-interactive
            data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
            data-conversion-location="hero"
            className="btn-secondary w-full sm:w-auto"
          >
            View solutions
          </a>
        </div>
      </div>
    </section>
  );
}
