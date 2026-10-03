"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  ACESFilmicToneMapping,
  Color,
  MathUtils,
  MeshStandardMaterial,
  type Group,
  type Mesh,
  type Scene,
  type Texture,
} from "three";
import { createStudioEnvironment } from "./chrome-environment";
import {
  RING_COUNT,
  buildRingGeometry,
  buildRingSpecs,
} from "./chrome-geometry";

/** Values the page writes and the scene reads, without re-rendering React. */
export type MotionState = {
  /** Smoothed scroll progress through the pinned stage, 0 to 1. */
  progress: number;
  /** Pointer position, -1 to 1 on each axis (y up). */
  pointerX: number;
  pointerY: number;
};

type ChromeSceneProps = {
  motion: RefObject<MotionState>;
  /** Draw frames continuously. When false the loop is paused entirely. */
  active: boolean;
  /** Visitor prefers reduced motion: one still frame, no scroll morph. */
  reducedMotion: boolean;
  onReady: () => void;
  onFail: () => void;
};

const MID = (RING_COUNT - 1) / 2;

/** Where the light streaks sit at rest; chosen so the opening pose reads silver. */
const REFLECTION_OFFSET = 0.9;

const CHROME = new Color("#ffffff");
const ALUMINIUM = new Color("#d6dae1");

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Finish settles from mirror chrome to satin aluminium as the tunnel twists. */
function updateFinish(
  material: MeshStandardMaterial,
  progress: number,
  twist: number,
) {
  material.roughness = MathUtils.lerp(0.07, 0.3, smoothstep(0.55, 1, progress));
  material.envMapIntensity = MathUtils.lerp(1.1, 0.95, twist);
  material.color.copy(CHROME).lerp(ALUMINIUM, twist);
}

/** Light streaks slide across the metal; this is most of what reads as liquid. */
function updateReflections(scene: Scene, time: number, progress: number) {
  scene.environmentRotation.y = REFLECTION_OFFSET + time * 0.1 + progress * 2.4;
  scene.environmentRotation.x = Math.sin(time * 0.17) * 0.12;
}

function setEnvironment(scene: Scene, texture: Texture | null) {
  scene.environment = texture;
}

function Sculpture({
  motion,
  reducedMotion,
  onReady,
}: Pick<ChromeSceneProps, "motion" | "reducedMotion" | "onReady">) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const invalidate = useThree((state) => state.invalidate);

  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<(Mesh | null)[]>([]);
  const intro = useRef(reducedMotion ? 1 : 0);
  const pointer = useRef({ x: 0, y: 0 });

  const geometries = useMemo(() => buildRingSpecs().map(buildRingGeometry), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: CHROME,
        metalness: 1,
        roughness: 0.07,
        envMapIntensity: 1.1,
      }),
    [],
  );

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
    const settle = 1 - (1 - intro.current) ** 4;
    const unsettled = (1 - settle) ** 2;

    const progress = reducedMotion ? 0 : input.progress;
    const open = smoothstep(0, 0.5, progress);
    const twist = smoothstep(0.45, 1, progress);

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

    // Layout: sculpture sits right of the copy on wide screens, above it on tall ones.
    const { width, height } = state.viewport;
    const wide = width / height >= 1.15;
    const fit = wide
      ? Math.min(height * 0.6, width * 0.36)
      : Math.min(height * 0.3, width * 0.6);
    const baseScale = fit / 1.5;

    group.scale.setScalar(
      baseScale * (0.86 + 0.14 * settle) * (1 + 0.08 * open),
    );
    group.position.x = wide ? width * (0.215 + 0.03 * open) : 0;
    group.position.y =
      (wide ? 0 : height * 0.23) + Math.sin(time * 0.9) * height * 0.012;

    group.rotation.y =
      -0.12 + 0.8 * open + 0.45 * twist + pointer.current.x * 0.32;
    group.rotation.x =
      0.06 + 0.2 * open - 0.1 * twist - pointer.current.y * 0.22;
    group.rotation.z = Math.sin(time * 0.3) * 0.05 + progress * 0.5;

    // The morph: a flat logo unfolds into a twisting chrome tunnel.
    const spacing =
      MathUtils.lerp(0.006, wide ? 0.075 : 0.05, open) + unsettled * 0.2;
    const twistPerRing = twist * 0.1 + unsettled * 1.7;
    const ripple = 0.006 + 0.012 * open;

    for (let index = 0; index < RING_COUNT; index += 1) {
      const ring = ringRefs.current[index];
      if (!ring) continue;
      const offset = index - MID;
      ring.position.z =
        offset * spacing + Math.sin(time * 0.8 + index * 0.55) * ripple;
      ring.rotation.z = offset * twistPerRing;
    }

    updateFinish(material, progress, twist);
    updateReflections(state.scene, time, progress);
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
  reducedMotion,
  onReady,
  onFail,
}: ChromeSceneProps) {
  return (
    <Canvas
      frameloop={active ? (reducedMotion ? "demand" : "always") : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 26, near: 0.1, far: 60 }}
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
          onFail();
        });
      }}
      aria-hidden
    >
      <Sculpture
        motion={motion}
        reducedMotion={reducedMotion}
        onReady={onReady}
      />
    </Canvas>
  );
}
