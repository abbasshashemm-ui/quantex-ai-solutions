import { RING_COUNT } from "./chrome-geometry";

/**
 * The hero's animation rules, shared by the WebGL scene and the 2D canvas
 * fallback so both behave the same: a flat logo unfolds into a twisting
 * tunnel as the page scrolls, and its finish settles from mirror chrome to
 * satin aluminium. Pure maths, no rendering.
 */

export const CAMERA_DISTANCE = 7;
export const CAMERA_FOV_DEGREES = 26;
export const RING_MID = (RING_COUNT - 1) / 2;

/** Where the light streaks sit at rest; chosen so the opening pose reads silver. */
export const REFLECTION_OFFSET = 0.9;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

export const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Frame-rate independent easing toward a target. */
export const damp = (
  current: number,
  target: number,
  lambda: number,
  dt: number,
) => lerp(current, target, 1 - Math.exp(-lambda * dt));

/** World-space height visible at the sculpture's distance from the camera. */
export function visibleWorldHeight() {
  return 2 * Math.tan((CAMERA_FOV_DEGREES * Math.PI) / 360) * CAMERA_DISTANCE;
}

export type PoseInput = {
  /** Scroll progress through the pinned stage, 0 to 1. */
  progress: number;
  time: number;
  /** How far the intro has settled, 0 to 1. */
  settle: number;
  /** 0 removes all autonomous motion (drift, sway, ripple, cursor parallax). */
  ambient: number;
  pointerX: number;
  pointerY: number;
  /** Visible world size at the sculpture's distance. */
  viewWidth: number;
  viewHeight: number;
};

export type Pose = {
  scale: number;
  x: number;
  y: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  /** Distance between neighbouring rings along z. */
  spacing: number;
  /** Extra twist per ring, in radians. */
  twistPerRing: number;
  ripple: number;
  /** 0 = flat logo, 1 = fully unfolded. */
  open: number;
  /** 0 = untwisted, 1 = fully twisted (and fully satin). */
  twist: number;
  /** 0 = mirror chrome, 1 = satin aluminium. */
  satin: number;
};

export function computePose(input: PoseInput): Pose {
  const {
    progress,
    time,
    settle,
    ambient,
    pointerX,
    pointerY,
    viewWidth: width,
    viewHeight: height,
  } = input;

  const unsettled = (1 - settle) ** 2;
  const open = smoothstep(0, 0.5, progress);
  const twist = smoothstep(0.45, 1, progress);

  // Sculpture sits right of the copy on wide screens, above it on tall ones.
  const wide = width / height >= 1.15;
  const fit = wide
    ? Math.min(height * 0.6, width * 0.36)
    : Math.min(height * 0.27, width * 0.56);

  return {
    scale: (fit / 1.5) * (0.86 + 0.14 * settle) * (1 + 0.08 * open),
    x: wide ? width * (0.215 + 0.03 * open) : 0,
    y:
      (wide ? 0 : height * 0.244) +
      Math.sin(time * 0.9) * height * 0.012 * ambient,
    rotationX: 0.06 + 0.2 * open - 0.1 * twist - pointerY * 0.22 * ambient,
    rotationY: -0.12 + 0.8 * open + 0.45 * twist + pointerX * 0.32 * ambient,
    rotationZ: Math.sin(time * 0.3) * 0.05 * ambient + progress * 0.5,
    spacing: lerp(0.006, wide ? 0.075 : 0.05, open) + unsettled * 0.2,
    twistPerRing: twist * 0.1 + unsettled * 1.7,
    ripple: (0.006 + 0.012 * open) * ambient,
    open,
    twist,
    satin: smoothstep(0.55, 1, progress),
  };
}

/** Position of one ring along z, including its slow liquid ripple. */
export function ringZ(index: number, pose: Pose, time: number) {
  return (
    (index - RING_MID) * pose.spacing +
    Math.sin(time * 0.8 + index * 0.55) * pose.ripple
  );
}

/** Extra twist of one ring about the centre. */
export function ringTwist(index: number, pose: Pose) {
  return (index - RING_MID) * pose.twistPerRing;
}
