"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Custom two-part cursor (instant dot + lagging ring) for fine pointers.
 * Hidden on touch devices and when reduced motion is requested.
 */
export function AnimatedCursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest(
          "a, button, [data-cursor], input, textarea, label, select, summary",
        ),
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.style.cursor = "";
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference"
        style={{ x, y, marginLeft: -3, marginTop: -3 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 rounded-full border border-accent/70"
        style={{ x: ringX, y: ringY, marginLeft: -18, marginTop: -18 }}
        animate={{
          scale: pressed ? 0.8 : hovering ? 1.55 : 1,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
