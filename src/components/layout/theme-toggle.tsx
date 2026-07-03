"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useLanguage } from "@/components/providers/language-provider";

/** Dark/light toggle with an animated icon swap. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { dict } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dict.common.theme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -8, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === "dark" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
