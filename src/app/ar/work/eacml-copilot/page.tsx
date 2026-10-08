import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/site";
import { CONTACT } from "@/lib/site/contact";
import { ArticleFigure } from "@/components/figures/ArticleFigure";
import { EACML_PATH } from "@/lib/projects/eacml";
import { EACML_AR as EACML, EACML_FIGURE_AR as EACML_FIGURE } from "@/lib/i18n/eacml-ar";

const AR_PATH = "/ar/work/eacml-copilot";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: EACML.seoTitle,
  description: EACML.description,
  path: AR_PATH,
  locale: "ar_LB",
  languages: {
    en: absoluteUrl(EACML_PATH),
    ar: absoluteUrl(AR_PATH),
    "x-default": absoluteUrl(EACML_PATH),
  },
  keywords: ["فحص الأنظمة بالذكاء الاصطناعي", "مراجعة المخططات الهندسية", "ذكاء اصطناعي داخل المقر"],
});

const BODY =
  "text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.75]";

export default function EacmlCopilotArPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${absoluteUrl(AR_PATH)}#webpage`,
            url: absoluteUrl(AR_PATH),
            inLanguage: "ar",
            name: EACML.seoTitle,
            description: EACML.description,
            isPartOf: { "@id": `${getSiteUrl()}/#website` },
            about: { "@id": `${getSiteUrl()}/#organization` },
          },
          buildBreadcrumbSchema([
            { name: "الرئيسية", path: "/ar" },
            { name: "أعمالنا", path: "/ar#work" },
            { name: EACML.title, path: AR_PATH },
          ]),
        ]}
      />
      <article lang="ar" dir="rtl" className="about-page page-shell rtl-page">
        <div className="page-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/ar#work" data-interactive className="page-back">
              → أعمالنا
            </Link>
            <Link href={EACML_PATH} hrefLang="en" lang="en" dir="ltr" data-interactive className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4">
              English
            </Link>
          </div>

          <header className="mt-8 sm:mt-10">
            <PageEyebrow>{EACML.eyebrow}</PageEyebrow>
            <h1 className="alu-display page-title mt-4" dir="ltr">{EACML.title}</h1>
            <p className="alu-lede max-w-3xl">{EACML.pitch}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/ar/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
                تواصل معنا
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-secondary w-full max-w-xs sm:w-auto"
              >
                واتساب
              </a>
            </div>
          </header>

          <dl className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5 lg:grid-cols-4" aria-label="المشروع في لمحة">
            {EACML.stats.map((stat) => (
              <div key={stat.label} className="alu-stat alu-glass">
                <dd className="alu-stat__value">{stat.value}</dd>
                <dt className="alu-stat__label">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <section className="mt-20 sm:mt-28" aria-labelledby="eacml-problem">
            <PageEyebrow>المشكلة</PageEyebrow>
            <h2 id="eacml-problem" className="alu-display page-h2 mt-3 max-w-3xl">
              {EACML.problem.title}
            </h2>
            <div className={`mt-6 max-w-3xl space-y-4 ${BODY}`}>
              {EACML.problem.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mt-20 sm:mt-28" aria-labelledby="eacml-how">
            <PageEyebrow>كيف يعمل</PageEyebrow>
            <h2 id="eacml-how" className="alu-display page-h2 mt-3 max-w-3xl">
              من الرفع إلى نتيجة تمت مراجعتها.
            </h2>
            <div className="mt-8">
              <ArticleFigure lang="ar" data={EACML_FIGURE} />
            </div>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {EACML.steps.map((step, index) => (
                <li key={step.label} className="alu-glass page-panel">
                  <span className="page-label">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="alu-display mt-3 text-[1.9rem]">{step.label}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-foreground/80">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="alu-glass page-panel mt-20 sm:mt-28" aria-labelledby="eacml-principle">
            <PageEyebrow>{EACML.principle.eyebrow}</PageEyebrow>
            <h2 id="eacml-principle" className="alu-display mt-3 text-[clamp(3rem,9vw,6.5rem)]">
              {EACML.principle.title}
            </h2>
            <p className={`mt-6 max-w-3xl ${BODY}`}>{EACML.principle.body}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {EACML.principle.states.map((state) => (
                <li key={state.name} className="border border-line-strong p-4">
                  <p className="alu-display text-[1.5rem]">{state.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{state.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 grid gap-5 sm:mt-28 lg:grid-cols-2" aria-label="ما يفعله وما لا يفعله">
            <div className="alu-glass page-panel">
              <h2 className="alu-display text-[2.2rem]">ما يفعله</h2>
              <ul className="mt-5 space-y-3">
                {EACML.does.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/85">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-foreground" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="alu-glass page-panel">
              <h2 className="alu-display text-[2.2rem]">ما لا يفعله</h2>
              <ul className="mt-5 space-y-3">
                {EACML.doesNot.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/85">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 border border-foreground" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-20 sm:mt-28" aria-labelledby="eacml-secure">
            <PageEyebrow>الثقة</PageEyebrow>
            <h2 id="eacml-secure" className="alu-display page-h2 mt-3 max-w-3xl">
              {EACML.secure.title}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {EACML.secure.items.map((item) => (
                <li key={item.title} className="alu-glass page-panel">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 sm:mt-28" aria-labelledby="eacml-build">
            <PageEyebrow>خلف الكواليس</PageEyebrow>
            <h2 id="eacml-build" className="alu-display page-h2 mt-3 max-w-3xl">
              {EACML.build.title}
            </h2>
            <ul className="mt-6 max-w-3xl space-y-3">
              {EACML.build.items.map((item) => (
                <li key={item} className={`flex gap-3 ${BODY}`}>
                  <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 bg-foreground" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 sm:mt-28" aria-labelledby="eacml-status">
            <PageEyebrow>الحالة</PageEyebrow>
            <h2 id="eacml-status" className="alu-display page-h2 mt-3 max-w-3xl">
              {EACML.status.title}
            </h2>
            <p className={`mt-6 max-w-3xl ${BODY}`}>{EACML.status.body}</p>
          </section>

          <section className="about-page__cta alu-glass mt-20 px-5 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
            <h2 className="alu-display mx-auto max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)]">
              {EACML.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/80">{EACML.cta.lead}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/ar/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
                ابدأ مشروعك
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-secondary w-full max-w-xs sm:w-auto"
              >
                راسلنا على واتساب
              </a>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
