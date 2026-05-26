import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { prepareMessagesForModel } from "@/lib/chat/normalize-messages";
import { parseChatRequest, toUiMessages } from "@/lib/chat/parse-request";
import { buildSalesSystemPrompt } from "@/lib/chat/system-prompt";
import { checkChatRateLimit, getClientIp } from "@/lib/chat/rate-limit";

export const runtime = "nodejs";

function getGeminiApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()
  );
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

  const parsed = parseChatRequest(body);
  if (!parsed.ok) {
    console.error("[chat] invalid request body");
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const uiMessages = toUiMessages(parsed.data.messages);
  const modelMessages = prepareMessagesForModel(uiMessages);
  const originalMessages: UIMessage[] = uiMessages;
  if (modelMessages.length === 0) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const google = createGoogleGenerativeAI({ apiKey });

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: buildSalesSystemPrompt(),
      messages: await convertToModelMessages(modelMessages),
    });

    result.consumeStream();

    return result.toUIMessageStreamResponse({
      originalMessages,
      onError: (error) => {
        console.error("[chat] stream error:", error);
        return error instanceof Error
          ? error.message
          : "Unable to generate a reply right now.";
      },
    });
  } catch (error) {
    console.error("[chat] request error:", error);
    return Response.json(
      { error: "Chat request failed. Please try WhatsApp instead." },
      { status: 500 },
    );
  }
}
