"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface BackgroundFieldProps {
  className?: string;
  /** particles per pixel² */
  density?: number;
}

/**
 * Lightweight constellation canvas: drifting nodes linked by faint accent
 * lines. GPU-cheap, pauses when off-screen, draws a single static frame when
 * reduced motion is requested. No WebGL / Three.js dependency.
 */
export function BackgroundField({
  className,
  density = 0.00009,
}: BackgroundFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let accent = "37,99,235";
    let dot = "120,130,150";
    const LINK = 132;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const a = cs.getPropertyValue("--accent").trim();
      if (a) accent = a.replace(/\s+/g, ",");
      dot = document.documentElement.classList.contains("dark")
        ? "150,162,186"
        : "92,102,124";
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(88, Math.max(22, Math.floor(w * h * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(${accent},${(1 - dist / LINK) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = `rgba(${dot},0.5)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    readColors();
    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, density]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
