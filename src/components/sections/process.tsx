"use client";

import {
  Code2,
  LayoutGrid,
  PenTool,
  Rocket,
  Search,
  TestTube,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { processSteps } from "@/lib/data/process";
import { pick } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/effects/section-heading";
import { RevealGroup, RevealItem } from "@/components/effects/reveal";
import { SpotlightCard } from "@/components/effects/spotlight";

const icons = { Search, LayoutGrid, PenTool, Code2, TestTube, Rocket, Wrench };

export function Process() {
  const { dict, lang } = useLanguage();
  const t = dict.process;

  return (
    <section id="process" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <RevealGroup
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.08}
        >
          {processSteps.map((step) => {
            const Icon = icons[step.icon];
            return (
              <RevealItem key={step.id} className="h-full">
                <SpotlightCard className="card-hover group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6">
                  {/* Ghost index */}
                  <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-foreground/[0.04] transition-colors group-hover:text-accent/10">
                    {step.index}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold">{pick(step.title, lang)}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pick(step.description, lang)}
                  </p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
