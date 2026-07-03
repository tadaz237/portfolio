/**
 * Global site configuration: identity, contact channels and navigation.
 * Update these values to personalize the portfolio.
 */
export const siteConfig = {
  name: "Tadaze Votio Martinez",
  shortName: "Tadaze Martinez",
  role: "Software Engineer & Full Stack Developer",
  email: "martineztadaze526@gmail.com",
  phone: "+237 687 01 43 15",
  whatsapp: "+237 691 49 04 53",
  location: "Cameroun · Remote worldwide",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tadaze-martinez.vercel.app",
  resumeUrl: "/cv-tadaze-martinez.pdf",
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/martinez-tadaze-votio6b4a50293",
    twitter: "https://twitter.com/",
    whatsapp: "https://wa.me/237691490453",
  },
} as const;

export interface NavItem {
  id: string;
  key: "about" | "skills" | "journey" | "work" | "process" | "experience" | "contact";
}

/** Section anchors used by the navbar. `id` maps to a section's DOM id. */
export const navItems: NavItem[] = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "journey", key: "journey" },
  { id: "work", key: "work" },
  { id: "process", key: "process" },
  { id: "experience", key: "experience" },
  { id: "contact", key: "contact" },
];
