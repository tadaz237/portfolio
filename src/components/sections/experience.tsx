"use client";

import { Briefcase, Check } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { experiences } from "@/lib/data/experience";
import { pick } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/effects/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { SpotlightCard } from "@/components/effects/spotlight";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  const { dict, lang } = useLanguage();
  const t = dict.experience;

  return (
    <section id="experience" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="left" />

        <div className="mt-14 space-y-6">
          {experiences.map((exp) => (
            <Reveal key={exp.id} direction="up">
              <SpotlightCard className="card-hover rounded-3xl border border-border bg-card/60 p-7 md:p-9">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-glow">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{pick(exp.role, lang)}</h3>
                      <p className="text-sm text-accent">{exp.company}</p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {pick(exp.description, lang)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {pick(exp.period, lang)}
                  </Badge>
                </div>

                <ul className="mt-6 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-foreground/85">{pick(h, lang)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {exp.tech.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
