"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileText,
  Mail,
  CornerDownLeft,
  SunMoon,
  Search,
} from "lucide-react";
import { nav, site } from "@/data/site";
import { stages } from "@/data/stages";
import { useSmoothScroll } from "@/providers/smooth-scroll-provider";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

type Group = "Navigation" | "Rapports" | "Actions";

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: Group;
  keywords?: string;
  perform: () => void;
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const commands = useMemo<Command[]>(() => {
    const isHome = pathname === "/";
    const navCmds: Command[] = nav.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      group: "Navigation",
      hint: "Section",
      perform: () => {
        close();
        if (isHome && item.id) scrollTo(`#${item.id}`);
        else router.push(item.href);
      },
    }));

    const reportCmds: Command[] = stages.map((s) => ({
      id: `report-${s.slug}`,
      label: `Rapport ${s.code} — ${s.company.split(" —")[0]}`,
      group: "Rapports",
      hint: `${s.pages} pages`,
      keywords: `${s.title} ${s.company} stage rapport pdf`,
      perform: () => {
        close();
        router.push(`/stages/${s.slug}`);
      },
    }));

    const actionCmds: Command[] = [
      {
        id: "action-cv",
        label: "Télécharger le CV",
        group: "Actions",
        keywords: "cv resume pdf telecharger",
        perform: () => {
          close();
          window.open(site.cv, "_blank");
        },
      },
      {
        id: "action-mail",
        label: "Envoyer un email",
        group: "Actions",
        keywords: "contact email mail",
        perform: () => {
          close();
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "action-theme",
        label: "Basculer le thème clair / sombre",
        group: "Actions",
        keywords: "theme dark light mode sombre clair",
        perform: () => {
          toggle();
        },
      },
    ];

    return [...navCmds, ...reportCmds, ...actionCmds];
  }, [pathname, router, scrollTo, toggle, close]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = normalize(query);
    return commands.filter((c) =>
      normalize(`${c.label} ${c.keywords ?? ""}`).includes(q),
    );
  }, [commands, query]);

  // Open/close via keyboard + custom event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[index]?.perform();
    }
  };

  let cursor = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[120] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-elevated shadow-soft-lg"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            role="dialog"
            aria-modal="true"
            aria-label="Palette de commandes"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une section, un rapport, une action…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-subtle"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-subtle">
                  Aucun résultat pour « {query} ».
                </p>
              )}
              {(["Navigation", "Rapports", "Actions"] as Group[]).map((group) => {
                const items = filtered.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-subtle">
                      {group}
                    </p>
                    {items.map((c) => {
                      cursor += 1;
                      const selected = cursor === index;
                      const Icon =
                        c.group === "Rapports"
                          ? FileText
                          : c.group === "Actions"
                            ? c.id === "action-cv"
                              ? Download
                              : c.id === "action-mail"
                                ? Mail
                                : SunMoon
                            : ArrowRight;
                      const at = cursor;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onMouseEnter={() => setIndex(at)}
                          onClick={c.perform}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            selected ? "bg-accent text-white" : "text-fg",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0 opacity-80" />
                          <span className="flex-1">{c.label}</span>
                          {c.hint && (
                            <span
                              className={cn(
                                "text-xs",
                                selected ? "text-white/80" : "text-subtle",
                              )}
                            >
                              {c.hint}
                            </span>
                          )}
                          {selected && <CornerDownLeft className="h-3.5 w-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
