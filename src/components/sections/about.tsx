"use client";

import Image from "next/image";
import { Boxes, Layers, PenTool, Cloud } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal, RevealGroup, RevealItem } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/effects/section-heading";
import { SpotlightCard } from "@/components/effects/spotlight";
import { GlowBlob } from "@/components/effects/backgrounds";
import { siteConfig } from "@/lib/data/site";

const pillarIcons = [Layers, PenTool, Boxes, Cloud];

export function About() {
  const { dict } = useLanguage();
  const t = dict.about;

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <GlowBlob className="left-[-10%] top-1/4 h-96 w-96" color="accent" />

      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="left" />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Portrait */}
          <Reveal direction="right">
            <div className="relative mx-auto w-full max-w-sm">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-[2rem] bg-accent-gradient opacity-20 blur-2xl" />
              <div className="glass-card relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-accent/20 via-background to-secondary/20">
                  <Image
                    src="/profile/moi.png"
                    alt={siteConfig.name}
                    fill
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="object-cover object-[50%_22%]"
                  />
                  {/* Legibility gradient behind the name chip */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-background/60 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-sm font-semibold">{siteConfig.shortName}</p>
                      <p className="text-xs text-muted-foreground">Software Engineer</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
                  </div>
                </div>
              </div>
              {/* Floating stat chip */}
              <div className="absolute -right-4 -top-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
                <p className="text-2xl font-bold text-gradient-accent">5+</p>
                <p className="text-[11px] text-muted-foreground">
                  {dict.about.pillars[0].title}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div className="flex flex-col justify-center">
            <RevealGroup className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <RevealItem>
                <p>{t.p1}</p>
              </RevealItem>
              <RevealItem>
                <p>{t.p2}</p>
              </RevealItem>
              <RevealItem>
                <p className="text-foreground">{t.p3}</p>
              </RevealItem>
            </RevealGroup>

            {/* Pillars */}
            <RevealGroup className="mt-10 grid grid-cols-2 gap-4" stagger={0.1}>
              {t.pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <RevealItem key={pillar.title}>
                    <SpotlightCard className="card-hover h-full rounded-2xl border border-border bg-card/60 p-5">
                      <Icon className="h-6 w-6 text-accent" />
                      <h3 className="mt-3 font-semibold">{pillar.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{pillar.desc}</p>
                    </SpotlightCard>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
