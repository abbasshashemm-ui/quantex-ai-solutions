import type { UIMessage } from "ai";
import { sanitizeChatMessage } from "@/lib/sanitize/chat-message";

export const WELCOME_MESSAGE_ID = "welcome";

function textFromMessage(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
}

function mergeConsecutiveRoles(messages: UIMessage[]): UIMessage[] {
  const merged: UIMessage[] = [];

  for (const message of messages) {
    const last = merged[merged.length - 1];
    if (last && last.role === message.role) {
      const combined = [textFromMessage(last), textFromMessage(message)]
        .filter(Boolean)
        .join("\n");
      last.parts = [{ type: "text", text: combined }];
      continue;
    }
    merged.push({
      ...message,
      parts: message.parts.map((part) =>
        part.type === "text"
          ? { ...part, text: sanitizeChatMessage(part.text) }
          : part,
      ),
    });
  }

  return merged;
}

function textPartsFromMessage(message: UIMessage): { type: "text"; text: string }[] {
  const chunks: string[] = [];

  for (const part of message.parts) {
    if (part.type === "text" && "text" in part && typeof part.text === "string") {
      const cleaned = sanitizeChatMessage(part.text);
      if (cleaned) chunks.push(cleaned);
    }
  }

  if (chunks.length === 0) return [];
  return [{ type: "text", text: chunks.join("\n") }];
}

export function prepareMessagesForModel(messages: UIMessage[]): UIMessage[] {
  const conversation = messages
    .filter(
      (message) =>
        message.id !== WELCOME_MESSAGE_ID &&
        (message.role === "user" || message.role === "assistant"),
    )
    .map((message) => ({
      ...message,
      parts: textPartsFromMessage(message),
    }))
    .filter((message) => message.parts.length > 0);

  return mergeConsecutiveRoles(conversation).slice(-20);
}
