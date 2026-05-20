"use client";

import { useEffect, useState } from "react";
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
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/5 bg-void/40 px-4 py-4 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-void/30 sm:px-6 sm:py-5"
      >
        <a
          href="/"
          className="inline-flex min-h-12 shrink-0 items-center sm:min-h-14"
          onClick={close}
        >
          <BrandLogo priority className="h-8 w-auto max-w-[min(200px,46vw)] sm:h-9 md:h-10" />
        </a>

        <ul className="hidden items-center gap-2 md:flex lg:gap-4">
          <li>
            <ServicesNavDropdown />
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-12 items-center rounded-full px-3 text-sm text-foreground transition-opacity hover:opacity-80 sm:px-4 sm:text-base"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-12 items-center rounded-full border border-white/20 bg-white/5 px-5 text-xs font-medium tracking-wide text-foreground uppercase transition-colors hover:border-white/40 hover:bg-white/10 sm:inline-flex sm:text-sm"
          >
            Book Strategy Call
          </a>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 text-foreground md:hidden"
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
          className="fixed inset-0 z-40 bg-void/95 backdrop-blur-lg md:hidden"
          style={{ paddingTop: "calc(5.25rem + env(safe-area-inset-top))" }}
        >
          <ul className="flex flex-col px-4 pb-[env(safe-area-inset-bottom)]">
            <li>
              <a
                href="/"
                className="flex min-h-12 items-center border-b border-white/5 text-base text-foreground"
                onClick={close}
              >
                Home
              </a>
            </li>
            <ServicesNavDropdown variant="mobile" onNavigate={close} />
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex min-h-12 items-center border-b border-white/5 text-base text-foreground"
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-medium text-foreground"
                onClick={close}
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
