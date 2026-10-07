"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
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
          <p className="chat-panel__title">Ask Quantex</p>
        </div>
        <div className="chat-panel__header-actions">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-panel__whatsapp"
          >
            Talk to a person
          </a>
        </div>
      </header>
      <div className="chat-panel__messages">
        <div className="chat-message chat-message--assistant">
          <p className="chat-message__text">
            Hi, I&apos;m the Quantex assistant. What can I help you with?
          </p>
        </div>
        <div className="chat-panel__quick-replies">
          {QUICK_REPLIES.map((label) => (
            <span key={label} className="chat-panel__chip">
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="chat-panel__form">
        <span className="chat-panel__input">Ask anything</span>
        <span className="chat-panel__send" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19V5M12 5l-6 6M12 5l6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

const ChatPanel = dynamic(
  () => import("./ChatPanel").then((module) => ({ default: module.ChatPanel })),
  { ssr: false, loading: HeroChatShell },
);

export function HeroChat() {
  const [ready, setReady] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const load = useCallback(() => setReady(true), []);

  // The chat library is large and only matters once the visitor can see or
  // touch the chat, so load it when the section is about to scroll into view.
  useEffect(() => {
    const node = asideRef.current;
    if (ready || !node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeoutId = window.setTimeout(load, 3000);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) load();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ready, load]);

  return (
    <aside
      ref={asideRef}
      className="hero-chat"
      onPointerDown={load}
      onFocusCapture={load}
    >
      {ready ? <ChatPanel variant="terminal" /> : <HeroChatShell />}
    </aside>
  );
}
