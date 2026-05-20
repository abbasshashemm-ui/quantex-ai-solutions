"use client";

import { useEffect, useState } from "react";
import { useMounted } from "./useMounted";

/**
 * Delays mounting heavy client UI until after hydration and idle time
 * so first paint and interaction stay responsive.
 */
export function useDeferredMount(timeoutMs = 2200) {
  const mounted = useMounted();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mounted || ready) return;

    const enable = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: timeoutMs });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(enable, 120);
    return () => clearTimeout(id);
  }, [mounted, ready, timeoutMs]);

  return mounted && ready;
}
