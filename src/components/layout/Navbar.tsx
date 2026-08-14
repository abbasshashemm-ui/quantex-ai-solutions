"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { SITE_NAV, CONTACT } from "@/lib/site/contact";
import { BrandLogo } from "./BrandLogo";
import { ServicesNavDropdown } from "./ServicesNavDropdown";

const NAV_LINKS = SITE_NAV.filter(
  (item) => item.href !== "/" && item.label !== "Solutions",
);

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/8 bg-void/70 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-3.5"
      >
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center sm:min-h-12"
          onClick={close}
        >
          <BrandLogo
            priority
            className="h-8 w-auto max-w-[min(200px,46vw)] sm:h-9 md:h-10"
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
            Book strategy call
          </a>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-foreground transition-colors hover:border-white/35 hover:bg-white/6 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 border-t border-white/10 bg-void/95 backdrop-blur-xl md:hidden"
          style={{ paddingTop: "calc(4.5rem + env(safe-area-inset-top))" }}
        >
          <ul className="flex flex-col px-4 pb-[env(safe-area-inset-bottom)]">
            <li>
              <Link
                href="/"
                className="flex min-h-12 items-center border-b border-white/8 text-sm text-foreground transition-colors hover:bg-white/6 hover:text-foreground"
                onClick={close}
              >
                Home
              </Link>
            </li>
            <ServicesNavDropdown variant="mobile" onNavigate={close} />
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center border-b border-white/8 text-sm text-foreground transition-colors hover:bg-white/6 hover:text-foreground"
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex w-full"
                onClick={close}
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="site-header__line" aria-hidden />
    </header>
  );
}
