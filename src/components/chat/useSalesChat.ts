"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useMemo } from "react";

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
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  return useChat({
    transport,
    messages: initialMessages,
  });
}
