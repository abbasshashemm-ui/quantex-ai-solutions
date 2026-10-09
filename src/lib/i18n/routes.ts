export type Lang = "en" | "ar" | "fr";

export const LANG_COOKIE = "lang";

const AR_ONLY = ["/work/eacml-copilot", "/ai-solutions", "/ai-solutions-lebanon"];
const BOTH = ["/", "/about", "/contact", "/pricing"];

/** Splits a pathname into its language and the English-equivalent path. */
export function splitLang(pathname: string): { lang: Lang; base: string } {
  const m = pathname.match(/^\/(ar|fr)(\/.*)?$/);
  if (m) return { lang: m[1] as Lang, base: m[2] || "/" };
  return { lang: "en", base: pathname || "/" };
}

/** The path of `base` in `lang`, or null when that language has no such page. */
export function translatedPath(lang: Lang, base: string): string | null {
  if (lang === "en") return base;
  const ok =
    BOTH.includes(base) ||
    base.startsWith("/services/") ||
    (lang === "ar" &&
      (AR_ONLY.includes(base) || base === "/insights" || base.startsWith("/insights/")));
  if (!ok) return null;
  return base === "/" ? `/${lang}` : `/${lang}${base}`;
}

export function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "ar" || value === "fr";
}
