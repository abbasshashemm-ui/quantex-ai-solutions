"use client";

import { useMounted } from "@/hooks/useMounted";
import { useViewportSceneActive } from "@/hooks/useViewportSceneActive";
import { sceneScrollStore } from "@/lib/scene/scene-scroll-store";
import { useEffect } from "react";
import { HomeScene } from "./HomeScene";

type ViewportSceneProps = {
  alwaysActive?: boolean;
};

export function ViewportScene({ alwaysActive = false }: ViewportSceneProps) {
  const mounted = useMounted();
  const scrollActive = useViewportSceneActive();
  const active = alwaysActive || scrollActive;

  useEffect(() => {
    if (!active) {
      sceneScrollStore.setState({
        isInServices: false,
        servicesProgress: 0,
        activeServiceIndex: 0,
      });
    }
  }, [active]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 h-[100dvh] w-full bg-void" aria-hidden />
    );
  }

  if (!active) {
    return <div className="fixed inset-0 -z-10 bg-void" aria-hidden />;
  }

  return <HomeScene />;
}
