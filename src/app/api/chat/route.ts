import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { prepareMessagesForModel } from "@/lib/chat/normalize-messages";
import { MAX_BODY_CHARS, parseChatRequest, toUiMessages } from "@/lib/chat/parse-request";
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

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_CHARS) {
    return Response.json({ error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) {
      return Response.json({ error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
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
      model: google(process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash"),
      maxOutputTokens: 600,
      system: buildSalesSystemPrompt(),
      messages: await convertToModelMessages(modelMessages),
    });

    result.consumeStream();

    return result.toUIMessageStreamResponse({
      originalMessages,
      onError: (error) => {
        console.error("[chat] stream error:", error);
        return "Unable to generate a reply right now. Please try WhatsApp instead.";
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
