import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { SITE_FAQ } from "@/lib/seo/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section relative border-t border-white/5 px-4 py-16 sm:px-6 sm:py-20 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="aurora-veil aurora-veil--faq" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-3xl">
        <PageEyebrow>FAQ</PageEyebrow>
        <h2 id="faq-heading" className="section-heading mt-3 text-aurora-text">
          Common questions
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Straight answers about who we are, what we build, and how to get
          started.
        </p>

        <ul className="mt-8 space-y-0 divide-y divide-white/8 border-y border-white/8">
          {SITE_FAQ.map((item) => (
            <li key={item.question}>
              <details className="faq-item group">
                <summary className="cursor-pointer list-none py-4 text-sm font-semibold text-foreground marker:content-none sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      className="text-aurora-cyan/70 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="pb-4 text-sm leading-relaxed text-muted sm:pb-5">
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
