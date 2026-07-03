import type { Localized } from "@/lib/i18n/config";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: Localized;
  /** Badge image in /public (optional). */
  badge?: string;
  /** Credential PDF in /public. */
  pdf: string;
  color: "accent" | "secondary";
}

/**
 * Certifications earned in 2026. Files live in /public/certifications and are
 * linked from the Journey timeline so recruiters can open the badge / PDF.
 */
export const certifications: Certification[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals: Foundations for Understanding AI",
    issuer: "IBM SkillsBuild",
    date: "2026",
    category: { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
    badge: "/certifications/ai-fundamentals.png",
    pdf: "/certifications/ai-fundamentals.pdf",
    color: "accent",
  },
  {
    id: "data-science",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "2026",
    category: { fr: "Data Science", en: "Data Science" },
    badge: "/certifications/introduction-to-data-science.png",
    pdf: "/certifications/introduction-to-data-science.pdf",
    color: "secondary",
  },
  {
    id: "cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2026",
    category: { fr: "Cybersécurité", en: "Cybersecurity" },
    pdf: "/certifications/cybersecurity.pdf",
    color: "accent",
  },
];
