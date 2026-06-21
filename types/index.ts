import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  /** id of the section for scroll-spy (home page anchors only) */
  id?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  handle?: string;
}

export interface Skill {
  name: string;
  /** 0–100, used for the radial gauge */
  level: number;
  blurb: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  skills: Skill[];
}

export interface SoftSkill {
  label: string;
  icon: LucideIcon;
  description: string;
}

export type ExperienceType = "stage" | "job" | "formation";

export interface Experience {
  id: string;
  role: string;
  org: string;
  location: string;
  period: string;
  type: ExperienceType;
  summary: string;
  missions: string[];
  results?: string[];
  tags: string[];
  /** internal link to the related case study, if any */
  href?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  /** image path in /public, or omit for an iconic gradient cover */
  cover?: string;
  icon?: LucideIcon;
  description: string;
  tech: string[];
  skills: string[];
  challenges: string[];
  results: string[];
  /** internal link (e.g. a case study) */
  href?: string;
  links?: ProjectLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface TimelineStep {
  label: string;
  detail: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  body: string[];
}

export interface Stage {
  /** url slug, e.g. "but2-spirec" */
  slug: string;
  code: string; // "BUT 2", "BUT 3"
  title: string;
  tagline: string;
  company: string;
  companyDescription: string;
  location: string;
  period: string;
  durationWeeks: number;
  role: string;
  tutor: string;
  supervisor: string;
  /** path to the full report inside /public */
  pdf: string;
  pages: number;
  accent: string;
  context: string[];
  problematique: string;
  objectives: string[];
  timeline: TimelineStep[];
  methodology: CaseStudySection[];
  gallery: GalleryImage[];
  results: string[];
  skills: string[];
  retour: string[];
}

export type TimelineTag =
  | "Formation"
  | "Stage"
  | "Projet"
  | "Expérience"
  | "Aujourd'hui";

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
  tag: TimelineTag;
}
