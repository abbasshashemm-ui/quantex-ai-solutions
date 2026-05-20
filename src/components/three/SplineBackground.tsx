"use client";

import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import { useDeferredMount } from "@/hooks/useDeferredMount";
import { useIsCoarsePointer, useIsMobile } from "@/hooks/useMediaQuery";
import { attachSplineCursorFollow } from "@/lib/scene/spline-cursor-follow";
import { attachSplineVisibilityPause } from "@/lib/scene/spline-lifecycle";
import {
  applySplineViewportFit,
  resetSplineCameraBaselines,
} from "@/lib/scene/spline-viewport-fit";
import { SPLINE_BOT_SCENE } from "@/lib/scene/spline";

function SplineFallback() {
  return (
    <div className="spline-viewport__stage h-full w-full bg-void" aria-hidden />
  );
}

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((module) => module.default),
  {
    ssr: false,
    loading: SplineFallback,
  },
);

export function SplineBackground() {
  const splineReady = useDeferredMount();
  const appRef = useRef<Application | null>(null);
  const detachFollowRef = useRef<(() => void) | null>(null);
  const detachFitRef = useRef<(() => void) | null>(null);
  const detachVisibilityRef = useRef<(() => void) | null>(null);
  const isMobile = useIsMobile();
  const isCoarsePointer = useIsCoarsePointer();

  const syncScene = useCallback(
    (app: Application) => {
      detachFollowRef.current?.();
      detachFitRef.current?.();
      detachVisibilityRef.current?.();

      detachFitRef.current = applySplineViewportFit(app);
      detachVisibilityRef.current = attachSplineVisibilityPause(app);

      app.play();
      app.requestRender();
      window.setTimeout(() => app.requestRender(), 150);

      if (!isCoarsePointer && !isMobile) {
        detachFollowRef.current = attachSplineCursorFollow(app);
      }
    },
    [isCoarsePointer, isMobile],
  );

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app;
      resetSplineCameraBaselines();
      syncScene(app);
    },
    [syncScene],
  );

  useEffect(() => {
    if (appRef.current) {
      syncScene(appRef.current);
    }
  }, [syncScene]);

  useEffect(() => {
    return () => {
      detachFollowRef.current?.();
      detachFollowRef.current = null;
      detachFitRef.current?.();
      detachFitRef.current = null;
      detachVisibilityRef.current?.();
      detachVisibilityRef.current = null;
    };
  }, []);

  return (
    <div
      className="spline-viewport fixed inset-0 z-0 h-[100dvh] h-[100svh] w-full"
      aria-label="Interactive 3D assistant"
    >
      {splineReady ? (
        <Spline
          scene={SPLINE_BOT_SCENE}
          className="spline-viewport__stage h-full min-h-[100dvh] min-h-[100svh] w-full touch-auto"
          onLoad={handleLoad}
          renderOnDemand
        />
      ) : (
        <SplineFallback />
      )}
      <div
        className="spline-watermark-cover pointer-events-none absolute right-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-10 h-5 w-[5.5rem] rounded-sm bg-void max-md:h-[1.125rem] max-md:w-[4.75rem] md:right-3 md:bottom-6 md:h-9 md:w-[9.75rem] md:rounded-md lg:bottom-7 lg:right-4"
        aria-hidden
      />
    </div>
  );
}
