/** Values the page writes and the hero scenes read, without re-rendering React. */
export type MotionState = {
  /** Smoothed scroll progress through the pinned stage, 0 to 1. */
  progress: number;
  /** Pointer position, -1 to 1 on each axis (y up). */
  pointerX: number;
  pointerY: number;
};
