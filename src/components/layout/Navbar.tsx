import Image from "next/image";
import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { SITE_NAV, CONTACT } from "@/lib/site/contact";
import { MobileNav } from "./MobileNav";
import { ServicesNavDropdown } from "./ServicesNavDropdown";

const NAV_LINKS = SITE_NAV.filter(
  (item) => item.href !== "/" && item.label !== "Solutions",
);

/** Global nav: a slim 44px translucent bar, mark first, items spread evenly. */
export function Navbar() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <nav aria-label="Primary" className="site-nav">
        <Link href="/" className="site-nav__logo" aria-label="Quantex AI Solutions, home">
          <Image
            src="/visuals/triangle.webp"
            alt=""
            width={44}
            height={39}
            priority
            quality={90}
            sizes="44px"
            className="site-nav__mark"
          />
        </Link>

        <ul className="site-nav__links">
          <li>
            <ServicesNavDropdown />
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
              data-conversion-location="navbar"
            >
              Book a call
            </a>
          </li>
        </ul>

        <MobileNav />
      </nav>
    </header>
  );
}
