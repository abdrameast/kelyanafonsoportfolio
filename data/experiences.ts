import type { Experience } from "@/types";

/** Parcours professionnel et académique (du plus récent au plus ancien). */
export const experiences: Experience[] = [
  {
    id: "stage-but3",
    role: "Stage — Maintenance & traitement de l'eau",
    org: "Centre Nautique La Baleine · Equalia",
    location: "Saint-Denis (93)",
    period: "Mars — Juin 2026",
    type: "stage",
    summary:
      "12 semaines au service technique d'un centre aquatique : garantir le bon fonctionnement des installations de traitement de l'eau et le respect des normes sanitaires.",
    missions: [
      "Prélèvements et analyses quotidiennes de l'eau (pH, chlore libre et combiné au photomètre)",
      "Maintenance préventive et corrective : pompes, démarreur, préfiltres, échangeurs, compresseurs",
      "Entretien des bassins et des équipements à disposition des clients",
      "Contrôles mensuels de sécurité (BAES, extincteurs, ascenseurs avec FAIN & Bureau Veritas)",
    ],
    results: [
      "Bassins maintenus dans les normes sanitaires sur toute la durée du stage",
      "Remplacement d'un démarreur de pompe HS → temps de renouvellement divisé par deux",
      "Diagnostic et réparation d'une fuite sur l'échangeur de la fosse de plongée",
    ],
    tags: ["Maintenance", "Traitement de l'eau", "Mécanique des fluides", "Sécurité"],
    href: "/stages/but3-centre-nautique",
  },
  {
    id: "stage-but2",
    role: "Stage — Bureau d'études",
    org: "Spirec",
    location: "Sartrouville (78)",
    period: "Février — Avril 2025",
    type: "stage",
    summary:
      "Refonte du vérin du Varilair pour supprimer un défaut de fabrication source de bruit et de blocages, chez un fabricant d'échangeurs thermiques.",
    missions: [
      "Démontage et rétro-conception complète du vérin (relevé au pied à coulisse)",
      "Mise à jour des plans et assemblages sous SolidWorks",
      "Benchmark de 4 solutions et consultation de plus de 10 entreprises (soudure laser, roulage…)",
      "Essais mécaniques en traction et en couple ; gestion de stock sous PMI",
    ],
    results: [
      "Solution coupleur + colle Loctite 648 validée : tenue 4–6 N·m, soit >10× le couple moteur",
      "Suppression de la déformation de la tige filetée et démontage redevenu possible",
      "Jeu de plans à jour livré à l'entreprise",
    ],
    tags: ["SolidWorks", "Conception", "Essais mécaniques", "Sourcing"],
    href: "/stages/but2-spirec",
  },
  {
    id: "job-cuisine",
    role: "Job d'été — Agent de cuisine",
    org: "Hôpital Simone Veil",
    location: "Eaubonne (95)",
    period: "Août 2025",
    type: "job",
    summary:
      "Renfort estival en cuisine hospitalière : rigueur, cadence et respect strict des règles d'hygiène.",
    missions: [
      "Préparation froide",
      "Plonge",
      "Allotissement des repas",
    ],
    tags: ["Rigueur", "Hygiène", "Cadence", "Organisation"],
  },
  {
    id: "but-gmp",
    role: "BUT Génie Mécanique & Productique",
    org: "IUT de Saint-Denis · Université Sorbonne Paris Nord",
    location: "Saint-Denis (93)",
    period: "2023 — 2026",
    type: "formation",
    summary:
      "Formation d'ingénierie mécanique : conception, productique, méthodes, contrôle qualité et maintenance.",
    missions: [
      "Conception et CAO (SolidWorks, CATIA V5)",
      "Productique : usinage conventionnel et commande numérique",
      "Méthodes, contrôle qualité et maintenance industrielle",
    ],
    tags: ["Conception", "Productique", "Méthodes"],
  },
  {
    id: "bac",
    role: "Baccalauréat Général — Maths & Sciences de l'Ingénieur",
    org: "Lycée Louis Armand",
    location: "Eaubonne (95)",
    period: "2020 — 2023",
    type: "formation",
    summary:
      "Spécialités Mathématiques et Sciences de l'Ingénieur — les fondations scientifiques du parcours.",
    missions: [
      "Mathématiques",
      "Sciences de l'Ingénieur",
    ],
    tags: ["Mathématiques", "Sciences de l'Ingénieur"],
  },
];
