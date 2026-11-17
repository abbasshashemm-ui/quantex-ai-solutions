import { damp } from "./choreography";

/**
 * How the hero sculpture reacts to the visitor. The question form writes
 * targets here and the scene reads the smoothed result once per frame, so
 * nothing re-renders. Only the hero reads it; the small sculpture elsewhere
 * on the site does not.
 */

export type PresencePose = {
  /** Added to how far the rings are spread, 0 to 1. */
  open: number;
  /** Added to the twist between rings, 0 to 1. */
  twist: number;
  /** Added rotation about the sculpture's axis, in radians. */
  turn: number;
};

const REST: PresencePose = { open: 0, twist: 0, turn: 0 };

const target = { energy: 0, thinking: false, rest: REST };
const now = { open: 0, twist: 0, turn: 0, spin: 0 };

/** A keystroke: the sculpture tightens, then relaxes. */
export function nudgePresence() {
  target.energy = Math.min(1, target.energy + 0.3);
}

/** While an answer is being worked out, the sculpture winds up. */
export function setPresenceThinking(thinking: boolean) {
  target.thinking = thinking;
}

/** The shape the sculpture settles into for an answer; null returns it to rest. */
export function setPresenceRest(rest: PresencePose | null) {
  target.rest = rest ?? REST;
}

/** Advance by one frame and return what to add to the scroll-driven pose. */
export function stepPresence(dt: number): PresencePose {
  target.energy = damp(target.energy, 0, 2.4, dt);
  const wind = target.thinking ? 1 : 0;

  now.open = damp(now.open, target.rest.open + target.energy * 0.2 + wind * 0.3, 5, dt);
  now.twist = damp(now.twist, target.rest.twist + target.energy * 0.12 + wind * 0.75, 5, dt);
  now.turn = damp(now.turn, target.rest.turn, 2.5, dt);
  now.spin += wind * 2.6 * dt;

  return { open: now.open, twist: now.twist, turn: now.turn + now.spin };
}
