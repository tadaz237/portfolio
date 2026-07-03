import type { Localized } from "@/lib/i18n/config";
import { certifications, type Certification } from "./certifications";

export interface TimelineEntry {
  id: string;
  period: string;
  title: Localized;
  description: Localized;
  tags: string[];
  /** When set, the entry renders these certifications as viewable links. */
  certifications?: Certification[];
}

/**
 * Vertical journey timeline — from first lines of code to the goal of
 * becoming an international software engineer.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "start",
    period: "2020",
    title: {
      fr: "Premiers pas en développement",
      en: "First steps in development",
    },
    description: {
      fr: "Découverte de la programmation et des fondamentaux du web. Les premières lignes de code, la curiosité qui devient passion.",
      en: "Discovering programming and the fundamentals of the web. The first lines of code, curiosity turning into passion.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "engineering",
    period: "2021",
    title: {
      fr: "Formation en Génie Logiciel",
      en: "Software Engineering education",
    },
    description: {
      fr: "Apprentissage des principes d'ingénierie logicielle : algorithmique, structures de données, architecture et bonnes pratiques.",
      en: "Learning software engineering principles: algorithms, data structures, architecture and best practices.",
    },
    tags: ["Algorithmique", "OOP", "Architecture"],
  },
  {
    id: "react",
    period: "2022",
    title: {
      fr: "Spécialisation React",
      en: "React specialization",
    },
    description: {
      fr: "Montée en compétence sur React et l'écosystème frontend moderne. Composants, hooks, state management et interfaces riches.",
      en: "Levelling up on React and the modern frontend ecosystem. Components, hooks, state management and rich interfaces.",
    },
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "nextjs",
    period: "2023",
    title: {
      fr: "Next.js & Full Stack",
      en: "Next.js & Full Stack",
    },
    description: {
      fr: "Adoption de Next.js et du full stack : App Router, Server Components, Prisma, PostgreSQL et APIs. Des applications complètes de bout en bout.",
      en: "Adopting Next.js and full stack: App Router, Server Components, Prisma, PostgreSQL and APIs. Complete applications, end to end.",
    },
    tags: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    id: "saas-devops",
    period: "2024",
    title: {
      fr: "SaaS & DevOps",
      en: "SaaS & DevOps",
    },
    description: {
      fr: "Conception de produits SaaS et industrialisation : Docker, CI/CD, GitHub Actions et déploiement continu sur le Cloud.",
      en: "Building SaaS products and industrializing: Docker, CI/CD, GitHub Actions and continuous deployment to the Cloud.",
    },
    tags: ["Docker", "CI/CD", "SaaS"],
  },
  {
    id: "certifications",
    period: "2026",
    title: {
      fr: "Certifications & spécialisation",
      en: "Certifications & specialization",
    },
    description: {
      fr: "Certifications en Intelligence Artificielle, Data Science et Cybersécurité — j'élargis mes compétences au-delà du développement web. Badges et attestations consultables ci-dessous.",
      en: "Certifications in Artificial Intelligence, Data Science and Cybersecurity — expanding my skills beyond web development. Badges and certificates available below.",
    },
    tags: ["IA", "Data Science", "Cybersécurité"],
    certifications,
  },
  {
    id: "goal",
    period: "2026 →",
    title: {
      fr: "Objectif : Software Engineer international",
      en: "Goal: International Software Engineer",
    },
    description: {
      fr: "Devenir un ingénieur logiciel de niveau international, spécialisé dans les applications modernes, le DevOps et les architectures évolutives.",
      en: "Becoming an international-level software engineer, specialized in modern applications, DevOps and scalable architectures.",
    },
    tags: ["System Design", "Cloud", "Leadership"],
  },
];
