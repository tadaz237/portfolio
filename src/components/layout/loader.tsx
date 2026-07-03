"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

/**
 * Premium intro loader: animated monogram, name and a progress counter that
 * fills to 100% then curtains away to reveal the page. Shown once per tab
 * session. Respects reduced-motion (fast fade, no counter animation).
 */
export function Loader() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Skip the loader if already seen this session.
    if (typeof window !== "undefined" && sessionStorage.getItem("tvm-loaded")) {
      setMounted(false);
      return;
    }

    if (reduced) {
      setProgress(100);
      const t = setTimeout(() => finish(), 400);
      return () => clearTimeout(t);
    }

    let current = 0;
    const interval = setInterval(() => {
      // Ease toward 100 with a little randomness for an organic feel.
      const increment = current < 70 ? 4 + (current % 3) : 2;
      current = Math.min(current + increment, 100);
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => finish(), 450);
      }
    }, 90);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const finish = () => {
    sessionStorage.setItem("tvm-loaded", "1");
    setDone(true);
    setTimeout(() => setMounted(false), 900);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow backdrop */}
          <div className="glow-blob absolute h-96 w-96 rounded-full bg-accent/20" />
          <div
            className="glow-blob absolute h-72 w-72 translate-x-20 translate-y-20 rounded-full bg-secondary/20"
            aria-hidden
          />

          {/* Monogram */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-gradient text-2xl font-bold text-white shadow-glow-lg"
          >
            TM
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="relative z-10 mt-6 font-display text-lg font-semibold tracking-tight"
          >
            Tadaze Votio Martinez
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Software Engineer
          </motion.p>

          {/* Progress */}
          <div className="relative z-10 mt-10 w-56">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Loading</span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-accent-gradient"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
