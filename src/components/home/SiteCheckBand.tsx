import Link from "next/link";

export function SiteCheckBand() {
  return (
    <section className="alu-section !py-8 sm:!py-10" aria-labelledby="site-check-band-heading">
      <div className="alu-section__inner">
        <div
          data-reveal
          className="alu-glass flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7"
        >
          <div className="min-w-0">
            <p className="page-label">Free tool · 20 seconds</p>
            <h2
              id="site-check-band-heading"
              className="alu-display mt-2 text-[1.9rem] sm:text-[2.4rem]"
            >
              Can customers and AI find your website?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-foreground/80 sm:text-base">
              Get a score for Google, AI search and mobile speed, with a fix list
              in plain words.
            </p>
          </div>
          <Link
            href="/site-check"
            data-interactive
            className="btn-primary w-full shrink-0 sm:w-auto"
          >
            Check my site free
          </Link>
        </div>
      </div>
    </section>
  );
}
