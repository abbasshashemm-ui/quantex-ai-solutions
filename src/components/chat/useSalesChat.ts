"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useMemo } from "react";

const WELCOME_TEXT =
  "Hi—ask about our services, timelines, or how to get started.";

const TERMINAL_WELCOME_TEXT =
  "I’m the Quantex AI assistant. Ask about visibility audits, technical SEO, timelines, or pricing—I’ll point you to the right next step.";

const baseWelcome: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [{ type: "text", text: WELCOME_TEXT }],
};

const terminalWelcome: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [{ type: "text", text: TERMINAL_WELCOME_TEXT }],
};

export function useSalesChat(variant: "float" | "terminal" = "float") {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  return useChat({
    transport,
    messages: variant === "terminal" ? [terminalWelcome] : [baseWelcome],
  });
}
