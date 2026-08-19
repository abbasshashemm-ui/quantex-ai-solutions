import { CONTACT } from "@/lib/site/contact";
import { PRODUCT } from "@/lib/site/product";

const MAX_WHATSAPP_TEXT = 800;

export function buildWhatsAppQuoteUrl(topic?: string): string {
  const base = CONTACT.whatsapp;
  const text = truncateWhatsAppText(
    topic?.trim()
      ? `Hi Quantex — I'd like a quote. ${topic}`
      : `Hi Quantex — I want to start ${PRODUCT.name} at ${PRODUCT.priceLabel}.`,
  );
  const url = new URL(base);
  url.searchParams.set("text", text);
  return url.toString();
}

function truncateWhatsAppText(text: string): string {
  if (text.length <= MAX_WHATSAPP_TEXT) return text;
  return `${text.slice(0, MAX_WHATSAPP_TEXT - 1)}…`;
}
