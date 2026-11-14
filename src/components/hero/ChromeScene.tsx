"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  ACESFilmicToneMapping,
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
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
  visibleWorldHeight,
} from "./choreography";
import type { MotionState } from "./motion";

// This file drives three.js directly, with named imports only, so the bundler
// can leave out the parts of three.js the hero never uses.

type ChromeSceneProps = {
  motion: RefObject<MotionState>;
  /** Draw frames continuously. When false the loop is paused entirely. */
  active: boolean;
  /** Reduced motion: keep the scroll-driven morph, drop autonomous motion. */
  calm: boolean;
  onReady: () => void;
  onFail: (reason?: unknown) => void;
};

/** Sharp enough on dense screens without drawing more pixels than needed. */
const MAX_PIXEL_RATIO = 1.6;

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

export default function ChromeScene({
  motion,
  active,
  calm,
  onReady,
  onFail,
}: ChromeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Read by the frame loop, so changing them never rebuilds the scene.
  const live = useRef({ active, calm });
  const loop = useRef<{ start: () => void; stop: () => void } | null>(null);

  useEffect(() => {
    live.current.active = active;
    live.current.calm = calm;
    if (active) loop.current?.start();
    else loop.current?.stop();
  }, [active, calm]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      onFail(error);
      return;
    }
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const scene = new Scene();
    const camera = new PerspectiveCamera(CAMERA_FOV_DEGREES, 1, 0.1, 60);
    camera.position.set(0, 0, CAMERA_DISTANCE);

    const geometries = buildRingSpecs().map(buildRingGeometry);
    const material = new MeshStandardMaterial({
      color: CHROME,
      metalness: 1,
      roughness: 0.07,
      envMapIntensity: 1.1,
    });
    const group = new Group();
    const rings = geometries.map((geometry) => {
      const ring = new Mesh(geometry, material);
      ring.frustumCulled = false;
      group.add(ring);
      return ring;
    });
    scene.add(group);

    const environment = createStudioEnvironment(renderer);
    scene.environment = environment.texture;

    const worldHeight = visibleWorldHeight();
    let aspect = 1;
    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      aspect = width / height;
      renderer.setPixelRatio(
        MathUtils.clamp(window.devicePixelRatio || 1, 1, MAX_PIXEL_RATIO),
      );
      renderer.setSize(width, height, false);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    let disposed = false;
    let compiled = false;
    let frame = 0;
    let framesDrawn = 0;
    let last = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;
    let spinAngle = 0;
    let spinSpeed = 0;

    const draw = (now: number) => {
      // Time only advances while frames are drawn, and starts from zero at
      // the handoff, so the first frame is the pose in the still image.
      const dt = last === 0 ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      const ambient = live.current.calm ? 0 : 1;
      const input = motion.current;
      const progress = input.progress;

      pointerX = MathUtils.damp(pointerX, input.pointerX, 3.5, dt);
      pointerY = MathUtils.damp(pointerY, input.pointerY, 3.5, dt);

      spinSpeed = MathUtils.damp(
        spinSpeed,
        IDLE_SPIN_SPEED * (1 - input.activity) * ambient,
        2.5,
        dt,
      );
      spinAngle += spinSpeed * dt;

      const pose = computePose({
        progress,
        time,
        ambient,
        spin: spinAngle,
        slotCenter: input.slotCenter,
        slotSize: input.slotSize,
        pointerX,
        pointerY,
        viewWidth: worldHeight * aspect,
        viewHeight: worldHeight,
      });

      group.scale.setScalar(pose.scale);
      group.position.set(pose.x, pose.y, 0);
      group.rotation.set(pose.rotationX, pose.rotationY, pose.rotationZ);

      for (let index = 0; index < RING_COUNT; index += 1) {
        const ring = rings[index];
        ring.position.z = ringZ(index, pose, time);
        ring.rotation.z = ringTwist(index, pose);
      }

      updateFinish(material, pose.satin, pose.twist);
      updateReflections(scene, time, progress, ambient);
      renderer.render(scene, camera);

      // The still image fades out only once a live frame is on screen.
      framesDrawn += 1;
      if (framesDrawn === 2) onReady();
    };

    const tick = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (disposed || !compiled || frame !== 0) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    loop.current = { start, stop };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      // Resizing clears the canvas; redraw now so it never shows blank.
      if (compiled) draw(performance.now());
    });
    observer.observe(canvas);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      onFail("The graphics context was lost.");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    // Compile in the background where the browser allows it, so the page
    // does not stall on the first frame. Nothing is drawn until then.
    const begin = () => {
      if (disposed) return;
      compiled = true;
      if (live.current.active) start();
      else draw(performance.now());
    };
    if (renderer.extensions.has("KHR_parallel_shader_compile")) {
      renderer.compileAsync(scene, camera).then(begin, begin);
    } else {
      renderer.compile(scene, camera);
      begin();
    }

    return () => {
      disposed = true;
      stop();
      loop.current = null;
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      environment.dispose();
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
      renderer.dispose();
    };
  }, [motion, onReady, onFail]);

  return <canvas ref={canvasRef} className="alu-flat" aria-hidden />;
}
