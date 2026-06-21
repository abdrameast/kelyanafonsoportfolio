"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  Formation: "text-sky-500",
  Stage: "text-accent",
  Expérience: "text-amber-500",
  Projet: "text-violet-500",
  "Aujourd'hui": "text-accent",
};

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="Chronologie"
          title="Le parcours, étape par étape."
          description="Du baccalauréat à aujourd'hui — formation, stages et expériences, au fil du scroll."
        />

        <div ref={ref} className="relative mt-14 space-y-5">
          {/* Rail */}
          <div className="absolute bottom-2 left-[14px] top-2 w-px -translate-x-1/2 bg-line sm:left-5">
            <motion.div
              style={{ scaleY: reduced ? 1 : scaleY }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          {timeline.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 sm:pl-16"
            >
              {/* Node */}
              <span className="absolute left-[14px] top-2 grid h-[18px] w-[18px] -translate-x-1/2 place-items-center rounded-full border border-line bg-bg sm:left-5">
                {item.tag === "Aujourd'hui" && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
                )}
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>

              <div className="rounded-2xl border border-line bg-surface/70 p-5 shadow-soft backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-widest",
                      tagStyles[item.tag] ?? "text-accent",
                    )}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs text-subtle">· {item.period}</span>
                </div>
                <h3 className="mt-2 text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-fg/70">{item.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
