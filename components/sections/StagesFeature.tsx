"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Clock,
  Calendar,
  Search,
  Maximize2,
  Download,
} from "lucide-react";
import { stages } from "@/data/stages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

const perks = [
  { icon: Maximize2, label: "Lecture plein écran" },
  { icon: Search, label: "Recherche dans le texte" },
  { icon: Download, label: "Téléchargement & impression" },
];

export function StagesFeature() {
  return (
    <section
      id="rapports"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Le cœur du portfolio"
          title="Les rapports de stage."
          description="Deux expériences industrielles documentées de bout en bout. Les rapports ne sont pas résumés : ils sont consultables intégralement, dans un lecteur dédié."
        />

        <Reveal className="mt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {perks.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 text-sm text-muted"
              >
                <p.icon className="h-4 w-4 text-accent" />
                {p.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/stages/${stage.slug}`}
                className="group block h-full overflow-hidden rounded-3xl border border-line bg-surface/70 shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-soft-lg"
              >
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={stage.gallery[0].src}
                    alt={stage.gallery[0].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                      {stage.code}
                    </span>
                    <span className="rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] text-white/90 backdrop-blur-sm">
                      0{i + 1} / 0{stages.length}
                    </span>
                  </div>

                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                    <FileText className="h-3.5 w-3.5" />
                    {stage.pages} p.
                  </span>

                  <div className="absolute inset-x-5 bottom-5">
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {stage.company.split(" —")[0]} · {stage.location}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-pretty text-muted">{stage.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-subtle">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {stage.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      {stage.durationWeeks} semaines
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {stage.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {s.split(" —")[0].split(" (")[0]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-sm font-medium text-fg">
                      Découvrir le case study
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
