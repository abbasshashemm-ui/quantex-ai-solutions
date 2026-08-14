import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { SITE_FAQ } from "@/lib/seo/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section relative border-t border-white/8 px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <PageEyebrow>FAQ</PageEyebrow>
        <h2
          id="faq-heading"
          className="section-heading mt-3 text-metallic-gradient"
        >
          What do people ask Quantex?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/65 sm:text-base">
          Straight answers about who we are, what we build, and how to get
          started. Want the longer version?{" "}
          <Link href="/about" className="text-foreground/85 underline-offset-2 hover:underline">
            Read about the studio
          </Link>
          .
        </p>

        <ul className="mt-8 space-y-3">
          {SITE_FAQ.map((item) => (
            <li key={item.question}>
              <details className="faq-item glass-panel group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    {item.question}
                  </h3>
                  <span
                    className="text-foreground/50 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-white/8 px-4 pb-4 pt-3 text-sm leading-relaxed text-foreground/70 sm:px-5 sm:pb-5">
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
