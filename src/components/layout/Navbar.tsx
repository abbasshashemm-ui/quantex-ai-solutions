import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { SITE_NAV } from "@/lib/site/contact";
import { BrandLogo } from "./BrandLogo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { ServicesNavDropdown } from "./ServicesNavDropdown";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_LINKS = SITE_NAV.filter(
  (item) => item.href !== "/" && item.label !== "Solutions",
);

export function Navbar() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
      <nav
        aria-label="Primary"
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
                {link.label}
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
            Start a project
          </Link>
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
