"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Lang = "en" | "ar" | "fr";

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "عربي", name: "العربية" },
  { code: "fr", label: "FR", name: "Français" },
];

const AR_ONLY = ["/work/eacml-copilot", "/ai-solutions", "/ai-solutions-lebanon"];
const BOTH = ["/", "/about", "/contact", "/pricing"];

function split(pathname: string): { lang: Lang; base: string } {
  const m = pathname.match(/^\/(ar|fr)(\/.*)?$/);
  if (m) return { lang: m[1] as Lang, base: m[2] || "/" };
  return { lang: "en", base: pathname || "/" };
}

function translated(lang: Lang, base: string): string | null {
  if (lang === "en") return base;
  const ok =
    BOTH.includes(base) ||
    base.startsWith("/services/") ||
    (lang === "ar" && (AR_ONLY.includes(base) || base === "/insights" || base.startsWith("/insights/")));
  if (!ok) return null;
  return base === "/" ? `/${lang}` : `/${lang}${base}`;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const { lang: current, base } = split(pathname);

  return (
    <ul className={`flex items-center ${className}`} aria-label="Language">
      {LANGS.map((l) => {
        const href = translated(l.code, base) ?? (l.code === "en" ? "/" : `/${l.code}`);
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
