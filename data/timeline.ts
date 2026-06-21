import type { TimelineItem } from "@/types";

/** Frise chronologique du parcours (du plus ancien à aujourd'hui). */
export const timeline: TimelineItem[] = [
  {
    period: "2020 — 2023",
    title: "Baccalauréat Général",
    org: "Lycée Louis Armand, Eaubonne",
    description:
      "Spécialités Mathématiques et Sciences de l'Ingénieur. Les fondations scientifiques.",
    tag: "Formation",
  },
  {
    period: "2023",
    title: "Entrée en BUT GMP",
    org: "IUT de Saint-Denis · Sorbonne Paris Nord",
    description:
      "Début du Bachelor Universitaire Technologique en Génie Mécanique & Productique.",
    tag: "Formation",
  },
  {
    period: "Fév — Avr 2025",
    title: "Stage BUT2 — Bureau d'études",
    org: "Spirec, Sartrouville",
    description:
      "Refonte du vérin du Varilair : conception SolidWorks, recherche de solutions et essais mécaniques.",
    tag: "Stage",
  },
  {
    period: "Août 2025",
    title: "Job d'été — Cuisine",
    org: "Hôpital Simone Veil, Eaubonne",
    description: "Préparation froide, plonge, allotissement. Rigueur et cadence.",
    tag: "Expérience",
  },
  {
    period: "Mars — Juin 2026",
    title: "Stage BUT3 — Maintenance",
    org: "Centre Nautique La Baleine, Saint-Denis",
    description:
      "Traitement de l'eau et maintenance industrielle d'un centre aquatique.",
    tag: "Stage",
  },
  {
    period: "Aujourd'hui",
    title: "Vers le bureau d'études",
    org: "Conception & CAO",
    description:
      "À la recherche d'opportunités en conception mécanique, là où le dessin devient pièce réelle.",
    tag: "Aujourd'hui",
  },
];
