import { track } from "@vercel/analytics";

export const CONVERSION_EVENTS = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  EMAIL_CLICK: "email_click",
  PHONE_CLICK: "phone_click",
  SERVICE_CLICK: "service_click",
  SOLUTIONS_CLICK: "solutions_click",
  CONTACT_PAGE_VIEW: "contact_page_view",
  CTA_CLICK: "cta_click",
  CHAT_OPEN: "chat_open",
  CHAT_MESSAGE_SENT: "chat_message_sent",
  CHAT_WHATSAPP_HANDOFF: "chat_whatsapp_handoff",
} as const;

export type ConversionEvent =
  (typeof CONVERSION_EVENTS)[keyof typeof CONVERSION_EVENTS];

type ConversionProps = {
  location: string;
};

export function trackConversion(
  event: ConversionEvent,
  props: ConversionProps,
): void {
  if (typeof window === "undefined") return;

  try {
    track(event, props);
  } catch {
    // Analytics optional (e.g. blocked scripts or plan limits)
  }
}

export function isWhatsAppHref(href: string): boolean {
  return href.includes("wa.me") || href.includes("whatsapp.com");
}

export function isMailtoHref(href: string): boolean {
  return href.startsWith("mailto:");
}

export function isTelHref(href: string): boolean {
  return href.startsWith("tel:");
}
