"use client";

import {
  Check,
  Network,
  Radar,
  BarChart3,
  Share2,
  type LucideIcon,
} from "lucide-react";
import {
  besoinsEntreprise,
  gmpDomains,
  cinqCompetences,
  gmpAxes,
} from "@/data/formation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GmpRadar } from "@/components/formation/GmpRadar";
import { CompetencyHistogram } from "@/components/formation/CompetencyHistogram";
import { CompetencySpaghetti } from "@/components/formation/CompetencySpaghetti";

function SubHead({
  icon: Icon,
  label,
  title,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            {label}
          </p>
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        </div>
      </div>
    </Reveal>
  );
}

export function Formation() {
  return (
    <section id="formation" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-accent/5 blur-[120px]"
      />
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Enjeux de ma formation"
          title="Répondre aux besoins de l'entreprise."
          description="Le BUT GMP forme des profils polyvalents. Voici comment mes compétences se structurent et répondent aux besoins concrets de l'industrie."
        />

        {/* Besoins entreprise */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {besoinsEntreprise.map((b) => (
            <StaggerItem key={b}>
              <GlassCard className="flex items-start gap-3 p-5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm text-fg/90">{b}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* 5 compétences clés */}
        <Reveal className="mt-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-subtle">
            Mes 5 compétences en ingénierie
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {cinqCompetences.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-line bg-surface/60 p-4 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold">{c.label}</p>
                <p className="mt-0.5 text-xs text-muted">{c.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Approche par compétences */}
        <div className="mt-16">
          <SubHead icon={Network} label="Approche par compétences" title="Les quatre axes du référentiel GMP" />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {gmpDomains.map((d) => (
              <StaggerItem key={d.title} className="h-full">
                <GlassCard className="flex h-full flex-col p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <h4 className="text-base font-semibold tracking-tight">
                      {d.title}
                    </h4>
                  </div>
                  <p className="mb-4 text-sm text-muted">{d.description}</p>
                  <ul className="space-y-2">
                    {d.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="text-fg/90">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                    Mis en œuvre : {d.demo}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Cartographie GMP */}
        <div className="mt-16">
          <SubHead icon={Radar} label="Graphes de compétences" title="Cartographie des compétences GMP" />
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <GmpRadar />
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-line pt-4">
                  {gmpAxes.map((a) => (
                    <div key={a.key} className="flex items-center justify-between gap-2 text-xs">
                      <span className="truncate text-muted">{a.full}</span>
                      <span className="font-mono text-fg">{a.level}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard className="flex flex-col p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <BarChart3 className="h-4 w-4 text-accent" />
                  Histogramme des compétences
                </div>
                <p className="mb-6 text-xs text-muted">
                  Niveau de maîtrise par domaine (auto-évaluation).
                </p>
                <div className="mt-auto">
                  <CompetencyHistogram />
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>

        {/* Bilan de compétences */}
        <div className="mt-16">
          <SubHead icon={Share2} label="SAE S4–S5 · Bilan de compétences" title="Quand mes qualités nourrissent mes compétences" />
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">
                Ce diagramme relie mes qualités personnelles aux compétences
                techniques qu&apos;elles renforcent : la curiosité nourrit la
                conception et la découverte, la rigueur sert le contrôle qualité,
                l&apos;adaptation soutient la maintenance sur le terrain.
              </p>
              <CompetencySpaghetti />
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
