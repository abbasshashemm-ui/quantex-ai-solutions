"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  CONVERSION_EVENTS,
  trackConversion,
} from "@/lib/analytics/events";
import { buildWhatsAppQuoteUrl } from "@/lib/chat/whatsapp";
import { CHAT_MESSAGE_LIMITS } from "@/lib/sanitize/chat-message";
import { ChatMessage } from "./ChatMessage";
import { useSalesChat } from "./useSalesChat";

const QUICK_REPLIES = [
  { label: "What services do you offer?", send: true },
  { label: "AI chatbots", send: true },
  { label: "Get a quote", send: false },
] as const;

type ChatPanelProps = {
  onClose: () => void;
};

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const { messages, sendMessage, status, error, clearError } = useSalesChat();

  const isBusy =
    sendingRef.current || status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready" || status === "error") {
      sendingRef.current = false;
    }
  }, [status]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, status]);

  function openWhatsApp(topic?: string) {
    trackConversion(CONVERSION_EVENTS.CHAT_WHATSAPP_HANDOFF, {
      location: "chat_panel",
    });
    window.open(buildWhatsAppQuoteUrl(topic), "_blank", "noopener,noreferrer");
  }

  const submitMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sendingRef.current || status === "submitted" || status === "streaming") {
        return;
      }
      sendingRef.current = true;
      clearError();
      void sendMessage({ text: trimmed }).finally(() => {
        sendingRef.current = false;
      });
      setInput("");
      trackConversion(CONVERSION_EVENTS.CHAT_MESSAGE_SENT, {
        location: "chat_panel",
      });
    },
    [clearError, sendMessage, status],
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
      id="quantex-chat-panel"
      className="chat-panel glass-panel"
      role="dialog"
      aria-label="Quantex sales chat"
      data-lenis-prevent
    >
      <header className="chat-panel__header">
        <div className="chat-panel__title-wrap">
          <Image
            src="/quantex-mark-reference.png"
            alt=""
            width={20}
            height={20}
            className="chat-panel__mark"
            aria-hidden
          />
          <div>
            <p className="chat-panel__title">Quantex Assistant</p>
            <p className="chat-panel__subtitle">Services &amp; quotes</p>
          </div>
        </div>
        <div className="chat-panel__header-actions">
          <button
            type="button"
            className="chat-panel__whatsapp"
            onClick={() => openWhatsApp()}
          >
            Chat on WhatsApp
          </button>
          <button
            type="button"
            className="chat-panel__close"
            onClick={onClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
      </header>

      <div ref={listRef} className="chat-panel__messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isBusy ? (
          <p className="chat-panel__typing" aria-live="polite">
            Typing…
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
        <label className="sr-only" htmlFor="chat-input">
          Message
        </label>
        <textarea
          id="chat-input"
          className="chat-panel__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about services or timelines…"
          rows={2}
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
