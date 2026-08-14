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
import {
  CONVERSION_EVENTS,
  trackConversion,
} from "@/lib/analytics/events";
import { buildWhatsAppQuoteUrl } from "@/lib/chat/whatsapp";
import { CHAT_MESSAGE_LIMITS } from "@/lib/sanitize/chat-message";
import { ChatMessage } from "./ChatMessage";
import { useSalesChat } from "./useSalesChat";

const QUICK_REPLIES = [
  { label: "Build a website", send: true },
  { label: "AI chatbots", send: true },
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
  const isTerminal = variant === "terminal";
  const { messages, sendMessage, status, error, clearError } =
    useSalesChat(variant);
  const location = isTerminal ? "hero_terminal" : "chat_panel";

  const isBusy = status === "submitted" || status === "streaming";
  const showTyping =
    isBusy &&
    (messages.length === 0 || messages[messages.length - 1]?.role === "user");

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, status]);

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
          {isTerminal ? (
            <span className="chat-panel__tty" aria-hidden>
              ●
            </span>
          ) : (
            <BrandLogo variant="mark" className="h-5 w-auto" />
          )}
          <div>
            <p className="chat-panel__title">
              {isTerminal ? "Ask Quantex" : "QUANTEX Assistant"}
            </p>
            <p className="chat-panel__subtitle">
              {isTerminal ? "Websites, chatbots & quotes" : "Audits & quotes"}
            </p>
          </div>
        </div>
        <div className="chat-panel__header-actions">
          <button
            type="button"
            className="chat-panel__whatsapp"
            onClick={() => openWhatsApp()}
          >
            {isTerminal ? "WhatsApp" : "Chat on WhatsApp"}
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

      {isTerminal ? (
        <p className="chat-panel__purpose">
          Talk to our AI sales bot—ask about websites, AI chatbots, timelines,
          and how we ship.
        </p>
      ) : null}

      <div ref={listRef} className="chat-panel__messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {showTyping ? (
          <p className="chat-panel__typing" aria-live="polite">
            {isTerminal ? "Typing…" : "Typing…"}
          </p>
        ) : null}
        {error ? (
          <p className="chat-panel__error" role="alert">
            Something went wrong. Try again or message us on WhatsApp.
          </p>
        ) : null}
      </div>

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

      <form className="chat-panel__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={isTerminal ? "hero-chat-input" : "chat-input"}>
          Message
        </label>
        <textarea
          id={isTerminal ? "hero-chat-input" : "chat-input"}
          className="chat-panel__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={isTerminal ? markOpened : undefined}
          onKeyDown={handleKeyDown}
          placeholder={
            isTerminal
              ? "Ask about websites, chatbots, or pricing…"
              : "Ask about services or timelines…"
          }
          rows={isTerminal ? 1 : 2}
          maxLength={CHAT_MESSAGE_LIMITS.maxLength}
          disabled={isBusy}
        />
        <button
          type="submit"
          className="chat-panel__send btn-primary"
          disabled={isBusy || !input.trim()}
        >
          Send
        </button>
      </form>

      <footer className="chat-panel__footer">
        <button
          type="button"
          className="chat-panel__footer-whatsapp"
          onClick={() => openWhatsApp()}
        >
          Prefer WhatsApp? Continue there →
        </button>
      </footer>
    </div>
  );
}
