import {
  PenTool,
  Cog,
  ClipboardCheck,
  MessagesSquare,
  Wrench,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Cartographie des compétences GMP — axes (radar + histogramme)
 * Niveaux : auto-évaluation (0–100).
 * ------------------------------------------------------------------ */
export interface GmpAxis {
  key: string;
  label: string;
  full: string;
  level: number;
}

export const gmpAxes: GmpAxis[] = [
  { key: "conception", label: "Conception", full: "Conception & CAO", level: 88 },
  { key: "production", label: "Production", full: "Production & usinage", level: 74 },
  { key: "qualite", label: "Qualité", full: "Méthodes & contrôle qualité", level: 76 },
  { key: "maintenance", label: "Maintenance", full: "Maintenance & fiabilité", level: 80 },
  { key: "communication", label: "Communication", full: "Communication & langues", level: 80 },
  { key: "gestion", label: "Gestion", full: "Gestion de projet", level: 72 },
];

/* ------------------------------------------------------------------ *
 * Approche par compétences — les axes du référentiel GMP
 * ------------------------------------------------------------------ */
export interface GmpDomain {
  title: string;
  icon: LucideIcon;
  description: string;
  items: string[];
  demo: string;
}

export const gmpDomains: GmpDomain[] = [
  {
    title: "Ingénierie de conception",
    icon: PenTool,
    description: "Spécifier, modéliser et dimensionner des solutions mécaniques.",
    items: [
      "CAO SolidWorks & CATIA V5",
      "Rétro-conception & mise en plan",
      "Recherche et comparaison de solutions",
    ],
    demo: "Refonte du vérin Varilair (Spirec)",
  },
  {
    title: "Ingénierie de production",
    icon: Cog,
    description: "Réaliser et fabriquer : procédés et usinage.",
    items: [
      "Fraisage & tournage (conventionnel + CN)",
      "Soudure, roulage, emboutissage",
      "Lecture et réalisation de gammes",
    ],
    demo: "Atelier BUT & assemblages Spirec",
  },
  {
    title: "Organisation de la production industrielle",
    icon: ClipboardCheck,
    description: "Méthodes, qualité, maintenance et amélioration continue.",
    items: [
      "5S · AMDEC · SMED",
      "Contrôle qualité tridimensionnel",
      "Maintenance préventive & corrective",
      "Gestion des stocks (PMI)",
    ],
    demo: "Maintenance du Centre Nautique",
  },
  {
    title: "Communication & langues",
    icon: MessagesSquare,
    description: "Échanger, restituer, convaincre.",
    items: [
      "Consultation de fournisseurs & devis",
      "Restitution écrite et orale",
      "Anglais (lu, écrit, parlé) · Espagnol scolaire",
    ],
    demo: "Sourcing & négociation (Spirec)",
  },
];

/* ------------------------------------------------------------------ *
 * Répondre aux besoins de l'entreprise
 * ------------------------------------------------------------------ */
export const besoinsEntreprise: string[] = [
  "Concevoir vite et juste : des plans à jour, exploitables en production.",
  "Fiabiliser l'existant : détecter les défaillances et y remédier.",
  "Maîtriser les coûts : retenir la solution technique la plus rentable.",
  "Dialoguer avec les partenaires : fournisseurs, techniciens, bureaux de contrôle.",
];

/* ------------------------------------------------------------------ *
 * 5 compétences clés en ingénierie
 * ------------------------------------------------------------------ */
export interface KeyComp {
  label: string;
  icon: LucideIcon;
  detail: string;
}

export const cinqCompetences: KeyComp[] = [
  { label: "Concevoir", icon: PenTool, detail: "Modéliser & mettre en plan (CAO)" },
  { label: "Fabriquer", icon: Cog, detail: "Usiner en conventionnel et CN" },
  { label: "Contrôler", icon: ClipboardCheck, detail: "Vérifier la conformité, métrologie" },
  { label: "Maintenir", icon: Wrench, detail: "Diagnostiquer et fiabiliser" },
  { label: "Coopérer", icon: Users, detail: "Communiquer et gérer un projet" },
];

/* ------------------------------------------------------------------ *
 * Bilan de compétences — relation qualités ↔ compétences
 * ------------------------------------------------------------------ */
export const qualites: string[] = [
  "Curiosité",
  "Rigueur",
  "Adaptation",
  "Esprit d'équipe",
  "Organisation",
  "Communication",
];

export const competencesBilan: string[] = [
  "Conception",
  "Production",
  "Qualité",
  "Maintenance",
  "Communication",
  "Gestion de projet",
];

/** Arêtes du diagramme : [index qualité, index compétence]. */
export const liens: [number, number][] = [
  [0, 0],
  [0, 3],
  [1, 0],
  [1, 2],
  [2, 3],
  [2, 1],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 2],
  [5, 4],
  [5, 5],
];

/* ------------------------------------------------------------------ *
 * Carte mentale des qualités
 * ------------------------------------------------------------------ */
export interface MindBranch {
  label: string;
  hint: string;
}

export const mindMap: { center: string; branches: MindBranch[] } = {
  center: "Mes qualités",
  branches: [
    { label: "Curiosité", hint: "apprendre vite" },
    { label: "Rigueur", hint: "le détail compte" },
    { label: "Adaptation", hint: "tous terrains" },
    { label: "Esprit d'équipe", hint: "avancer ensemble" },
    { label: "Organisation", hint: "planifier, suivre" },
    { label: "Sens du concret", hint: "du plan à la pièce" },
  ],
};
