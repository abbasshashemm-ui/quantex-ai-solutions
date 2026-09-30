"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CONTACT } from "@/lib/site/contact";

const QUICK_REPLIES = ["Build a website", "AI chatbots", "Get a quote"] as const;

function HeroChatShell() {
  return (
    <div className="chat-panel chat-panel--terminal">
      <header className="chat-panel__header">
        <div className="chat-panel__title-wrap">
          <p className="chat-panel__title">Ask</p>
        </div>
        <div className="chat-panel__header-actions">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-panel__whatsapp"
          >
            WhatsApp
          </a>
        </div>
      </header>
      <div className="chat-panel__messages">
        <div className="chat-message chat-message--assistant">
          <p className="chat-message__text">
            Ask. I answer. A person takes over when it matters.
          </p>
        </div>
      </div>
      <div className="chat-panel__quick-replies">
        {QUICK_REPLIES.map((label) => (
          <span key={label} className="chat-panel__chip">
            {label}
          </span>
        ))}
      </div>
      <div className="chat-panel__form">
        <span className="chat-panel__input">Message</span>
        <span className="chat-panel__send btn-primary">Send</span>
      </div>
      <footer className="chat-panel__footer">
        <span className="chat-panel__footer-whatsapp">WhatsApp</span>
      </footer>
    </div>
  );
}

const ChatPanel = dynamic(
  () => import("./ChatPanel").then((module) => ({ default: module.ChatPanel })),
  { ssr: false, loading: HeroChatShell },
);

export function HeroChat() {
  const [ready, setReady] = useState(false);
  const load = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (ready) return;

    const onIdle = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(onIdle, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(onIdle, 1800);
    return () => window.clearTimeout(timeoutId);
  }, [ready]);

  return (
    <aside
      className="hero-chat"
      onPointerDown={load}
      onFocusCapture={load}
    >
      {ready ? <ChatPanel variant="terminal" /> : <HeroChatShell />}
    </aside>
  );
}
