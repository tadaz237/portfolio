import type { Localized } from "@/lib/i18n/config";

export interface ExperienceEntry {
  id: string;
  role: Localized;
  company: string;
  period: Localized;
  description: Localized;
  highlights: Localized[];
  tech: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: "frontend-saas",
    role: { fr: "Développeur Frontend", en: "Frontend Developer" },
    company: "SaaS Modern",
    period: { fr: "2023 — Présent", en: "2023 — Present" },
    description: {
      fr: "Travail sur des applications SaaS modernes, du développement de nouvelles fonctionnalités à l'optimisation de l'expérience utilisateur.",
      en: "Working on modern SaaS applications, from building new features to optimizing the user experience.",
    },
    highlights: [
      {
        fr: "Développement de nouvelles fonctionnalités produit",
        en: "Building new product features",
      },
      { fr: "Optimisation continue de l'UX", en: "Continuous UX optimization" },
      {
        fr: "Travail en équipe via Git/GitHub, Pull Requests & Code Reviews",
        en: "Team work via Git/GitHub, Pull Requests & Code Reviews",
      },
      {
        fr: "Collaboration étroite avec le design et le produit",
        en: "Close collaboration with design and product",
      },
    ],
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS", "Git"],
  },
];
