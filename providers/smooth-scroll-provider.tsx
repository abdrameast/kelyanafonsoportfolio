"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useReducedMotion } from "framer-motion";

type ScrollTarget = string | number | HTMLElement;

interface SmoothScrollContextValue {
  scrollTo: (target: ScrollTarget, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (target: ScrollTarget, offset = -80) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        return;
      }
      // Reduced-motion / fallback path
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
      } else {
        const el =
          typeof target === "string" ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: "auto", block: "start" });
      }
    },
    [],
  );

  // Reset scroll on route change, then honour any hash deep-link.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // wait for the new page to paint
      const id = window.setTimeout(() => scrollTo(hash), 120);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, scrollTo]);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx)
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  return ctx;
}
