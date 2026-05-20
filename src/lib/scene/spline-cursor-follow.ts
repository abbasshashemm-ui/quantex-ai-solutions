import type { Application, SPEObject } from "@splinetool/runtime";

const MOUSE_VAR_PAIRS: [string, string][] = [
  ["mouseX", "mouseY"],
  ["MouseX", "MouseY"],
  ["mouse x", "mouse y"],
  ["lookX", "lookY"],
  ["LookX", "LookY"],
];

const FOLLOW_NAME_HINTS = [
  "bot",
  "robot",
  "character",
  "mascot",
  "assistant",
  "head",
  "face",
  "body",
];

/** Optional: set exact object name from Spline editor (Copy object name) */
export const SPLINE_FOLLOW_OBJECT_NAME: string | undefined = undefined;

const IDLE_MS = 220;

function lerp(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha;
}

function findMouseVariablePair(
  app: Application,
): [string, string] | null {
  const vars = app.getVariables();
  const keys = Object.keys(vars);

  for (const [xKey, yKey] of MOUSE_VAR_PAIRS) {
    if (keys.includes(xKey) && keys.includes(yKey)) {
      return [xKey, yKey];
    }
  }

  const xKey = keys.find((key) => /mouse.*x|x.*mouse|look.*x|cursor.*x/i.test(key));
  const yKey = keys.find((key) => /mouse.*y|y.*mouse|look.*y|cursor.*y/i.test(key));
  if (xKey && yKey) return [xKey, yKey];

  return null;
}

function findFollowObject(app: Application): SPEObject | null {
  if (SPLINE_FOLLOW_OBJECT_NAME) {
    return app.findObjectByName(SPLINE_FOLLOW_OBJECT_NAME) ?? null;
  }

  const objects = app.getAllObjects().filter((obj) => obj.visible && obj.name);

  for (const hint of FOLLOW_NAME_HINTS) {
    const match = objects.find((obj) =>
      obj.name.toLowerCase().includes(hint),
    );
    if (match) return match;
  }

  return (
    objects.find(
      (obj) => !/camera|light|scene|ground|floor|plane|bg|background/i.test(obj.name),
    ) ?? null
  );
}

function applyRotationFollow(
  target: SPEObject,
  normX: number,
  normY: number,
  alpha: number,
) {
  const maxYaw = 0.65;
  const maxPitch = 0.4;

  const targetYaw = normX * maxYaw;
  const targetPitch = normY * maxPitch;

  target.rotation.y = lerp(target.rotation.y, targetYaw, alpha);
  target.rotation.x = lerp(target.rotation.x, targetPitch, alpha);
}

export function attachSplineCursorFollow(app: Application): () => void {
  app.setGlobalEvents(true);

  const mouseVars = findMouseVariablePair(app);
  const followObject = mouseVars ? null : findFollowObject(app);

  const pointer = { x: 0, y: 0 };
  const smoothed = { x: 0, y: 0 };
  const SMOOTH = 0.14;

  let frameId = 0;
  let lastActive = 0;
  let running = false;

  const tick = (time: number) => {
    smoothed.x = lerp(smoothed.x, pointer.x, SMOOTH);
    smoothed.y = lerp(smoothed.y, pointer.y, SMOOTH);

    if (mouseVars) {
      app.setVariable(mouseVars[0], smoothed.x);
      app.setVariable(mouseVars[1], smoothed.y);
    } else if (followObject) {
      applyRotationFollow(followObject, smoothed.x, smoothed.y, SMOOTH);
    }

    const delta =
      Math.abs(smoothed.x - pointer.x) + Math.abs(smoothed.y - pointer.y);

    if (delta > 0.004 || time - lastActive < IDLE_MS) {
      app.requestRender();
      frameId = requestAnimationFrame(tick);
      return;
    }

    running = false;
  };

  const start = () => {
    if (running) return;
    running = true;
    frameId = requestAnimationFrame(tick);
  };

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    lastActive = performance.now();
    start();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    cancelAnimationFrame(frameId);
    running = false;
  };
}
