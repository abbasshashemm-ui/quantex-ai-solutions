"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  NAV_SERVICE_ITEMS,
  SOLUTIONS_OVERVIEW_HREF,
} from "@/lib/services/nav";
import { LEGACY_SITE_URL } from "@/lib/site/contact";
import { ServiceNavIcon } from "./ServiceNavIcon";

type ServicesNavDropdownProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function ServicesNavDropdown({
  onNavigate,
  variant = "desktop",
}: ServicesNavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open || variant !== "desktop") return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, variant]);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <li className="border-b border-white/5">
        <button
          type="button"
          data-interactive
          className="flex min-h-12 w-full items-center justify-between text-base text-foreground"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Solutions
          <svg
            className={`h-4 w-4 text-foreground/70 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open ? (
          <ul className="pb-3 pl-1">
            {NAV_SERVICE_ITEMS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  data-interactive
                  className="flex min-h-11 items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
                  onClick={close}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-void/80 text-foreground/90">
                    <ServiceNavIcon icon={item.icon} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-foreground/65">
                      {item.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-white/8 pt-2">
              <Link
                href={SOLUTIONS_OVERVIEW_HREF}
                data-interactive
                className="flex min-h-10 items-center px-2 text-sm text-foreground/85"
                onClick={close}
              >
                View all solutions
              </Link>
            </li>
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        data-interactive
        className={`inline-flex min-h-12 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors sm:text-base ${
          open
            ? "border-white/30 bg-white/10 text-foreground"
            : "border-transparent text-foreground hover:border-white/15 hover:bg-white/5"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        Solutions
        <svg
          className={`h-3.5 w-3.5 text-foreground/70 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="services-nav-dropdown absolute top-[calc(100%+0.65rem)] left-1/2 z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-white/12 bg-surface-elevated/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:left-0 sm:w-[20.5rem] sm:translate-x-0"
        >
          <ul className="space-y-0.5">
            {NAV_SERVICE_ITEMS.map((item) => (
              <li key={item.slug} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  data-interactive
                  className="services-nav-dropdown__item group flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/6"
                  onClick={close}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-void/90 text-foreground/90 transition-colors group-hover:border-white/25 group-hover:text-foreground">
                    <ServiceNavIcon icon={item.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-sm font-semibold text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-foreground/65">
                      {item.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-1 border-t border-white/10 pt-1">
            <Link
              href={SOLUTIONS_OVERVIEW_HREF}
              role="menuitem"
              data-interactive
              className="services-nav-dropdown__item group flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/6"
              onClick={close}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-void/90 text-foreground/90">
                <svg
                  className="h-[1.125rem] w-[1.125rem]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
                </svg>
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block text-sm font-semibold text-foreground">
                  All solutions
                </span>
                <span className="mt-0.5 block text-xs text-foreground/65">
                  Overview on the home page
                </span>
              </span>
            </Link>

            <a
              href={LEGACY_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              data-interactive
              className="services-nav-dropdown__item group flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/6"
              onClick={close}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-void/90 text-foreground/90">
                <svg
                  className="h-[1.125rem] w-[1.125rem]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M5 7h14v10H5z" strokeLinejoin="round" />
                  <path d="M8 11h8M8 14h5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  quantexai.info
                  <svg
                    className="h-3 w-3 text-foreground/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M14 5h5v5M10 14L19 5M19 14v5H5V5h5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-0.5 block text-xs text-foreground/65">
                  Previous site & portfolio
                </span>
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
