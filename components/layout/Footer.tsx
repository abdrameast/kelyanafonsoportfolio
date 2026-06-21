"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { nav, site, socials } from "@/data/site";
import { useSmoothScroll } from "@/providers/smooth-scroll-provider";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import type { NavItem } from "@/types";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollTo } = useSmoothScroll();

  const handleNav = (e: React.MouseEvent, item: NavItem) => {
    if (isHome && item.id) {
      e.preventDefault();
      scrollTo(`#${item.id}`);
    }
  };

  return (
    <footer className="relative mt-24 border-t border-line bg-surface/40">
      <div className="container py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Disponible pour un stage / poste
            </p>
            <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tighter sm:text-4xl">
              Construisons quelque chose de solide.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} external>
                Me contacter
              </Button>
              <Button href={site.cv} external variant="outline">
                Télécharger le CV
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold">Navigation</p>
              <ul className="space-y-2">
                {nav.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNav(e, item)}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-3 text-sm font-semibold">Contact</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.label === "LinkedIn" ? "_blank" : undefined}
                      rel={s.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <s.icon className="h-3.5 w-3.5 text-accent" />
                      {s.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {site.name} — Tous droits réservés.
          </p>
          <p className="text-xs text-subtle">
            Conçu &amp; développé avec Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
          <Magnetic className="inline-block">
            <button
              type="button"
              onClick={() => scrollTo(0)}
              aria-label="Retour en haut de page"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
            >
              Haut de page
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
