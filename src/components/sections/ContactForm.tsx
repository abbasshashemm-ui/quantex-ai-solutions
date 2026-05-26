"use client";

import Link from "next/link";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { BUDGET_RANGES, CONTACT } from "@/lib/site/contact";
import { PRIVACY_POLICY } from "@/lib/site/legal/privacy-policy";
import { SERVICES, formatServiceTitle } from "@/lib/services/data";
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
  "mt-1.5 block w-full rounded-lg border border-white/25 bg-surface-elevated px-3.5 py-2.5 text-sm text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition placeholder:text-foreground/45 focus:border-white/45 focus:ring-2 focus:ring-white/15";

const selectClassName = `${inputClassName} contact-form__select appearance-none`;

function buildWhatsAppBody(data: ContactFormFields) {
  const service = SERVICES.find((item) => item.slug === data.service);
  const budget = BUDGET_RANGES.find((item) => item.value === data.budget);

  return [
    "Hi Quantex AI Solutions,",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    service ? `Service: ${formatServiceTitle(service.title)}` : null,
    budget?.value ? `Budget: ${budget.label}` : null,
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
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
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
    <div className="contact-form-card glass-panel rounded-2xl p-5 sm:p-7 md:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        Send us a message
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">
        Fill out the form below or reach out directly via email or WhatsApp.
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

        <div className="contact-form__row grid gap-5 sm:grid-cols-2">
          <label className="contact-form__field block">
            <span className="contact-form__label">Phone</span>
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
            <span className="contact-form__label">Service</span>
            <select
              name="service"
              value={form.service}
              onChange={update("service")}
              data-interactive
              className={selectClassName}
            >
              <option value="">What do you need?</option>
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {formatServiceTitle(service.title)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="contact-form__field block">
          <span className="contact-form__label">Budget range</span>
          <select
            name="budget"
            value={form.budget}
            onChange={update("budget")}
            data-interactive
            className={selectClassName}
          >
            {BUDGET_RANGES.map((range) => (
              <option key={range.value || "empty"} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </label>

        <label className="contact-form__field block">
          <span className="contact-form__label">Message *</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={CONTACT_FORM_LIMITS.message}
            rows={5}
            placeholder="Tell us about your project, goals, and timeline..."
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
          Send message
          <span aria-hidden>→</span>
        </button>
      </form>
    </div>
  );
}
