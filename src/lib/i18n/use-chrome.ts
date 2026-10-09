"use client";

import { usePathname } from "next/navigation";
import { CHROME, type ChromeStrings } from "@/lib/i18n/chrome";
import { splitLang, type Lang } from "@/lib/i18n/routes";

/** Header and footer strings for the language of the current page. */
export function useChrome(): { lang: Lang; t: ChromeStrings; rtl: boolean } {
  const { lang } = splitLang(usePathname() ?? "/");
  return { lang, t: CHROME[lang], rtl: lang === "ar" };
}
