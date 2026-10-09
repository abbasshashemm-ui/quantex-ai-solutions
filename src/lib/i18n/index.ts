import { AR } from "@/lib/i18n/ar";
import { FR } from "@/lib/i18n/fr";
import type { Locale, LocaleContent } from "@/lib/i18n/types";

export const LOCALES: Locale[] = ["ar", "fr"];

export function getLocaleContent(locale: Locale): LocaleContent {
  return locale === "ar" ? AR : FR;
}

/** Path prefix for a locale, e.g. "/ar". */
export const localePath = (locale: Locale, path = "") =>
  `/${locale}${path === "/" ? "" : path}`;
