"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  RING_COUNT,
  TUBE_FALLOFF,
  TUBE_RADIUS,
  buildRingSpecs,
  getUnitLoopPoints,
} from "./ring-math";
import {
  CAMERA_DISTANCE,
  IDLE_SPIN_SPEED,
  computePose,
  damp,
  lerp,
  ringTwist,
  ringZ,
  visibleWorldHeight,
  type Pose,
} from "./choreography";
import type { MotionState } from "./motion";

/** Minimum time between drawn frames on phones (about 30 per second). */
const PHONE_FRAME_MS = 1000 / 30 - 2;

/**
 * The same rings drawn with the browser's 2D canvas. It is used when WebGL is
 * unavailable (for example hardware acceleration is off), so the hero still
 * unfolds and twists as the page scrolls on any desktop.
 */

type FlatSceneProps = {
  motion: RefObject<MotionState>;
  active: boolean;
  calm: boolean;
  /** "centered" draws a small stand-alone sculpture instead of the hero layout. */
  layout?: "hero" | "centered";
  onReady: () => void;
  onFail: (reason?: unknown) => void;
};

type Rgb = readonly [number, number, number];

const hex = (value: string): Rgb => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
];

/** Gradient stops across a ring: bright sky, mid grey, black horizon, bounce light. */
const MIRROR = ["#f7f9fc", "#9ca2ad", "#14161b", "#e8ebf0", "#4d535e"].map(hex);
const SATIN = ["#f2f4f7", "#d3d7de", "#aeb4be", "#dfe2e8", "#a2a8b3"].map(hex);
const STOPS = [0, 0.3, 0.52, 0.66, 1] as const;

function mix(from: Rgb, to: Rgb, amount: number): string {
  const channel = (index: number) =>
    Math.round(lerp(from[index], to[index], amount));
  return `rgb(${channel(0)},${channel(1)},${channel(2)})`;
}

type Projected = { x: number; y: number }[];

type RingDraw = {
  index: number;
  depth: number;
  points: Projected;
  width: number;
  top: number;
  bottom: number;
};

/** Same rotation order as the 3D scene: z first, then y, then x. */
function rotate(
  x: number,
  y: number,
  z: number,
  pose: Pose,
): [number, number, number] {
  const cz = Math.cos(pose.rotationZ);
  const sz = Math.sin(pose.rotationZ);
  const cy = Math.cos(pose.rotationY);
  const sy = Math.sin(pose.rotationY);
  const cx = Math.cos(pose.rotationX);
  const sx = Math.sin(pose.rotationX);

  const x1 = x * cz - y * sz;
  const y1 = x * sz + y * cz;
  const x2 = x1 * cy + z * sy;
  const z2 = -x1 * sy + z * cy;
  const y3 = y1 * cx - z2 * sx;
  const z3 = y1 * sx + z2 * cx;
  return [x2, y3, z3];
}

