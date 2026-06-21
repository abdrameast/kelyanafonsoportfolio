"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { stages } from "@/data/stages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

const images: GalleryImage[] = stages.flatMap((s) => s.gallery);

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [],
  );

  useEffect(() => setZoom(false), [index]);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, next, prev]);

  const current = index === null ? null : images[index];

  return (
    <section id="galerie" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Galerie"
          title="Schémas, plans & terrain."
          description="Une sélection de visuels extraits des rapports : schémas CAO, plans, essais et interventions. Cliquez pour agrandir — navigation au clavier."
        />

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="p-3 text-xs font-medium text-white">{img.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex flex-col bg-black/90 backdrop-blur-sm"
            onMouseDown={close}
          >
            {/* Toolbar */}
            <div
              className="flex items-center justify-between p-4 text-white/90"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-xs">
                {(index ?? 0) + 1} / {images.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => !z)}
                  aria-label={zoom ? "Dézoomer" : "Zoomer"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  {zoom ? (
                    <ZoomOut className="h-4 w-4" />
                  ) : (
                    <ZoomIn className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fermer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div
              className="relative flex flex-1 items-center justify-center overflow-auto px-4 pb-4"
              data-lenis-prevent
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Image précédente"
                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-3"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  onClick={() => setZoom((z) => !z)}
                  className={cn(
                    "rounded-lg shadow-2xl transition-transform duration-300",
                    zoom
                      ? "max-h-none w-auto cursor-zoom-out"
                      : "max-h-[74vh] w-auto cursor-zoom-in object-contain",
                  )}
                />
                <p className="text-center text-sm text-white/80">
                  {current.caption}
                </p>
              </motion.div>

              <button
                type="button"
                onClick={next}
                aria-label="Image suivante"
                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
