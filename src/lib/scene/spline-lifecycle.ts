import type { Application } from "@splinetool/runtime";

/** Pause WebGL work when the tab is hidden or the page is backgrounded. */
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
