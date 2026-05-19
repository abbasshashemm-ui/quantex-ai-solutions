import type { Application, SPEObject } from "@splinetool/runtime";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const CAMERA_BASELINE = new Map<string, { x: number; y: number; z: number }>();

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

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

export function resetSplineCameraBaselines() {
  CAMERA_BASELINE.clear();
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

const MOBILE_ZOOM = 1.15;

/** Mobile portrait: slight zoom-in so the bot reads larger on small screens. */
function getMobilePortraitZoom() {
  return MOBILE_ZOOM;
}

function getDesktopPortraitZoom(width: number, height: number) {
  const aspect = width / height;
  return clamp(0.55, 0.42 + aspect * 0.5, 1);
}

function applyMobilePortraitFit(app: Application, width: number, height: number) {
  ensureCameraBaselines(app);
  resetCamerasToBaseline(app);

  const aspect = width / height;
  const narrowness = 1 - aspect;

  app.setZoom(getMobilePortraitZoom());

  for (const camera of findCameras(app)) {
    const base = CAMERA_BASELINE.get(camera.uuid);
    if (!base) continue;

    camera.position.x = base.x;
    camera.position.z = base.z + 80 + narrowness * 40;
    camera.position.y = base.y - narrowness * 16;
  }
}

function applyDesktopPortraitNudge(app: Application, width: number, height: number) {
  ensureCameraBaselines(app);

  const aspect = width / height;
  const narrowness = 1 - aspect;

  app.setZoom(getDesktopPortraitZoom(width, height));

  for (const camera of findCameras(app)) {
    const base = CAMERA_BASELINE.get(camera.uuid)!;
    camera.position.x = base.x;
    camera.position.z = base.z + narrowness * 100;
    camera.position.y = base.y - narrowness * 18;
  }
}

export function applySplineViewportFit(app: Application): () => void {
  const apply = () => {
    const { width: w, height: h } = getViewportSize();
    const aspect = w / h;
    const mobile = isMobileViewport();

    ensureCameraBaselines(app);

    if (mobile && aspect < 1) {
      applyMobilePortraitFit(app, w, h);
    } else if (mobile) {
      resetCamerasToBaseline(app);
      app.setZoom(MOBILE_ZOOM);
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

  const delays = [150, 500, 1000, 1800].map((ms) => window.setTimeout(apply, ms));

  const onResize = () => apply();
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  window.visualViewport?.addEventListener("resize", onResize, { passive: true });

  return () => {
    delays.forEach((id) => window.clearTimeout(id));
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    window.visualViewport?.removeEventListener("resize", onResize);
  };
}
