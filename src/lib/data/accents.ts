import type { Localized } from "@/lib/i18n/config";

export interface AccentTheme {
  id: string;
  name: Localized;
  /** HSL triples ("H S% L%") for the CSS variables, per theme mode. */
  accent: { light: string; dark: string };
  secondary: { light: string; dark: string };
  /** Vibrant hex colors used by the Three.js hero scene. */
  hex: { accent: string; secondary: string };
}

export const ACCENT_STORAGE_KEY = "tvm-accent";
export const DEFAULT_ACCENT_ID = "electric";

/**
 * Four curated accent palettes. Each defines an accent + secondary color for
 * light and dark mode (CSS variables) plus vibrant hex values for the 3D
 * scene. Changing the palette re-tints the whole app — buttons, gradients,
 * cursor, timeline, and the hero sphere.
 */
export const accentThemes: AccentTheme[] = [
  {
    id: "electric",
    name: { fr: "Électrique", en: "Electric" },
    accent: { light: "222 92% 52%", dark: "222 100% 62%" },
    secondary: { light: "266 84% 56%", dark: "266 90% 66%" },
    hex: { accent: "#3d7bff", secondary: "#a855f7" },
  },
  {
    id: "amethyst",
    name: { fr: "Améthyste", en: "Amethyst" },
    accent: { light: "265 84% 56%", dark: "266 90% 68%" },
    secondary: { light: "322 82% 55%", dark: "322 90% 64%" },
    hex: { accent: "#a855f7", secondary: "#ec4899" },
  },
  {
    id: "emerald",
    name: { fr: "Émeraude", en: "Emerald" },
    accent: { light: "160 84% 34%", dark: "162 76% 46%" },
    secondary: { light: "190 90% 40%", dark: "189 90% 52%" },
    hex: { accent: "#10b981", secondary: "#06b6d4" },
  },
  {
    id: "sunset",
    name: { fr: "Coucher de soleil", en: "Sunset" },
    accent: { light: "22 88% 48%", dark: "25 95% 60%" },
    secondary: { light: "345 82% 55%", dark: "345 90% 64%" },
    hex: { accent: "#f97316", secondary: "#f43f5e" },
  },
  {
    id: "gold",
    name: { fr: "Jaune", en: "Yellow" },
    // A rich gold rather than pure yellow, so white button text stays legible.
    accent: { light: "43 92% 42%", dark: "45 93% 52%" },
    secondary: { light: "30 90% 46%", dark: "34 95% 56%" },
    hex: { accent: "#eab308", secondary: "#f59e0b" },
  },
];

/** CSS that overrides the accent variables for a palette (light + dark). */
export function accentCss(t: AccentTheme): string {
  return (
    `:root{--accent:${t.accent.light};--secondary:${t.secondary.light};--ring:${t.accent.light}}` +
    `.dark{--accent:${t.accent.dark};--secondary:${t.secondary.dark};--ring:${t.accent.dark}}`
  );
}

const cssMap: Record<string, string> = Object.fromEntries(
  accentThemes.map((t) => [t.id, accentCss(t)]),
);

/**
 * Blocking inline script that applies the saved accent before first paint
 * (no flash of the default color). Injected in the root layout <head>.
 */
export const accentInitScript = `
(function(){
  try {
    var map = ${JSON.stringify(cssMap)};
    var id = localStorage.getItem('${ACCENT_STORAGE_KEY}') || '${DEFAULT_ACCENT_ID}';
    var css = map[id] || map['${DEFAULT_ACCENT_ID}'];
    var el = document.getElementById('tvm-accent');
    if (!el) { el = document.createElement('style'); el.id = 'tvm-accent'; }
    el.textContent = css;
    document.head.appendChild(el);
  } catch (e) {}
})();
`;
