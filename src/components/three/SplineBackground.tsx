"use client";

import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import { useMounted } from "@/hooks/useMounted";
import { useIsCoarsePointer, useIsMobile } from "@/hooks/useMediaQuery";
import { attachSplineCursorFollow } from "@/lib/scene/spline-cursor-follow";
import { applySplineViewportFit } from "@/lib/scene/spline-viewport-fit";
import { SPLINE_BOT_SCENE } from "@/lib/scene/spline";

function SplineFallback() {
  return <div className="h-full w-full bg-void" aria-hidden />;
}

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export function SplineBackground() {
  const mounted = useMounted();
  const appRef = useRef<Application | null>(null);
  const detachFollowRef = useRef<(() => void) | null>(null);
  const detachFitRef = useRef<(() => void) | null>(null);
  const isMobile = useIsMobile();
  const isCoarsePointer = useIsCoarsePointer();

  const syncScene = useCallback(
    (app: Application) => {
      detachFollowRef.current?.();
      detachFitRef.current?.();

      detachFitRef.current = applySplineViewportFit(app, isMobile);

      app.play();
      for (let i = 0; i < 6; i += 1) {
        window.setTimeout(() => app.requestRender(), 50 * (i + 1));
      }

      if (!isCoarsePointer && !isMobile) {
        detachFollowRef.current = attachSplineCursorFollow(app);
      }
    },
    [isCoarsePointer, isMobile],
  );

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app;
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
    };
  }, []);

  return (
    <div
      className="spline-viewport fixed inset-0 z-0 h-[100dvh] h-[100svh] w-full"
      aria-label="Interactive 3D assistant"
    >
      {mounted ? (
        <Spline
          scene={SPLINE_BOT_SCENE}
          className="h-full min-h-[100dvh] min-h-[100svh] w-full touch-auto"
          onLoad={handleLoad}
          renderOnDemand={false}
        />
      ) : (
        <SplineFallback />
      )}
      {/* Covers the "Built with Spline" badge (desktop only — on mobile it sat over the bot) */}
      <div
        className="pointer-events-none absolute right-3 bottom-6 z-10 hidden h-9 w-[9.75rem] rounded-md bg-void md:block lg:bottom-7 lg:right-4"
        aria-hidden
      />
    </div>
  );
}
