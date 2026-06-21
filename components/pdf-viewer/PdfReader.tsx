"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

function Skeleton() {
  return (
    <div className="grid h-[80vh] place-items-center rounded-2xl border border-line bg-elevated">
      <div className="flex flex-col items-center gap-3 text-subtle">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
        <p className="text-sm">Préparation du lecteur…</p>
      </div>
    </div>
  );
}

// Loaded only on the client (pdfjs relies on browser APIs).
const PdfViewer = dynamic(
  () => import("./PdfViewer").then((m) => m.PdfViewer),
  { ssr: false, loading: () => <Skeleton /> },
);

interface PdfReaderProps {
  url: string;
  title: string;
  downloadName?: string;
}

export function PdfReader(props: PdfReaderProps) {
  return <PdfViewer {...props} />;
}
