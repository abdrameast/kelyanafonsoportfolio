"use client";

import { Mail, Download, MapPin, ArrowUpRight } from "lucide-react";
import { site, socials } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="container">
        <SectionHeading
          index="08"
          eyebrow="Contact"
          title="Discutons de votre besoin."
          description="Stage, alternance, poste en bureau d'études ou simple question — je réponds avec plaisir."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* CTA */}
          <Reveal>
            <GlassCard className="flex h-full flex-col justify-between gap-8 p-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  Parlons-en
                </p>
                <h3 className="mt-3 text-pretty text-2xl font-bold tracking-tight sm:text-3xl">
                  Une opportunité ou une question&nbsp;? Écrivez-moi.
                </h3>
                <p className="mt-3 text-muted">
                  Le plus simple est de m&apos;envoyer un email — je reviens vers
                  vous rapidement.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic className="inline-block">
                  <Button href={`mailto:${site.email}`} external size="lg" icon={Mail}>
                    Envoyer un email
                  </Button>
                </Magnetic>
                <Button
                  href={site.cv}
                  external
                  variant="outline"
                  size="lg"
                  icon={Download}
                >
                  Télécharger le CV
                </Button>
              </div>
            </GlassCard>
          </Reveal>

          {/* Info */}
          <div className="space-y-4">
            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.label === "LinkedIn" ? "_blank" : undefined}
                    rel={
                      s.label === "LinkedIn" ? "noopener noreferrer" : undefined
                    }
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-surface/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-subtle">{s.label}</span>
                      <span className="block truncate text-sm font-medium">
                        {s.handle}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="noise relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-6">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_75%)]"
                />
                <div className="relative flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{site.location}</p>
                    <p className="mt-1 text-sm text-muted">
                      Véhiculé (permis B) — mobile sur toute l&apos;Île-de-France
                      et au-delà selon les opportunités.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
