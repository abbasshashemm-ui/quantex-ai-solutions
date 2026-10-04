"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CONVERSION_EVENTS, trackConversion } from "@/lib/analytics/events";
import { buildWhatsAppQuoteUrl } from "@/lib/chat/whatsapp";
import { CHAT_MESSAGE_LIMITS } from "@/lib/sanitize/chat-message";
import { ChatMessage } from "./ChatMessage";
import { useSalesChat } from "./useSalesChat";

const QUICK_REPLIES = [
  { label: "Build a website", send: true },
  { label: "AI assistants", send: true },
  { label: "Get a quote", send: false },
] as const;

type ChatPanelProps = {
  variant?: "float" | "terminal";
  onClose?: () => void;
};

export function ChatPanel({ variant = "float", onClose }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [openedTracked, setOpenedTracked] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isTerminal = variant === "terminal";
  const { messages, sendMessage, regenerate, status, error, clearError } =
    useSalesChat(variant);
  const location = isTerminal ? "hero_terminal" : "chat_panel";

  const hasUserMessage = messages.some((message) => message.role === "user");
  const isBusy = status === "submitted" || status === "streaming";
  const showTyping =
    isBusy &&
    (messages.length === 0 || messages[messages.length - 1]?.role === "user");

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, status]);

  // The box grows with what you type, up to a few lines, then scrolls.
  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    node.style.height = "auto";
    // scrollHeight leaves out the border, so add it back or a scrollbar appears.
    const border = node.offsetHeight - node.clientHeight;
    node.style.height = `${Math.min(node.scrollHeight + border, 120)}px`;
  }, [input]);

  const markOpened = useCallback(() => {
    if (!isTerminal || openedTracked) return;
    setOpenedTracked(true);
    trackConversion(CONVERSION_EVENTS.CHAT_OPEN, { location });
  }, [isTerminal, location, openedTracked]);

  function openWhatsApp(topic?: string) {
    markOpened();
    trackConversion(CONVERSION_EVENTS.CHAT_WHATSAPP_HANDOFF, { location });
    window.open(buildWhatsAppQuoteUrl(topic), "_blank", "noopener,noreferrer");
  }

  const submitMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "submitted" || status === "streaming") {
        return;
      }
      markOpened();
      clearError();
      void sendMessage({ text: trimmed });
      setInput("");
      trackConversion(CONVERSION_EVENTS.CHAT_MESSAGE_SENT, { location });
    },
    [clearError, location, markOpened, sendMessage, status],
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submitMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  }

  return (
    <div
      id={isTerminal ? "quantex-hero-chat" : "quantex-chat-panel"}
      className={`chat-panel ${isTerminal ? "chat-panel--terminal" : "glass-panel"}`}
      role={isTerminal ? "region" : "dialog"}
      aria-label="Quantex AI assistant chat"
      data-lenis-prevent
    >
      <header className="chat-panel__header">
        <div className="chat-panel__title-wrap">
          <span className="chat-panel__mark" aria-hidden>
            <BrandLogo variant="mark" className="h-5 w-auto" />
          </span>
          <p className="chat-panel__title">
            {isTerminal ? "Ask Quantex" : "Quantex Assistant"}
          </p>
        </div>
        <div className="chat-panel__header-actions">
          <button
            type="button"
            className="chat-panel__whatsapp"
            onClick={() => openWhatsApp()}
          >
            Talk to a person
          </button>
          {onClose ? (
            <button
              type="button"
              className="chat-panel__close"
              onClick={onClose}
              aria-label="Close chat"
            >
              ×
            </button>
          ) : null}
        </div>
      </header>

      <div ref={listRef} className="chat-panel__messages" tabIndex={0}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {!hasUserMessage ? (
          <div className="chat-panel__quick-replies">
            {QUICK_REPLIES.map((item) => (
              <button
                key={item.label}
                type="button"
                className="chat-panel__chip"
                disabled={isBusy}
                onClick={() => {
                  if (item.send) {
                    submitMessage(item.label);
                  } else {
                    openWhatsApp();
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
        {showTyping ? (
          <span className="chat-thinking" role="status" aria-label="Typing">
            <BrandLogo variant="mark" className="h-5 w-auto" />
          </span>
        ) : null}
        {error ? (
          <p className="chat-panel__error" role="alert">
            <span>Something went wrong.</span>
            <button
              type="button"
              className="chat-panel__error-action"
              onClick={() => {
                clearError();
                void regenerate();
              }}
            >
              Retry
            </button>
            <button
              type="button"
              className="chat-panel__error-action"
              onClick={() => openWhatsApp()}
            >
              WhatsApp
            </button>
          </p>
        ) : null}
      </div>

      <form className="chat-panel__form" onSubmit={handleSubmit}>
        <label
          className="sr-only"
          htmlFor={isTerminal ? "hero-chat-input" : "chat-input"}
        >
          Message
        </label>
        <textarea
          ref={inputRef}
          id={isTerminal ? "hero-chat-input" : "chat-input"}
          className="chat-panel__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={isTerminal ? markOpened : undefined}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything"
          rows={1}
          maxLength={CHAT_MESSAGE_LIMITS.maxLength}
        />
        <button
          type="submit"
          className="chat-panel__send"
          disabled={isBusy || !input.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 19V5M12 5l-6 6M12 5l6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
