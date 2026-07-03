"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  accentCss,
  accentThemes,
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT_ID,
  type AccentTheme,
} from "@/lib/data/accents";

interface AccentContextValue {
  accentId: string;
  theme: AccentTheme;
  themes: AccentTheme[];
  setAccent: (id: string) => void;
}

const AccentContext = createContext<AccentContextValue | undefined>(undefined);

/** Inject/update the accent override stylesheet (kept last so it wins). */
function applyAccent(id: string) {
  const theme = accentThemes.find((t) => t.id === id) ?? accentThemes[0];
  let el = document.getElementById("tvm-accent") as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = "tvm-accent";
  }
  el.textContent = accentCss(theme);
  // Re-append so it always comes after Next's stylesheet in the cascade.
  document.head.appendChild(el);
}

/**
 * Provides the active accent palette and re-tints the whole app by
 * overriding the --accent / --secondary CSS variables. The choice is
 * persisted; a blocking inline script applies it before first paint.
 */
export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accentId, setAccentId] = useState(DEFAULT_ACCENT_ID);

  useEffect(() => {
    const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
    const id = saved && accentThemes.some((t) => t.id === saved) ? saved : DEFAULT_ACCENT_ID;
    setAccentId(id);
    applyAccent(id);
  }, []);

  const setAccent = useCallback((id: string) => {
    setAccentId(id);
    applyAccent(id);
    localStorage.setItem(ACCENT_STORAGE_KEY, id);
  }, []);

  const theme = accentThemes.find((t) => t.id === accentId) ?? accentThemes[0];

  return (
    <AccentContext.Provider value={{ accentId, theme, themes: accentThemes, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within an AccentProvider");
  return ctx;
}
