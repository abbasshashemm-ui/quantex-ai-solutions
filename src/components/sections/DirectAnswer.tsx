import Link from "next/link";

const SPECS = [
  ["Founded", "2024"],
  ["Base", "Beirut, Lebanon"],
  ["Stack", "Next.js · Vercel · Gemini"],
  ["Channels", "Website · WhatsApp"],
  ["Handoff", "A human, when needed"],
  ["First reply", "Within 24 hours"],
] as const;

const PILLARS = [
  {
    href: "/services/high-converting-websites",
    label: "High-converting websites",
  },
  {
    href: "/services/custom-intelligent-chatbots",
    label: "Intelligent chatbots",
  },
  { href: "/services/seo", label: "SEO" },
  { href: "/about", label: "About the studio" },
  { href: "/contact", label: "Start a project" },
] as const;

export function DirectAnswer() {
  return (
    <section
      className="aeo-block relative border-t border-white/8 px-4 py-14 sm:px-6 sm:py-16"
      aria-labelledby="aeo-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
        <div className="max-w-3xl" data-reveal>
        <h2 id="aeo-heading" className="section-heading mt-3 text-metallic-gradient">
          What does Quantex build?
        </h2>
        <div className="aeo-answer mt-5 space-y-4 text-base leading-[1.75] text-foreground/80 sm:text-[1.0625rem]">
          <p>
            Quantex is a Beirut studio founded in 2024 that delivers AI solutions. We build
            on-brand AI chatbots and automation, and websites that are
            search-ready from the first commit—plus custom software and
            technical SEO.
          </p>
          <p>
            Sites ship on Next.js and Vercel with clean structure, fast Core Web
            Vitals, and measurement in Google Search Console. Assistants are
            grounded with Gemini on your documents and policies, then deployed
            on the website or WhatsApp with a human handoff when the answer
            needs a person.
          </p>
          <p>
            You work with the engineers writing the code—not a layer of
            coordinators.
          </p>
        </div>
        <ul className="aeo-pillars mt-6 flex flex-wrap gap-2">
          {PILLARS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-interactive
                className="inline-flex min-h-11 items-center rounded-full border border-white/12 bg-surface px-4 text-sm text-foreground/85 transition-colors hover:border-white/30 hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/contact" data-interactive className="btn-primary">
            Send a brief
          </Link>
        </p>
        </div>

        <dl className="spec-sheet lg:mt-14" data-reveal aria-label="Quantex at a glance">
          {SPECS.map(([label, value]) => (
            <div key={label} className="spec-sheet__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
