import { Bot, Table2 } from "lucide-react";
import type { Project } from "@/types";

/** Projets mis en avant (les deux premiers renvoient vers les case studies). */
export const projects: Project[] = [
  {
    id: "varilair",
    title: "Vérin du Varilair",
    subtitle: "Refonte mécanique d'un actionneur",
    year: "2025",
    category: "Conception · Bureau d'études",
    cover: "/images/cs-but2-varilair-schema.jpg",
    description:
      "Re-conception du vérin électrique d'un système de climatisation par induction pour éliminer la déformation d'une tige filetée à l'assemblage — source de bruit et de blocages. Étude de 4 solutions, essais mécaniques et validation d'un montage coupleur + colle.",
    tech: ["SolidWorks", "PMI", "Loctite 648", "Moteur NEMA 17"],
    skills: ["Rétro-conception", "Recherche de solutions", "Essais", "Sourcing"],
    challenges: [
      "Supprimer la déformation sans démonter le moteur",
      "Garder un coût pièce faible pour préserver la marge",
    ],
    results: [
      "Tenue validée 4–6 N·m (>10× le couple moteur)",
      "Démontage redevenu possible, plans à jour",
    ],
    href: "/stages/but2-spirec",
  },
  {
    id: "centre-nautique",
    title: "Maintenance d'un centre aquatique",
    subtitle: "Traitement de l'eau & fiabilité",
    year: "2026",
    category: "Maintenance · Productique",
    cover: "/images/cs-but3-systeme.jpg",
    description:
      "Maintenance préventive et corrective des installations de traitement de l'eau d'un centre nautique : analyses quotidiennes, pompes, préfiltres, échangeurs, ascenseurs et compresseurs, dans le respect des normes sanitaires.",
    tech: ["Photomètre DPD", "Filtres à sable", "Pompes", "Échangeurs à plaques"],
    skills: ["Maintenance", "Analyse de l'eau", "Diagnostic", "Sécurité"],
    challenges: [
      "Assimiler un domaine entièrement nouveau en quelques semaines",
      "Intervenir sans interrompre l'accueil du public",
    ],
    results: [
      "Installations maintenues dans les normes",
      "Pannes résolues : démarreur de pompe, fuite d'échangeur",
    ],
    href: "/stages/but3-centre-nautique",
  },
  {
    id: "robotstudio",
    title: "Programmation robotisée",
    subtitle: "Trajectoires sous RobotStudio",
    year: "2024",
    category: "Académique · BUT GMP",
    icon: Bot,
    description:
      "Programmation et simulation d'un robot industriel sous RobotStudio : définition des repères, des trajectoires et des points de passage, puis vérification du cycle en simulation.",
    tech: ["RobotStudio", "ABB", "RAPID"],
    skills: ["Robotique", "Programmation", "Simulation"],
    challenges: [
      "Penser le mouvement dans l'espace et les repères outil",
      "Fiabiliser un cycle reproductible",
    ],
    results: ["Cycle simulé et validé", "Trajectoires optimisées"],
  },
  {
    id: "excel-vba",
    title: "Automatisation & analyse",
    subtitle: "Calculs et tableaux dynamiques (VBA)",
    year: "2024",
    category: "Académique · BUT GMP",
    icon: Table2,
    description:
      "Mise en place de feuilles de calcul outillées : représentation graphique des données, calculs automatisés et macros VBA pour fiabiliser et accélérer le traitement des données techniques.",
    tech: ["Excel", "VBA", "Tableaux dynamiques"],
    skills: ["Analyse de données", "Automatisation", "Restitution"],
    challenges: [
      "Structurer des données techniques hétérogènes",
      "Rendre les calculs réutilisables",
    ],
    results: ["Traitement accéléré", "Visualisations claires"],
  },
];
