import {
  BufferGeometry,
  Float32BufferAttribute,
  Uint32BufferAttribute,
} from "three";
import { buildRingBuffers, type RingSpec } from "./ring-math";

// The maths lives in ring-math.ts so the 2D scenes can use it without
// bundling three.js. Only the 3D scene needs this file.
export {
  RING_COUNT,
  TUBE_FALLOFF,
  TUBE_RADIUS,
  buildRingSpecs,
  getUnitLoopPoints,
  type RingSpec,
} from "./ring-math";

/** One chrome ring as three.js geometry, built from the plain vertex data. */
export function buildRingGeometry(
  spec: RingSpec,
  style: "tube" | "plate" | "brushed" = "tube",
): BufferGeometry {
  const { positions, normals, indices, uvs } = buildRingBuffers(spec, style);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(new Uint32BufferAttribute(indices, 1));
  geometry.computeBoundingSphere();
  return geometry;
}
