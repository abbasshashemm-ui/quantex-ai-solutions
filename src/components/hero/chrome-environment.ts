import {
  BackSide,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PMREMGenerator,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  type Texture,
  type WebGLRenderer,
} from "three";

const DOME_VERTEX = /* glsl */ `
  varying vec3 vDirection;
  void main() {
    vDirection = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Hard horizon, bright sky, near-black floor. Polished metal reflects this
 * as the crisp light/dark breaks that make chrome read as chrome.
 */
const DOME_FRAGMENT = /* glsl */ `
  varying vec3 vDirection;
  void main() {
    float y = normalize(vDirection).y;
    vec3 floorColor = vec3(0.05, 0.056, 0.07);
    vec3 horizonColor = vec3(0.78, 0.82, 0.9);
    vec3 skyColor = vec3(1.7, 1.75, 1.85);
    vec3 color = mix(floorColor, horizonColor, smoothstep(-0.35, 0.05, y));
    color = mix(color, skyColor, smoothstep(0.0, 0.85, y));
    gl_FragColor = vec4(color, 1.0);
  }
`;

type Panel = {
  size: [number, number];
  position: [number, number, number];
  /** Linear light level; values above 1 act as light sources. */
  intensity: number;
};

const PANELS: Panel[] = [
  // Large soft box, upper left: the broad highlight on curved surfaces.
  { size: [18, 10], position: [-14, 11, 6], intensity: 10 },
  // Tall strip, right: the long vertical streak down each ring.
  { size: [2.4, 24], position: [16, 2, 4], intensity: 26 },
  // Thin strip low and behind: a bright rim along the bottom edges.
  { size: [26, 1.1], position: [0, -4, -14], intensity: 16 },
  // Small hot panel, upper right: a sharp glint on tight corners.
  { size: [4, 4], position: [9, 12, -4], intensity: 22 },
];

/** Dark flag behind the camera, so faces that look at the viewer reflect black. */
const FLAG: Panel = {
  size: [22, 13],
  position: [0, 2, 16],
  intensity: 0.07,
};

function addPanel(scene: Scene, panel: Panel) {
  const material = new MeshBasicMaterial({
    color: new Color(panel.intensity, panel.intensity, panel.intensity),
    side: DoubleSide,
    toneMapped: false,
  });
  const mesh = new Mesh(
    new PlaneGeometry(panel.size[0], panel.size[1]),
    material,
  );
  mesh.position.set(...panel.position);
  mesh.lookAt(0, 0, 0);
  scene.add(mesh);
}

/**
 * Builds a prefiltered studio environment map in code, so there is no HDR
 * image to download. The caller owns the result and must call `dispose`.
 */
export function createStudioEnvironment(renderer: WebGLRenderer): {
  texture: Texture;
  dispose: () => void;
} {
  const scene = new Scene();

  const dome = new Mesh(
    new SphereGeometry(50, 48, 24),
    new ShaderMaterial({
      side: BackSide,
      depthWrite: false,
      vertexShader: DOME_VERTEX,
      fragmentShader: DOME_FRAGMENT,
    }),
  );
  scene.add(dome);

  for (const panel of PANELS) addPanel(scene, panel);
  addPanel(scene, FLAG);

  const generator = new PMREMGenerator(renderer);
  const target = generator.fromScene(scene, 0.04);
  generator.dispose();

  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.geometry.dispose();
    const material = object.material;
    if (Array.isArray(material)) material.forEach((item) => item.dispose());
    else material.dispose();
  });

  return { texture: target.texture, dispose: () => target.dispose() };
}
