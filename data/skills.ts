import {
  Box,
  Cog,
  Gauge,
  Wrench,
  Cpu,
  Users,
  Lightbulb,
  Layers,
  Handshake,
} from "lucide-react";
import type { SkillCategory, SoftSkill } from "@/types";

/**
 * Compétences techniques regroupées par domaine.
 * Les niveaux (0–100) alimentent les jauges circulaires de la section
 * Compétences — ils reflètent une auto-évaluation, pas une note officielle.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "conception",
    title: "Conception & CAO",
    icon: Box,
    description:
      "Modélisation 3D, assemblages et mise en plan. Le cœur de mon métier : transformer un besoin en pièce dessinée et cotée.",
    skills: [
      {
        name: "SolidWorks",
        level: 90,
        blurb: "Modélisation, assemblages, mises en plan, vues éclatées, cotation.",
      },
      {
        name: "Conception mécanique",
        level: 84,
        blurb: "Liaisons, cinématique, recherche de solutions, design for manufacturing.",
      },
      {
        name: "CATIA V5",
        level: 62,
        blurb: "Bases de modélisation surfacique et volumique.",
      },
    ],
  },
  {
    id: "fabrication",
    title: "Fabrication & Productique",
    icon: Cog,
    description:
      "De la matière brute à la pièce finie : usinage par enlèvement de matière, conventionnel et commande numérique.",
    skills: [
      {
        name: "Usinage",
        level: 80,
        blurb: "Fraisage et tournage, tour conventionnel et commande numérique.",
      },
      {
        name: "Fabrication",
        level: 76,
        blurb: "Procédés (soudure, emboutissage, roulage), gammes de fabrication.",
      },
    ],
  },
  {
    id: "controle",
    title: "Contrôle & Analyse",
    icon: Gauge,
    description:
      "Vérifier, mesurer, comprendre. Garantir la conformité et appuyer les décisions sur des données.",
    skills: [
      {
        name: "Contrôle qualité",
        level: 82,
        blurb: "Contrôles tridimensionnels, conformité, gammes manuelles et automatiques.",
      },
      {
        name: "Analyse",
        level: 75,
        blurb: "Mécanique des fluides, dimensionnement, essais et interprétation.",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Méthodes",
    icon: Wrench,
    description:
      "Maintenance préventive et corrective sur installations industrielles, outillée par les méthodes d'amélioration continue.",
    skills: [
      {
        name: "Maintenance",
        level: 78,
        blurb: "Détection de défaillances, intervention, fiabilisation des équipements.",
      },
      {
        name: "Méthodes (5S · AMDEC · SMED)",
        level: 72,
        blurb: "Outils d'organisation, d'analyse de risques et d'optimisation.",
      },
    ],
  },
  {
    id: "numerique",
    title: "Numérique & Outils",
    icon: Cpu,
    description:
      "Programmation robotisée, automatisation de calculs et maîtrise des outils bureautiques.",
    skills: [
      {
        name: "RobotStudio",
        level: 66,
        blurb: "Programmation et simulation de trajectoires robotisées.",
      },
      {
        name: "Excel / VBA",
        level: 76,
        blurb: "Calculs, tableaux dynamiques, graphiques, automatisation par macros.",
      },
    ],
  },
  {
    id: "humain",
    title: "Gestion & Collaboration",
    icon: Users,
    description:
      "Mener un projet de bout en bout, communiquer avec des partenaires et avancer en équipe.",
    skills: [
      {
        name: "Gestion de projet",
        level: 74,
        blurb: "Planning prévisionnel, suivi des tâches, gestion de l'information.",
      },
      {
        name: "Communication",
        level: 80,
        blurb: "Échanges fournisseurs/techniciens, restitution, demandes de devis.",
      },
      {
        name: "Travail d'équipe",
        level: 86,
        blurb: "Collaboration sur le terrain, entraide, autonomie progressive.",
      },
    ],
  },
];

/** Liste à plat pour le bandeau défilant (marquee). */
export const coreSkills: string[] = [
  "CAO",
  "SolidWorks",
  "CATIA V5",
  "Conception mécanique",
  "Usinage CN",
  "Contrôle qualité",
  "Maintenance",
  "Analyse",
  "RobotStudio",
  "Excel / VBA",
  "5S · AMDEC · SMED",
  "Gestion de projet",
];

export const softSkills: SoftSkill[] = [
  {
    label: "Curiosité",
    icon: Lightbulb,
    description:
      "Apprendre vite un domaine inconnu — du traitement de l'eau à la soudure laser.",
  },
  {
    label: "Flexibilité",
    icon: Layers,
    description:
      "M'adapter aux postes et aux missions variées des petites structures.",
  },
  {
    label: "Travail d'équipe",
    icon: Handshake,
    description:
      "Avancer avec les techniciens, les stagiaires et les partenaires extérieurs.",
  },
];
