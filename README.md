# Portfolio — Kelyan AFONSO

Portfolio premium d'un **Ingénieur Génie Mécanique & Productique**, conçu comme une
expérience immersive. Il remplace intégralement l'ancien portfolio Microsoft Sway et
met au cœur du site les **deux rapports de stage**, consultables intégralement dans un
lecteur PDF maison.

> Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lenis · react-pdf

---

## ✨ Fonctionnalités

- **Design premium** noir / blanc / gris, accent bleu électrique `#2563EB`,
  glassmorphism léger, ombres très douces, grandes respirations.
- **Thèmes** clair / sombre / système, sans flash au chargement.
- **Animations élégantes** : smooth scroll (Lenis), révélations au scroll, parallaxes,
  curseur animé, boutons magnétiques, cartes en tilt 3D, fond « constellation » en
  canvas (léger, sans Three.js), splash screen, barre de progression.
- **Sections** : Hero (titre animé lettre par lettre), Profil, Compétences (jauges
  circulaires animées), Parcours (timeline dépliable), Rapports de stage, Projets
  (cartes + modales détaillées), Galerie Masonry (lightbox + zoom + clavier),
  Chronologie horizontale, Contact (formulaire).
- **Deux case studies dédiés** (BUT2 — Spirec / Varilair, BUT3 — Centre Nautique)
  suivant un déroulé complet : entreprise → contexte → problématique → objectifs →
  chronologie → méthodologie → schémas → galerie → résultats → compétences →
  retour d'expérience → **rapport PDF intégral**.
- **Lecteur PDF maison** (`components/pdf-viewer`) : miniatures, recherche plein texte,
  zoom, plein écran, téléchargement, impression, reprise de lecture (localStorage),
  navigation clavier, rendu paresseux des pages.
- **Bonus** : palette de commandes (⌘K / Ctrl+K), scroll-spy, menu plein écran mobile.
- **SEO & perf** : métadonnées complètes, Open Graph, `sitemap.xml`, `robots.txt`,
  `manifest`, images `next/image` (AVIF/WebP), code splitting, `prefers-reduced-motion`,
  accessibilité (focus visibles, aria, contrastes).

---

## 🧱 Stack technique

| Domaine            | Outils                                                        |
| ------------------ | ------------------------------------------------------------- |
| Framework          | Next.js 14 (App Router), React 18, TypeScript                 |
| Styles             | Tailwind CSS, variables CSS (thèmes)                          |
| Animations         | Framer Motion, Lenis, Canvas 2D                               |
| PDF                | react-pdf (pdf.js)                                            |
| Icônes / polices   | lucide-react, next/font (Inter, Sora, JetBrains Mono)         |

---

## 📂 Structure du projet

```
.
├── app/                      # App Router (pages, layout, SEO routes)
│   ├── layout.tsx            # Layout racine, polices, métadonnées, providers
│   ├── page.tsx              # Page d'accueil (assemblage des sections)
│   ├── globals.css           # Tokens de design, utilitaires, styles PDF
│   ├── sitemap.ts / robots.ts / manifest.ts / icon.svg
│   └── stages/[slug]/page.tsx# Pages case studies (SSG)
├── components/
│   ├── ui/                   # Button, GlassCard, TiltCard, Badge, RadialGauge…
│   ├── layout/               # Navbar, Footer, CommandPalette, Preloader…
│   ├── animations/           # Reveal, SplitText, Parallax, AnimatedCursor, BackgroundField
│   ├── sections/             # Hero, About, Skills, Experience, StagesFeature, Projects, Gallery, Timeline, Contact
│   ├── case-studies/         # CaseStudyHero, CaseStudyContent
│   └── pdf-viewer/           # PdfReader (wrapper) + PdfViewer
├── data/                     # Contenu typé : site, skills, experiences, projects, stages, timeline
├── hooks/                    # use-media-query, use-mounted, use-scroll-spy
├── lib/                      # utils (cn…)
├── providers/                # ThemeProvider, SmoothScrollProvider
├── types/                    # Types TypeScript partagés
└── public/
    ├── images/               # Photo de profil, OG, schémas extraits des rapports
    ├── cv/                   # CV (PDF + JPG)
    └── reports/              # Les deux rapports de stage (PDF)
```

