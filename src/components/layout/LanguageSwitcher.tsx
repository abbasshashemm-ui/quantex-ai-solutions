"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChrome } from "@/lib/i18n/use-chrome";
import { splitLang, translatedPath, type Lang } from "@/lib/i18n/routes";

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "عربي", name: "العربية" },
  { code: "fr", label: "FR", name: "Français" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const { lang: current, base } = splitLang(pathname);
  const { t } = useChrome();

  return (
    <ul className={`flex items-center ${className}`} aria-label={t.nav.language}>
      {LANGS.map((l) => {
        const href = translatedPath(l.code, base) ?? (l.code === "en" ? "/" : `/${l.code}`);
        const active = l.code === current;
        return (
          <li key={l.code}>
            <Link
              href={href}
              hrefLang={l.code}
              lang={l.code}
              aria-label={l.name}
              aria-current={active ? "true" : undefined}
              data-interactive
              className={`inline-flex min-h-11 min-w-9 items-center justify-center px-1.5 text-xs font-semibold tracking-wide transition-colors ${
                active
                  ? "text-foreground underline underline-offset-[6px]"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
