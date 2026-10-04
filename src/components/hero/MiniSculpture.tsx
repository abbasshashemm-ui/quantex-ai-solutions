"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { initialMotionState } from "./motion";

// Loaded only when a visitor actually gets one, and kept out of the main bundle.
const FlatScene = dynamic(() => import("./FlatScene"), { ssr: false });

type MiniSculptureProps = {
  /**
   * scroll: the sculpture unfolds as the page scrolls through the nearest
   * [data-sculpture-track] element. idle: it only spins gently.
   */
  mode: "scroll" | "idle";
  /** Smaller screens skip the sculpture entirely (no canvas, no cost). */
  minWidth?: number;
  /** Scroll mode: how many steps the track has. Sets --step on the track. */
  steps?: number;
  /**
   * Scroll mode: the track is a tall pinned stage, like the hero. Progress runs
   * from 0 to 1 while it is pinned, and is also written to the track as --p.
   */
  pinned?: boolean;
  className?: string;
};

/**
 * A small stand-alone version of the hero's logo sculpture, drawn on a 2D
 * canvas so it needs no extra WebGL context. It only runs while on screen.
 */
export function MiniSculpture({
  mode,
  minWidth = 1024,
  steps = 0,
  pinned = false,
  className = "",
}: MiniSculptureProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const motion = useRef(initialMotionState());
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  // Reduced motion keeps the scroll-driven unfolding but drops the idle spin.
  const [calm, setCalm] = useState(false);

  const noop = useCallback(() => {}, []);

  // Screen size and the reduced-motion preference.
  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEnabled(wide.matches);
      setCalm(reduce.matches);
    };
    const initial = window.setTimeout(sync, 0);
    wide.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      window.clearTimeout(initial);
      wide.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [minWidth]);

  // Visibility, and (in scroll mode) the scroll progress through the track.
  useEffect(() => {
    const box = boxRef.current;
    if (!box || !enabled) return;

    const visibility = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );
    visibility.observe(box);

    if (mode !== "scroll") {
      return () => visibility.disconnect();
    }

    const track =
      box.closest<HTMLElement>("[data-sculpture-track]") ?? box.parentElement;
    if (!track) return () => visibility.disconnect();

    let frame = 0;
    let running = false;
    let current = 0;
    let target = 0;
    let last = 0;
    let lastStep = -1;

    const measure = () => {
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (pinned) {
        const pinnedSpan = Math.max(1, rect.height - viewport);
        target = Math.min(1, Math.max(0, -rect.top / pinnedSpan));
        return;
      }
      // 0 as the track's top reaches 60% of the screen, 1 as its bottom
      // reaches 80%, so every step has been passed by the end.
      const span = Math.max(1, rect.height - viewport * 0.2);
      target = Math.min(1, Math.max(0, (viewport * 0.6 - rect.top) / span));
    };

    const apply = () => {
      motion.current.progress = current;
      motion.current.activity = Math.min(1, Math.abs(target - current) * 40);
      if (pinned) track.style.setProperty("--p", current.toFixed(4));
      if (steps > 0) {
        const step = Math.min(steps - 1, Math.floor(current * steps));
        if (step !== lastStep) {
          lastStep = step;
          track.style.setProperty("--step", String(step));
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      current += (target - current) * (1 - Math.exp(-dt * 6.5));
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
        apply();
        return;
      }
      apply();
      frame = requestAnimationFrame(tick);
    };

    const update = () => {
      measure();
      if (!running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      track.style.removeProperty("--step");
      track.style.removeProperty("--p");
    };
  }, [enabled, mode, steps, pinned]);

  return (
    <div ref={boxRef} className={`mini-sculpture ${className}`} aria-hidden>
      {enabled ? (
        <FlatScene
          motion={motion}
          active={inView}
          calm={calm}
          layout="centered"
          onReady={noop}
          onFail={noop}
        />
      ) : null}
    </div>
  );
}
