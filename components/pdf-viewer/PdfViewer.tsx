"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useReducedMotion } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Printer,
  Search,
  PanelLeft,
  X,
  RotateCcw,
  Loader2,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { cn } from "@/lib/utils";

// Polyfill for older browsers (pdfjs v4 uses Promise.withResolvers)
if (typeof Promise.withResolvers === "undefined") {
  // @ts-expect-error - assigning polyfill
  Promise.withResolvers = function () {
    let resolve!: (value: unknown) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

// Worker pinned to the exact bundled pdfjs version (no version mismatch).
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

interface PdfViewerProps {
  url: string;
  title: string;
  downloadName?: string;
}

export function PdfViewer({ url, title, downloadName }: PdfViewerProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pdfRef = useRef<Awaited<ReturnType<typeof pdfjs.getDocument>["promise"]> | null>(
    null,
  );
  const textCache = useRef<Record<number, string>>({});

  const [numPages, setNumPages] = useState(0);
  const [current, setCurrent] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rendered, setRendered] = useState<Set<number>>(new Set([1, 2, 3]));
  const [width, setWidth] = useState(720);
  const [isFs, setIsFs] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<number[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [searching, setSearching] = useState(false);
  const [resumePage, setResumePage] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const storageKey = `pdf-progress:${url}`;
  const options = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    [],
  );

  const basePageWidth = Math.min(Math.max(width - 32, 280), 860);
  const pageWidth = Math.round(basePageWidth * zoom);

  // Resume from saved progress
  useEffect(() => {
    const saved = Number(localStorage.getItem(storageKey));
    if (saved && saved > 1) setResumePage(saved);
  }, [storageKey]);

  // Persist progress
  useEffect(() => {
    if (current > 1) localStorage.setItem(storageKey, String(current));
  }, [current, storageKey]);

  // Track container width
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fullscreen state sync
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const onDocLoad = useCallback(
    (pdf: { numPages: number }) => {
      setNumPages(pdf.numPages);
      pdfRef.current = pdf as unknown as typeof pdfRef.current;
    },
    [],
  );

  // Lazy-render pages near the viewport
  useEffect(() => {
    if (!numPages) return;
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        const nextSet = new Set(rendered);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const n = Number((entry.target as HTMLElement).dataset.page);
            if (n && !nextSet.has(n)) {
              nextSet.add(n);
              changed = true;
            }
          }
        });
        if (changed) setRendered(nextSet);
      },
      { root, rootMargin: "1400px 0px", threshold: 0 },
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages]);

  // Current page on scroll (rAF-throttled)
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const threshold = root.scrollTop + root.clientHeight * 0.32;
        let n = 1;
        for (let i = 0; i < pageRefs.current.length; i++) {
          const el = pageRefs.current[i];
          if (el && el.offsetTop <= threshold) n = i + 1;
        }
        setCurrent((prev) => (prev !== n ? n : prev));
      });
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, [numPages]);

  const scrollToPage = useCallback(
    (n: number) => {
      const el = pageRefs.current[n - 1];
      const c = scrollRef.current;
      if (el && c) {
        setRendered((prev) => new Set(prev).add(n).add(n + 1));
        c.scrollTo({
          top: el.offsetTop - 12,
          behavior: reduced ? "auto" : "smooth",
        });
      }
    },
    [reduced],
  );

  const toggleFullscreen = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  }, []);

  const printPdf = useCallback(() => {
    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    iframe.src = url;
    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        window.open(url, "_blank");
      }
    };
    document.body.appendChild(iframe);
    window.setTimeout(() => {
      if (iframe.parentNode) document.body.removeChild(iframe);
    }, 60000);
  }, [url]);

  const runSearch = useCallback(async () => {
    const pdf = pdfRef.current as unknown as {
      numPages: number;
      getPage: (n: number) => Promise<{
        getTextContent: () => Promise<{ items: Array<{ str?: string }> }>;
      }>;
    } | null;
    if (!pdf || !query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    const q = normalize(query);
    const found: number[] = [];
    try {
      for (let p = 1; p <= pdf.numPages; p++) {
        let text = textCache.current[p];
        if (text === undefined) {
          const page = await pdf.getPage(p);
          const tc = await page.getTextContent();
          text = normalize(tc.items.map((it) => it.str ?? "").join(" "));
          textCache.current[p] = text;
        }
        if (text.includes(q)) found.push(p);
      }
    } catch {
      /* ignore search errors */
    }
    setResults(found);
    setMatchIndex(0);
    setSearching(false);
    if (found.length) scrollToPage(found[0]);
  }, [query, scrollToPage]);

  const gotoMatch = useCallback(
    (dir: 1 | -1) => {
      if (!results.length) return;
      const next = (matchIndex + dir + results.length) % results.length;
      setMatchIndex(next);
      scrollToPage(results[next]);
    },
    [results, matchIndex, scrollToPage],
  );

  const ToolbarButton = ({
    onClick,
    label,
    children,
    disabled,
  }: {
    onClick?: () => void;
    label: string;
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-lg text-fg/80 transition-colors hover:bg-fg/10 hover:text-fg disabled:opacity-40"
    >
      {children}
    </button>
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-line bg-elevated shadow-soft",
        isFs ? "h-screen" : "h-[80vh]",
      )}
    >
      {/* Toolbar */}
      <div className="z-10 flex items-center gap-1 border-b border-line bg-surface/80 px-2 py-2 backdrop-blur-sm">
        <ToolbarButton
          label={showThumbs ? "Masquer les miniatures" : "Afficher les miniatures"}
          onClick={() => setShowThumbs((v) => !v)}
        >
          <PanelLeft className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 hidden items-center gap-1 sm:flex">
          <ToolbarButton
            label="Page précédente"
            onClick={() => scrollToPage(Math.max(1, current - 1))}
            disabled={current <= 1}
          >
            <ChevronUp className="h-4 w-4" />
          </ToolbarButton>
          <span className="min-w-[72px] text-center font-mono text-xs text-muted">
            {current} / {numPages || "—"}
          </span>
          <ToolbarButton
            label="Page suivante"
            onClick={() => scrollToPage(Math.min(numPages, current + 1))}
            disabled={current >= numPages}
          >
            <ChevronDown className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton label="Rechercher" onClick={() => setShowSearch((v) => !v)}>
            <Search className="h-4 w-4" />
          </ToolbarButton>
          <div className="hidden items-center gap-1 md:flex">
            <ToolbarButton
              label="Dézoomer"
              onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(2)))}
            >
              <ZoomOut className="h-4 w-4" />
            </ToolbarButton>
            <span className="w-10 text-center font-mono text-[11px] text-muted">
              {Math.round(zoom * 100)}%
            </span>
            <ToolbarButton
              label="Zoomer"
              onClick={() => setZoom((z) => Math.min(2.6, +(z + 0.2).toFixed(2)))}
            >
              <ZoomIn className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Réinitialiser le zoom" onClick={() => setZoom(1)}>
              <RotateCcw className="h-4 w-4" />
            </ToolbarButton>
          </div>
          <ToolbarButton label="Imprimer" onClick={printPdf}>
            <Printer className="h-4 w-4" />
          </ToolbarButton>
          <a
            href={url}
            download={downloadName}
            aria-label="Télécharger le PDF"
            title="Télécharger le PDF"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg/80 transition-colors hover:bg-fg/10 hover:text-fg"
          >
            <Download className="h-4 w-4" />
          </a>
          <ToolbarButton
            label={isFs ? "Quitter le plein écran" : "Plein écran"}
            onClick={toggleFullscreen}
          >
            {isFs ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </ToolbarButton>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="flex items-center gap-2 border-b border-line bg-surface/60 px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Rechercher dans le document…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-subtle"
          />
          {searching ? (
            <Loader2 className="h-4 w-4 animate-spin text-subtle" />
          ) : results.length > 0 ? (
            <span className="whitespace-nowrap text-xs text-muted">
              {matchIndex + 1}/{results.length} pages
            </span>
          ) : query ? (
            <span className="whitespace-nowrap text-xs text-subtle">
              Entrée pour chercher
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => gotoMatch(-1)}
            disabled={!results.length}
            aria-label="Résultat précédent"
            className="grid h-7 w-7 place-items-center rounded hover:bg-fg/10 disabled:opacity-40"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => gotoMatch(1)}
            disabled={!results.length}
            aria-label="Résultat suivant"
            className="grid h-7 w-7 place-items-center rounded hover:bg-fg/10 disabled:opacity-40"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowSearch(false);
              setQuery("");
              setResults([]);
            }}
            aria-label="Fermer la recherche"
            className="grid h-7 w-7 place-items-center rounded hover:bg-fg/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Body */}
      <div className="relative flex min-h-0 flex-1">
        {/* Thumbnails */}
        {showThumbs && (
          <aside
            className="hidden w-40 shrink-0 overflow-y-auto border-r border-line bg-surface/40 p-3 sm:block"
            data-lenis-prevent
          >
            {numPages > 0 && (
              <Document file={url} options={options} loading="">
                <div className="flex flex-col gap-3">
                  {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => scrollToPage(n)}
                      className={cn(
                        "group overflow-hidden rounded-lg border bg-white transition-colors",
                        current === n
                          ? "border-accent ring-2 ring-accent/30"
                          : "border-line hover:border-accent/40",
                      )}
                    >
                      <Page
                        pageNumber={n}
                        width={120}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={
                          <div className="h-40 w-[120px] animate-pulse bg-line/40" />
                        }
                      />
                      <span className="block bg-surface py-0.5 text-center font-mono text-[10px] text-subtle">
                        {n}
                      </span>
                    </button>
                  ))}
                </div>
              </Document>
            )}
          </aside>
        )}

        {/* Pages */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-auto bg-bg/40 px-2 py-4"
          data-lenis-prevent
          tabIndex={0}
        >
          {error ? (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="text-sm text-muted">
                  Le lecteur n&apos;a pas pu charger le document.
                </p>
                <a
                  href={url}
                  download={downloadName}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-white"
                >
                  <Download className="h-4 w-4" /> Télécharger le PDF
                </a>
              </div>
            </div>
          ) : (
            <Document
              file={url}
              options={options}
              onLoadSuccess={onDocLoad}
              onLoadError={() => setError(true)}
              loading={
                <div className="grid h-[60vh] place-items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-accent" />
                </div>
              }
            >
              <div className="mx-auto flex flex-col items-center gap-4">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                  <div
                    key={n}
                    data-page={n}
                    ref={(el) => {
                      pageRefs.current[n - 1] = el;
                    }}
                    className="overflow-hidden rounded-md bg-white shadow-soft"
                    style={{ width: pageWidth }}
                  >
                    {rendered.has(n) ? (
                      <Page
                        pageNumber={n}
                        width={pageWidth}
                        loading={
                          <div
                            className="animate-pulse bg-line/30"
                            style={{ width: pageWidth, height: pageWidth * 1.414 }}
                          />
                        }
                      />
                    ) : (
                      <div
                        className="grid place-items-center bg-line/10"
                        style={{ width: pageWidth, height: pageWidth * 1.414 }}
                      >
                        <span className="font-mono text-xs text-subtle">
                          {n}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Document>
          )}
        </div>

        {/* Resume chip */}
        {resumePage && (
          <button
            type="button"
            onClick={() => {
              scrollToPage(resumePage);
              setResumePage(null);
            }}
            className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg shadow-soft-lg transition-transform hover:-translate-x-1/2 hover:-translate-y-0.5"
          >
            Reprendre la lecture — page {resumePage}
          </button>
        )}
      </div>

      <span className="sr-only">{title}</span>
    </div>
  );
}
