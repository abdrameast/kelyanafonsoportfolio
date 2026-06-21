"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HelpCircle,
  Target,
  Route,
  FlaskConical,
  Images,
  CheckCircle2,
  Sparkles,
  Quote,
  FileText,
  Download,
  Printer,
  ArrowRight,
} from "lucide-react";
import { stages } from "@/data/stages";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { PdfReader } from "@/components/pdf-viewer/PdfReader";
import { cn } from "@/lib/utils";
import type { Stage } from "@/types";

function Block({
  icon: Icon,
  label,
  title,
  children,
}: {
  icon: typeof Building2;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12">
      <Reveal>
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
              {label}
            </p>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          </div>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export function CaseStudyContent({ stage }: { stage: Stage }) {
  const other = stages.find((s) => s.slug !== stage.slug);

  return (
    <div className="container divide-y divide-line">
      {/* Entreprise + Contexte */}
      <Block icon={Building2} label="L'entreprise & le contexte" title={stage.company.split(" —")[0]}>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <GlassCard className="h-full p-6">
              <p className="text-sm leading-relaxed text-muted">
                {stage.companyDescription}
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {stage.context.map((p) => (
                <p key={p} className="text-pretty leading-relaxed text-fg/90">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Block>

      {/* Problématique + Objectifs */}
      <Block icon={HelpCircle} label="Le défi" title="Problématique & objectifs">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-accent/30 bg-accent/[0.06] p-7">
              <Quote className="absolute right-5 top-5 h-10 w-10 text-accent/20" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                Problématique
              </p>
              <p className="mt-4 text-pretty text-xl font-medium leading-snug">
                {stage.problematique}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full p-7">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                <Target className="h-3.5 w-3.5" /> Objectifs
              </p>
              <ul className="space-y-4">
                {stage.objectives.map((o, i) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm text-fg/90">{o}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </Block>

      {/* Chronologie */}
      <Block icon={Route} label="Démarche" title="Chronologie">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stage.timeline.map((step, i) => (
            <StaggerItem key={step.label}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-5">
                <span className="font-display text-3xl font-bold text-accent/30">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{step.label}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      {/* Méthodologie + Schémas */}
      <Block icon={FlaskConical} label="Méthodologie" title="Méthode, essais & schémas">
        <div className="space-y-16">
          {stage.methodology.map((m, i) => {
            const img = stage.gallery[(i + 1) % stage.gallery.length];
            const flip = i % 2 === 1;
            return (
              <div
                key={m.id}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                <Reveal className={cn(flip && "md:order-2")}>
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono text-sm text-accent">
                        0{i + 1}
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {m.title}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {m.body.map((p) => (
                        <p
                          key={p}
                          className="text-pretty text-sm leading-relaxed text-muted"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal className={cn(flip && "md:order-1")} delay={0.1}>
                  <Parallax amount={28}>
                    <a
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-soft"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="border-t border-line bg-surface px-4 py-2 text-xs text-muted">
                        {img.caption}
                      </p>
                    </a>
                  </Parallax>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Block>

      {/* Galerie */}
      <Block icon={Images} label="Galerie" title="Extraits du rapport">
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {stage.gallery.map((img) => (
            <StaggerItem key={img.src}>
              <a
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-xl border border-line bg-white"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="p-2 text-[11px] text-white">{img.caption}</p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      {/* Résultats */}
      <Block icon={CheckCircle2} label="Résultats" title="Ce que ça a donné">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {stage.results.map((r) => (
            <StaggerItem key={r}>
              <GlassCard className="flex items-start gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm text-fg/90">{r}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      {/* Compétences */}
      <Block icon={Sparkles} label="Montée en compétence" title="Compétences développées">
        <Stagger className="flex flex-wrap gap-3">
          {stage.skills.map((s) => (
            <StaggerItem key={s}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-fg/90">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                {s}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      {/* Retour d'expérience */}
      <Block icon={Quote} label="Retour d'expérience" title="Ce que j'en retiens">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {stage.retour.map((r) => (
            <StaggerItem key={r} className="h-full">
              <GlassCard className="h-full p-6">
                <Quote className="h-6 w-6 text-accent/30" />
                <p className="mt-3 text-pretty text-sm leading-relaxed text-fg/90">
                  {r}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      {/* PDF intégral */}
      <section id="rapport" className="scroll-mt-24 py-12">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  Document intégral · {stage.pages} pages
                </p>
                <h2 className="text-2xl font-bold tracking-tight">
                  Le rapport complet
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href={stage.pdf} external variant="outline" size="sm" icon={Download}>
                Télécharger
              </Button>
              <Button
                href={`/posters/poster-${stage.slug}.pdf`}
                external
                variant="ghost"
                size="sm"
                icon={Images}
              >
                Poster du stage
              </Button>
              <Button
                href={stage.pdf}
                external
                variant="ghost"
                size="sm"
                icon={Printer}
              >
                Ouvrir / Imprimer
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <PdfReader
            url={stage.pdf}
            title={`Rapport de stage ${stage.code} — ${stage.title}`}
            downloadName={`${stage.slug}.pdf`}
          />
        </Reveal>
        <p className="mt-3 text-center text-xs text-subtle">
          Miniatures · recherche · zoom · plein écran · téléchargement ·
          impression · reprise de lecture.
        </p>
      </section>

      {/* Nav to other case study */}
      {other && (
        <section className="py-12">
          <Link
            href={`/stages/${other.slug}`}
            className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:flex-row sm:items-center"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                Rapport suivant — {other.code}
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight">
                {other.title}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              Découvrir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
