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
  IDLE_SPIN_SPEED,
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
  onReady,
}: Pick<ChromeSceneProps, "motion" | "calm" | "onReady">) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<(Mesh | null)[]>([]);
  const ambient = calm ? 0 : 1;
  // The handoff from the still image: nothing is drawn until the shaders are
  // compiled, and the canvas is only revealed once a real frame is on screen.
  const handoff = useRef({ compiled: false, framesDrawn: 0, startedAt: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  // Idle spin: accumulated angle, and a smoothed 0..1 "page is moving" level.
  const spin = useRef({ angle: 0, speed: 0 });

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
    let cancelled = false;
    const state = handoff.current;
    const environment = createStudioEnvironment(gl);
    setEnvironment(scene, environment.texture);

    // Compile in the background where the browser allows it, so the page
    // does not stall on the first frame. The group stays hidden until then.
    const reveal = () => {
      if (cancelled) return;
      state.compiled = true;
      if (groupRef.current) groupRef.current.visible = true;
    };
    if (gl.extensions.has("KHR_parallel_shader_compile")) {
      gl.compileAsync(scene, camera).then(reveal, reveal);
    } else {
      gl.compile(scene, camera);
      reveal();
    }

    return () => {
      cancelled = true;
      state.compiled = false;
      state.framesDrawn = 0;
      setEnvironment(scene, null);
      environment.dispose();
    };
  }, [gl, scene, camera]);

  useEffect(() => {
    return () => {
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
    };
  }, [geometries, material]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const stage = handoff.current;
    if (!group || !stage.compiled) return;

    // This runs before each draw, so the second call means one frame is
    // already on screen and the still image can fade out.
    if (stage.framesDrawn === 0) stage.startedAt = state.clock.elapsedTime;
    if (stage.framesDrawn === 1) onReady();
    if (stage.framesDrawn < 2) stage.framesDrawn += 1;

    const dt = Math.min(delta, 0.05);
    // Ambient motion starts from zero at the handoff, where the still image is.
    const time = state.clock.elapsedTime - stage.startedAt;
    const input = motion.current;
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

    updateFinish(material, pose.satin, pose.twist);
    updateReflections(state.scene, time, progress, ambient);
  });

  return (
    <group ref={groupRef} visible={false}>
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
