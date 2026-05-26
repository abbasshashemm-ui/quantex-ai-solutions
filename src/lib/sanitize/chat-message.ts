export const CHAT_MESSAGE_LIMITS = {
  maxLength: 2000,
  maxMessages: 10,
} as const;

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

export function sanitizeChatMessage(value: string): string {
  return truncate(
    stripControlChars(stripHtml(value))
      .replace(/\s{3,}/g, "  ")
      .trim(),
    CHAT_MESSAGE_LIMITS.maxLength,
  );
}
