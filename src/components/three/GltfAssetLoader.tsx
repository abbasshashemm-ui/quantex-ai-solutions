"use client";

import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, type ReactNode } from "react";
import type { ThreeElements } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

type GltfModelProps = {
  url: string;
  onLoaded?: (scene: Group) => void;
} & ThreeElements["group"];

function optimizeScene(scene: Group) {
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.frustumCulled = true;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    }
  });
  return scene;
}

function GltfModel({ url, onLoaded, ...groupProps }: GltfModelProps) {
  const { scene } = useGLTF(url);

  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    optimizeScene(clone);
    return clone;
  }, [scene]);

  useEffect(() => {
    onLoaded?.(cloned);
  }, [cloned, onLoaded]);

  return <primitive object={cloned} {...groupProps} />;
}

export type GltfAssetLoaderProps = GltfModelProps & {
  fallback?: ReactNode;
};

export function GltfAssetLoader({
  fallback = null,
  ...modelProps
}: GltfAssetLoaderProps) {
  return (
    <Suspense fallback={fallback}>
      <GltfModel {...modelProps} />
    </Suspense>
  );
}
