import { useGLTF } from "@react-three/drei";

/**
 * Central registry for GLTF/GLB assets.
 * Add paths under /public/models and reference them here.
 */
export const GLTF_ASSETS = {
  // hero: "/models/hero.glb",
} as const satisfies Record<string, string>;

export type GltfAssetKey = keyof typeof GLTF_ASSETS;

export function getGltfAssetUrl(key: GltfAssetKey): string {
  return GLTF_ASSETS[key];
}

export function preloadGltfAssets(keys?: GltfAssetKey[]) {
  const entries = keys ?? (Object.keys(GLTF_ASSETS) as GltfAssetKey[]);
  entries.forEach((key) => {
    useGLTF.preload(GLTF_ASSETS[key]);
  });
}

export { useGLTF };
