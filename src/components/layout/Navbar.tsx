"use client";

import { LocalLink as Link } from "@/components/ui/LocalLink";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { SITE_NAV } from "@/lib/site/contact";
import { BrandLogo } from "./BrandLogo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { ServicesNavDropdown } from "./ServicesNavDropdown";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useChrome } from "@/lib/i18n/use-chrome";

const NAV_LINKS = SITE_NAV.filter(
  (item) => item.href !== "/" && item.label !== "Solutions",
);

const NAV_KEY = {
  "/ai-solutions": "aiSolutions",
  "/insights": "guides",
  "/about": "about",
  "/contact": "contact",
} as const;

export function Navbar() {
  const { t, rtl } = useChrome();
  return (
    <header dir={rtl ? "rtl" : undefined} className={`site-header fixed inset-x-0 top-0 z-50 px-4 pt-[env(safe-area-inset-top)] sm:px-6${rtl ? " rtl-page" : ""}`}>
      <nav
        aria-label={t.nav.primary}
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-3 sm:py-3.5"
      >
        <Link
          href="/"
          className="relative z-[41] inline-flex min-h-11 shrink-0 items-center sm:min-h-12"
        >
          <BrandLogo className="text-[1.9rem] sm:text-[2.1rem] lg:text-[2.3rem]" />
        </Link>

        <ul className="hidden items-center gap-1 whitespace-nowrap lg:flex xl:gap-2">
          <li>
            <ServicesNavDropdown />
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-control px-3 text-sm text-foreground/80 transition-colors hover:bg-foreground/6 hover:text-foreground sm:px-4"
              >
                {t.nav[NAV_KEY[link.href as keyof typeof NAV_KEY]] ?? link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            data-conversion={CONVERSION_EVENTS.CTA_CLICK}
            data-conversion-location="navbar"
            className="btn-primary site-header__cta min-h-11! whitespace-nowrap sm:px-4 lg:px-5"
          >
            {t.nav.startProject}
          </Link>
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
