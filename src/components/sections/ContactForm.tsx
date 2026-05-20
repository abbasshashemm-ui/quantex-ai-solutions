"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { BUDGET_RANGES, CONTACT } from "@/lib/site/contact";
import { SERVICES } from "@/lib/services/data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

const inputClassName =
  "mt-1.5 block w-full rounded-lg border border-white/25 bg-surface-elevated px-3.5 py-2.5 text-sm text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition placeholder:text-foreground/45 focus:border-white/45 focus:ring-2 focus:ring-white/15";

const selectClassName = `${inputClassName} contact-form__select appearance-none`;

export function buildWhatsAppBody(data: FormState) {
  const serviceLabel =
    SERVICES.find((s) => s.slug === data.service)?.title ?? data.service;
  const budgetLabel =
    BUDGET_RANGES.find((b) => b.value === data.budget)?.label ?? data.budget;

  return [
    "Hi Quantex AI Solutions,",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    serviceLabel ? `Service: ${serviceLabel}` : null,
    budgetLabel && data.budget ? `Budget: ${budgetLabel}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof FormState) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError(null);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in name, email, and message.");
      return;
    }

    const text = encodeURIComponent(buildWhatsAppBody(form));
    const url = `${CONTACT.whatsapp}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-form-card rounded-2xl border border-white/15 bg-surface/95 p-5 backdrop-blur-md sm:p-7 md:p-8">
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
              autoComplete="tel"
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
                  {service.title
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
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

        <button
          type="submit"
          data-interactive
          className="contact-form__submit inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white px-6 text-sm font-semibold tracking-wide text-void uppercase transition-colors hover:bg-white/90"
        >
          Send message
          <span aria-hidden>→</span>
        </button>
      </form>
    </div>
  );
}
