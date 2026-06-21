"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Brief splash shown once per session (skipped for reduced motion). */
export function Preloader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("preloaded")) return;
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("preloaded", "1");
      document.body.style.overflow = "";
    }, 1400);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid h-16 w-16 place-items-center rounded-2xl bg-fg text-bg"
            >
              <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
                <path
                  d="M23 16 V48 M23 33 L41 16 M25 32 L43 48"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </motion.div>
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-line">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full bg-accent"
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
              Kelyan AFONSO
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
