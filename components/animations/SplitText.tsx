"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
}

/**
 * Reveals text letter by letter on scroll-into-view.
 * Letters animate opacity + a small rise (no overflow clipping), so the text
 * is always laid out and never hidden, even mid-animation.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  as: Tag = "span",
}: SplitTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  let index = 0;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => {
            const i = index++;
            return (
              <motion.span
                key={ci}
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: "0.32em" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
