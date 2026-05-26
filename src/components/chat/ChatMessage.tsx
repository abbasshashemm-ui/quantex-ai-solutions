"use client";

import type { UIMessage } from "ai";

type ChatMessageProps = {
  message: UIMessage;
};

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const text = messageText(message);

  if (!text) return null;

  return (
    <div
      className={`chat-message ${isUser ? "chat-message--user" : "chat-message--assistant"}`}
    >
      <p className="chat-message__text">{text}</p>
    </div>
  );
}
