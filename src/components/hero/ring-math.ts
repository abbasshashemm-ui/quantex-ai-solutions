/**
 * The Quantex mark is a spiral of nested triangle outlines. Each triangle's
 * corners sit a fixed fraction of the way along the edges of the one before,
 * which is what makes the mark twist inward. These helpers rebuild that spiral
 * as flat, chamfered metal plates, so it can be rendered as polished chrome in 3D.
 *
 * All sizes are in units where the outermost triangle has circumradius 1.
 */

export const RING_COUNT = 17;

/** Fraction along each edge where the next triangle's corner sits. */
const SPIRAL_T = 0.078;
const CORNER_RADIUS = 0.07;
const ARC_STEPS = 14;
const EDGE_STEPS = 4;
/** Plate half-width of the outer ring. */
export const TUBE_RADIUS = 0.026;
/** Inner rings thin out slower than they shrink, so they stay visible. */
export const TUBE_FALLOFF = 0.72;

type Vec2 = readonly [number, number];

export type RingSpec = {
  /** Size of this ring relative to the outermost one. */
  scale: number;
  /** Rotation about the centre, in radians (negative = clockwise). */
  rotation: number;
};

type Loop = {
  points: Vec2[];
  normals: Vec2[];
};

function normalize([x, y]: Vec2): Vec2 {
  const length = Math.hypot(x, y) || 1;
  return [x / length, y / length];
}

export function buildRingSpecs(count: number = RING_COUNT): RingSpec[] {
  const corner = (angle: number): Vec2 => [Math.cos(angle), Math.sin(angle)];
  // Apex up, clockwise: top, bottom-right, bottom-left.
  let triangle: Vec2[] = [
    corner(Math.PI / 2),
    corner(-Math.PI / 6),
    corner((-5 * Math.PI) / 6),
  ];

  const specs: RingSpec[] = [];
  for (let index = 0; index < count; index += 1) {
    const [apexX, apexY] = triangle[0];
    specs.push({
      scale: Math.hypot(apexX, apexY),
      rotation: Math.atan2(apexY, apexX) - Math.PI / 2,
    });

    const previous = triangle;
    triangle = previous.map((vertex, k) => {
      const next = previous[(k + 1) % 3];
      return [
        vertex[0] + (next[0] - vertex[0]) * SPIRAL_T,
        vertex[1] + (next[1] - vertex[1]) * SPIRAL_T,
      ] as Vec2;
    });
  }
  return specs;
}

/** A unit triangle with filleted corners, as ordered points plus outward normals. */
function buildRoundedTriangle(): Loop {
  const vertices: Vec2[] = [
    [0, 1],
    [Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)],
    [Math.cos((-5 * Math.PI) / 6), Math.sin((-5 * Math.PI) / 6)],
  ];

  const points: Vec2[] = [];
  const normals: Vec2[] = [];

  for (let k = 0; k < 3; k += 1) {
    const vertex = vertices[k];
    const previous = vertices[(k + 2) % 3];
    const next = vertices[(k + 1) % 3];

    const toPrevious = normalize([
      previous[0] - vertex[0],
      previous[1] - vertex[1],
    ]);
    const toNext = normalize([next[0] - vertex[0], next[1] - vertex[1]]);

    // Interior angle is 60 degrees for an equilateral triangle.
    const halfAngle = Math.PI / 6;
    const tangentLength = CORNER_RADIUS / Math.tan(halfAngle);
    const bisector = normalize([
      toPrevious[0] + toNext[0],
      toPrevious[1] + toNext[1],
    ]);
    const centreDistance = CORNER_RADIUS / Math.sin(halfAngle);
    const centre: Vec2 = [
      vertex[0] + bisector[0] * centreDistance,
      vertex[1] + bisector[1] * centreDistance,
    ];

    const start: Vec2 = [
      vertex[0] + toPrevious[0] * tangentLength,
      vertex[1] + toPrevious[1] * tangentLength,
    ];
    const end: Vec2 = [
      vertex[0] + toNext[0] * tangentLength,
      vertex[1] + toNext[1] * tangentLength,
    ];

    const startAngle = Math.atan2(start[1] - centre[1], start[0] - centre[0]);
    let sweep = Math.atan2(end[1] - centre[1], end[0] - centre[0]) - startAngle;
    while (sweep > Math.PI) sweep -= Math.PI * 2;
    while (sweep < -Math.PI) sweep += Math.PI * 2;

    for (let step = 0; step <= ARC_STEPS; step += 1) {
      const angle = startAngle + (sweep * step) / ARC_STEPS;
      const normal: Vec2 = [Math.cos(angle), Math.sin(angle)];
      points.push([
        centre[0] + normal[0] * CORNER_RADIUS,
        centre[1] + normal[1] * CORNER_RADIUS,
      ]);
      normals.push(normal);
    }

    // Straight run from this corner's arc to the next corner's arc.
    const edgeStart = end;
    const edgeEndDirection = normalize([
      vertex[0] - next[0],
      vertex[1] - next[1],
    ]);
    const edgeEnd: Vec2 = [
      next[0] + edgeEndDirection[0] * tangentLength,
      next[1] + edgeEndDirection[1] * tangentLength,
    ];
    const edgeDx = edgeEnd[0] - edgeStart[0];
    const edgeDy = edgeEnd[1] - edgeStart[1];
    // Clockwise winding: outward is the left-hand normal of the travel direction.
    const edgeNormal = normalize([-edgeDy, edgeDx]);

    for (let step = 1; step <= EDGE_STEPS; step += 1) {
      const amount = step / (EDGE_STEPS + 1);
      points.push([
        edgeStart[0] + edgeDx * amount,
        edgeStart[1] + edgeDy * amount,
      ]);
      normals.push(edgeNormal);
    }
  }

  return { points, normals };
}

