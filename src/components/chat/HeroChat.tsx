"use client";

import dynamic from "next/dynamic";

function HeroChatFallback() {
  return (
    <div className="chat-panel chat-panel--terminal" aria-hidden>
      <header className="chat-panel__header">
        <div className="chat-panel__title-wrap">
          <span className="chat-panel__tty">●</span>
          <div>
            <p className="chat-panel__title">Ask Quantex</p>
            <p className="chat-panel__subtitle">Websites, chatbots & quotes</p>
          </div>
        </div>
      </header>
      <p className="chat-panel__purpose">
        Talk to our AI sales bot—ask about websites, AI chatbots, timelines,
        and how we ship.
      </p>
      <div className="chat-panel__messages">
        <p className="chat-panel__typing">Loading assistant…</p>
      </div>
    </div>
  );
}

const ChatPanel = dynamic(
  () => import("./ChatPanel").then((module) => ({ default: module.ChatPanel })),
  { ssr: false, loading: HeroChatFallback },
);

export function HeroChat() {
  return (
    <aside className="hero-chat">
      <ChatPanel variant="terminal" />
    </aside>
  );
}
