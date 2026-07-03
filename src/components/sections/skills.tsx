"use client";

import { motion } from "framer-motion";
import { Boxes, BrainCircuit, Cloud, Code2, Server } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { skillCategories, techMarquee, type SkillCategory } from "@/lib/data/skills";
import { pick } from "@/lib/i18n/config";
import { Reveal, RevealGroup, RevealItem } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/effects/section-heading";
import { SpotlightCard } from "@/components/effects/spotlight";
import { Marquee } from "@/components/effects/marquee";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const icons = { Code2, Server, Cloud, Boxes, BrainCircuit };

function SkillBar({ name, level, accent }: { name: string; level: number; accent: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground/90">{name}</span>
        <span className="text-xs tabular-nums text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full", accent)}
          initial={reduced ? false : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: SkillCategory }) {
  const { lang } = useLanguage();
  const Icon = icons[category.icon];
  const accentBar =
    category.accent === "accent" ? "bg-accent-gradient" : "bg-gradient-to-r from-secondary to-accent";
  const iconColor = category.accent === "accent" ? "text-accent" : "text-secondary";

  return (
    <SpotlightCard className="card-hover h-full rounded-3xl border border-border bg-card/60 p-7">
      <div className="mb-6 flex items-center gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50",
            iconColor,
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold">{pick(category.title, lang)}</h3>
      </div>
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} accent={accentBar} />
        ))}
      </div>
    </SpotlightCard>
  );
}

export function Skills() {
  const { dict } = useLanguage();
  const t = dict.skills;

  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {skillCategories.map((category) => (
            <RevealItem key={category.id} className="h-full">
              <CategoryCard category={category} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Tech marquee ribbon */}
      <Reveal className="mt-16" direction="none">
        <Marquee items={techMarquee} duration={50} />
      </Reveal>
    </section>
  );
}
