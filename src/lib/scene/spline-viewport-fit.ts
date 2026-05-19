import type { Application, SPEObject } from "@splinetool/runtime";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const CAMERA_BASELINE = new Map<string, { x: number; y: number; z: number }>();

function getViewportSize() {
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  };
}

function findCameras(app: Application): SPEObject[] {
  return app
    .getAllObjects()
    .filter((obj) => obj.visible && /camera/i.test(obj.name));
}

function ensureCameraBaselines(app: Application) {
  for (const camera of findCameras(app)) {
    if (!CAMERA_BASELINE.has(camera.uuid)) {
      CAMERA_BASELINE.set(camera.uuid, {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });
    }
  }
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

/** Lower values zoom the camera out (wider framing) in Spline runtime. */
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
    return clamp(0.42, 0.28 + aspect * 0.52, 0.72);
  }

  return clamp(0.55, 0.42 + aspect * 0.5, 1);
}

function applyMobilePortraitFit(app: Application, width: number, height: number) {
  ensureCameraBaselines(app);

  const aspect = width / height;
  const narrowness = 1 - aspect;

  app.setZoom(getSplineZoomForViewport(width, height, true));

  for (const camera of findCameras(app)) {
    const base = CAMERA_BASELINE.get(camera.uuid);
    if (!base) continue;

    camera.position.x = base.x;
    camera.position.z = base.z + 220 + narrowness * 100;
    camera.position.y = base.y - narrowness * 28;
  }
}

function applyDesktopPortraitNudge(app: Application, width: number, height: number) {
  ensureCameraBaselines(app);

  const aspect = width / height;
  const narrowness = 1 - aspect;

  app.setZoom(getSplineZoomForViewport(width, height, false));

  for (const camera of findCameras(app)) {
    const base = CAMERA_BASELINE.get(camera.uuid)!;
    camera.position.x = base.x;
    camera.position.z = base.z + narrowness * 100;
    camera.position.y = base.y - narrowness * 18;
  }
}

export function applySplineViewportFit(
  app: Application,
  isMobile = false,
): () => void {
  const apply = () => {
    const { width: w, height: h } = getViewportSize();
    const aspect = w / h;

    ensureCameraBaselines(app);

    if (isMobile && aspect < 1) {
      applyMobilePortraitFit(app, w, h);
    } else if (isMobile) {
      resetCamerasToBaseline(app);
      app.setZoom(1);
    } else if (aspect < 1) {
      applyDesktopPortraitNudge(app, w, h);
    } else {
      resetCamerasToBaseline(app);
      app.setZoom(1);
    }

    app.requestRender();
  };

  apply();
  requestAnimationFrame(apply);
  const delayed = window.setTimeout(apply, 150);
  const delayedAgain = window.setTimeout(apply, 600);

  const onResize = () => apply();
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  window.visualViewport?.addEventListener("resize", onResize, { passive: true });

  return () => {
    window.clearTimeout(delayed);
    window.clearTimeout(delayedAgain);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    window.visualViewport?.removeEventListener("resize", onResize);
  };
}
