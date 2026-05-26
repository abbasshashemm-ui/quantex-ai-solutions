import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { buildSalesSystemPrompt } from "@/lib/chat/system-prompt";
import { checkChatRateLimit, getClientIp } from "@/lib/chat/rate-limit";
import {
  CHAT_MESSAGE_LIMITS,
  sanitizeChatMessage,
} from "@/lib/sanitize/chat-message";

export const runtime = "nodejs";

const textPartSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

const uiMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"]),
  parts: z.array(textPartSchema).min(1),
});

const requestSchema = z.object({
  messages: z.array(uiMessageSchema).min(1).max(CHAT_MESSAGE_LIMITS.maxMessages),
});

function getGeminiApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()
  );
}

function sanitizeMessages(messages: UIMessage[]): UIMessage[] {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-CHAT_MESSAGE_LIMITS.maxMessages)
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
}

export async function POST(request: Request) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Chat is temporarily unavailable. Please use WhatsApp or our contact form.",
      },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const rate = checkChatRateLimit(ip);
  if (!rate.allowed) {
    return Response.json(
      { error: "Too many messages. Please try again later or message us on WhatsApp." },
      {
        status: 429,
        headers: rate.retryAfterSeconds
          ? { "Retry-After": String(rate.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = sanitizeMessages(parsed.data.messages as UIMessage[]);
  if (messages.length === 0) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const google = createGoogleGenerativeAI({ apiKey });

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: buildSalesSystemPrompt(),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
