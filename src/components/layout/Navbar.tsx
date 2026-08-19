import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { SITE_NAV, CONTACT, WHATSAPP_CTA_LABEL } from "@/lib/site/contact";
import { BrandLogo } from "./BrandLogo";
import { MobileNav } from "./MobileNav";
import { ServicesNavDropdown } from "./ServicesNavDropdown";

const NAV_LINKS = SITE_NAV.filter(
  (item) => item.href !== "/" && item.label !== "Solutions",
);

export function Navbar() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-void/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5"
      >
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center sm:min-h-12"
        >
          <BrandLogo
            priority
            className="h-8 w-auto max-w-[min(240px,52vw)] sm:h-9 md:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex lg:gap-2">
          <li>
            <ServicesNavDropdown />
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-foreground/80 transition-colors hover:bg-white/6 hover:text-foreground sm:px-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
            data-conversion-location="navbar"
            className="btn-secondary hidden sm:inline-flex sm:px-4 md:px-5"
          >
            {WHATSAPP_CTA_LABEL}
          </a>
          <MobileNav />
        </div>
      </nav>
      <div className="site-header__line" aria-hidden />
    </header>
  );
}
