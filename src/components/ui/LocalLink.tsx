"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { splitLang, translatedPath } from "@/lib/i18n/routes";

/**
 * A Link that keeps the visitor in their language: on an Arabic or French page
 * an internal link points to the page's Arabic or French version when one
 * exists. Links that carry `hrefLang` (language switches) are left alone.
 */
export function LocalLink({ href, hrefLang, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname() ?? "/";
  const { lang } = splitLang(pathname);
  let target = href;

  if (lang !== "en" && !hrefLang && typeof href === "string" && href.startsWith("/")) {
    const [pathAndQuery, hash] = href.split("#");
    const [path, query] = pathAndQuery.split("?");
    const base = path || "/";
    const translated = translatedPath(lang, base);
    if (translated) {
      target = `${translated}${query ? `?${query}` : ""}${hash !== undefined ? `#${hash}` : ""}`;
    }
  }

  return <Link href={target} hrefLang={hrefLang} {...props} />;
}
