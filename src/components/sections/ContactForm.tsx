"use client";

import Link from "next/link";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { CONTACT } from "@/lib/site/contact";
import { PRIVACY_POLICY } from "@/lib/site/legal/privacy-policy";
import {
  CONVERSION_EVENTS,
  trackConversion,
} from "@/lib/analytics/events";
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
  "mt-1.5 block w-full rounded-xl border border-white/12 bg-surface-elevated px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-white/35 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--metallic)_16%,transparent)]";

function buildWhatsAppBody(data: ContactFormFields) {
  return [
    "Hi QUANTEX,",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactForm() {
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

    const body = buildWhatsAppBody(sanitized);
    const url = `${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`;

    if (url.length > MAX_WHATSAPP_URL_LENGTH) {
      setError("Message is too long. Please shorten it and try again.");
      return;
    }

    trackConversion(CONVERSION_EVENTS.CONTACT_FORM_SUBMIT, {
      location: "contact_form",
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-form-card glass-panel p-5 sm:p-7 md:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        How do I send a brief?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">
        Name, email, and what you need. Phone is optional.
      </p>

      <form className="contact-form mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="contact-form__row grid gap-5 sm:grid-cols-2">
          <label className="contact-form__field block">
            <span className="contact-form__label">Name *</span>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={CONTACT_FORM_LIMITS.name}
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={update("name")}
              data-interactive
              className={inputClassName}
            />
          </label>
          <label className="contact-form__field block">
            <span className="contact-form__label">Email *</span>
            <input
              type="email"
              name="email"
              required
              maxLength={CONTACT_FORM_LIMITS.email}
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={update("email")}
              data-interactive
              className={inputClassName}
            />
          </label>
        </div>

        <label className="contact-form__field block">
          <span className="contact-form__label">Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            maxLength={CONTACT_FORM_LIMITS.phone}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+961 XX XXX XXX"
            value={form.phone}
            onChange={update("phone")}
            data-interactive
            className={inputClassName}
          />
        </label>

        <label className="contact-form__field block">
          <span className="contact-form__label">Message *</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={CONTACT_FORM_LIMITS.message}
            rows={5}
            placeholder="Product, goal, and timeline..."
            value={form.message}
            onChange={update("message")}
            data-interactive
            className={`${inputClassName} min-h-[8.5rem] resize-y align-top`}
          />
        </label>

        {error ? (
          <p className="text-sm text-red-400/90" role="alert">
            {error}
          </p>
        ) : null}

        <p className="text-xs leading-relaxed text-foreground/60">
          By submitting, you agree we may use your name, email, phone number,
          and message to respond to your inquiry. Sending opens WhatsApp, where
          their privacy terms also apply. See our{" "}
          <Link
            href={PRIVACY_POLICY.path}
            data-interactive
            className="text-foreground/80 underline-offset-2 hover:text-foreground hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          data-interactive
          className="contact-form__submit btn-primary w-full gap-2"
        >
          Send brief
          <span aria-hidden>→</span>
        </button>
      </form>
    </div>
  );
}
