import { z } from "zod";
import type { UIMessage } from "ai";

const uiPartSchema = z
  .object({
    type: z.string(),
  })
  .passthrough();

const uiMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"]),
  parts: z.array(uiPartSchema).min(1),
});

export const chatRequestSchema = z.object({
  id: z.string().optional(),
  messages: z.array(uiMessageSchema).min(1).max(24),
});

export type ChatRequestBody = z.infer<typeof chatRequestSchema>;

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
