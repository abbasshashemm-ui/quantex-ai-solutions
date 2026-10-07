import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { getArticleListing, getGuideGroups, INSIGHTS_PATH, type Lang } from "@/lib/articles";

const UI = {
  en: {
    back: "← Home",
    eyebrow: "Guides",
    title: "Guides",
    lead: "Practical, plain-language guides on using AI in your business and getting found on Google and in AI search. Written by the Quantex team in Beirut.",
    other: "العربية",
    jump: "Jump to",
    count: (n: number) => `${n} guides`,
    cta: "Need help with any of this?",
    ctaLead: "Tell us what you are trying to do. We reply within 24 hours.",
    start: "Start a project",
  },
  ar: {
    back: "→ الرئيسية",
    eyebrow: "أدلة",
    title: "الأدلة",
    lead: "أدلة عملية وبلغة بسيطة عن استخدام الذكاء الاصطناعي في عملك والظهور في غوغل وفي البحث بالذكاء الاصطناعي. بقلم فريق كوانتكس في بيروت.",
    other: "English",
    jump: "انتقل إلى",
    count: (n: number) => `${n} أدلة`,
    cta: "هل تحتاج مساعدة في أي من هذا؟",
    ctaLead: "أخبرنا ما الذي تحاول إنجازه. نردّ خلال 24 ساعة.",
    start: "ابدأ مشروعك",
  },
} as const;

export function InsightsIndex({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const rtl = lang === "ar";
  const other: Lang = rtl ? "en" : "ar";
  const groups = getGuideGroups(lang);
  const total = getArticleListing(lang).length;

  return (
    <section
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className={`about-page page-shell${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" data-interactive className="page-back">
            {t.back}
          </Link>
          <Link
            href={INSIGHTS_PATH[other]}
            hrefLang={other}
            lang={other}
            dir={rtl ? "ltr" : "rtl"}
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            {t.other}
          </Link>
        </div>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>
            {t.eyebrow} · {t.count(total)}
          </PageEyebrow>
          <h1 className="alu-display page-title mt-4">{t.title}</h1>
          <p className="alu-lede max-w-2xl">{t.lead}</p>

          <nav aria-label={t.jump} className="mt-8 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                data-interactive
                className="alu-chip alu-chip--link"
              >
                {group.label}
              </a>
            ))}
          </nav>
        </header>

        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="mt-16 scroll-mt-24 sm:mt-20"
            aria-labelledby={`${group.id}-h`}
          >
            <h2 id={`${group.id}-h`} className="alu-display page-h2">
              {group.label}
            </h2>
            {group.blurb ? (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
                {group.blurb}
              </p>
            ) : null}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-interactive
                    className="alu-glass page-panel group flex h-full flex-col"
                  >
                    <span className="page-label">{item.readingTime}</span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-foreground/75">
                      {item.description}
                    </p>
                    <span
                      aria-hidden
                      className="mt-4 text-sm font-semibold text-foreground"
                    >
                      {rtl ? "←" : "→"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="alu-glass mt-20 px-5 py-10 text-center sm:mt-24 sm:px-10">
          <h2 className="alu-display page-h2">{t.cta}</h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-foreground/80">
            {t.ctaLead}
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/contact" data-interactive className="btn-primary">
              {t.start}
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
