"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
    const useLenisScroll = shouldUseLenis();
    const root = document.documentElement;

    if (!useLenisScroll) {
      root.classList.remove("lenis", "lenis-smooth");
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    void (async () => {
      await import("lenis/dist/lenis.css");
      if (disposed) return;

      const { gsap, registerGsapPlugins, ScrollTrigger } = await import(
        "@/lib/gsap/register"
      );
      registerGsapPlugins();

      root.classList.add("lenis", "lenis-smooth");

      const instance = new Lenis({
        lerp: 0.06,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.05,
      });

      if (disposed) {
        instance.destroy();
        return;
      }

      setLenis(instance);

      const onScroll = () => ScrollTrigger.update();
      instance.on("scroll", onScroll);

      ScrollTrigger.scrollerProxy(root, {
        scrollTop(value?: number) {
          if (value !== undefined) {
            instance.scrollTo(value, { immediate: true, force: true });
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
        pinType: "fixed",
      });

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          instance.resize();
          ScrollTrigger.refresh();
        }, 200);
      };
      window.addEventListener("resize", onResize);

      const ticker = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      teardown = () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(ticker);
        ScrollTrigger.scrollerProxy(root, {});
        instance.destroy();
        root.classList.remove("lenis", "lenis-smooth");
        setLenis(null);
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
      root.classList.remove("lenis", "lenis-smooth");
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
