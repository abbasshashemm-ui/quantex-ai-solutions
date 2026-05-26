"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CONVERSION_EVENTS,
  trackConversion,
} from "@/lib/analytics/events";

const ChatPanel = dynamic(
  () => import("./ChatPanel").then((mod) => mod.ChatPanel),
  { ssr: false },
);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const viewportMeta = document.querySelector('meta[name="viewport"]');

    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const previousHtmlOverflow = html.style.overflow;
    const previousViewport = viewportMeta?.getAttribute("content") ?? null;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
      );
    }

    return () => {
      body.style.position = previousBody.position;
      body.style.top = previousBody.top;
      body.style.left = previousBody.left;
      body.style.right = previousBody.right;
      body.style.width = previousBody.width;
      body.style.overflow = previousBody.overflow;
      html.style.overflow = previousHtmlOverflow;

      if (viewportMeta && previousViewport) {
        viewportMeta.setAttribute("content", previousViewport);
      }

      window.scrollTo(0, scrollY);
    };
  }, [open]);

  function toggleOpen() {
    setOpen((value) => {
      const next = !value;
      if (next) {
        trackConversion(CONVERSION_EVENTS.CHAT_OPEN, { location: "chat_widget" });
      }
      return next;
    });
  }

  return (
    <div
      className={`chat-widget ${open ? "chat-widget--open" : ""} ${reducedMotion ? "chat-widget--reduced-motion" : ""}`}
    >
      {open ? <ChatPanel onClose={() => setOpen(false)} /> : null}

      <button
        type="button"
        className="chat-widget__launcher glass-panel"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-controls="quantex-chat-panel"
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        <Image
          src="/quantex-mark-reference.png"
          alt=""
          width={33}
          height={33}
          className="chat-widget__mark"
          aria-hidden
        />
        <span className="chat-widget__label">{open ? "Close" : "Chat"}</span>
      </button>
    </div>
  );
}
