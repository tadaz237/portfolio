"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { navItems, siteConfig } from "@/lib/data/site";
import { useLanguage } from "@/components/providers/language-provider";
import { scrollToId } from "@/components/providers/lenis-provider";
import { Magnetic } from "@/components/effects/magnetic";
import { GridBackground } from "@/components/effects/backgrounds";

const socialLinks = [
  { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: WhatsAppIcon, href: siteConfig.socials.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function Footer() {
  const { dict } = useLanguage();
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <GridBackground />
      <div className="container-px relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollToId("hero")}
              className="flex items-center gap-2.5"
              aria-label="Back to top"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gradient text-sm font-bold text-white shadow-glow">
                TM
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Tadaze Votio Martinez
              </span>
            </button>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{dict.footer.tagline}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {dict.footer.navigation}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToId(item.id)}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {dict.nav[item.key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {dict.footer.social}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground/80 transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-muted-foreground">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="pointer-events-none mt-16 select-none">
          <p className="bg-text-gradient bg-clip-text text-center text-[18vw] font-bold leading-none tracking-tighter text-transparent opacity-[0.08] md:text-[14vw]">
            TADAZE
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} Tadaze Votio Martinez. {dict.footer.rights}
          </p>
          <p className="text-center">{dict.footer.builtWith}</p>
          <Magnetic>
            <button
              onClick={() => scrollToId("hero")}
              className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 transition-colors hover:border-accent/40 hover:text-accent"
            >
              {dict.footer.backToTop}
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
