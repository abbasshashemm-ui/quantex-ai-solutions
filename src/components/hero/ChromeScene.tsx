"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  ACESFilmicToneMapping,
  Color,
  MathUtils,
  CanvasTexture,
  MeshPhysicalMaterial,
  RepeatWrapping,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type Scene,
  type Texture,
} from "three";
import { createStudioEnvironment } from "./chrome-environment";
import {
  RING_COUNT,
  buildRingGeometry,
  buildRingSpecs,
} from "./chrome-geometry";
import {
  CAMERA_DISTANCE,
  CAMERA_FOV_DEGREES,
  IDLE_SPIN_SPEED,
  REFLECTION_OFFSET,
  computePose,
  ringTwist,
  ringZ,
} from "./choreography";
import type { MotionState } from "./motion";
import { readMarkStyle, type MarkStyle } from "./mark-style";

type ChromeSceneProps = {
  motion: RefObject<MotionState>;
  /** Draw frames continuously. When false the loop is paused entirely. */
  active: boolean;
  /** Reduced motion: keep the scroll-driven morph, drop autonomous motion. */
  calm: boolean;
  onReady: () => void;
  onFail: (reason?: unknown) => void;
};

const CHROME = new Color("#ffffff");
const ALUMINIUM = new Color("#d6dae1");

/** Roughness range per style: polished chrome, polished plates, brushed metal. */
const ROUGHNESS: Record<MarkStyle, [number, number]> = {
  tube: [0.07, 0.3],
  plate: [0.1, 0.3],
  brushed: [0.42, 0.52],
};

/** Fine streaks along the length of each plate, like a brushed finish. */
function createBrushTexture(): CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#808080";
    context.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      const shade = 128 + (Math.random() - 0.5) * 120;
      context.fillStyle = `rgb(${shade},${shade},${shade})`;
      context.globalAlpha = 0.55;
      context.fillRect(0, y, size, 1);
    }
    context.globalAlpha = 1;
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 5);
  return texture;
}

/** Finish settles from mirror chrome to satin aluminium as the tunnel twists. */
function updateFinish(
  material: MeshStandardMaterial,
  satin: number,
  twist: number,
  style: MarkStyle,
) {
  const [polished, satinRoughness] = ROUGHNESS[style];
  material.roughness = MathUtils.lerp(polished, satinRoughness, satin);
  material.envMapIntensity = MathUtils.lerp(1.1, 0.95, twist);
  material.color.copy(CHROME).lerp(ALUMINIUM, twist);
  // Brushed metal sits a little darker, so it keeps its edge on the light page.
  if (style === "brushed") material.color.multiplyScalar(0.84);
}

/** Light streaks slide across the metal; this is most of what reads as liquid. */
function updateReflections(
  scene: Scene,
  time: number,
  progress: number,
  ambient: number,
) {
  scene.environmentRotation.y =
    REFLECTION_OFFSET + time * 0.1 * ambient + progress * 2.4;
  scene.environmentRotation.x = Math.sin(time * 0.17) * 0.12 * ambient;
}

function setEnvironment(scene: Scene, texture: Texture | null) {
  scene.environment = texture;
}

function Sculpture({
  motion,
  calm,
  onReady,
}: Pick<ChromeSceneProps, "motion" | "calm" | "onReady">) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const invalidate = useThree((state) => state.invalidate);

  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<(Mesh | null)[]>([]);
  const ambient = calm ? 0 : 1;
  const intro = useRef(ambient === 0 ? 1 : 0);
  const pointer = useRef({ x: 0, y: 0 });
  // Idle spin: accumulated angle, and a smoothed 0..1 "page is moving" level.
  const spin = useRef({ angle: 0, speed: 0 });

  const style = useMemo(() => readMarkStyle(), []);
  const geometries = useMemo(
    () => buildRingSpecs().map((spec) => buildRingGeometry(spec, style)),
    [style],
  );
  const material = useMemo(() => {
    const brushed = style === "brushed";
    const brush = brushed ? createBrushTexture() : null;
    return new MeshPhysicalMaterial({
      color: CHROME,
      metalness: brushed ? 0.82 : 1,
      roughness: ROUGHNESS[style][0],
      envMapIntensity: brushed ? 1.7 : 1.1,
      ...(brush
        ? {
            roughnessMap: brush,
            bumpMap: brush,
            bumpScale: 0.25,
            anisotropy: 0.2,
            anisotropyRotation: 0,
          }
        : {}),
    });
  }, [style]);

  useEffect(() => {
    const environment = createStudioEnvironment(gl);
    setEnvironment(scene, environment.texture);
    invalidate();
    onReady();
    return () => {
      setEnvironment(scene, null);
      environment.dispose();
    };
  }, [gl, scene, invalidate, onReady]);

  useEffect(() => {
    return () => {
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
    };
  }, [geometries, material]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    const input = motion.current;

    if (intro.current < 1) {
      intro.current = Math.min(1, intro.current + dt / 2.1);
    }
    const settle = ambient === 0 ? 1 : 1 - (1 - intro.current) ** 4;
    const progress = input.progress;

    pointer.current.x = MathUtils.damp(
      pointer.current.x,
      input.pointerX,
      3.5,
      dt,
    );
    pointer.current.y = MathUtils.damp(
      pointer.current.y,
      input.pointerY,
      3.5,
      dt,
    );

    spin.current.speed = MathUtils.damp(
      spin.current.speed,
      IDLE_SPIN_SPEED * (1 - input.activity) * ambient,
      2.5,
      dt,
    );
    spin.current.angle += spin.current.speed * dt;

    const pose = computePose({
      progress,
      time,
      settle,
      ambient,
      spin: spin.current.angle,
      slotCenter: input.slotCenter,
      slotSize: input.slotSize,
      pointerX: pointer.current.x,
      pointerY: pointer.current.y,
      viewWidth: state.viewport.width,
      viewHeight: state.viewport.height,
    });

    group.scale.setScalar(pose.scale);
    group.position.set(pose.x, pose.y, 0);
    group.rotation.set(pose.rotationX, pose.rotationY, pose.rotationZ);

    for (let index = 0; index < RING_COUNT; index += 1) {
      const ring = ringRefs.current[index];
      if (!ring) continue;
      ring.position.z = ringZ(index, pose, time);
      ring.rotation.z = ringTwist(index, pose);
    }

    updateFinish(material, pose.satin, pose.twist, style);
    updateReflections(state.scene, time, progress, ambient);
  });

  return (
    <group ref={groupRef}>
      {geometries.map((geometry, index) => (
        <mesh
          key={index}
          ref={(node) => {
            ringRefs.current[index] = node;
          }}
          geometry={geometry}
          material={material}
          frustumCulled={false}
        />
      ))}
    </group>
  );
}

export default function ChromeScene({
  motion,
  active,
  calm,
  onReady,
  onFail,
}: ChromeSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{
        position: [0, 0, CAMERA_DISTANCE],
        fov: CAMERA_FOV_DEGREES,
        near: 0.1,
        far: 60,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onFail("The graphics context was lost.");
        });
      }}
      aria-hidden
    >
      <Sculpture motion={motion} calm={calm} onReady={onReady} />
    </Canvas>
  );
}
