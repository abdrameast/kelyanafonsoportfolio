"use client";

import { motion, useReducedMotion } from "framer-motion";
import { gmpAxes } from "@/data/formation";

const CX = 250;
const CY = 195;
const R = 128;

function pt(level: number, i: number, n: number): [number, number] {
  const ang = ((-90 + i * (360 / n)) * Math.PI) / 180;
  const rad = (R * level) / 100;
  return [CX + rad * Math.cos(ang), CY + rad * Math.sin(ang)];
}

export function GmpRadar() {
  const reduced = useReducedMotion();
  const n = gmpAxes.length;
  const rings = [0.25, 0.5, 0.75, 1];
  const dataPts = gmpAxes.map((a, i) => pt(a.level, i, n));
  const dataStr = dataPts.map((p) => p.join(",")).join(" ");

  return (
    <svg
      viewBox="0 0 500 400"
      className="mx-auto h-auto w-full max-w-[460px]"
      role="img"
      aria-label="Cartographie des compétences GMP"
    >
      {rings.map((f, ri) => (
        <polygon
          key={ri}
          points={gmpAxes.map((_, i) => pt(f * 100, i, n).join(",")).join(" ")}
          fill="none"
          stroke="rgb(var(--line))"
          strokeWidth="1"
        />
      ))}

      {gmpAxes.map((_, i) => {
        const [x, y] = pt(100, i, n);
        return (
          <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgb(var(--line))" strokeWidth="1" />
        );
      })}

      <motion.polygon
        points={dataStr}
        fill="rgb(var(--accent))"
        fillOpacity="0.18"
        stroke="rgb(var(--accent))"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {dataPts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="rgb(var(--accent))" />
      ))}

      {gmpAxes.map((a, i) => {
        const ang = ((-90 + i * (360 / n)) * Math.PI) / 180;
        const lx = CX + (R + 24) * Math.cos(ang);
        const ly = CY + (R + 24) * Math.sin(ang);
        const cos = Math.cos(ang);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        return (
          <text
            key={i}
            x={lx}
            y={ly + 4}
            textAnchor={anchor}
            fontSize="13"
            fontWeight="600"
            fill="rgb(var(--fg))"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}
