"use client";

import { useSyncExternalStore } from "react";
import type { ProfileId } from "./profiles";

/** What the visitor told the home page, kept for this tab only. */
export type VisitorAnswer = { profile: ProfileId; text: string };

const KEY = "quantex:visitor-answer";
const listeners = new Set<() => void>();
let current: VisitorAnswer | null = null;
let loaded = false;

function load(): VisitorAnswer | null {
  if (loaded) return current;
  loaded = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<VisitorAnswer>;
      if (typeof parsed.profile === "string" && typeof parsed.text === "string") {
        current = { profile: parsed.profile, text: parsed.text.slice(0, 80) };
      }
    }
  } catch {
    // Private windows can refuse storage; the answer then lasts until reload.
  }
  return current;
}

export function setVisitorAnswer(answer: VisitorAnswer | null) {
  current = answer;
  loaded = true;
  try {
    if (answer) window.sessionStorage.setItem(KEY, JSON.stringify(answer));
    else window.sessionStorage.removeItem(KEY);
  } catch {
    // See load().
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Null on the server and until the visitor answers. */
export function useVisitorAnswer(): VisitorAnswer | null {
  return useSyncExternalStore(subscribe, load, () => null);
}
