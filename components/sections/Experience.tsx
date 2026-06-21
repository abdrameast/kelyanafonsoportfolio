"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Utensils,
  ChevronDown,
  MapPin,
  ArrowUpRight,
  Check,
  Target,
} from "lucide-react";
import { experiences } from "@/data/experiences";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Experience as ExperienceType } from "@/types";

const meta = {
  stage: { icon: Briefcase, label: "Stage" },
  job: { icon: Utensils, label: "Expérience" },
  formation: { icon: GraduationCap, label: "Formation" },
} as const;

function Item({ exp, i }: { exp: ExperienceType; i: number }) {
  const [open, setOpen] = useState(i === 0);
  const { icon: Icon, label } = meta[exp.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Rail node */}
      <span className="absolute left-[14px] top-2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border border-line bg-bg sm:left-5">
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>

      <GlassCard className="overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
        >
          <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent sm:grid">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                {label}
              </span>
              <span className="text-xs text-subtle">{exp.period}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">
              {exp.role}
            </h3>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
              <span className="text-fg/80">{exp.org}</span>
              <span className="inline-flex items-center gap-1 text-subtle">
                <MapPin className="h-3 w-3" />
                {exp.location}
              </span>
            </p>
          </div>
          <ChevronDown
            className={cn(
              "mt-1 h-5 w-5 shrink-0 text-subtle transition-transform duration-300",
              open && "rotate-180 text-accent",
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
                <p className="text-sm leading-relaxed text-fg/90">
                  {exp.summary}
                </p>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">
                      Missions
                    </p>
                    <ul className="space-y-2">
                      {exp.missions.map((m) => (
                        <li key={m} className="flex items-start gap-2 text-sm">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span className="text-muted">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {exp.results && exp.results.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subtle">
                        <Target className="h-3 w-3 text-accent" /> Résultats
                      </p>
                      <ul className="space-y-2">
                        {exp.results.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span className="text-muted">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {exp.href && (
                    <Button href={exp.href} size="sm" iconRight={ArrowUpRight}>
                      Voir le rapport
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experiences" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Parcours"
          title="Expériences & formation."
          description="Deux stages, un job d'été et une formation d'ingénierie mécanique. Cliquez sur une étape pour la déplier."
        />

        <div ref={ref} className="relative mt-14 space-y-5">
          {/* Rail */}
          <div className="absolute bottom-0 left-[14px] top-0 w-px -translate-x-1/2 bg-line sm:left-5">
            <motion.div
              style={{ scaleY: reduced ? 1 : scaleY }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          {experiences.map((exp, i) => (
            <Item key={exp.id} exp={exp} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
