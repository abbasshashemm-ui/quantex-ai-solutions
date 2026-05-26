"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

const WELCOME_TEXT =
  "Hi—ask about our services, timelines, or how to get started.";

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: WELCOME_TEXT }],
  },
];

export function useSalesChat() {
  return useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: initialMessages,
  });
}
