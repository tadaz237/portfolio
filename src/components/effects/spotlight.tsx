"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsTouch } from "@/lib/hooks/use-media-query";

/**
 * Page-level spotlight that follows the pointer — a large radial glow
 * rendered behind content. Uses a CSS variable updated on rAF for smooth,
 * cheap tracking (no React re-renders). Disabled on touch devices.
 */
export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--x", `${cx}px`);
      el.style.setProperty("--y", `${cy}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 30%), hsl(var(--accent) / 0.08), transparent 70%)",
      }}
    />
  );
}

/**
 * Card-scoped spotlight: reveals a soft glow that tracks the pointer inside
 * a bordered container. Wrap content with this for interactive glass cards.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group/spot relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx) var(--my), hsl(var(--accent) / 0.14), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
