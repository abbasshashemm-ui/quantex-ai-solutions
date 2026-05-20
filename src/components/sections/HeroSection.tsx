import { CONTACT } from "@/lib/site/contact";
import { SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";

const heroMetallic =
  "bg-[linear-gradient(135deg,#6b7280_0%,#c0c5ce_28%,#ffffff_52%,#9ca3af_78%,#4b5563_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative grid min-h-[100dvh] grid-rows-[minmax(0,1.1fr)_auto_minmax(4.5rem,0.72fr)] px-4 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32 md:grid-rows-[minmax(0,1fr)_auto_minmax(5rem,0.85fr)]"
    >
      <div aria-hidden className="min-h-0" />

      <div className="mx-auto w-full max-w-3xl px-1 text-center sm:px-2">
        <p
          className={`text-[0.7rem] font-medium tracking-[0.2em] uppercase sm:text-xs sm:tracking-[0.35em] ${heroMetallic}`}
        >
          Quantex AI Solutions
        </p>
        <h1
          className={`mt-2.5 text-balance text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl ${heroMetallic}`}
        >
          Digital products built to perform—and convert
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:mt-5 sm:text-base">
          Custom software, high-converting websites, automation, and AI
          assistants—designed, built, and shipped with clarity from first call
          to launch.
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white px-6 text-xs font-semibold tracking-wide text-void uppercase transition-colors hover:bg-white/90 sm:text-sm"
          >
            Book strategy call
          </a>
          <a
            href={SOLUTIONS_OVERVIEW_HREF}
            data-interactive
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-xs font-medium tracking-wide text-foreground uppercase transition-colors hover:border-white/40 hover:bg-white/10 sm:text-sm"
          >
            View solutions
          </a>
        </div>
      </div>

      <div aria-hidden className="min-h-0" />
    </section>
  );
}
