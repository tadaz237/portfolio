"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  /** Phrases cycled through, typed then deleted. */
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

/**
 * Typewriter effect that cycles a list of phrases. Under reduced-motion it
 * simply shows the first phrase with no animation.
 */
export function TypingText({
  words,
  className,
  typingSpeed = 75,
  deletingSpeed = 40,
  pause = 1600,
}: TypingTextProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;

    const current = words[index % words.length];

    // Finished typing → pause → start deleting.
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    // Finished deleting → next word.
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause, reduced]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  const current = words[index % words.length];

  return (
    <span className={cn("inline-flex items-center", className)} aria-live="polite">
      <span>{current.substring(0, subIndex)}</span>
      <span className="ml-0.5 inline-block h-[1.05em] w-[3px] translate-y-[2px] rounded-full bg-accent animate-pulse-glow" />
    </span>
  );
}
