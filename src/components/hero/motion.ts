/** Values the page writes and the hero scenes read, without re-rendering React. */
export type MotionState = {
  /** Smoothed scroll progress through the pinned stage, 0 to 1. */
  progress: number;
  /** How much the page is moving right now, 0 (still) to 1 (scrolling fast). */
  activity: number;
  /** Pointer position, -1 to 1 on each axis (y up). */
  pointerX: number;
  pointerY: number;
  /**
   * On phones, the free space between the header and the headline, as
   * fractions of the hero's height. Zero size means "not measured / not a
   * phone layout", and the scene uses its own default placement.
   */
  slotCenter: number;
  slotSize: number;
};

export const initialMotionState = (): MotionState => ({
  progress: 0,
  activity: 0,
  pointerX: 0,
  pointerY: 0,
  slotCenter: 0,
  slotSize: 0,
});

/**
 * On phones the sculpture spins, and a spinning triangle sweeps a circle, so it
 * is sized by its circumscribed circle (radius = scale) and centred on it.
 * The fraction leaves room for tube thickness, tilt and perspective.
 */
export const SLOT_FILL = 0.94;
