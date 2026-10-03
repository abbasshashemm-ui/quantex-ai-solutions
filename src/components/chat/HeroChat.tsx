"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CONTACT } from "@/lib/site/contact";

const QUICK_REPLIES = [
  "Build a website",
  "AI assistants",
  "Get a quote",
] as const;

function HeroChatShell() {
  return (
    <div className="chat-panel chat-panel--terminal">
      <header className="chat-panel__header">
        <div className="chat-panel__title-wrap">
          <span className="chat-panel__mark" aria-hidden>
            <BrandLogo variant="mark" className="h-5 w-auto" />
          </span>
          <div>
            <p className="chat-panel__title">Ask Quantex</p>
            <p className="chat-panel__subtitle">
              Websites, assistants & quotes
            </p>
          </div>
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
      <p className="chat-panel__purpose">
        Ask about websites, AI assistants, timelines or pricing. Want a person
        instead? Tap WhatsApp any time.
      </p>
      <div className="chat-panel__messages">
        <div className="chat-message chat-message--assistant">
          <p className="chat-message__text">
            Hi, I&apos;m the Quantex assistant. Ask me about websites, AI
            assistants, timelines or pricing, and I&apos;ll help you find the
            right fit.
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
        <span className="chat-panel__input">
          Ask about websites, assistants, pricing…
        </span>
        <span className="chat-panel__send btn-primary">Send</span>
      </div>
      <footer className="chat-panel__footer">
        <span className="chat-panel__footer-whatsapp">
          Prefer WhatsApp? Continue there →
        </span>
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
    <aside className="hero-chat" onPointerDown={load} onFocusCapture={load}>
      {ready ? <ChatPanel variant="terminal" /> : <HeroChatShell />}
    </aside>
  );
}
