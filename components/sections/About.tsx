"use client";

import {
  Target,
  Wrench,
  Compass,
  Users,
  Languages,
  Car,
  Trophy,
  Check,
  Cake,
  Rocket,
} from "lucide-react";
import { softSkills } from "@/data/skills";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MindMap } from "@/components/formation/MindMap";

const values = [
  {
    icon: Target,
    title: "Rigueur",
    text: "Un détail non détecté peut fermer un bassin ou bloquer un vérin. Je travaille au détail près.",
  },
  {
    icon: Wrench,
    title: "Le concret",
    text: "Ce qui me motive : voir un dessin SolidWorks devenir une pièce qui fonctionne réellement.",
  },
  {
    icon: Compass,
    title: "Curiosité",
    text: "Du traitement de l'eau à la soudure laser, j'apprends vite un domaine que je découvre.",
  },
  {
    icon: Users,
    title: "Esprit d'équipe",
    text: "J'avance avec les techniciens, les stagiaires et les partenaires extérieurs.",
  },
];

const objectives = [
  "Intégrer un bureau d'études en conception mécanique",
  "Monter en expertise sur la CAO (SolidWorks, CATIA V5)",
  "Poursuivre vers la modélisation et le calcul",
];

const facts = [
  { icon: Cake, label: "Âge", value: `${site.age} ans` },
  {
    icon: Languages,
    label: "Langues",
    value: "Anglais (lu, écrit, parlé) · Espagnol (scolaire)",
  },
  { icon: Car, label: "Mobilité", value: "Véhiculé — permis B" },
  {
    icon: Trophy,
    label: "Centres d'intérêt",
    value: "Football américain, basketball, musique, art",
  },
];

export function About() {
  return (
    <section id="presentation" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="Profil"
          title="Concevoir, fiabiliser, livrer."
          description="Étudiant en BUT Génie Mécanique & Productique, je me spécialise dans la conception et le bureau d'études — sans jamais perdre de vue le terrain où la pièce prend vie."
        />

        {/* Mon projet */}
        <Reveal className="mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/[0.06] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white">
                <Rocket className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  Mon projet
                </p>
                <p className="mt-1 text-pretty text-lg font-medium leading-snug">
                  Travailler dans le domaine de la{" "}
                  <span className="text-accent">conception mécanique</span> et du
                  bureau d&apos;études — là où le dessin devient une pièce réelle.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Narrative + values */}
          <div className="space-y-8">
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-fg/90">
                Pendant mon BUT, j&apos;ai développé un véritable attrait pour la
                conception et la modélisation sur ordinateur. Deux stages m&apos;ont
                permis de confronter cette appétence au réel : la refonte d&apos;un
                actionneur mécanique en bureau d&apos;études, puis la maintenance des
                installations d&apos;un centre aquatique. Deux mondes, une même
                exigence — comprendre un système, détecter ce qui cloche, proposer une
                solution et la valider.
              </p>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <GlassCard className="group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {v.text}
                    </p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <GlassCard className="p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Objectifs
                </p>
                <ul className="mt-4 space-y-3">
                  {objectives.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-fg/90">{o}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.18}>
              <GlassCard className="p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Compétences humaines
                </p>
                <div className="mt-4 grid gap-4">
                  {softSkills.map((s) => (
                    <div key={s.label} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-fg/5 text-accent">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{s.label}</p>
                        <p className="text-xs text-muted">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.26}>
              <GlassCard className="divide-y divide-line p-2">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 p-4">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-subtle">
                        {f.label}
                      </p>
                      <p className="text-sm text-fg/90">{f.value}</p>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </Reveal>
          </div>
        </div>

        {/* Carte mentale des qualités */}
        <div className="mt-8">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                Carte mentale
              </p>
              <h3 className="mt-1 text-xl font-bold tracking-tight">
                Mes qualités en un coup d&apos;œil
              </h3>
              <div className="mt-4">
                <MindMap />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
