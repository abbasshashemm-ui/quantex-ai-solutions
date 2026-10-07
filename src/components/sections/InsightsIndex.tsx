import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { getArticleListing, INSIGHTS_PATH, type Lang } from "@/lib/articles";

const UI = {
  en: { back: "← Home", eyebrow: "Guides", title: "AI guides for businesses in Lebanon", lead: "Practical, plain-language guides on using AI in your business, from the Quantex team in Beirut.", read: "Read the guide", other: "العربية" },
  ar: { back: "→ الرئيسية", eyebrow: "أدلة", title: "أدلة الذكاء الاصطناعي للشركات في لبنان", lead: "أدلة عملية وبلغة بسيطة عن استخدام الذكاء الاصطناعي في عملك، من فريق كوانتكس في بيروت.", read: "اقرأ الدليل", other: "English" },
} as const;

export function InsightsIndex({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const rtl = lang === "ar";
  const other: Lang = rtl ? "en" : "ar";

  return (
    <section
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className={`about-page page-shell${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-4xl">
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
          <PageEyebrow>{t.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4">{t.title}</h1>
          <p className="alu-lede max-w-2xl">{t.lead}</p>
        </header>
        <ul className="mt-10 space-y-4">
          {getArticleListing(lang).map((item) => (
            <li key={item.href} className="alu-glass page-panel">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                {item.title}
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">
                {item.description}
              </p>
              <Link
                href={item.href}
                data-interactive
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
              >
                {t.read}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
