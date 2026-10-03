import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { SITE_FAQ } from "@/lib/seo/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section alu-section"
      aria-labelledby="faq-heading"
    >
      <div className="alu-section__inner alu-split alu-split--top">
        <div data-reveal>
          <PageEyebrow>Questions</PageEyebrow>
          <h2 id="faq-heading" className="alu-display alu-section__title">
            What do people ask us?
          </h2>
          <p className="alu-lede">
            Straight answers about who we are, what we build and how to get
            started. Want the longer version?{" "}
            <Link
              href="/about"
              className="font-semibold underline underline-offset-4"
            >
              Read about the studio
            </Link>
            .
          </p>
        </div>

        <ul className="space-y-3">
          {SITE_FAQ.map((item) => (
            <li key={item.question}>
              <details className="faq-item faq-card alu-glass group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold sm:text-[1.0625rem]">
                    {item.question}
                  </h3>
                  <span
                    className="text-xl leading-none transition-transform group-open:rotate-45"
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
      </div>
    </section>
  );
}