---

## 🚀 Démarrage

Prérequis : **Node.js ≥ 18.18**.

```bash
npm install        # installe les dépendances
npm run dev        # serveur de dev → http://localhost:3000
npm run build      # build de production
npm run start      # sert le build de production
npm run lint       # ESLint (0 erreur attendue)
npm run typecheck  # TypeScript (0 erreur attendue)
```

---

## ✏️ Personnaliser le contenu

Tout le contenu est centralisé dans `data/` :

- **`data/site.ts`** — nom, titre, accroche, e-mail, téléphone, **URL LinkedIn**
  (⚠️ remplacez le lien placeholder `https://www.linkedin.com/in/kelyan-afonso`),
  chemin du CV.
- **`data/skills.ts`** — catégories et niveaux de compétences (jauges).
- **`data/experiences.ts`** — parcours (stages, job, formation).
- **`data/projects.ts`** — projets affichés en cartes.
- **`data/stages.ts`** — contenu intégral des deux case studies.
- **`data/timeline.ts`** — frise chronologique.

Ressources à remplacer dans `public/` :

- `public/images/profile.jpg` — votre photo de profil.
- `public/cv/cv-kelyan-afonso.pdf` (et `.jpg`) — votre CV.
- `public/reports/*.pdf` — vos rapports (mettez à jour les chemins dans `data/stages.ts`).
- `public/images/og-image.jpg` — image de partage social.

**Couleur d'accent** : modifiez la variable `--accent` (clair et sombre) dans
`app/globals.css`.

---

## 📄 Les rapports PDF

Les PDF sont servis depuis `public/reports/`. Le worker pdf.js est chargé depuis un CDN
(unpkg), épinglé à la version exacte de `pdfjs-dist` pour éviter tout décalage — aucune
configuration supplémentaire n'est nécessaire.

---

## 🌐 Déploiement sur Vercel

1. **Poussez le projet sur GitHub** (le dossier `node_modules` est ignoré).
   ```bash
   git init && git add . && git commit -m "Portfolio Kelyan AFONSO"
   git branch -M main
   git remote add origin https://github.com/<vous>/<repo>.git
   git push -u origin main
   ```
2. Sur **[vercel.com](https://vercel.com)** → **Add New… → Project** → importez le dépôt.
3. Vercel détecte **Next.js** automatiquement (Build `next build`, rien à configurer).
4. *(Optionnel)* Variables d'environnement → ajoutez `NEXT_PUBLIC_SITE_URL` avec l'URL
   finale (ex. `https://kelyan-afonso.vercel.app`) pour un SEO/Open Graph parfait.
5. **Deploy**. Le build réussit tel quel — aucune modification requise.

> Astuce : après le 1er déploiement, copiez l'URL de production dans
> `NEXT_PUBLIC_SITE_URL` puis redéployez pour figer les URLs canoniques.

---

## ⚙️ Variables d'environnement

Voir **`.env.example`**. Aucune n'est obligatoire ; copiez-le en `.env.local` si besoin.

| Variable                  | Rôle                                              |
| ------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | URL canonique (SEO, Open Graph, sitemap, robots). |

---

## ♿ Performance, SEO & accessibilité

- Génération statique (SSG) des pages, y compris les case studies.
- Images optimisées `next/image` (AVIF/WebP, lazy loading).
- Le lecteur PDF (lourd) est chargé dynamiquement, hors du bundle initial.
- `prefers-reduced-motion` respecté (animations désactivées proprement).
- Métadonnées, Open Graph, `sitemap.xml`, `robots.txt`, `manifest` inclus.

---

## 📝 Notes

- `next/font/google` télécharge Inter / Sora / JetBrains Mono **au build** (fonctionne
  nativement sur Vercel).
- Le formulaire de contact ouvre la messagerie via `mailto:` (aucun backend). Pour
  brancher un service (Formspree, Web3Forms, Resend…), voir `.env.example` et
  `components/sections/Contact.tsx`.

---

## 📜 Crédits

Contenu, textes, rapports et photos © Kelyan AFONSO. Conception & développement du site
sur mesure (Next.js).
