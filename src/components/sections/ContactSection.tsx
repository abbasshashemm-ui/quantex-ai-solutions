import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT_EN } from "@/lib/i18n/contact-en";
import type { LocalizedContact } from "@/lib/i18n/types";
import { bookCallHref, CONTACT_CHANNELS } from "@/lib/site/contact";
import { ContactForm } from "./ContactForm";

function ContactIcon({ id }: { id: string }) {
  const className = "h-4 w-4 text-foreground/90";

  switch (id) {
    case "email":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 6h16v12H4V6zm0 0 8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6.5 4h3l1.5 5-2 1.2a11 11 0 005.8 5.8L17 14l5 1.5v3A13.5 13.5 0 016.5 4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "location":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="12"
            cy="11"
            r="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="12"
            cy="12"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="17" cy="7" r="0.75" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContactSection({
  copy = CONTACT_EN,
  rtl = false,
  bookMessage,
  homeHref = "/",
  solutionsHref = "/#solutions",
  aboutHref = "/about",
  switchLink,
}: {
  copy?: LocalizedContact;
  rtl?: boolean;
  bookMessage?: string;
  homeHref?: string;
  solutionsHref?: string;
  aboutHref?: string;
  switchLink?: { href: string; label: string; lang: string };
}) {
  return (
    <article
      id="contact-page"
      lang={rtl ? "ar" : undefined}
      dir={rtl ? "rtl" : undefined}
      className={`contact-page page-shell min-h-[100dvh]${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href={homeHref} data-interactive className="page-back">
            {rtl ? "→" : "←"} {copy.back}
          </Link>
          {switchLink ? (
            <Link
              href={switchLink.href}
              hrefLang={switchLink.lang}
              lang={switchLink.lang}
              dir={switchLink.lang === "ar" ? "rtl" : "ltr"}
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              {switchLink.label}
            </Link>
          ) : null}
        </div>

        <header className="contact-page__header mx-auto mt-8 max-w-3xl text-center sm:mt-10">
          <PageEyebrow align="center">{copy.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4">
            {copy.title}
            <span className="block text-foreground/55">{copy.lead}</span>
          </h1>
          {copy.intro ? (
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/80">
              {copy.intro}
            </p>
          ) : null}
          <p className="mt-4 text-sm text-foreground/70">
            {copy.browsing}{" "}
            <Link
              href={solutionsHref}
              className="font-semibold text-foreground underline underline-offset-4"
            >
              {copy.seeBuild}
            </Link>
            {" · "}
            <Link
              href={aboutHref}
              className="font-semibold text-foreground underline underline-offset-4"
            >
              {copy.aboutStudio}
            </Link>
          </p>
        </header>

        <div className="contact-page__layout mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10 xl:gap-14">
          <aside className="space-y-6">
            <ul className="space-y-5">
              {CONTACT_CHANNELS.map((channel) => {
                const content = (
                  <>
                    <span className="contact-channel__icon page-icon h-10 w-10">
                      <ContactIcon id={channel.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="page-label block">{copy.channels[channel.id as keyof typeof copy.channels] ?? channel.label}</span>
                      <span className="mt-1 block text-sm text-foreground sm:text-base" dir={channel.id === "location" ? undefined : "ltr"}>
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.id}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        data-interactive
                        className="contact-channel flex min-h-11 gap-4 rounded-xl px-1 transition-colors hover:bg-foreground/6 sm:px-2"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="contact-channel flex min-h-11 gap-4 px-1 sm:px-2">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="alu-glass page-panel">
              <p className="text-sm font-semibold text-foreground">{copy.bookTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{copy.bookText}</p>
              <a
                href={bookCallHref(bookMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                data-conversion={CONVERSION_EVENTS.BOOK_CALL_CLICK}
                data-conversion-location="contact_page"
                className="btn-primary mt-4 w-full"
              >
                {copy.bookButton}
              </a>
            </div>
          </aside>

          <ContactForm copy={copy.form} rtl={rtl} />
        </div>
      </div>
    </article>
  );
}
