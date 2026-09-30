import Image from "next/image";
import Link from "next/link";
import { MACHINES } from "@/lib/site/machines";

const PATHS = [
  {
    href: "/#solutions",
    eyebrow: "Machines",
    title: "Open a plate",
    body: "Six builds. Pick the one that matches the job.",
    image: MACHINES.vents,
  },
  {
    href: "/about",
    eyebrow: "Studio",
    title: "Meet the people",
    body: "Beirut, 2024. A small team that writes the code you launch.",
    image: MACHINES.readout,
  },
  {
    href: "/contact",
    eyebrow: "Brief",
    title: "Start a project",
    body: "Tell us the goal. You get a scoped first milestone, not a deck.",
    image: MACHINES.knob,
  },
] as const;

export function ExploreBand() {
  return (
    <section
      className="explore-band relative border-t border-white/8 px-4 py-16 sm:px-6 sm:py-20"
      aria-label="Keep exploring"
    >
      <div className="explore-band__inner mx-auto grid max-w-7xl gap-4 sm:grid-cols-3 sm:gap-5">
        {PATHS.map((path) => (
          <Link
            key={path.href}
            href={path.href}
            data-interactive
            className="explore-band__card group"
          >
            <span className="instrument-frame">
              <Image
                src={path.image.src}
                alt=""
                fill
                quality={90}
                sizes="(max-width: 640px) 100vw, 30vw"
                className="poster__photo"
              />
            </span>
            <span className="explore-band__copy">
            <p className="explore-band__eyebrow">{path.eyebrow}</p>
            <h2 className="explore-band__title">{path.title}</h2>
            <p className="explore-band__body">{path.body}</p>
            <span className="explore-band__more">
              Continue
              <span aria-hidden>→</span>
            </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
