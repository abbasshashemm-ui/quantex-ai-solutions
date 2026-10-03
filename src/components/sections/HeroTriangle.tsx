"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Chrome triangle that straddles the gap between the headline and the chat
 * panel: ~30% of its width sits behind the headline, ~30% behind the chat,
 * the middle ~40% in the open. Positions are measured from the real layout
 * and written straight to the element's style (no React state, no re-renders).
 */
export function HeroTriangle() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    const inner = img?.parentElement;
    if (!img || !inner) return;

    const layout = () => {
      if (window.innerWidth < 1024) {
        img.removeAttribute("style");
        return;
      }
      const chat = inner.querySelector<HTMLElement>(".hero-chat");
      const lines = inner.querySelectorAll<HTMLElement>(".hero-heading__line");
      if (!chat || lines.length === 0) return;

      const box = inner.getBoundingClientRect();
      const chatRect = chat.getBoundingClientRect();
      let headRight = 0;
      lines.forEach((line) => {
        const range = document.createRange();
        range.selectNodeContents(line);
        headRight = Math.max(headRight, range.getBoundingClientRect().right);
      });

      const gap = chatRect.left - headRight;
      const width = Math.min(Math.max(gap / 0.4, 120), 380);
      const left = headRight - width * 0.3 - box.left;
      const centerY = chatRect.top + chatRect.height / 2 - box.top;

      img.style.width = `${width}px`;
      img.style.left = `${left}px`;
      img.style.right = "auto";
      img.style.top = `${centerY}px`;
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(inner);
    document.fonts?.ready.then(layout);
    window.addEventListener("resize", layout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <Image
      ref={ref}
      src="/visuals/triangle.webp"
      alt=""
      width={1100}
      height={966}
      priority
      quality={90}
      sizes="(max-width: 1023px) 60vw, 380px"
      className="hero-triangle"
      aria-hidden
    />
  );
}
