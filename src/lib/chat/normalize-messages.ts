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

export function prepareMessagesForModel(messages: UIMessage[]): UIMessage[] {
  const conversation = messages
    .filter(
      (message) =>
        message.id !== WELCOME_MESSAGE_ID &&
        (message.role === "user" || message.role === "assistant"),
    )
    .map((message) => ({
      ...message,
      parts: message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => ({
          type: "text" as const,
          text: sanitizeChatMessage(part.text),
        }))
        .filter((part) => part.text.length > 0),
    }))
    .filter((message) => message.parts.length > 0);

  return mergeConsecutiveRoles(conversation).slice(-20);
}
