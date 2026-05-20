import Link from "next/link";
import { CONTACT, CONTACT_CHANNELS } from "@/lib/site/contact";
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
      <div className="contact-page__grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href="/"
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-foreground/80 uppercase transition-opacity hover:opacity-80"
        >
          ← Home
        </Link>

        <header className="contact-page__header mx-auto mt-8 max-w-3xl text-center sm:mt-10">
          <p className="contact-page__eyebrow text-[0.65rem] font-medium tracking-[0.28em] text-foreground uppercase sm:text-xs sm:tracking-[0.35em]">
            Contact
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Let&apos;s talk about your{" "}
            <span className="text-metallic-gradient">project.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Whether you need a brand, a website, custom software, or all
            three—we&apos;d love to hear what you&apos;re working on.
          </p>
        </header>

        <div className="contact-page__layout mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10 xl:gap-14">
          <aside className="space-y-6">
            <ul className="space-y-5">
              {CONTACT_CHANNELS.map((channel) => {
                const content = (
                  <>
                    <span className="contact-channel__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-void/80">
                      <ContactIcon id={channel.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-medium tracking-[0.2em] text-foreground/55 uppercase">
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
                        className="contact-channel flex gap-4 transition-opacity hover:opacity-85"
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

            <div className="rounded-xl border border-white/10 bg-surface/50 p-5 backdrop-blur-md">
              <div className="flex gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-foreground"
                  aria-hidden
                >
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    We respond within 24 hours
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
                    Share as much context as you can—we&apos;ll reply with next
                    steps or a link to book a strategy call on{" "}
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-interactive
                      className="text-foreground underline-offset-2 hover:underline"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </article>
  );
}
