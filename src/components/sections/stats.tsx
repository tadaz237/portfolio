"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { stats } from "@/lib/data/stats";
import { pick } from "@/lib/i18n/config";
import { Counter } from "@/components/effects/counter";
import { RevealGroup, RevealItem } from "@/components/effects/reveal";
import { GridBackground } from "@/components/effects/backgrounds";

export function Stats() {
  const { lang, dict } = useLanguage();

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="container-px relative z-10">
        <div className="glass-card relative overflow-hidden p-8 md:p-12">
          <GridBackground fade={false} className="opacity-40" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

          <p className="relative mb-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {dict.stats.title}
          </p>

          <RevealGroup
            className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5"
            stagger={0.1}
          >
            {stats.map((stat) => (
              <RevealItem key={stat.id} className="text-center">
                <div className="font-display text-4xl font-bold tracking-tight text-gradient-accent md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{pick(stat.label, lang)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
