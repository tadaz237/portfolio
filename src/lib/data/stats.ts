import type { Localized } from "@/lib/i18n/config";

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: Localized;
}

/** Animated counters. `value` is the target the counter animates to. */
export const stats: Stat[] = [
  {
    id: "projects",
    value: 25,
    suffix: "+",
    label: { fr: "Projets réalisés", en: "Projects shipped" },
  },
  {
    id: "tech",
    value: 20,
    suffix: "+",
    label: { fr: "Technologies maîtrisées", en: "Technologies mastered" },
  },
  {
    id: "hours",
    value: 8000,
    suffix: "+",
    label: { fr: "Heures de développement", en: "Hours of development" },
  },
  {
    id: "commits",
    value: 12000,
    suffix: "+",
    label: { fr: "Commits Git", en: "Git commits" },
  },
  {
    id: "loc",
    value: 500,
    suffix: "K+",
    label: { fr: "Lignes de code", en: "Lines of code" },
  },
];
