import { BUDGET_RANGES } from "@/lib/site/contact";
import { SERVICES } from "@/lib/services/data";

export type ContactFormFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

export const CONTACT_FORM_LIMITS = {
  name: 80,
  email: 254,
  phone: 20,
  message: 2000,
} as const;

const ALLOWED_SERVICE_SLUGS = new Set<string>(
  SERVICES.map((service) => service.slug),
);
const ALLOWED_BUDGET_VALUES = new Set<string>(
  BUDGET_RANGES.map((range) => range.value),
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function stripControlChars(value: string, allowNewlines = false): string {
  if (allowNewlines) {
    return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  }
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

export function sanitizeName(value: string): string {
  return truncate(
    stripControlChars(stripHtml(value))
      .replace(/[^\p{L}\p{N}\s.'-]/gu, "")
      .replace(/\s{2,}/g, " ")
      .trim(),
    CONTACT_FORM_LIMITS.name,
  );
}

export function sanitizeEmail(value: string): string {
  return truncate(
    stripControlChars(stripHtml(value))
      .toLowerCase()
      .replace(/[^\w.+%@-]/g, "")
      .trim(),
    CONTACT_FORM_LIMITS.email,
  );
}

export function sanitizePhone(value: string): string {
  return truncate(
    stripControlChars(stripHtml(value))
      .replace(/[^\d+\s().-]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim(),
    CONTACT_FORM_LIMITS.phone,
  );
}

export function sanitizeMessage(value: string): string {
  return truncate(
    stripControlChars(stripHtml(value), true)
      .replace(/\r\n/g, "\n")
      .replace(/\n{4,}/g, "\n\n\n")
      .trimStart(),
    CONTACT_FORM_LIMITS.message,
  );
}

export function sanitizeService(value: string): string {
  return ALLOWED_SERVICE_SLUGS.has(value) ? value : "";
}

export function sanitizeBudget(value: string): string {
  return ALLOWED_BUDGET_VALUES.has(value) ? value : "";
}

const FIELD_SANITIZERS: {
  [K in keyof ContactFormFields]: (value: string) => string;
} = {
  name: sanitizeName,
  email: sanitizeEmail,
  phone: sanitizePhone,
  service: sanitizeService,
  budget: sanitizeBudget,
  message: sanitizeMessage,
};

export function sanitizeContactField<K extends keyof ContactFormFields>(
  field: K,
  value: string,
): string {
  return FIELD_SANITIZERS[field](value);
}

export function sanitizeContactForm(form: ContactFormFields): ContactFormFields {
  return {
    name: sanitizeName(form.name),
    email: sanitizeEmail(form.email),
    phone: sanitizePhone(form.phone),
    service: sanitizeService(form.service),
    budget: sanitizeBudget(form.budget),
    message: sanitizeMessage(form.message),
  };
}

export function validateContactForm(form: ContactFormFields): string | null {
  if (form.name.length < 2) {
    return "Please enter a valid name (at least 2 characters).";
  }

  if (!form.email || !EMAIL_PATTERN.test(form.email)) {
    return "Please enter a valid email address.";
  }

  if (form.message.length < 10) {
    return "Please enter a message of at least 10 characters.";
  }

  if (form.phone && form.phone.replace(/\D/g, "").length < 7) {
    return "Please enter a valid phone number or leave it blank.";
  }

  return null;
}
