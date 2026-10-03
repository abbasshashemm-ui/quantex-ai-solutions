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
import {
  CAMERA_DISTANCE,
  CAMERA_FOV_DEGREES,
  REFLECTION_OFFSET,
  computePose,
  ringTwist,
  ringZ,
} from "./choreography";
import type { MotionState } from "./motion";

type ChromeSceneProps = {
  motion: RefObject<MotionState>;
  /** Draw frames continuously. When false the loop is paused entirely. */
  active: boolean;
  /** Reduced motion: keep the scroll-driven morph, drop autonomous motion. */
  calm: boolean;
  /** The visitor paused the animation: one still frame in the opening pose. */
  paused: boolean;
  onReady: () => void;
  onFail: (reason?: unknown) => void;
};

const CHROME = new Color("#ffffff");
const ALUMINIUM = new Color("#d6dae1");

/** Finish settles from mirror chrome to satin aluminium as the tunnel twists. */
function updateFinish(
  material: MeshStandardMaterial,
  satin: number,
  twist: number,
) {
  material.roughness = MathUtils.lerp(0.07, 0.3, satin);
  material.envMapIntensity = MathUtils.lerp(1.1, 0.95, twist);
  material.color.copy(CHROME).lerp(ALUMINIUM, twist);
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
  paused,
  onReady,
}: Pick<ChromeSceneProps, "motion" | "calm" | "paused" | "onReady">) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const invalidate = useThree((state) => state.invalidate);

  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<(Mesh | null)[]>([]);
  const ambient = calm || paused ? 0 : 1;
  const intro = useRef(ambient === 0 ? 1 : 0);
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

  // Pausing stops the loop, so draw one frame in the still pose.
  useEffect(() => {
    invalidate();
  }, [paused, invalidate]);

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
    const progress = paused ? 0 : input.progress;

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

    const pose = computePose({
      progress,
      time,
      settle,
      ambient,
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

    updateFinish(material, pose.satin, pose.twist);
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
  paused,
  onReady,
  onFail,
}: ChromeSceneProps) {
  return (
    <Canvas
      frameloop={active ? (paused ? "demand" : "always") : "never"}
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
      <Sculpture
        motion={motion}
        calm={calm}
        paused={paused}
        onReady={onReady}
      />
    </Canvas>
  );
}
