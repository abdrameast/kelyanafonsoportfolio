"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import { site } from "@/data/site";
import { useSmoothScroll } from "@/providers/smooth-scroll-provider";
import { SplitText } from "@/components/animations/SplitText";
import { BackgroundField } from "@/components/animations/BackgroundField";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";

const stats = [
  { value: "BUT GMP", label: "Génie Méca. & Productique" },
  { value: "2 stages", label: "Conception & maintenance" },
  { value: "2 rapports", label: "Consultables intégralement" },
];

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="hero"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <BackgroundField className="absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-y opacity-[0.4]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs text-muted backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Disponible — {site.location}
            </motion.div>

            <h1 className="text-[clamp(2.6rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-tighter2">
              <SplitText text="Kelyan" className="block text-fg" />
              <SplitText text="AFONSO" className="block text-fg/85" delay={0.18} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 text-lg font-medium text-fg/90 sm:text-xl"
            >
              {site.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="mt-4 max-w-xl text-pretty leading-relaxed text-muted"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.74 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic className="inline-block">
                <Button
                  href="#presentation"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#presentation");
                  }}
                  size="lg"
                  iconRight={ArrowRight}
                >
                  Découvrir
                </Button>
              </Magnetic>
              <Button href={site.cv} external variant="outline" size="lg" icon={Download}>
                Télécharger le CV
              </Button>
              <Button
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                variant="ghost"
                size="lg"
                icon={Mail}
              >
                Contacter
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
            >
              {stats.map((s) => (
                <div key={s.value}>
                  <dt className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-accent/30 via-transparent to-accent/10 blur-2xl"
            />
            <TiltCard className="rounded-[2rem]" max={6}>
              <div className="overflow-hidden rounded-[2rem] border border-line bg-surface/70 p-2 shadow-soft-lg backdrop-blur-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={site.authorPhoto}
                    alt="Portrait de Kelyan AFONSO"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
            </TiltCard>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-elevated/90 px-4 py-3 shadow-soft backdrop-blur-sm"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Focus
              </p>
              <p className="text-sm font-semibold">Conception &amp; CAO</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("#presentation")}
        aria-label="Faire défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
