"use client";

import { LocalLink as Link } from "@/components/ui/LocalLink";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT } from "@/lib/site/contact";
import { CONTACT_EN } from "@/lib/i18n/contact-en";
import type { LocalizedContact } from "@/lib/i18n/types";
import { PRIVACY_POLICY } from "@/lib/site/legal/privacy-policy";
import { CONVERSION_EVENTS, trackConversion } from "@/lib/analytics/events";
import {
  CONTACT_FORM_LIMITS,
  sanitizeContactField,
  sanitizeContactForm,
  validateContactForm,
  type ContactFormFields,
} from "@/lib/sanitize/contact-form";

const initialState: ContactFormFields = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

const MAX_WHATSAPP_URL_LENGTH = 2048;

const inputClassName =
  "mt-1.5 block w-full rounded-xl border border-line-strong bg-surface-elevated/70 px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/55 focus:border-foreground focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--foreground)_12%,transparent)]";

function buildWhatsAppBody(data: ContactFormFields, f: LocalizedContact["form"]) {
  return [
    f.waGreeting,
    "",
    `${f.waName}: ${data.name}`,
    `${f.waEmail}: ${data.email}`,
    data.phone ? `${f.waPhone}: ${data.phone}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactForm({
  copy = CONTACT_EN.form,
  rtl = false,
}: {
  copy?: LocalizedContact["form"];
  rtl?: boolean;
}) {
  const [form, setForm] = useState<ContactFormFields>(initialState);
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof ContactFormFields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const sanitized = sanitizeContactField(field, e.target.value);
      setForm((prev) => ({ ...prev, [field]: sanitized }));
      setError(null);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitized = sanitizeContactForm(form);
    setForm(sanitized);

    const validationError = validateContactForm(sanitized);
    if (validationError) {
      setError(validationError);
      return;
    }

    const body = buildWhatsAppBody(sanitized, copy);
    const url = `${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`;

    if (url.length > MAX_WHATSAPP_URL_LENGTH) {
      setError(copy.tooLong);
      return;
    }

    trackConversion(CONVERSION_EVENTS.CONTACT_FORM_SUBMIT, {
      location: "contact_form",
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-form-card alu-glass p-5 sm:p-7 md:p-8">
      <h2 className="alu-display text-[2.4rem] sm:text-[3rem]">
        {copy.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">
        {copy.intro}
      </p>

      <form className="contact-form mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="contact-form__row grid gap-5 sm:grid-cols-2">
          <label className="contact-form__field block">
            <span className="contact-form__label">{copy.name}</span>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={CONTACT_FORM_LIMITS.name}
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              value={form.name}
              onChange={update("name")}
              data-interactive
              className={inputClassName}
            />
          </label>
          <label className="contact-form__field block">
            <span className="contact-form__label">{copy.email}</span>
            <input
              type="email"
              name="email"
              required
              maxLength={CONTACT_FORM_LIMITS.email}
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              value={form.email}
              onChange={update("email")}
              data-interactive
              className={inputClassName}
            />
          </label>
        </div>

        <label className="contact-form__field block">
          <span className="contact-form__label">{copy.phone}</span>
          <input
            type="tel"
            name="phone"
            maxLength={CONTACT_FORM_LIMITS.phone}
            autoComplete="tel"
            inputMode="tel"
            placeholder={copy.phonePlaceholder}
            value={form.phone}
            onChange={update("phone")}
            data-interactive
            className={inputClassName}
          />
        </label>

        <label className="contact-form__field block">
          <span className="contact-form__label">{copy.message}</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={CONTACT_FORM_LIMITS.message}
            rows={5}
            placeholder={copy.messagePlaceholder}
            value={form.message}
            onChange={update("message")}
            data-interactive
            className={`${inputClassName} min-h-[8.5rem] resize-y align-top`}
          />
        </label>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <p className="text-xs leading-relaxed text-foreground/70">
          {copy.consent}{" "}
          <Link
            href={PRIVACY_POLICY.path}
            data-interactive
            className="text-foreground/80 underline-offset-2 hover:text-foreground hover:underline"
          >
            {copy.privacy}
          </Link>
          .
        </p>

        <button
          type="submit"
          data-interactive
          className="contact-form__submit btn-primary w-full gap-2"
        >
          {copy.submit}
          <span aria-hidden>{rtl ? "←" : "→"}</span>
        </button>
      </form>
    </div>
  );
}
