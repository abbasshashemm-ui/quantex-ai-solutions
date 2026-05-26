"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
const WELCOME_MESSAGE_ID = "welcome";

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
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages, body, headers, credentials }) => ({
        body: {
          ...body,
          id,
          messages: messages.filter((message) => message.id !== WELCOME_MESSAGE_ID),
        },
        headers,
        credentials,
      }),
    }),
    messages: initialMessages,
  });
}
