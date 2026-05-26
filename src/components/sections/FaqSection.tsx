import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { SITE_FAQ } from "@/lib/seo/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section relative border-t border-white/5 px-4 py-16 sm:px-6 sm:py-20 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <PageEyebrow>FAQ</PageEyebrow>
        <h2
          id="faq-heading"
          className="section-heading mt-3 text-metallic-gradient"
        >
          Common questions
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
          Straight answers about who we are, what we build, and how to get
          started.
        </p>

        <ul className="mt-8 space-y-3">
          {SITE_FAQ.map((item) => (
            <li key={item.question}>
              <details className="faq-item glass-panel group rounded-xl">
                <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-foreground marker:content-none sm:px-5 sm:text-base [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      className="text-foreground/50 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-white/8 px-4 pb-4 pt-3 text-sm leading-relaxed text-foreground/78 sm:px-5 sm:pb-5">
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
