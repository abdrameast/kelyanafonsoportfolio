"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  X,
  TriangleAlert,
  CircleCheck,
  Cpu,
  Wrench,
} from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";

function Cover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
      />
    );
  }
  const Icon = project.icon ?? Cpu;
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-accent/20 via-surface to-bg">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
      />
      <Icon className="h-16 w-16 text-accent transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section id="projets" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Projets"
          title="Réalisations & travaux."
          description="Des projets concrets, du bureau d'études à la programmation robotisée. Cliquez pour le détail."
        />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <TiltCard className="h-full rounded-3xl" max={5}>
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="group block h-full w-full overflow-hidden rounded-3xl border border-line bg-surface/70 text-left shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-soft-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Cover project={project} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] text-white/90 backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">{project.subtitle}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </div>
                  </div>
                </button>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/55 p-4 py-[6vh] backdrop-blur-sm"
            data-lenis-prevent
            onMouseDown={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-elevated shadow-soft-lg"
              data-lenis-prevent
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Cover project={selected} />
                <div className="absolute inset-0 bg-gradient-to-t from-elevated via-transparent to-transparent" />
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {selected.category} · {selected.year}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {selected.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted">
                  {selected.description}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subtle">
                      <TriangleAlert className="h-3.5 w-3.5 text-accent" /> Difficultés
                    </p>
                    <ul className="space-y-2">
                      {selected.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subtle">
                      <CircleCheck className="h-3.5 w-3.5 text-accent" /> Résultats
                    </p>
                    <ul className="space-y-2">
                      {selected.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subtle">
                    <Wrench className="h-3.5 w-3.5 text-accent" /> Technologies &amp; compétences
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...selected.tech, ...selected.skills].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {selected.href && (
                  <div className="mt-8">
                    <Button href={selected.href} iconRight={ArrowUpRight}>
                      Voir le case study complet
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
