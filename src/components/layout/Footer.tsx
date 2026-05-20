import { BrandLogo } from "./BrandLogo";
import {
  COMPANY,
  CONTACT_LINKS,
  FOOTER_EXTRA,
  FOOTER_NAV,
} from "@/lib/site/footer";

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

        <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-4 text-[0.65rem] text-foreground/80 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-5 sm:text-xs">
          <p>&copy; {year} {COMPANY.name}</p>
          <p className="tracking-wide">We don&apos;t sell code. We sell efficiency.</p>
        </div>
      </div>
    </footer>
  );
}
