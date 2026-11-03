"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  Color,
  CylinderGeometry,
  MeshPhysicalMaterial,
  type Group,
} from "three";
import { CAMERA_DISTANCE } from "./choreography";
import type { MotionState } from "./motion";

/**
 * A slab of fluted glass standing between the camera and the sculpture: a
 * row of tall glass columns that refract whatever is behind them, so the
 * mark reads as seen through ridged glass while its far side stays sharp.
 */

/** Depth of the slab, in front of the sculpture's furthest forward reach. */
const GLASS_Z = 2.2;
/** Screen scale at that depth relative to the sculpture's plane. */
const DEPTH_SCALE = (CAMERA_DISTANCE - GLASS_Z) / CAMERA_DISTANCE;

const COLUMN_COUNT = 5;

/** Where the slab stands on wide screens, as fractions of the viewport width. */
const WIDE_SPAN = { from: 0.5, to: 0.72 };
/** On phones it stands only through the sculpture's band above the copy. */
const PHONE_SPAN = { from: 0.52, to: 0.82 };

const LIGHT_TINT = new Color("#bcc2ca");
const DARK_TINT = new Color("#2c3038");

function isDarkTheme() {
  return document.documentElement.dataset.theme === "dark";
}

type GlassFlutesProps = {
  motion: RefObject<MotionState>;
};

export function GlassFlutes({ motion }: GlassFlutesProps) {
  const groupRef = useRef<Group>(null);
  const viewport = useThree((state) => state.viewport);

  const geometry = useMemo(
    () => new CylinderGeometry(0.5, 0.5, 1, 56, 1),
    [],
  );
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: LIGHT_TINT,
        metalness: 0,
        roughness: 0.06,
        transmission: 1,
        thickness: 0.3,
        ior: 1.5,
        specularIntensity: 1,
        envMapIntensity: 1.3,
      }),
    [],
  );

  // Smoky glass on the dark theme, clear glass on the light one.
  useEffect(() => {
    const sync = () => {
      material.color.copy(isDarkTheme() ? DARK_TINT : LIGHT_TINT);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [material]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const width = viewport.width * DEPTH_SCALE;
    const height = viewport.height * DEPTH_SCALE;
    const wide = viewport.width / viewport.height >= 1.15;
    const span = wide ? WIDE_SPAN : PHONE_SPAN;
    const { slotCenter, slotSize } = motion.current;

    const slabWidth = (span.to - span.from) * width;
    const columnWidth = slabWidth / COLUMN_COUNT;
    const left = (span.from - 0.5) * width;

    let slabHeight = height * 1.3;
    let y = 0;
    if (!wide) {
      // Match the band the sculpture is fitted into on phones.
      const size = slotSize > 0 ? slotSize : 0.42;
      const centre = slotSize > 0 ? slotCenter : 0.256;
      slabHeight = size * height;
      y = (0.5 - centre) * height;
    }

    for (let index = 0; index < group.children.length; index += 1) {
      const column = group.children[index];
      column.position.set(left + columnWidth * (index + 0.5), y, GLASS_Z);
      column.scale.set(columnWidth, slabHeight, columnWidth);
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: COLUMN_COUNT }, (_, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={material}
          frustumCulled={false}
        />
      ))}
    </group>
  );
}
