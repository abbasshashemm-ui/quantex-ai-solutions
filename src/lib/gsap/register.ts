"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
  registered = true;
}

// Register before any useGSAP/ScrollTrigger runs (avoids race with SmoothScrollProvider)
registerGsapPlugins();

export { gsap, ScrollTrigger };
