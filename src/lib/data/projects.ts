import type { Localized } from "@/lib/i18n/config";

export interface Project {
  id: string;
  title: string;
  category: Localized;
  description: Localized;
  longDescription: Localized;
  tech: string[];
  features: Localized[];
  /** Tailwind gradient classes used for the poster background. */
  gradient: string;
  year: string;
  featured: boolean;
  links: {
    live?: string;
    github?: string;
  };
  /** Multiple live sites (e.g. several WordPress builds) shown in the modal. */
  sites?: { name: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "barberly",
    title: "Barberly",
    category: {
      fr: "SaaS · Réservation",
      en: "SaaS · Booking",
    },
    description: {
      fr: "Plateforme de réservation en ligne pour coiffeurs et salons de barbier.",
      en: "Online booking platform for barbers and hair salons.",
    },
    longDescription: {
      fr: "Une plateforme complète qui permet aux salons de gérer leurs rendez-vous, leurs équipes et leur présence en ligne. Prise de rendez-vous en temps réel, gestion des créneaux, notifications et tableau de bord analytique.",
      en: "A complete platform letting salons manage appointments, teams and their online presence. Real-time booking, slot management, notifications and an analytics dashboard.",
    },
    tech: ["Next.js", "Prisma", "PostgreSQL", "Cloudinary", "Docker", "TypeScript"],
    features: [
      { fr: "Réservation en temps réel", en: "Real-time booking" },
      { fr: "Gestion des salons & équipes", en: "Salon & team management" },
      { fr: "Upload d'images (Cloudinary)", en: "Image upload (Cloudinary)" },
      { fr: "Tableau de bord analytique", en: "Analytics dashboard" },
    ],
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    year: "2024",
    featured: true,
    links: { live: "#", github: "#" },
  },
  {
    id: "54up",
    title: "54Up",
    category: {
      fr: "Marketplace · Géolocalisation",
      en: "Marketplace · Geolocation",
    },
    description: {
      fr: "Marketplace intelligente pour trouver des professionnels et services partout en Afrique.",
      en: "Smart marketplace to find professionals and services across Africa.",
    },
    longDescription: {
      fr: "Une marketplace pensée pour connecter rapidement les particuliers aux professionnels grâce à la géolocalisation. Recherche intelligente, matching par proximité et profils vérifiés pour un accès fluide aux services à travers le continent.",
      en: "A marketplace designed to quickly connect people with professionals through geolocation. Smart search, proximity matching and verified profiles for seamless access to services across the continent.",
    },
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Mapbox", "Node.js"],
    features: [
      { fr: "Recherche géolocalisée", en: "Geolocated search" },
      { fr: "Matching par proximité", en: "Proximity matching" },
      { fr: "Profils professionnels vérifiés", en: "Verified pro profiles" },
      { fr: "Couverture panafricaine", en: "Pan-African coverage" },
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    year: "2024",
    featured: true,
    links: { live: "#", github: "#" },
  },
  {
    id: "ads-platform",
    title: "Plateforme Ads",
    category: {
      fr: "SaaS · Gestion publicitaire",
      en: "SaaS · Ad management",
    },
    description: {
      fr: "Plateforme de gestion de comptes publicitaires avec équipes, rôles et paiements.",
      en: "Ad-account management platform with teams, roles and payments.",
    },
    longDescription: {
      fr: "Un SaaS de gestion de comptes publicitaires orienté équipes : authentification sécurisée avec 2FA, gestion fine des rôles et des permissions, organisation multi-comptes et intégration des paiements.",
      en: "A team-oriented ad-account management SaaS: secure authentication with 2FA, fine-grained roles and permissions, multi-account organization and payment integration.",
    },
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Docker"],
    features: [
      { fr: "Authentification & 2FA", en: "Authentication & 2FA" },
      { fr: "Gestion des équipes & rôles", en: "Team & role management" },
      { fr: "Organisation multi-comptes", en: "Multi-account organization" },
      { fr: "Paiements intégrés", en: "Integrated payments" },
    ],
    gradient: "from-fuchsia-600 via-purple-600 to-blue-600",
    year: "2023",
    featured: true,
    links: { live: "#", github: "#" },
  },
  {
    id: "wordpress-sites",
    title: "Sites WordPress",
    category: {
      fr: "WordPress · Sites vitrines",
      en: "WordPress · Websites",
    },
    description: {
      fr: "Sites web professionnels conçus et développés sur WordPress pour des marques et entreprises.",
      en: "Professional websites designed and built on WordPress for brands and businesses.",
    },
    longDescription: {
      fr: "Conception et développement de sites web complets sur WordPress : design sur-mesure, performance, référencement et interface d'administration simple pour les clients. Voici une sélection de sites en ligne que j'ai réalisés.",
      en: "Design and development of complete websites on WordPress: custom design, performance, SEO and a simple admin interface for clients. Here is a selection of live sites I built.",
    },
    tech: ["WordPress", "PHP", "CSS", "JavaScript", "SEO"],
    features: [
      { fr: "Design sur-mesure & responsive", en: "Custom & responsive design" },
      { fr: "Optimisation SEO & performance", en: "SEO & performance optimization" },
      { fr: "Administration simple pour le client", en: "Simple client-side admin" },
      { fr: "Sites en ligne et maintenus", en: "Live and maintained websites" },
    ],
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    year: "2024",
    featured: true,
    links: { live: "https://ambrozia.pro/" },
    sites: [
      { name: "ambrozia.pro", url: "https://ambrozia.pro/" },
      { name: "digi-lite.com", url: "https://digi-lite.com/" },
      { name: "happy-elixirs.com", url: "https://happy-elixirs.com/" },
    ],
  },
  {
    id: "flutter-apps",
    title: "Applications Flutter",
    category: {
      fr: "Mobile · Cross-platform",
      en: "Mobile · Cross-platform",
    },
    description: {
      fr: "Applications mobiles connectées à des APIs REST, iOS & Android.",
      en: "Mobile apps connected to REST APIs, iOS & Android.",
    },
    longDescription: {
      fr: "Des applications mobiles cross-platform développées avec Flutter, connectées à des APIs REST. Interfaces fluides, gestion d'état robuste et expérience native sur iOS comme Android.",
      en: "Cross-platform mobile apps built with Flutter, connected to REST APIs. Smooth interfaces, robust state management and a native experience on both iOS and Android.",
    },
    tech: ["Flutter", "Dart", "REST API", "Firebase", "Provider"],
    features: [
      { fr: "Cross-platform iOS & Android", en: "Cross-platform iOS & Android" },
      { fr: "Intégration d'APIs REST", en: "REST API integration" },
      { fr: "UI fluide & animations natives", en: "Smooth UI & native animations" },
      { fr: "Notifications push", en: "Push notifications" },
    ],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    year: "2023",
    featured: false,
    links: { live: "#", github: "#" },
  },
];
