import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm tracking-widest text-accent">ERREUR 404</p>
      <h1 className="mt-4 text-6xl font-bold tracking-tighter sm:text-8xl">
        Page introuvable
      </h1>
      <p className="mt-5 max-w-md text-pretty text-muted">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenons à
        l&apos;essentiel.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
