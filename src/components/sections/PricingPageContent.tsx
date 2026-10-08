import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PricingPlans } from "@/components/sections/PricingPlans";
import {
  CUSTOM_SCOPES,
  PRICE_GROUPS,
  PRICING_FAQ,
} from "@/lib/pricing/data";
import {
  CUSTOM_SCOPES_FR,
  PRICE_GROUPS_FR,
  PRICING_FAQ_FR,
} from "@/lib/i18n/pricing-fr";
import {
  CUSTOM_SCOPES_AR,
  PRICE_GROUPS_AR,
  PRICING_FAQ_AR,
} from "@/lib/pricing/data-ar";

const COPY = {
  en: {
    back: "← Home",
    other: { href: "/ar/pricing", label: "العربية", lang: "ar" },
    eyebrow: "Pricing",
    title: "Clear prices, in dollars",
    lead: "Websites, search and AI assistants have a starting price. Custom work is quoted after a short call. Everything is built and looked after by the founder, so every project gets personal attention.",
    customTitle: "Custom work, quoted per project",
    customLead: "Tell us the problem. We reply within 24 hours with a fixed quote.",
    scoped: "Scoped per project",
    see: "See what it covers",
    faq: "Pricing questions",
    ctaTitle: "Not sure which plan?",
    ctaText: "Tell us what you need. We reply within 24 hours and recommend the smallest plan that does the job.",
    start: "Start a project",
    wa: "Message us on WhatsApp",
    book: "Book a 15-minute call",
  },
  ar: {
    back: "→ الرئيسية",
    other: { href: "/pricing", label: "English", lang: "en" },
    eyebrow: "الأسعار",
    title: "أسعار واضحة بالدولار",
    lead: "للمواقع والسيو ومساعدي الذكاء الاصطناعي سعر بداية معلن. الأعمال المخصصة تُسعَّر بعد مكالمة قصيرة. كل شيء يبنيه المؤسس ويعتني به بنفسه، فيحظى كل مشروع باهتمام شخصي.",
    customTitle: "أعمال مخصصة، تُسعَّر لكل مشروع",
    customLead: "أخبرنا بالمشكلة. نردّ خلال 24 ساعة بعرض سعر ثابت.",
    scoped: "يُحدَّد حسب المشروع",
    see: "اطّلع على ما يشمله",
    faq: "أسئلة عن الأسعار",
    ctaTitle: "لست متأكداً من الباقة؟",
    ctaText: "أخبرنا بما تحتاجه. نردّ خلال 24 ساعة ونقترح أصغر باقة تؤدي الغرض.",
    start: "ابدأ مشروعك",
    wa: "راسلنا على واتساب",
    book: "احجز مكالمة 15 دقيقة",
  },
  fr: {
    back: "← Accueil",
    other: { href: "/pricing", label: "English", lang: "en" },
    eyebrow: "Tarifs",
    title: "Des prix clairs, en dollars",
    lead: "Les sites web, le référencement et les assistants IA ont un prix de départ affiché. Les projets sur mesure sont chiffrés après un court appel. Tout est conçu et suivi par le fondateur, donc chaque projet reçoit une attention personnelle.",
    customTitle: "Sur mesure, chiffré projet par projet",
    customLead: "Décrivez-nous le problème. Nous répondons sous 24 heures avec un devis ferme.",
    scoped: "Défini selon le projet",
    see: "Voir ce que cela couvre",
    faq: "Questions sur les tarifs",
    ctaTitle: "Vous hésitez sur la formule ?",
    ctaText: "Dites-nous ce dont vous avez besoin. Nous répondons sous 24 heures et recommandons la plus petite formule qui fait le travail.",
    start: "Démarrer un projet",
    wa: "Écrivez-nous sur WhatsApp",
    book: "Réserver un appel de 15 minutes",
  },
} as const;
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { bookCallHref, CONTACT } from "@/lib/site/contact";

export function PricingPageContent({ lang = "en" }: { lang?: "en" | "ar" | "fr" }) {
  const ar = lang === "ar";
  const t = COPY[lang];
  const groups = ar ? PRICE_GROUPS_AR : lang === "fr" ? PRICE_GROUPS_FR : PRICE_GROUPS;
  const scopes = ar ? CUSTOM_SCOPES_AR : lang === "fr" ? CUSTOM_SCOPES_FR : CUSTOM_SCOPES;
  const faq = ar ? PRICING_FAQ_AR : lang === "fr" ? PRICING_FAQ_FR : PRICING_FAQ;
  return (
    <article
      id="pricing-page"
      lang={ar ? "ar" : lang === "fr" ? "fr" : undefined}
      dir={ar ? "rtl" : undefined}
      className={`page-shell min-h-[100dvh]${ar ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" data-interactive className="page-back">
            {t.back}
          </Link>
          <Link
            href={t.other.href}
            hrefLang={t.other.lang}
            lang={t.other.lang}
            dir={t.other.lang === "ar" ? "rtl" : "ltr"}
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            {t.other.label}
          </Link>
        </div>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>{t.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4">
            {t.title}
          </h1>
          <p className="alu-lede max-w-2xl">{t.lead}</p>
        </header>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
          {groups.map((group) => (
            <PricingPlans key={group.id} group={group} lang={lang} />
          ))}
        </div>

        <section className="mt-16 sm:mt-24" aria-labelledby="price-custom">
          <h2
            id="price-custom"
            className="alu-display text-[2.4rem] sm:text-[3rem]"
          >
            {t.customTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-foreground/80">
            {t.customLead}
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {scopes.map((item) => (
              <li key={item.slug} className="alu-glass page-panel">
                <p className="page-label">{t.scoped}</p>
                <h3 className="alu-display mt-3 text-[1.9rem]">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground/85">{item.text}</p>
                <Link
                  href={`/services/${item.slug}`}
                  data-interactive
                  className="btn-secondary mt-5 w-full text-center"
                >
                  {t.see}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 sm:mt-24" aria-labelledby="price-faq">
          <h2 id="price-faq" className="alu-display text-[2.4rem] sm:text-[3rem]">
            {t.faq}
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.question} className="alu-glass page-panel">
                <dt className="text-base font-semibold text-foreground">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="alu-glass mt-16 px-5 py-12 text-center sm:mt-24 sm:px-10 sm:py-16">
          <h2 className="alu-display mx-auto max-w-3xl text-[clamp(3rem,7vw,5.5rem)]">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">
            {t.ctaText}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
              {t.start}
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {t.wa}
            </a>
            <a
              href={bookCallHref(ar ? "مرحباً كوانتكس، أود حجز مكالمة مدتها 15 دقيقة." : lang === "fr" ? "Bonjour QUANTEX, je souhaite réserver un appel de 15 minutes." : undefined)}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              data-conversion={CONVERSION_EVENTS.BOOK_CALL_CLICK}
              data-conversion-location="pricing_cta"
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {t.book}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
