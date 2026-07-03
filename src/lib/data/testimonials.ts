import type { Localized } from "@/lib/i18n/config";

export interface Testimonial {
  id: string;
  name: string;
  role: Localized;
  company: string;
  /** Initials shown in the avatar chip. */
  initials: string;
  quote: Localized;
  accent: "accent" | "secondary";
}

/**
 * Testimonial cards. Structure is intentionally easy to edit — swap the
 * placeholder quotes for real ones as they come in.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Delcourt",
    role: { fr: "Product Manager", en: "Product Manager" },
    company: "SaaS Studio",
    initials: "SD",
    quote: {
      fr: "Tadaze a une capacité rare à comprendre le produit autant que le code. Il livre des interfaces impeccables et pense à l'expérience jusque dans les moindres détails.",
      en: "Tadaze has a rare ability to understand the product as much as the code. He ships flawless interfaces and thinks about the experience down to the smallest detail.",
    },
    accent: "accent",
  },
  {
    id: "t2",
    name: "Marc Aubin",
    role: { fr: "CTO", en: "CTO" },
    company: "Fintech Labs",
    initials: "MA",
    quote: {
      fr: "Un développeur full stack solide, autonome et fiable. Son travail sur notre architecture et notre CI/CD nous a fait gagner un temps précieux.",
      en: "A solid, autonomous and reliable full stack developer. His work on our architecture and CI/CD saved us precious time.",
    },
    accent: "secondary",
  },
  {
    id: "t3",
    name: "Amina Koné",
    role: { fr: "Fondatrice", en: "Founder" },
    company: "54Up",
    initials: "AK",
    quote: {
      fr: "Il a transformé notre vision en un produit concret, rapide et magnifique. La qualité de la fluidité et du détail dépasse tout ce qu'on avait imaginé.",
      en: "He turned our vision into a concrete, fast and beautiful product. The quality of the smoothness and detail exceeded everything we had imagined.",
    },
    accent: "accent",
  },
];
