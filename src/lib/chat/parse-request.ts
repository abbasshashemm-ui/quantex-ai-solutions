import { z } from "zod";
import type { UIMessage } from "ai";
import { CHAT_MESSAGE_LIMITS } from "@/lib/sanitize/chat-message";

const MAX_BODY_CHARS = 60_000;

const textPartSchema = z.object({
  type: z.literal("text"),
  text: z.string().max(CHAT_MESSAGE_LIMITS.maxLength * 2),
});

const otherPartSchema = z.object({
  type: z.string().max(64).refine((type) => type !== "text"),
});

const uiMessageSchema = z.object({
  id: z.string().max(128).optional(),
  role: z.enum(["user", "assistant"]),
  // useChat also sends non-text parts (e.g. "step-start"); accept and let
  // prepareMessagesForModel drop them.
  parts: z.array(z.union([textPartSchema, otherPartSchema])).min(1).max(16),
});

export const chatRequestSchema = z.object({
  id: z.string().max(128).optional(),
  messages: z.array(uiMessageSchema).min(1).max(24),
});

export type ChatRequestBody = z.infer<typeof chatRequestSchema>;

export { MAX_BODY_CHARS };

export function parseChatRequest(body: unknown):
  | { ok: true; data: ChatRequestBody }
  | { ok: false } {
  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false };
  }
  return { ok: true, data: parsed.data };
}

export function toUiMessages(messages: ChatRequestBody["messages"]): UIMessage[] {
  return messages as UIMessage[];
}
