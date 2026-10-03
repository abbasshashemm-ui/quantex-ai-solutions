"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MotionState } from "./motion";

const ChromeScene = dynamic(() => import("./ChromeScene"), { ssr: false });
const FlatScene = dynamic(() => import("./FlatScene"), { ssr: false });

/**
 * webgl: the live 3D scene. flat: the same animation on a 2D canvas, for
 * browsers without WebGL. poster: a still image, only if both fail.
 */
type StageMode = "idle" | "webgl" | "flat" | "poster";

/** Where the scroll progress flips between copy beats. */
const BEAT_ONE_AT = 0.3;
const BEAT_TWO_AT = 0.64;

const PAUSE_KEY = "quantex-hero-motion";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type BoundaryProps = {
  onError: (error: unknown) => void;
  children: ReactNode;
};

/** A failed scene should fall back, never break the page. */
class SceneBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type HeroStageProps = {
  /** Hero copy and the scroll beats, rendered on the server. */
  children: ReactNode;
};

export function HeroStage({ children }: HeroStageProps) {
  const stageRef = useRef<HTMLElement>(null);
  const motion = useRef<MotionState>({ progress: 0, pointerX: 0, pointerY: 0 });

  const [mode, setMode] = useState<StageMode>("idle");
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  // Reduced motion keeps the scroll-driven morph (it only moves when the
  // visitor scrolls) but drops autonomous motion and cursor parallax.
  const [calm, setCalm] = useState(false);
  // The visitor can pause everything with the on-page button.
  const [paused, setPaused] = useState(false);

  const handleReady = useCallback(() => setReady(true), []);

  const handleWebglFail = useCallback((reason?: unknown) => {
    console.warn(
      "[hero] The 3D scene could not run, so the 2D version is shown.",
      reason ?? "",
    );
    setReady(false);
    setMode("flat");
  }, []);

  const handleFlatFail = useCallback((reason?: unknown) => {
    console.warn(
      "[hero] The 2D scene could not run, so a still image is shown.",
      reason ?? "",
    );
    setReady(false);
    setMode("poster");
  }, []);

  const togglePaused = useCallback(() => {
    setPaused((value) => {
      const next = !value;
      try {
        if (next) window.localStorage.setItem(PAUSE_KEY, "off");
        else window.localStorage.removeItem(PAUSE_KEY);
      } catch {
        // Storage can be blocked; the choice then lasts for this visit only.
      }
      return next;
    });
  }, []);

  // Load the animation code after first paint so the headline never waits on it.
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      if (supportsWebGL()) {
        setMode("webgl");
        return;
      }
      console.warn(
        "[hero] WebGL is not available in this browser (is hardware acceleration turned off?), so the 2D version is shown.",
      );
      setMode("flat");
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  // Reduced-motion preference and a saved pause choice.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCalm(reduce.matches);
    const initial = window.setTimeout(() => {
      sync();
      try {
        if (window.localStorage.getItem(PAUSE_KEY) === "off") setPaused(true);
      } catch {
        // Storage can be blocked.
      }
    }, 0);
    reduce.addEventListener("change", sync);
    return () => {
      window.clearTimeout(initial);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  // Scroll progress, pointer and visibility.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    let running = false;
    let current = 0;
    let target = 0;
    let last = 0;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      target = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
    };

    const apply = () => {
      stage.style.setProperty("--p", current.toFixed(4));
      motion.current.progress = current;
      const beat =
        current < BEAT_ONE_AT ? "hero" : current < BEAT_TWO_AT ? "one" : "two";
      if (stage.dataset.beat !== beat) stage.dataset.beat = beat;
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
      if (paused) {
        current = 0;
        apply();
        return;
      }
      if (!running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      motion.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      motion.current.pointerY = 1 - (event.clientY / window.innerHeight) * 2;
    };

    const visibility = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px 0px" },
    );
    visibility.observe(stage);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [paused]);

  const heroMode = paused
    ? "paused"
    : mode === "webgl"
      ? ready
        ? "3d"
        : "loading"
      : mode === "flat"
        ? ready
          ? "2d"
          : "loading"
        : mode === "poster"
          ? "still"
          : "loading";

  return (
    <section
      ref={stageRef}
      className="alu-stage"
      data-beat="hero"
      data-ready={ready ? "true" : "false"}
      data-motion={paused ? "off" : "on"}
      data-hero-mode={heroMode}
      aria-label="Quantex AI Solutions"
    >
      <div className="alu-stage__panel">
        <div className="alu-stage__shadow" aria-hidden />

        <div className="alu-stage__visual" aria-hidden>
          <Image
            src="/hero/chrome-mark.webp"
            alt=""
            width={1000}
            height={1000}
            priority
            quality={70}
            sizes="(max-width: 900px) 80vw, 46vw"
            className="alu-stage__poster"
          />
          {mode === "webgl" ? (
            <div className="alu-stage__canvas">
              <SceneBoundary onError={handleWebglFail}>
                <ChromeScene
                  motion={motion}
                  active={inView}
                  calm={calm}
                  paused={paused}
                  onReady={handleReady}
                  onFail={handleWebglFail}
                />
              </SceneBoundary>
            </div>
          ) : null}
          {mode === "flat" ? (
            <div className="alu-stage__canvas">
              <SceneBoundary onError={handleFlatFail}>
                <FlatScene
                  motion={motion}
                  active={inView}
                  calm={calm}
                  paused={paused}
                  onReady={handleReady}
                  onFail={handleFlatFail}
                />
              </SceneBoundary>
            </div>
          ) : null}
        </div>

        <div className="alu-stage__content">{children}</div>

        <div className="alu-stage__progress" aria-hidden>
          <span />
        </div>

        <button
          type="button"
          className="alu-motion-toggle"
          aria-pressed={paused}
          onClick={togglePaused}
          data-interactive
        >
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
    </section>
  );
}
