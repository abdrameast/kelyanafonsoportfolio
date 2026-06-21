"use client";

import { motion, useReducedMotion } from "framer-motion";
import { mindMap } from "@/data/formation";

const LEFT_Y = [80, 220, 360];
const RIGHT_Y = [80, 220, 360];

export function MindMap() {
  const reduced = useReducedMotion();

  const nodes = mindMap.branches.map((b, i) => {
    const left = i < 3;
    const y = left ? LEFT_Y[i] : RIGHT_Y[i - 3];
    const cx = left ? 135 : 625;
    const start = left ? { x: 295, y: 220 } : { x: 465, y: 220 };
    const c1 = left ? { x: 255, y: 220 } : { x: 505, y: 220 };
    const c2 = left ? { x: 270, y } : { x: 490, y };
    const end = left ? { x: 235, y } : { x: 525, y };
    const path = `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`;
    return { b, y, cx, path, i };
  });

  return (
    <svg
      viewBox="0 0 760 440"
      className="h-auto w-full"
      role="img"
      aria-label="Carte mentale des qualités"
    >
      {nodes.map((n) => (
        <motion.path
          key={`p${n.i}`}
          d={n.path}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeOpacity="0.45"
          strokeWidth="2"
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 + n.i * 0.08 }}
        />
      ))}

      <motion.g
        initial={reduced ? undefined : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect x="295" y="192" width="170" height="56" rx="28" fill="rgb(var(--accent))" />
        <text x="380" y="225" textAnchor="middle" fontSize="19" fontWeight="700" fill="#fff">
          {mindMap.center}
        </text>
      </motion.g>

      {nodes.map((n) => (
        <motion.g
          key={`n${n.i}`}
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 + n.i * 0.08 }}
        >
          <rect
            x={n.cx - 105}
            y={n.y - 31}
            width="210"
            height="62"
            rx="16"
            fill="rgb(var(--surface))"
            stroke="rgb(var(--line))"
          />
          <text x={n.cx} y={n.y - 3} textAnchor="middle" fontSize="17" fontWeight="600" fill="rgb(var(--fg))">
            {n.b.label}
          </text>
          <text x={n.cx} y={n.y + 19} textAnchor="middle" fontSize="12.5" fill="rgb(var(--muted))">
            {n.b.hint}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
