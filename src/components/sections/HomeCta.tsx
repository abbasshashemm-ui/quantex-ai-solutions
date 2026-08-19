import Link from "next/link";
import { CONTACT, WHATSAPP_CTA_LABEL } from "@/lib/site/contact";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

export function HomeCta() {
  return (
    <section className="home-cta relative px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="home-cta__panel">
          <PageEyebrow align="center">Next step</PageEyebrow>
          <h2 className="section-heading mx-auto mt-4 max-w-2xl text-metallic-gradient">
            How do I start a project with Quantex?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/70 sm:text-base">
            Share the product, the goal, and the timeline. We&apos;ll come back
            with a scoped first milestone—not a generic pitch.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              Send a brief
            </Link>
            <Link
              href="/about"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              About the studio
            </Link>
          </div>
          <p className="mt-5 text-sm text-foreground/55">
            Prefer chat?{" "}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="text-foreground/80 underline-offset-2 hover:text-foreground hover:underline"
            >
              {WHATSAPP_CTA_LABEL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
