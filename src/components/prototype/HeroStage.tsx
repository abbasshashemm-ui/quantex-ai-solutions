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
import type { MotionState } from "./ChromeScene";

const ChromeScene = dynamic(() => import("./ChromeScene"), { ssr: false });

type StageMode = "idle" | "scene" | "fallback";

/** Where the scroll progress flips between copy beats. */
const BEAT_ONE_AT = 0.3;
const BEAT_TWO_AT = 0.64;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type BoundaryProps = { onError: () => void; children: ReactNode };

/** A failed WebGL scene should leave the still image, never break the page. */
class SceneBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
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
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleReady = useCallback(() => setReady(true), []);
  const handleFail = useCallback(() => {
    setReady(false);
    setMode("fallback");
  }, []);

  // Load the 3D code after first paint so the headline is never waiting on it.
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setMode(supportsWebGL() ? "scene" : "fallback");
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

  // Scroll progress, pointer, reduced motion and visibility.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => setReducedMotion(reduce.matches);
    const initialSync = window.setTimeout(syncReduced, 0);
    reduce.addEventListener("change", syncReduced);

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
      if (reduce.matches) {
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
      window.clearTimeout(initialSync);
      reduce.removeEventListener("change", syncReduced);
      visibility.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="alu-stage"
      data-beat="hero"
      data-ready={ready ? "true" : "false"}
      aria-label="Quantex AI Solutions"
    >
      <div className="alu-stage__panel">
        <div className="alu-stage__backdrop alu-surface" aria-hidden />
        <div className="alu-stage__shadow" aria-hidden />

        <div className="alu-stage__visual" aria-hidden>
          <Image
            src="/prototype/chrome-mark.webp"
            alt=""
            width={1000}
            height={1000}
            priority
            quality={70}
            sizes="(max-width: 900px) 80vw, 46vw"
            className="alu-stage__poster"
          />
          {mode === "scene" ? (
            <div className="alu-stage__canvas">
              <SceneBoundary onError={handleFail}>
                <ChromeScene
                  motion={motion}
                  active={inView}
                  reducedMotion={reducedMotion}
                  onReady={handleReady}
                  onFail={handleFail}
                />
              </SceneBoundary>
            </div>
          ) : null}
        </div>

        <div className="alu-stage__content">{children}</div>

        <div className="alu-stage__progress" aria-hidden>
          <span />
        </div>
      </div>
    </section>
  );
}
