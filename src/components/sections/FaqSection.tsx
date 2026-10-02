import Link from "next/link";
import { SITE_FAQ } from "@/lib/seo/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section faq-section--light relative px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-7xl"><div className="max-w-3xl">
        <h2
          id="faq-heading"
          className="section-heading"
        >
          What do people ask Quantex?
        </h2>
        <p className="mt-4 text-base leading-[1.75] sm:text-[1.0625rem]">
          Straight answers about who we are, what we build, and how to get
          started. Want the longer version?{" "}
          <Link href="/about" className="underline underline-offset-2">
            Read about the studio
          </Link>
          .
        </p>

        <ul className="mt-8 space-y-3">
          {SITE_FAQ.map((item) => (
            <li key={item.question}>
              <details className="faq-item faq-card group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold sm:text-[1.0625rem]">
                    {item.question}
                  </h3>
                  <span
                    className="transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="faq-card__answer px-4 pb-4 pt-3 text-base leading-[1.7] sm:px-5 sm:pb-5">
                  {item.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div></div>
    </section>
  );
}