export default function FlatScene({
  motion,
  active,
  calm,
  layout = "hero",
  onReady,
  onFail,
}: FlatSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtime = useRef({
    intro: 0,
    pointerX: 0,
    pointerY: 0,
    last: 0,
    start: 0,
    ready: false,
    spinAngle: 0,
    spinSpeed: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      onFail("A 2D canvas is not available.");
      return;
    }

    const ambient = calm ? 0 : 1;
    const state = runtime.current;
    if (ambient === 0) state.intro = 1;

    const specs = buildRingSpecs();
    const loop = getUnitLoopPoints();
    const worldHeight = visibleWorldHeight();

    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (state.start === 0) state.start = now;
      const dt =
        state.last === 0 ? 0 : Math.min((now - state.last) / 1000, 0.05);
      state.last = now;
      const time = (now - state.start) / 1000;
      const input = motion.current;

      if (state.intro < 1) state.intro = Math.min(1, state.intro + dt / 2.1);
      const settle = ambient === 0 ? 1 : 1 - (1 - state.intro) ** 4;
      const progress = input.progress;

      state.pointerX = damp(state.pointerX, input.pointerX, 3.5, dt);
      state.pointerY = damp(state.pointerY, input.pointerY, 3.5, dt);

      state.spinSpeed = damp(
        state.spinSpeed,
        IDLE_SPIN_SPEED * (1 - input.activity) * ambient,
        2.5,
        dt,
      );
      state.spinAngle += state.spinSpeed * dt;

      const pointsPerUnit = height / worldHeight;
      const pose = computePose({
        progress,
        time,
        settle,
        ambient,
        spin: state.spinAngle,
        centered: layout === "centered",
        slotCenter: input.slotCenter,
        slotSize: input.slotSize,
        pointerX: state.pointerX,
        pointerY: state.pointerY,
        viewWidth: (width / height) * worldHeight,
        viewHeight: worldHeight,
      });

      const rings: RingDraw[] = [];
      for (let index = 0; index < RING_COUNT; index += 1) {
        const spec = specs[index];
        const angle = spec.rotation + ringTwist(index, pose);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const z = ringZ(index, pose, time);

        let top = Infinity;
        let bottom = -Infinity;
        const points: Projected = [];

        for (const [px, py] of loop) {
          const lx = px * spec.scale * cos - py * spec.scale * sin;
          const ly = px * spec.scale * sin + py * spec.scale * cos;
          const [rx, ry, rz] = rotate(lx, ly, z, pose);
          const worldX = rx * pose.scale + pose.x;
          const worldY = ry * pose.scale + pose.y;
          const worldZ = rz * pose.scale;
          const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - worldZ);
          const x = width / 2 + worldX * perspective * pointsPerUnit;
          const y = height / 2 - worldY * perspective * pointsPerUnit;
          points.push({ x, y });
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }

        const [, , centreZ] = rotate(0, 0, z, pose);
        const worldZ = centreZ * pose.scale;
        const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - worldZ);
        const tube = 2 * TUBE_RADIUS * spec.scale ** TUBE_FALLOFF * pose.scale;

        rings.push({
          index,
          depth: worldZ,
          points,
          width: Math.max(1.2, tube * perspective * pointsPerUnit),
          top,
          bottom,
        });
      }

      // Far rings first, so nearer ones overlap them.
      rings.sort((a, b) => a.depth - b.depth);

      context.clearRect(0, 0, width, height);
      context.lineJoin = "round";
      context.lineCap = "round";

      for (const ring of rings) {
        const path = new Path2D();
        ring.points.forEach((point, i) => {
          if (i === 0) path.moveTo(point.x, point.y);
          else path.lineTo(point.x, point.y);
        });
        path.closePath();

        context.lineWidth = ring.width + 2;
        context.strokeStyle = "rgba(10,12,16,0.28)";
        context.stroke(path);

        const gradient = context.createLinearGradient(
          0,
          ring.top,
          0,
          Math.max(ring.bottom, ring.top + 1),
        );
        STOPS.forEach((stop, i) =>
          gradient.addColorStop(stop, mix(MIRROR[i], SATIN[i], pose.satin)),
        );
        context.lineWidth = ring.width;
        context.strokeStyle = gradient;
        context.stroke(path);

        context.save();
        context.translate(-ring.width * 0.16, -ring.width * 0.16);
        context.lineWidth = Math.max(0.6, ring.width * 0.32);
        context.strokeStyle = `rgba(255,255,255,${lerp(0.9, 0.45, pose.satin)})`;
        context.stroke(path);
        context.restore();
      }

      if (!state.ready) {
        state.ready = true;
        onReady();
      }
    };

    // Phones: 30 frames a second looks the same for this slow, smooth motion
    // and halves the work on weaker processors. The animation is driven by
    // elapsed time, so skipping frames never changes its speed.
    const capped = window.matchMedia("(max-width: 899px)").matches;
    let lastDrawn = 0;

    const tick = (now: number) => {
      if (!capped || now - lastDrawn >= PHONE_FRAME_MS) {
        lastDrawn = now;
        draw(now);
      }
      frame = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    observer.observe(canvas);

    if (active) frame = requestAnimationFrame(tick);
    else draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [active, calm, layout, motion, onReady, onFail]);

  return <canvas ref={canvasRef} className="alu-flat" aria-hidden />;
}
