import Image from "next/image";
import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { MACHINES } from "@/lib/site/machines";

const chassis = MACHINES.chassis;

export function HeroSection() {
  return (
    <section id="home" className="poster poster--studio" aria-labelledby="hero-heading">
      <div className="poster__media">
        <Image
          src={chassis.src}
          alt={chassis.alt}
          fill
          priority
          quality={70}
          sizes="100vw"
          className="poster__photo"
          style={{ ["--plate-position" as string]: chassis.position }}
        />
      </div>
      <div className="poster__scrim" aria-hidden />
      <div className="poster__copy">
        <p className="poster__index">Beirut · AI studio</p>
        <h1 id="hero-heading" className="poster__title">
          We build digital machines.
        </h1>
        <p className="poster__body">
          High-converting websites and on-brand AI assistants—built to perform,
          convert, and hand off to humans when it matters.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            data-interactive
            data-conversion={CONVERSION_EVENTS.CTA_CLICK}
            data-conversion-location="hero"
            className="btn-primary"
          >
            Send a brief
          </Link>
          <a href="#work" data-interactive className="btn-secondary">
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}
