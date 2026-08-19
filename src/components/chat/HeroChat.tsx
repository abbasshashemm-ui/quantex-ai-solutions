"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CONTACT, WHATSAPP_CTA_LABEL } from "@/lib/site/contact";
import { PRODUCT } from "@/lib/site/product";

const QUICK_REPLIES = [
  "What is this?",
  `What's included in ${PRODUCT.priceLabel}?`,
  PRODUCT.ctaLabel,
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
            <p className="chat-panel__title">{PRODUCT.name}</p>
            <p className="chat-panel__subtitle">Live demo · {PRODUCT.priceLabel}</p>
          </div>
        </div>
        <div className="chat-panel__header-actions">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-panel__whatsapp"
          >
            {WHATSAPP_CTA_LABEL}
          </a>
        </div>
      </header>
      <p className="chat-panel__purpose">
        Talk to {PRODUCT.name}—{PRODUCT.priceLabel}. Ask how it works on your
        docs, site, or WhatsApp.
      </p>
      <div className="chat-panel__messages">
        <div className="chat-message chat-message--assistant">
          <p className="chat-message__text">
            This is {PRODUCT.name} at {PRODUCT.priceLabel}. Ask how it works on
            your docs, website, or WhatsApp.
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
          Ask how {PRODUCT.name} works…
        </span>
        <span className="chat-panel__send btn-primary">Send</span>
      </div>
      <footer className="chat-panel__footer">
        <span className="chat-panel__footer-whatsapp">
          {WHATSAPP_CTA_LABEL} →
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
    <aside
      className="hero-chat"
      onPointerDown={load}
      onFocusCapture={load}
    >
      {ready ? <ChatPanel variant="terminal" /> : <HeroChatShell />}
    </aside>
  );
}
