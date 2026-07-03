import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="glow-blob absolute h-96 w-96 rounded-full bg-accent/20" />
      <p className="relative font-display text-[24vw] font-bold leading-none tracking-tighter text-gradient md:text-[16rem]">
        404
      </p>
      <h1 className="relative mt-2 text-2xl font-semibold tracking-tight">Page introuvable</h1>
      <p className="relative mt-2 max-w-md text-muted-foreground">
        Cette page n&apos;existe pas ou a été déplacée. Retournons à l&apos;essentiel.
      </p>
      <Link
        href="/"
        className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
