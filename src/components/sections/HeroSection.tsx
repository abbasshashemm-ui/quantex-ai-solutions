import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONTACT } from "@/lib/site/contact";
import { SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative grid min-h-[100dvh] grid-rows-[minmax(0,1.1fr)_auto_minmax(4.5rem,0.72fr)] px-4 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32 md:grid-rows-[minmax(0,1fr)_auto_minmax(5rem,0.85fr)]"
    >
      <div aria-hidden className="min-h-0" />

      <div className="mx-auto w-full max-w-3xl px-1 text-center sm:px-2">
        <PageEyebrow align="center" className="text-metallic-gradient">
          Quantex AI Solutions
        </PageEyebrow>
        <h1 className="mt-3 text-balance text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-metallic-gradient sm:text-4xl md:text-5xl lg:text-6xl">
          Digital products built to perform—and convert
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-foreground/78 sm:mt-5 sm:text-base sm:leading-relaxed">
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
            className="btn-primary w-full sm:w-auto"
          >
            Book strategy call
          </a>
          <a
            href={SOLUTIONS_OVERVIEW_HREF}
            data-interactive
            className="btn-secondary w-full sm:w-auto"
          >
            View solutions
          </a>
        </div>
      </div>

      <div aria-hidden className="min-h-0" />
    </section>
  );
}
