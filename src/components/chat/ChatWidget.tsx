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
      >
        <Image
          src="/quantex-mark-reference.png"
          alt=""
          width={22}
          height={22}
          className="chat-widget__mark"
          aria-hidden
        />
        <span>{open ? "Close" : "Chat"}</span>
      </button>
    </div>
  );
}
