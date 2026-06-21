import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import type { NavItem, SocialLink } from "@/types";

/**
 * Centralised site configuration.
 * Edit contact details, social links and metadata here — nothing else needs
 * to change elsewhere.
 */
export const site = {
  name: "Kelyan AFONSO",
  shortName: "Kelyan AFONSO",
  title: "Ingénieur Génie Mécanique & Productique",
  role: "Génie Mécanique & Productique",
  tagline:
    "Conception mécanique, CAO et bureau d'études. J'imagine, modélise et fiabilise des solutions concrètes — du dessin SolidWorks à la pièce qui fonctionne.",
  description:
    "Portfolio de Kelyan AFONSO, étudiant en BUT Génie Mécanique & Productique. Conception CAO/SolidWorks, maintenance industrielle, bureau d'études — et deux rapports de stage consultables intégralement.",
  // Canonical URL. Overridden by NEXT_PUBLIC_SITE_URL in production.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kelyan-afonso.vercel.app",
  locale: "fr_FR",
  location: "Eaubonne (95) · Île-de-France",
  email: "kelyanafonso@gmail.com",
  phone: "+33 6 58 91 41 55",
  phoneHref: "tel:+33658914155",
  // ⬇️ Remplacez par votre véritable URL LinkedIn.
  linkedin: "https://www.linkedin.com/in/kelyan-afonso",
  cv: "/cv/cv-kelyan-afonso.pdf",
  cvImage: "/cv/cv-kelyan-afonso.jpg",
  ogImage: "/images/og-image.jpg",
  authorPhoto: "/images/profile.jpg",
} as const;

export const nav: NavItem[] = [
  { label: "Accueil", href: "/#hero", id: "hero" },
  { label: "Profil", href: "/#presentation", id: "presentation" },
  { label: "Compétences", href: "/#competences", id: "competences" },
  { label: "Parcours", href: "/#experiences", id: "experiences" },
  { label: "Rapports", href: "/#rapports", id: "rapports" },
  { label: "Projets", href: "/#projets", id: "projets" },
  { label: "Galerie", href: "/#galerie", id: "galerie" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: Mail,
    handle: site.email,
  },
  {
    label: "Téléphone",
    href: site.phoneHref,
    icon: Phone,
    handle: site.phone,
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: Linkedin,
    handle: "in/kelyan-afonso",
  },
  {
    label: "Localisation",
    href: "https://www.google.com/maps/place/Eaubonne",
    icon: MapPin,
    handle: "Eaubonne (95)",
  },
];
