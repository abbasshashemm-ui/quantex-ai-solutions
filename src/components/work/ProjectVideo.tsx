"use client";

import { useEffect, useRef } from "react";

/**
 * A short muted recording of a project, laid over its screenshot. It plays
 * while the card is hovered or focused, or while it is on screen on touch
 * devices, and never for visitors who ask for reduced motion. Nothing is
 * downloaded until it first plays.
 */
export function ProjectVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest<HTMLElement>(".work-card");
    if (!video || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = () => {
      video.dataset.playing = "true";
      void video.play().catch(() => {
        delete video.dataset.playing;
      });
    };
    const stop = () => {
      video.pause();
      delete video.dataset.playing;
    };

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      card.addEventListener("pointerenter", play);
      card.addEventListener("pointerleave", stop);
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", stop);
      return () => {
        card.removeEventListener("pointerenter", play);
        card.removeEventListener("pointerleave", stop);
        card.removeEventListener("focusin", play);
        card.removeEventListener("focusout", stop);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : stop()),
      { threshold: 0.7 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className="work-frame__video"
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    />
  );
}
