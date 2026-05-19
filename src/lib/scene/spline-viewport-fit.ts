import type { Application, SPEObject } from "@splinetool/runtime";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const CAMERA_BASELINE = new Map<string, { x: number; y: number; z: number }>();

function findCameras(app: Application): SPEObject[] {
  return app
    .getAllObjects()
    .filter((obj) => obj.visible && /camera/i.test(obj.name));
}

function resetCamerasToBaseline(app: Application) {
  for (const camera of findCameras(app)) {
    const base = CAMERA_BASELINE.get(camera.uuid);
    if (!base) continue;
    camera.position.x = base.x;
    camera.position.y = base.y;
    camera.position.z = base.z;
  }
}

/** Pull camera back on portrait so the full bot stays in frame. */
export function getSplineZoomForViewport(
  width: number,
  height: number,
  isMobile = false,
): number {
  const aspect = width / height;

  if (aspect >= 1) {
    return 1;
  }

  const narrowness = 1 - aspect;

  if (isMobile) {
    return 1;
  }

  return clamp(0.55, 0.42 + aspect * 0.5, 1);
}

function applyCameraPortraitNudge(
  app: Application,
  width: number,
  height: number,
): void {
  const aspect = width / height;
  if (aspect >= 1) {
    resetCamerasToBaseline(app);
    return;
  }

  const cameras = findCameras(app);
  const narrowness = 1 - aspect;

  for (const camera of cameras) {
    const key = camera.uuid;

    if (!CAMERA_BASELINE.has(key)) {
      CAMERA_BASELINE.set(key, {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });
    }

    const base = CAMERA_BASELINE.get(key)!;
    camera.position.z = base.z + narrowness * 100;
    camera.position.y = base.y - narrowness * 18;
  }
}

export function applySplineViewportFit(
  app: Application,
  isMobile = false,
): () => void {
  const apply = () => {
    const { innerWidth: w, innerHeight: h } = window;
    const aspect = w / h;

    app.setZoom(getSplineZoomForViewport(w, h, isMobile));

    if (isMobile) {
      resetCamerasToBaseline(app);
    } else if (aspect < 1) {
      applyCameraPortraitNudge(app, w, h);
    } else {
      resetCamerasToBaseline(app);
    }

    app.requestRender();
  };

  apply();
  requestAnimationFrame(apply);
  const delayed = window.setTimeout(apply, 150);
  const delayedAgain = window.setTimeout(apply, 500);

  window.addEventListener("resize", apply, { passive: true });
  window.addEventListener("orientationchange", apply, { passive: true });

  return () => {
    window.clearTimeout(delayed);
    window.clearTimeout(delayedAgain);
    window.removeEventListener("resize", apply);
    window.removeEventListener("orientationchange", apply);
  };
}
