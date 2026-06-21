import type { Stage } from "@/types";

/**
 * Contenu intégral des deux case studies (rapports de stage).
 * Le texte est tiré des rapports originaux de Kelyan AFONSO.
 */
export const stages: Stage[] = [
  {
    slug: "but2-spirec",
    code: "BUT 2",
    title: "Refonte du vérin du Varilair",
    tagline: "Supprimer un défaut de fabrication par la conception.",
    company: "Spirec",
    companyDescription:
      "PME indépendante de Sartrouville (78), créée en 1970, environ 30 salariés. Spécialiste des échangeurs thermiques à plaque enroulée en spirale, soudés TIG, en inox 316L ou titane, et des solutions d'eau chaude sanitaire. Plus de 5 % du chiffre d'affaires investis en R&D, certification Origine France Garantie.",
    location: "Sartrouville (78)",
    period: "17 février — 25 avril 2025",
    durationWeeks: 10,
    role: "Stagiaire — Bureau d'études",
    tutor: "Ken Takaoka",
    supervisor: "Amadou Diarra (IUT)",
    pdf: "/reports/stage-but2-spirec-varilair.pdf",
    pages: 38,
    accent: "#2563EB",
    context: [
      "Le Varilair est un système de climatisation par induction installé en plafond (bureaux, chambres d'hôpital). L'accélération de l'air dans un rétrécissement crée, par effet Venturi, une dépression qui aspire et mélange l'air ambiant. Une ogive en forme de goutte, déplacée par un vérin électrique, fait varier le débit d'air jusqu'à la température voulue.",
      "Le vérin était auparavant produit par MDP. Après l'arrêt de cette production, Spirec a récupéré les plans pour reprendre la fabrication. Le mécanisme repose sur un moteur pas à pas NEMA 17 dont l'arbre est relié à une tige filetée M5 par un manchon ; la rotation déplace un écrou en bronze logé dans un tube carré, lui-même vissé à l'ogive.",
      "À l'assemblage, la soudure de la tige au manchon puis le pincement du manchon sur l'arbre déforment la tige filetée. En rotation, celle-ci tape contre les parois du tube carré : le vérin devient bruyant et, dans les cas extrêmes, se bloque.",
    ],
    problematique:
      "Comment monter le vérin sans déformer la tige filetée, afin de supprimer le bruit et les blocages — tout en gardant un coût de pièce compatible avec la marge du produit ?",
    objectives: [
      "Modifier le vérin pour permettre un montage sans déformation de la tige",
      "Refaire les plans des pièces et assemblages, à jour, sous SolidWorks",
      "Mettre à jour les stocks des pièces du Varilair dans le logiciel PMI",
    ],
    timeline: [
      {
        label: "Démontage & étude",
        detail: "Comprendre le vérin pièce par pièce et identifier les contraintes.",
      },
      {
        label: "Relevé & CAO",
        detail: "Cotes au pied à coulisse, modélisation des pièces et assemblages SolidWorks.",
      },
      {
        label: "Recherche de solutions",
        detail: "Quatre pistes étudiées et consultation de plus de dix entreprises.",
      },
      {
        label: "Essais mécaniques",
        detail: "Validation en traction (2/4/6 kg) puis en couple.",
      },
      {
        label: "Solution & intégration",
        detail: "Coupleur + colle, modification du guide et cote de montage du Varilair.",
      },
    ],
    methodology: [
      {
        id: "pistes",
        title: "Quatre pistes étudiées",
        body: [
          "1 — Une pièce unique remplaçant l'arbre moteur et la tige filetée : supprime la déformation mais impose de démonter le moteur (risque de l'endommager, temps de montage élevé).",
          "2 — Souder l'arbre, le manchon et la tige au laser : très précis et sans apport de chaleur, donc sans déformation, mais un poste de soudure laser coûte plusieurs milliers d'euros.",
          "3 — Remplacer le moteur par un modèle équipé d'une tige filetée intégrée : élégant, mais les tiges disponibles sont en M8 (contre M5), ce qui impose de revoir l'écrou et l'assemblage, pour un moteur à 120 $.",
          "4 — Coller les éléments : la solution la moins chère et sans chaleur, à condition de prouver par des essais qu'elle tient les contraintes mécaniques.",
        ],
      },
      {
        id: "sourcing",
        title: "Sourcing & consultations",
        body: [
          "Côté moteur, le modèle Moons à tige intégrée (M8, ~120 $ soit ~109 €) ferait chuter la marge face aux moins de 30 € de l'assemblage moteur + tige actuel, en plus d'un conflit géométrique avec les goupilles du tube.",
          "Côté soudure laser, trois entreprises consultées (ADS Laser, DGM Industrie, Groupe AGS) : DGM proposait un prototype à 235 € puis 11 720 € les 100 pièces (117,20 €/pièce), ADS un prototype à 120 €. Trop cher et trop long, d'autant qu'il faudrait démonter et expédier les moteurs.",
          "Côté roulage (filetage sans enlèvement de matière, plus adapté à l'écrou en bronze), huit entreprises contactées : seule Filetage de Précision pouvait produire, à 764 € les 100 pièces (7,64 €/pièce), mais sans l'usinage préalable de la tige — chaîne logistique trop longue.",
        ],
      },
      {
        id: "colle",
        title: "Le déclic : la colle",
        body: [
          "En discutant avec Bernard Payet, soudeur de l'entreprise, une intuition clé : la déformation ne viendrait pas de la soudure mais du pincement du manchon sur l'arbre. La piste du collage, écartée au départ, revient au premier plan.",
          "La Loctite 648, déjà présente en stock, est précisément conçue pour les assemblages cylindriques. Restait à le prouver par l'essai.",
        ],
      },
      {
        id: "essais",
        title: "Essais mécaniques",
        body: [
          "Le cahier des charges impose au vérin de soulever 2 kg pour décoller l'ogive. Essais de traction réalisés à la visseuse, charges de 2, 4 et 6 kg : tenue à 2 et 4 kg, rupture de la colle à 6 kg après plusieurs allers-retours.",
          "Essai en couple : une tige soudée perpendiculairement reçoit des poids. À 4 kg placés à 9 cm, le manchon tourne (≈ 3,6 N·m). Avec la solution finale (coupleur + écrou à méplat), la limite monte entre 4 et 6 N·m — soit plus de dix fois le couple du moteur (≈ 0,41 N·m). La solution est viable.",
        ],
      },
      {
        id: "integration",
        title: "Intégration en CAO",
        body: [
          "La solution retenue utilise un coupleur d'imprimante 3D (perçages Ø5 et Ø8) rendant l'arbre et la tige coaxiaux ; la tige est vissée et collée dans un écrou circulaire muni d'un méplat pour limiter la rotation. Les vis de serrage du coupleur maintiennent l'ensemble.",
          "Deux ajustements de conception ont suivi : l'alésage du guide est agrandi (Ø10 → Ø17) pour laisser passer le coupleur, et une cote de montage est imposée au Varilair pour que l'ogive puisse rentrer entièrement sans buter sur le coupleur.",
        ],
      },
      {
        id: "annexes",
        title: "Missions annexes",
        body: [
          "Postes non figés dans une PME : assemblage de Spilotair (systèmes de climatisation Spirec), câblage d'armoires électriques (une première), et recherche de câbles moins chers avec création des plans de branchement correspondants.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/cs-but2-varilair-schema.jpg",
        alt: "Schéma de fonctionnement du Varilair en hiver",
        caption: "Principe d'induction du Varilair",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-kinematic.jpg",
        alt: "Schéma cinématique du vérin",
        caption: "Schéma cinématique du vérin",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-laser-plan.jpg",
        alt: "Plan de la tige et de la soudure laser",
        caption: "Plans — tige & soudure laser",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-ecrou-tube.jpg",
        alt: "Assemblage entre l'écrou et le tube carré",
        caption: "Assemblage écrou / tube carré",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-essai-traction.jpg",
        alt: "Essai de traction sur le vérin",
        caption: "Essai de traction (visseuse + charges)",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-coupleurs.jpg",
        alt: "Coupleurs testés et modèle 3D de l'écrou",
        caption: "Coupleurs testés & écrou modélisé",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-coupe-guide.jpg",
        alt: "Vue en coupe du guide avant et après modification",
        caption: "Guide — avant / après modification",
        width: 1000,
        height: 1414,
      },
      {
        src: "/images/cs-but2-eclate.jpg",
        alt: "Vue éclatée de l'assemblage final",
        caption: "Vue éclatée de l'assemblage final",
        width: 1000,
        height: 1414,
      },
    ],
    results: [
      "Tenue validée entre 4 et 6 N·m, soit plus de 10× le couple moteur (0,41 N·m)",
      "Déformation de la tige supprimée — plus de bruit ni de blocage",
      "Assemblage redevenu démontable, contrairement à l'origine",
      "Solution peu coûteuse, préservant la marge du produit",
      "Jeu de plans SolidWorks à jour livré à l'entreprise",
    ],
    skills: [
      "SolidWorks — modélisation, assemblages, mise en plan",
      "Recherche de solutions & analyse comparative",
      "Essais mécaniques (traction, couple)",
      "Procédés : soudure, roulage, collage structural",
      "Communication fournisseurs & gestion de projet",
    ],
    retour: [
      "La variété des missions d'une petite entreprise m'a beaucoup plu : on ne reste pas au même poste pendant deux mois.",
      "J'ai gagné en aisance au téléphone, à force de consulter commerciaux et techniciens, et auprès de mes collègues.",
      "Ce stage a confirmé mon attrait pour la conception et la modélisation sur ordinateur.",
    ],
  },
  {
    slug: "but3-centre-nautique",
    code: "BUT 3",
    title: "Maintenance d'un centre aquatique",
    tagline: "Fiabiliser le traitement de l'eau et les installations.",
    company: "Centre Nautique La Baleine — Equalia",
    companyDescription:
      "Centre nautique de Saint-Denis exploité par Equalia, gestionnaire de plus de 60 centres sportifs et de loisirs en France et en Belgique. Quatre bassins (sportif de 3 m, ludique de 1,20 m avec toboggan, pataugeoire, fosse de plongée de 10 m) et un spa. Partenaires techniques : SIGMA (hydraulique), Brunier (maintenance), MTMI (compresseurs), FAIN (ascenseurs).",
    location: "Saint-Denis (93)",
    period: "6 mars — 26 juin 2026",
    durationWeeks: 12,
    role: "Stagiaire — Service technique",
    tutor: "Gilbert Mendy",
    supervisor: "Abdelkader Si Said (IUT)",
    pdf: "/reports/stage-but3-centre-nautique.pdf",
    pages: 22,
    accent: "#2563EB",
    context: [
      "Le travail se répartit entre deux zones : les bassins et la sous-station située en dessous, qui regroupe toutes les machines. On y trouve la Centrale de Traitement d'Air (CTA), qui renouvelle l'air des bassins pour maîtriser le taux de chloramines, et quatre bâches tampons (grand bassin, petit bassin, fosse, spa).",
      "Le cycle de l'eau : lorsqu'un bassin déborde, l'eau rejoint la bâche tampon, passe par un préfiltre (qui bloque les petits objets) puis un filtre à sable (qui retient les micro-organismes) ; on ajuste ensuite le chlore et le pH avant de renvoyer l'eau vers les bassins.",
      "Le système est automatique — pompes, sondes, armoire électrique avec écran d'alerte — mais chaque partie peut être pilotée manuellement. Une tournée quotidienne de la sous-station s'impose pour détecter fuites et dysfonctionnements.",
    ],
    problematique:
      "Comment assurer le bon fonctionnement des installations pour respecter les règles d'hygiène et de sécurité et pouvoir accueillir le public ? Un dysfonctionnement non détecté peut entraîner la fermeture d'un bassin ou la perte de plusieurs mètres cubes d'eau.",
    objectives: [
      "Prélever et analyser quotidiennement l'eau des bassins",
      "Assurer la maintenance préventive et corrective des moteurs, pompes et éléments de la sous-station",
      "Entretenir les bassins",
      "Contrôler et maintenir les équipements à disposition des clients",
    ],
    timeline: [
      {
        label: "Découverte",
        detail: "Cartographier la sous-station et le circuit de traitement de l'eau.",
      },
      {
        label: "Analyses quotidiennes",
        detail: "Mesure du pH, du chlore libre et du chlore combiné au photomètre.",
      },
      {
        label: "Maintenance corrective",
        detail: "Démarreur de pompe, préfiltres, échangeur de chauffage.",
      },
      {
        label: "Contrôles & sécurité",
        detail: "BAES, extincteurs, ascenseurs, compresseurs.",
      },
      {
        label: "Entretien continu",
        detail: "Bassins, pataugeoire et robot aspirateur.",
      },
    ],
    methodology: [
      {
        id: "analyses",
        title: "Analyses quotidiennes de l'eau",
        body: [
          "Chaque jour : relevé de température, prélèvement, remplissage de trois fioles de 10 mL (une vierge pour le zéro, une au Phenol Red pour le pH, une au DPD pour le chlore libre), puis lecture au photomètre.",
          "Les normes à respecter : pH entre 6,9 et 7,7 ; chlore libre entre 0,4 et 1,4 mg/L ; chlore combiné inférieur à 0,6. Hors plage, on risque l'irritation des baigneurs ou la prolifération bactérienne. Le chlore combiné traduit la présence de chloramines dans l'air.",
        ],
      },
      {
        id: "pompe",
        title: "Maintenance d'une pompe",
        body: [
          "À mon arrivée, une des deux pompes du petit bassin ne fonctionnait pas, doublant le temps de renouvellement et faussant mes analyses. Le diagnostic a montré que le défaut venait non de la pompe mais de son démarreur, hors service.",
          "Avec un technicien de SIGMA : coupure de l'armoire électrique, dépose de l'ancien démarreur, pose et câblage du nouveau, contrôle du courant puis programmation en s'inspirant du démarreur voisin.",
        ],
      },
      {
        id: "prefiltres",
        title: "Nettoyage des préfiltres",
        body: [
          "Placés entre les bâches tampons et les filtres, les préfiltres captent cheveux et petits objets ; ils s'encrassent vite vu la fréquentation.",
          "Procédure : fermer la vanne en amont, vider une partie de la cuve, retirer la plaque de plexiglas, sortir la grille et la rincer. Les grilles des bassins les plus fréquentés rouillent à cause des produits chimiques — on les plonge alors quelques minutes dans l'acide, avec de grandes précautions.",
        ],
      },
      {
        id: "echangeur",
        title: "Échangeurs & fuite de chauffage",
        body: [
          "Les bassins sont chauffés par des échangeurs thermiques à plaques. Une fuite sur un petit tuyau en laiton, près de l'échangeur, empêchait de chauffer la fosse.",
          "Le laiton ne se répare pas par simple soudure (risque de déformation). Avec Brunier : découpe de la partie endommagée, remplacement par un tronçon neuf et soudure au reste du système.",
        ],
      },
      {
        id: "securite",
        title: "Sécurité & contrôles mensuels",
        body: [
          "Contrôles mensuels : blocs d'éclairage de secours (témoin vert), casiers et clés, présence des extincteurs aux emplacements des plans.",
          "Ascenseurs hors service contrôlés avec FAIN et Bureau Veritas : portes et boutons fonctionnels, freins en bon état, mais câbles oxydés par l'humidité et les produits chimiques. Maintenance des compresseurs (MTMI) : l'un met l'eau sous pression pour les geysers, l'autre gonfle les bouteilles de plongée de la fosse.",
        ],
      },
      {
        id: "entretien",
        title: "Entretien des bassins",
        body: [
          "Entretien quotidien des contours (autolaveuse Nilfisk), traitements chimiques au sol rincés au karcher, et lavage hebdomadaire de la pataugeoire à la monobrosse.",
          "Le robot aspirateur a permis, après un incident dans le petit bassin, d'éviter une fermeture d'1 h 30 : il analyse la surface, aspire les saletés et renvoie l'eau propre. Lors d'une rupture de bouteilles de chlore gazeux, des galets de chlore liquide ont assuré le relais dans les bâches tampons.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/cs-but3-systeme.jpg",
        alt: "Schéma du circuit de traitement de l'eau",
        caption: "Le circuit de traitement de l'eau",
        width: 1000,
        height: 1413,
      },
      {
        src: "/images/cs-but3-analyses.jpg",
        alt: "Analyses de l'eau et photométrie",
        caption: "Analyses & photométrie",
        width: 1000,
        height: 1413,
      },
      {
        src: "/images/cs-but3-pompe.jpg",
        alt: "Maintenance d'une pompe — changement du démarreur",
        caption: "Maintenance pompe / démarreur",
        width: 1000,
        height: 1413,
      },
      {
        src: "/images/cs-but3-prefiltre.jpg",
        alt: "Grille de préfiltre avant et après lavage",
        caption: "Préfiltre — avant / après lavage",
        width: 1000,
        height: 1413,
      },
      {
        src: "/images/cs-but3-echangeur.jpg",
        alt: "Échangeur thermique et réparation de fuite",
        caption: "Échangeur & réparation de fuite",
        width: 1000,
        height: 1413,
      },
      {
        src: "/images/cs-but3-robot.jpg",
        alt: "Robot aspirateur et entretien des bassins",
        caption: "Robot aspirateur & entretien",
        width: 1000,
        height: 1413,
      },
    ],
    results: [
      "Installations maintenues dans les normes sanitaires sur les 12 semaines",
      "Démarreur de pompe remplacé : temps de renouvellement divisé par deux",
      "Fuite de l'échangeur de la fosse diagnostiquée et réparée",
      "Montée en compétence sur l'électricité, le câblage et l'automatisme",
    ],
    skills: [
      "Maintenance préventive et corrective sur le terrain",
      "Traitement de l'eau & mécanique des fluides",
      "Électricité, câblage et automatisme",
      "Observation, détection de défaillances, diagnostic",
      "Travail d'équipe et autonomie",
    ],
    retour: [
      "Même si ce domaine n'était pas ma cible de départ, le stage a été très bénéfique : travailler sur le terrain et appliquer les enseignements du BUT.",
      "J'y ai gagné en responsabilité et en autonomie, et beaucoup appris sur un univers que je découvrais.",
      "Pour la suite : viser un bureau d'études, envisager une césure ou poursuivre vers un domaine de conception assistée par ordinateur.",
    ],
  },
];

export function getStage(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}
