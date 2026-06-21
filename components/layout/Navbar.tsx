"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { nav, site } from "@/data/site";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useSmoothScroll } from "@/providers/smooth-scroll-provider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/#hero"
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label="Kelyan AFONSO — accueil"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-fg text-bg transition-transform duration-300 group-hover:rotate-6">
        <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden>
          <path
            d="M23 16 V48 M23 33 L41 16 M25 32 L43 48"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
      <span className="hidden text-sm font-semibold tracking-tight sm:block">
        Kelyan AFONSO
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollTo } = useSmoothScroll();
  const ids = useMemo(
    () => nav.filter((n) => n.id).map((n) => n.id as string),
    [],
  );
  const active = useScrollSpy(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (e: React.MouseEvent, item: NavItem) => {
    if (isHome && item.id) {
      e.preventDefault();
      scrollTo(`#${item.id}`);
    }
    setOpen(false);
  };

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="container">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl px-3 py-2 transition-all duration-500 sm:px-4",
              scrolled
                ? "glass-strong shadow-soft"
                : "border border-transparent",
            )}
          >
            <Logo onClick={() => setOpen(false)} />

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const isActive = isHome && item.id === active;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNav(e, item)}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                        isActive
                          ? "text-fg"
                          : "text-muted hover:text-fg",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-fg/5"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openPalette}
                aria-label="Recherche (raccourci Ctrl K)"
                className="hidden items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-2 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg md:flex"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Rechercher</span>
                <kbd className="ml-1 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              <div className="hidden sm:block">
                <Button
                  href={isHome ? "#contact" : "/#contact"}
                  onClick={(e) =>
                    handleNav(e, { label: "Contact", href: "#contact", id: "contact" })
                  }
                  size="sm"
                >
                  Me contacter
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/60 text-fg lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[65] glass-strong lg:hidden"
          >
            <div className="container flex h-full flex-col justify-center">
              <ul className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNav(e, item)}
                      className="flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight text-fg"
                    >
                      <span className="font-mono text-xs text-accent">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
