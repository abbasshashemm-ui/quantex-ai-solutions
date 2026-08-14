import Link from "next/link";

const PATHS = [
  {
    href: "#work",
    eyebrow: "Work",
    title: "See what shipped",
    body: "Live sites and internal tools. Open a build, then keep going.",
  },
  {
    href: "/about",
    eyebrow: "Studio",
    title: "Meet the people",
    body: "Beirut, 2024. A small team that writes the code you launch.",
  },
  {
    href: "/contact",
    eyebrow: "Brief",
    title: "Start a project",
    body: "Tell us the goal. You get a scoped first milestone, not a deck.",
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
            <p className="explore-band__eyebrow">{path.eyebrow}</p>
            <h2 className="explore-band__title">{path.title}</h2>
            <p className="explore-band__body">{path.body}</p>
            <span className="explore-band__more">
              Continue
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
