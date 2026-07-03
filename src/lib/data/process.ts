import type { Localized } from "@/lib/i18n/config";

export interface ProcessStep {
  id: string;
  index: string;
  icon: "Search" | "PenTool" | "LayoutGrid" | "Code2" | "TestTube" | "Rocket" | "Wrench";
  title: Localized;
  description: Localized;
}

/** End-to-end delivery method, from discovery to maintenance. */
export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    index: "01",
    icon: "Search",
    title: { fr: "Discovery", en: "Discovery" },
    description: {
      fr: "Comprendre le besoin, les utilisateurs et les objectifs métier avant tout.",
      en: "Understanding the need, the users and business goals first.",
    },
  },
  {
    id: "architecture",
    index: "02",
    icon: "LayoutGrid",
    title: { fr: "Architecture", en: "Architecture" },
    description: {
      fr: "Concevoir une architecture évolutive, robuste et adaptée à l'échelle visée.",
      en: "Designing a scalable, robust architecture fit for the target scale.",
    },
  },
  {
    id: "design",
    index: "03",
    icon: "PenTool",
    title: { fr: "Design", en: "Design" },
    description: {
      fr: "Définir une expérience utilisateur soignée et une interface cohérente.",
      en: "Defining a polished user experience and a consistent interface.",
    },
  },
  {
    id: "development",
    index: "04",
    icon: "Code2",
    title: { fr: "Développement", en: "Development" },
    description: {
      fr: "Écrire un code propre, modulaire, typé et maintenable, testé au fil de l'eau.",
      en: "Writing clean, modular, typed and maintainable code, tested as I go.",
    },
  },
  {
    id: "testing",
    index: "05",
    icon: "TestTube",
    title: { fr: "Tests", en: "Testing" },
    description: {
      fr: "Valider la qualité, la fiabilité et les performances avant la mise en ligne.",
      en: "Validating quality, reliability and performance before going live.",
    },
  },
  {
    id: "deployment",
    index: "06",
    icon: "Rocket",
    title: { fr: "Déploiement", en: "Deployment" },
    description: {
      fr: "Automatiser le déploiement avec des pipelines CI/CD et une infra Cloud.",
      en: "Automating deployment with CI/CD pipelines and Cloud infrastructure.",
    },
  },
  {
    id: "maintenance",
    index: "07",
    icon: "Wrench",
    title: { fr: "Maintenance", en: "Maintenance" },
    description: {
      fr: "Assurer le suivi, les améliorations continues et la stabilité dans le temps.",
      en: "Ensuring monitoring, continuous improvements and long-term stability.",
    },
  },
];