let cachedLoop: Loop | null = null;

function getRoundedTriangle(): Loop {
  cachedLoop ??= buildRoundedTriangle();
  return cachedLoop;
}

/** The unit triangle's outline points, for renderers that draw it directly. */
export function getUnitLoopPoints(): readonly (readonly [number, number])[] {
  return getRoundedTriangle().points;
}

/** Plate proportions, relative to the plate width at the same ring. */
const PLATE_HALF_WIDTH = 1.08;
const PLATE_HALF_DEPTH = 0.5;
const PLATE_CHAMFER = 0.22;

/**
 * The vertex data for one chrome ring: the triangle loop swept with a flat,
 * chamfered rectangle: front and back faces, flat sides and four 45 degree
 * edges. Each face has its own vertices so the edges stay crisp. The ring is
 * already scaled and rotated into its place in the spiral; stacking rings along
 * z (and twisting them) is what the scroll animation drives.
 */
export function buildRingBuffers(spec: RingSpec) {
  const { points, normals } = getRoundedTriangle();
  const loopLength = points.length;
  const W = PLATE_HALF_WIDTH;
  const D = PLATE_HALF_DEPTH;
  const C = PLATE_CHAMFER;
  const k = Math.SQRT1_2;

  // [startU, startZ, endU, endZ, normalU, normalZ], walked clockwise.
  const faces: number[][] = [
    [-(W - C), D, W - C, D, 0, 1],
    [W - C, D, W, D - C, k, k],
    [W, D - C, W, -(D - C), 1, 0],
    [W, -(D - C), W - C, -D, k, -k],
    [W - C, -D, -(W - C), -D, 0, -1],
    [-(W - C), -D, -W, -(D - C), -k, -k],
    [-W, -(D - C), -W, D - C, -1, 0],
    [-W, D - C, -(W - C), D, -k, k],
  ];
  const perLoop = faces.length * 2;

  const cos = Math.cos(spec.rotation);
  const sin = Math.sin(spec.rotation);
  const width = TUBE_RADIUS * spec.scale ** TUBE_FALLOFF;

  const positions = new Float32Array(loopLength * perLoop * 3);
  const vertexNormals = new Float32Array(loopLength * perLoop * 3);

  for (let i = 0; i < loopLength; i += 1) {
    const [px, py] = points[i];
    const [nx0, ny0] = normals[i];
    const baseX = px * spec.scale * cos - py * spec.scale * sin;
    const baseY = px * spec.scale * sin + py * spec.scale * cos;
    const nx = nx0 * cos - ny0 * sin;
    const ny = nx0 * sin + ny0 * cos;

    faces.forEach((face, f) => {
      for (let end = 0; end < 2; end += 1) {
        const u = face[end * 2];
        const z = face[end * 2 + 1];
        const index = i * perLoop + f * 2 + end;
        positions[index * 3] = baseX + width * u * nx;
        positions[index * 3 + 1] = baseY + width * u * ny;
        positions[index * 3 + 2] = width * z;
        vertexNormals[index * 3] = face[4] * nx;
        vertexNormals[index * 3 + 1] = face[4] * ny;
        vertexNormals[index * 3 + 2] = face[5];
            }
    });
  }

  const indices = new Uint32Array(loopLength * faces.length * 6);
  let cursor = 0;
  for (let i = 0; i < loopLength; i += 1) {
    const nextI = (i + 1) % loopLength;
    for (let f = 0; f < faces.length; f += 1) {
      const a = i * perLoop + f * 2;
      const b = a + 1;
      const c = nextI * perLoop + f * 2;
      const d = c + 1;
      indices[cursor++] = a;
      indices[cursor++] = c;
      indices[cursor++] = b;
      indices[cursor++] = b;
      indices[cursor++] = c;
      indices[cursor++] = d;
    }
  }

  return { positions, normals: vertexNormals, indices };
}
