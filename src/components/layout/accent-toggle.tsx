"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useAccent } from "@/components/providers/accent-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { pick } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Accent-palette selector. The trigger shows the current palette as a
 * gradient dot; the popover offers the 4 palettes. Selecting one re-tints
 * the entire app instantly.
 */
export function AccentToggle() {
  const { themes, accentId, setAccent, theme } = useAccent();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={lang === "fr" ? "Couleur d'accent" : "Accent color"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40 transition-colors hover:border-accent/40"
      >
        <span
          className="h-4 w-4 rounded-full ring-1 ring-inset ring-white/30"
          style={{
            background: `linear-gradient(135deg, ${theme.hex.accent}, ${theme.hex.secondary})`,
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute right-0 top-12 z-50 flex gap-2.5 rounded-2xl border border-border p-2.5"
            role="listbox"
          >
            {themes.map((t) => {
              const active = t.id === accentId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setAccent(t.id);
                    setOpen(false);
                  }}
                  title={pick(t.name, lang)}
                  aria-label={pick(t.name, lang)}
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110",
                    "ring-2 ring-offset-2 ring-offset-background",
                    active ? "ring-foreground/70" : "ring-transparent",
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${t.hex.accent}, ${t.hex.secondary})`,
                  }}
                >
                  {active && <Check className="h-4 w-4 text-white drop-shadow" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
