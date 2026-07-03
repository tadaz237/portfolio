import type { Localized } from "@/lib/i18n/config";

export interface SkillCategory {
  id: string;
  title: Localized;
  /** Lucide icon name resolved in the component. */
  icon: "Code2" | "Server" | "Cloud" | "Boxes" | "BrainCircuit";
  accent: "accent" | "secondary";
  skills: { name: string; level: number }[];
}

/**
 * Skill matrix grouped by domain. `level` (0-100) drives the animated bars.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: { fr: "Frontend", en: "Frontend" },
    icon: "Code2",
    accent: "accent",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 93 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript", level: 94 },
      { name: "TailwindCSS", level: 95 },
      { name: "Framer Motion", level: 88 },
      { name: "WordPress", level: 88 },
    ],
  },
  {
    id: "backend",
    title: { fr: "Backend", en: "Backend" },
    icon: "Server",
    accent: "secondary",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "Spring Boot", level: 78 },
      { name: "API REST", level: 90 },
      { name: "Prisma", level: 86 },
      { name: "PostgreSQL", level: 84 },
    ],
  },
  {
    id: "devops",
    title: { fr: "DevOps & Cloud", en: "DevOps & Cloud" },
    icon: "Cloud",
    accent: "accent",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Git & GitHub", level: 93 },
      { name: "GitHub Actions", level: 82 },
      { name: "CI/CD", level: 83 },
      { name: "Linux", level: 80 },
      { name: "Vercel", level: 90 },
    ],
  },
  {
    id: "craft",
    title: { fr: "Mobile & Architecture", en: "Mobile & Architecture" },
    icon: "Boxes",
    accent: "secondary",
    skills: [
      { name: "Flutter", level: 80 },
      { name: "Architecture logicielle", level: 85 },
      { name: "System Design", level: 82 },
      { name: "UX / Product", level: 87 },
      { name: "Testing", level: 79 },
      { name: "Accessibilité", level: 84 },
    ],
  },
  {
    id: "data-ai",
    title: { fr: "Data, IA & Cybersécurité", en: "Data, AI & Cybersecurity" },
    icon: "BrainCircuit",
    accent: "accent",
    skills: [
      { name: "Data Science", level: 80 },
      { name: "IA & Machine Learning", level: 76 },
      { name: "Python", level: 82 },
      { name: "Analyse de données", level: 78 },
      { name: "Cybersécurité", level: 76 },
    ],
  },
];

/** Flat marquee of tech names for the skills ribbon. */
export const techMarquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "TailwindCSS",
  "Framer Motion",
  "Three.js",
  "Flutter",
  "WordPress",
  "Python",
  "Data Science",
  "IA / Machine Learning",
  "Cybersécurité",
  "Spring Boot",
  "Linux",
  "Vercel",
];
