import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/site/contact";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { MACHINES } from "@/lib/site/machines";

export function HomeCta() {
  return (
    <section className="cta-stage relative px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="cta-stage__media" aria-hidden>
        <Image
          src={MACHINES.knob.src}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="poster__photo"
          style={{ objectPosition: "right center" }}
        />
      </div>
      <div className="cta-stage__scrim" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-5xl">
        <div className="relative text-center">
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
              Continue on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
