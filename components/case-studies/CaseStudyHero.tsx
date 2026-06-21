"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Download,
  MapPin,
  Calendar,
  Clock,
  Building2,
} from "lucide-react";
import { useSmoothScroll } from "@/providers/smooth-scroll-provider";
import { SplitText } from "@/components/animations/SplitText";
import { BackgroundField } from "@/components/animations/BackgroundField";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Stage } from "@/types";

export function CaseStudyHero({ stage }: { stage: Stage }) {
  const { scrollTo } = useSmoothScroll();

  const meta = [
    { icon: Building2, label: "Entreprise", value: stage.company.split(" —")[0] },
    { icon: MapPin, label: "Lieu", value: stage.location },
    { icon: Calendar, label: "Période", value: stage.period },
    { icon: Clock, label: "Durée", value: `${stage.durationWeeks} semaines` },
  ];

  return (
    <section className="noise relative overflow-hidden pb-16 pt-28 sm:pt-32">
      <BackgroundField className="absolute inset-0 -z-10 h-full w-full opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="container">
        <Link
          href="/#rapports"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Tous les rapports
        </Link>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                {stage.code}
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {stage.role}
              </span>
            </div>

            <h1 className="mt-5 text-balance text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.02] tracking-tighter2">
              <SplitText text={stage.title} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 max-w-xl text-pretty text-lg text-muted"
            >
              {stage.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Magnetic className="inline-block">
                <Button
                  href="#rapport"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#rapport");
                  }}
                  size="lg"
                  icon={BookOpen}
                >
                  Lire le rapport ({stage.pages} p.)
                </Button>
              </Magnetic>
              <Button
                href={stage.pdf}
                external
                variant="outline"
                size="lg"
                icon={Download}
              >
                Télécharger
              </Button>
            </motion.div>

            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-subtle">
                    <m.icon className="h-3 w-3 text-accent" />
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-accent/25 to-transparent blur-2xl"
            />
            <TiltCard className="rounded-[1.5rem]" max={6}>
              <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white p-2 shadow-soft-lg">
                <div className="relative aspect-[1/1.2] overflow-hidden rounded-[1rem]">
                  <Image
                    src={stage.gallery[0].src}
                    alt={stage.gallery[0].alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
