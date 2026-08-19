"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useMemo } from "react";

import { PRODUCT } from "@/lib/site/product";

const WELCOME_TEXT = `You're talking to ${PRODUCT.name} — ${PRODUCT.priceLabel}. Ask how it works on your docs, site, or WhatsApp.`;

const TERMINAL_WELCOME_TEXT = `This is ${PRODUCT.name} at ${PRODUCT.priceLabel}. Ask how it works on your docs, website, or WhatsApp.`;

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
