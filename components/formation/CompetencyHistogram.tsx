"use client";

import { motion } from "framer-motion";
import { gmpAxes } from "@/data/formation";

export function CompetencyHistogram() {
  return (
    <div className="flex items-stretch gap-2 sm:gap-4">
      {gmpAxes.map((a, i) => (
        <div key={a.key} className="flex flex-1 flex-col items-center">
          <div className="relative flex h-52 w-full items-end justify-center">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${a.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-8 rounded-t-lg bg-gradient-to-t from-accent/60 to-accent sm:w-12"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-muted">
                {a.level}
              </span>
            </motion.div>
          </div>
          <span className="mt-3 text-center text-[10px] leading-tight text-muted sm:text-[11px]">
            {a.label}
          </span>
        </div>
      ))}
    </div>
  );
}
