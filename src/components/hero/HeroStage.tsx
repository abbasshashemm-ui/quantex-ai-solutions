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
import { SLOT_FILL, initialMotionState, type MotionState } from "./motion";

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

/** Proportions of the triangle inside public/hero/chrome-mark.webp. */
const POSTER = { heightFrac: 0.713, centreX: 0.5055, centreY: 0.3935 };

/** Breathing room between the sculpture, the header and the headline, in px. */
const SLOT_GAP = 10;
const SLOT_MIN = 80;

/** Renderer names that mean the GPU is not doing the work. */
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;

/**
 * True only for a real, hardware-accelerated WebGL context. Software rendering
 * (hardware acceleration off, headless test browsers) can run the scene, but
 * so slowly that it freezes the page, so those browsers get the 2D version.
 */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;

    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !SOFTWARE_RENDERER.test(renderer);
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
  const motion = useRef<MotionState>(initialMotionState());

  const [mode, setMode] = useState<StageMode>("idle");
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  // Reduced motion keeps the scroll-driven morph (it only moves when the
  // visitor scrolls) but drops autonomous motion and cursor parallax.
  const [calm, setCalm] = useState(false);

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
        "[hero] Hardware-accelerated WebGL is not available (is hardware acceleration turned off?), so the 2D version is shown.",
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

  // Reduced-motion preference.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCalm(reduce.matches);
    const initial = window.setTimeout(sync, 0);
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

    /**
     * Phones: find the free band between the header and the headline, so the
     * sculpture always sits clear of both on any screen height.
     */
    const measureSlot = () => {
      const state = motion.current;
      const visual = stage.querySelector<HTMLElement>(".alu-stage__visual");
      const content = stage.querySelector<HTMLElement>(".alu-stage__content");
      const heroBox = stage.querySelector<HTMLElement>(".alu-hero");
      const eyebrow = stage.querySelector<HTMLElement>(
        ".alu-hero .page-eyebrow",
      );
      const header = document.querySelector<HTMLElement>(".site-header");
      const phone = window.matchMedia("(max-width: 899px)").matches;

      if (!phone || !visual || !content || !heroBox || !eyebrow || !header) {
        state.slotSize = 0;
        state.slotCenter = 0;
        for (const name of [
          "--poster-top",
          "--poster-left",
          "--poster-width",
          "--slot-center",
          "--slot-size",
        ]) {
          stage.style.removeProperty(name);
        }
        return;
      }

      const height = visual.clientHeight;
      const top = header.offsetHeight + SLOT_GAP;
      // offsetTop is measured from the nearest positioned or transformed
      // ancestor: the hero for the eyebrow, and the content box for the hero.
      const bottom =
        content.offsetTop + heroBox.offsetTop + eyebrow.offsetTop - SLOT_GAP;
      const size = Math.max(SLOT_MIN, bottom - top);
      const center = top + size / 2;

      state.slotSize = size / height;
      state.slotCenter = center / height;

      // The still image uses the same band, so nothing jumps when 3D arrives.
      // The sculpture's circumscribed circle fills most of the band; at rest the
      // upright triangle is 1.5 radii tall and its box sits 0.25 radii above
      // the circle's centre.
      const radius = (size * SLOT_FILL) / 2;
      const posterWidth = (1.5 * radius * 0.95) / POSTER.heightFrac;
      const boxCentre = center - 0.25 * radius;
      stage.style.setProperty("--slot-center", `${center}px`);
      stage.style.setProperty("--slot-size", `${size}px`);
      stage.style.setProperty("--poster-width", `${posterWidth}px`);
      stage.style.setProperty(
        "--poster-top",
        `${boxCentre + (0.5 - POSTER.centreY) * posterWidth}px`,
      );
      stage.style.setProperty(
        "--poster-left",
        `${visual.clientWidth / 2 - (POSTER.centreX - 0.5) * posterWidth}px`,
      );
    };

    const apply = () => {
      stage.style.setProperty("--p", current.toFixed(4));
      motion.current.progress = current;
      motion.current.activity = Math.min(1, Math.abs(target - current) * 40);
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
      if (!running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measureSlot();
      update();
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
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // The headline's height changes when fonts load or the screen rotates.
    const layout = new ResizeObserver(measureSlot);
    const hero = stage.querySelector<HTMLElement>(".alu-hero");
    if (hero) layout.observe(hero);
    const panel = stage.querySelector<HTMLElement>(".alu-stage__panel");
    if (panel) layout.observe(panel);
    measureSlot();
    void document.fonts?.ready.then(measureSlot);
    update();

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      layout.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const heroMode =
    mode === "webgl"
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
      </div>
    </section>
  );
}
