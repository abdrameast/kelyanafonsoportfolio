"use client";

import { motion, useReducedMotion } from "framer-motion";
import { qualites, competencesBilan, liens } from "@/data/formation";

const TOP = 44;
const STEP = 58;
const LX = 210;
const RX = 430;
const yAt = (i: number) => TOP + i * STEP;

export function CompetencySpaghetti() {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 640 380"
      className="h-auto w-full"
      role="img"
      aria-label="Relation entre qualités et compétences"
    >
      <text x="196" y="20" textAnchor="end" fontSize="11" fontWeight="700" fill="rgb(var(--accent))">
        QUALITÉS
      </text>
      <text x="444" y="20" textAnchor="start" fontSize="11" fontWeight="700" fill="rgb(var(--accent))">
        COMPÉTENCES
      </text>

      {liens.map(([q, c], idx) => (
        <motion.path
          key={idx}
          d={`M${LX},${yAt(q)} C320,${yAt(q)} 320,${yAt(c)} ${RX},${yAt(c)}`}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 + idx * 0.05 }}
        />
      ))}

      {qualites.map((q, i) => (
        <g key={`q${i}`}>
          <circle cx={LX} cy={yAt(i)} r="5" fill="rgb(var(--accent))" />
          <text x={LX - 14} y={yAt(i) + 4} textAnchor="end" fontSize="13.5" fontWeight="600" fill="rgb(var(--fg))">
            {q}
          </text>
        </g>
      ))}

      {competencesBilan.map((c, i) => (
        <g key={`c${i}`}>
          <circle cx={RX} cy={yAt(i)} r="5" fill="rgb(var(--accent))" />
          <text x={RX + 14} y={yAt(i) + 4} textAnchor="start" fontSize="13.5" fontWeight="600" fill="rgb(var(--fg))">
            {c}
          </text>
        </g>
      ))}
    </svg>
  );
}
