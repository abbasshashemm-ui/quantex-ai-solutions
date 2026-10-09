"use client";

import { LocalLink as Link } from "@/components/ui/LocalLink";
import { useEffect, useState } from "react";
import { CONTACT, SITE_NAV } from "@/lib/site/contact";
import { ServicesNavDropdown } from "./ServicesNavDropdown";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_LINKS = SITE_NAV.filter(
  (item) => item.href !== "/" && item.label !== "Solutions",
);

export function MobileNav() {
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
    <>
      <button
        type="button"
        className="relative z-[41] inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-line-strong text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/6 lg:hidden"
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

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 border-t border-line bg-void/98 backdrop-blur-xl lg:hidden"
          style={{ paddingTop: "calc(4.5rem + env(safe-area-inset-top))" }}
        >
          <ul className="flex flex-col px-4 pb-[env(safe-area-inset-bottom)]">
            <li>
              <Link
                href="/"
                className="flex min-h-12 items-center border-b border-line text-sm text-foreground transition-colors hover:bg-foreground/6 hover:text-foreground"
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
                  className="flex min-h-12 items-center border-b border-line text-sm text-foreground transition-colors hover:bg-foreground/6 hover:text-foreground"
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-line py-1" onClick={close}>
              <LanguageSwitcher className="gap-2" />
            </li>
            <li className="pt-5">
              <Link
                href="/contact"
                className="btn-primary flex w-full"
                onClick={close}
              >
                Start a project
              </Link>
            </li>
            <li className="pt-3">
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
      ) : null}
    </>
  );
}
