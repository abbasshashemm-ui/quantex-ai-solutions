import type { Application } from "@splinetool/runtime";

export function attachSplineVisibilityPause(app: Application): () => void {
  const onVisibility = () => {
    if (document.hidden) {
      app.stop();
    } else {
      app.play();
      app.requestRender();
    }
  };

  document.addEventListener("visibilitychange", onVisibility);
  return () => document.removeEventListener("visibilitychange", onVisibility);
}
