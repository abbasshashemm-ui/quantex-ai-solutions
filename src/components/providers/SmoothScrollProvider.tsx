"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function shouldUseLenis() {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return !reducedMotion && !isMobile;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    registerGsapPlugins();

    const root = document.documentElement;

    if (!shouldUseLenis()) {
      root.classList.remove("lenis", "lenis-smooth");
      return;
    }

    root.classList.add("lenis", "lenis-smooth");

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: root.style.transform ? "transform" : "fixed",
    });

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const onResize = () => {
      instance.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(root, {});
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      instance.destroy();
      root.classList.remove("lenis", "lenis-smooth");
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
