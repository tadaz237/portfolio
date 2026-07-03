"use client";

import { cn } from "@/lib/utils";

/**
 * Full-bleed animated aurora background — soft, blurred color blobs that
 * drift behind content. Purely decorative.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="glow-blob absolute -left-[10%] top-[-10%] h-[45rem] w-[45rem] rounded-full bg-accent/25 animate-float" />
      <div
        className="glow-blob absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full bg-secondary/25 animate-float"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="glow-blob absolute bottom-[-15%] left-[30%] h-[38rem] w-[38rem] rounded-full bg-accent/15 animate-float"
        style={{ animationDelay: "-4s" }}
      />
    </div>
  );
}

/** Infinite grid background with a radial fade mask. */
export function GridBackground({
  className,
  fade = true,
}: {
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-grid",
        fade && "mask-radial",
        className,
      )}
    />
  );
}

/** Subtle film-grain noise overlay for depth. */
export function Noise({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] bg-noise opacity-[0.035] mix-blend-overlay",
        className,
      )}
    />
  );
}

/** A single soft glow blob, positioned by the parent. */
export function GlowBlob({
  className,
  color = "accent",
}: {
  className?: string;
  color?: "accent" | "secondary";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "glow-blob absolute rounded-full",
        color === "accent" ? "bg-accent/30" : "bg-secondary/30",
        className,
      )}
    />
  );
}
