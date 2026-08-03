import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT, CONTACT_CHANNELS } from "@/lib/site/contact";
import { ContactForm } from "./ContactForm";

function ContactIcon({ id }: { id: string }) {
  const className = "h-4 w-4 text-aurora-cyan";

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
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
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
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="7" r="0.75" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContactSection() {
  return (
    <article
      id="contact-page"
      className="contact-page relative min-h-[100dvh] px-4 pb-20 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32"
    >
      <div className="aurora-veil aurora-veil--page" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-7xl">
        <Link
          href="/"
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-muted uppercase transition-colors hover:text-foreground"
        >
          ← Home
        </Link>

        <header className="contact-page__header mt-8 max-w-3xl sm:mt-10">
          <PageEyebrow>Contact</PageEyebrow>
          <h1 className="section-heading mt-4 text-aurora-text lg:text-5xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Whether you need a brand, a website, custom software, or all
            three—we&apos;d love to hear what you&apos;re working on.
          </p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
            data-conversion-location="contact_hero"
            className="btn-primary mt-7"
          >
            Message on WhatsApp
          </a>
          <p className="mt-3 text-xs text-muted sm:text-sm">
            We usually reply within 24 hours.
          </p>
        </header>

        <div className="contact-page__layout mt-12 grid gap-10 border-t border-white/8 pt-10 lg:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12 xl:gap-16">
          <aside className="space-y-5">
            <p className="text-[0.65rem] font-medium tracking-[0.22em] text-muted uppercase">
              Or reach us directly
            </p>
            <ul className="space-y-4">
              {CONTACT_CHANNELS.map((channel) => {
                const content = (
                  <>
                    <span className="contact-channel__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-void/60">
                      <ContactIcon id={channel.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-medium tracking-[0.2em] text-muted uppercase">
                        {channel.label}
                      </span>
                      <span className="mt-1 block text-sm text-foreground sm:text-base">
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
                        className="contact-channel flex min-h-11 gap-4 rounded-lg px-1 transition-colors hover:bg-white/5 sm:px-2"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="contact-channel flex gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div>
            <p className="mb-4 text-[0.65rem] font-medium tracking-[0.22em] text-muted uppercase">
              Send a brief
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </article>
  );
}
