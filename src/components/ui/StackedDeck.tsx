"use client";

import {
  Children,
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

type StackedDeckProps = {
  children: ReactNode;
  label: string;
};

const RING_R = 13;
const RING_C = 2 * Math.PI * RING_R;

export function StackedDeck({ children, label }: StackedDeckProps) {
  const items = Children.toArray(children);
  const total = items.length;
  const [index, setIndex] = useState(0);
  const labelId = useId();
  const dragX = useRef<number | null>(null);
  const swiped = useRef(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (total < 2) return;
      setIndex((current) => (current + dir + total) % total);
    },
    [total],
  );

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      go(-1);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragX.current == null) return;
    const delta = event.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) < 48) return;
    swiped.current = true;
    go(delta < 0 ? 1 : -1);
  }

  const current = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");
  const dash = RING_C * ((index + 1) / Math.max(total, 1));

  return (
    <div
      className="stacked-deck"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="stacked-deck__toolbar">
        <div className="stacked-deck__status">
          <svg className="stacked-deck__ring" viewBox="0 0 32 32" aria-hidden>
            <circle cx="16" cy="16" r={RING_R} />
            <circle
              cx="16"
              cy="16"
              r={RING_R}
              strokeDasharray={`${dash} ${RING_C}`}
            />
          </svg>
          <p id={labelId} className="stacked-deck__count">
            <span className="sr-only">{label}, card </span>
            {current}
            <span aria-hidden> / </span>
            <span className="sr-only">of </span>
            {count}
          </p>
        </div>
        <div className="stacked-deck__controls">
          <button
            type="button"
            className="stacked-deck__nav"
            aria-label={`Previous ${label}`}
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M11 6 5 12l6 6M19 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="stacked-deck__nav stacked-deck__nav--next"
            aria-label={`Next ${label}`}
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 6l6 6-6 6M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="stacked-deck__stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragX.current = null;
        }}
        onClickCapture={(event) => {
          if (!swiped.current) return;
          event.preventDefault();
          event.stopPropagation();
          swiped.current = false;
        }}
      >
        {items.map((child, itemIndex) => {
          const depth = (itemIndex - index + total) % total;
          const hidden = depth > 2;
          return (
            <div
              key={itemIndex}
              className="stacked-deck__layer"
              data-depth={hidden ? "hidden" : depth}
              aria-hidden={depth !== 0}
              inert={depth !== 0}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
