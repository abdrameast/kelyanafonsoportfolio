"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories, coreSkills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";

function Marquee() {
  const reduced = useReducedMotion();
  const items = [...coreSkills, ...coreSkills];
  return (
    <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-3"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-muted"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="competences" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]"
      />
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Compétences"
          title="Un socle technique, du dessin à la pièce."
          description="Conception, fabrication, contrôle, maintenance et méthodes — les compétences acquises en BUT et affûtées sur le terrain."
        />

        <Marquee />

        <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.id} className="h-full">
              <TiltCard className="h-full rounded-3xl" max={5}>
                <GlassCard className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
                      <cat.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-muted">
                    {cat.description}
                  </p>

                  <ul className="mt-auto space-y-3 border-t border-line pt-4">
                    {cat.skills.map((skill) => (
                      <li key={skill.name} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-snug">
                            {skill.name}
                          </p>
                          <p className="text-xs text-muted">{skill.blurb}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
