import { BrandLogo } from "./BrandLogo";
import {
  COMPANY,
  CONTACT,
  CONTACT_LINKS,
  FOOTER_EXTRA,
  FOOTER_LEGAL,
  FOOTER_NAV,
} from "@/lib/site/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative z-20 border-t border-white/5 bg-void/40 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-void/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <BrandLogo className="h-5 w-auto max-w-[10rem] sm:h-6" />
            <p className="mt-2 max-w-sm text-xs leading-snug text-foreground/90 sm:text-sm sm:leading-relaxed">
              {COMPANY.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="footer-social glass-panel inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface-elevated/70 text-foreground/85 transition-colors hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="h-5 w-5"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="17" cy="7" r="0.85" fill="currentColor" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="footer-social glass-panel inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface-elevated/70 text-foreground/85 transition-colors hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="h-5 w-5"
                  >
                    <path
                      d="M7 10v10M7 7.3a1.3 1.3 0 10.01 0H7zM11 20v-5.6c0-1.6.8-2.6 2.2-2.6 1.3 0 2 1 2 2.6V20h4v-6.1c0-3.6-2-5.5-4.8-5.5-1.7 0-2.9.8-3.4 1.6V10H11z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="footer-social glass-panel inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface-elevated/70 text-foreground/85 transition-colors hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="h-5 w-5"
                  >
                    <path
                      d="M20 11.6a8 8 0 11-3.2-6.4A7.9 7.9 0 0120 11.6z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.3 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.3.6c-.1.2-.1.4 0 .6.4.8 1.4 1.8 2.2 2.2.2.1.4.1.6 0l.6-.3c.2-.1.4-.1.6 0l1.7.7c.3.1.4.3.4.5v.5c0 .2 0 .4-.5.6-.4.2-1.2.5-2.4.2-1.2-.3-2.8-1.4-3.8-2.4-1-1-2.1-2.6-2.4-3.8-.3-1.2 0-2 .2-2.4z"
                      fill="currentColor"
                      fillOpacity="0.9"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-medium tracking-[0.2em] text-foreground uppercase sm:text-xs sm:tracking-[0.25em]">
              Contact
            </h2>
            <ul className="mt-2 space-y-0.5 text-xs sm:text-sm">
              {CONTACT_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex min-h-11 items-center py-1 text-foreground/90 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-medium tracking-[0.2em] text-foreground uppercase sm:text-xs sm:tracking-[0.25em]">
              Navigate
            </h2>
            <ul className="mt-2 space-y-0.5 text-xs sm:text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center py-1 text-foreground/90 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {FOOTER_EXTRA.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center py-1 text-foreground/90 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-4 text-[0.65rem] text-foreground/80 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-5 sm:text-xs">
          <p>&copy; {year} {COMPANY.name}</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="tracking-wide sm:text-right">
            We don&apos;t sell code. We sell efficiency.
          </p>
        </div>
      </div>
    </footer>
  );
}
